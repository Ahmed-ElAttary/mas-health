"use client";

import React, { useRef, useContext, useState } from "react";
import Map, { Source, Layer, NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import maplibreGl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import Markers from "./Markers/Markers";
import Controls from "./HomeControls/Controls";
import { EssentialsContext } from "@app/home_maplibre/EssentialsProvider";
import { govOfClick } from "@app/home_maplibre/server";

export const BaseMapContext = React.createContext();

const addGHybridProtocol = () => {
  if (typeof window === 'undefined') return;
  if (!maplibreGl || !maplibreGl.addProtocol) return;
  try {
    maplibreGl.addProtocol('g-hybrid', (params, abortController) => {
      return new Promise((resolve, reject) => {
         const url = params.url.replace('g-hybrid://', 'https://');
         const match = url.match(/x=(\d+)&y=(\d+)&z=(\d+)/);
         if (!match) {
             fetch(url).then(res => res.arrayBuffer()).then(data => resolve({ data })).catch(reject);
             return;
         }
         const x = parseInt(match[1]);
         const y = parseInt(match[2]);
         const z = parseInt(match[3]);
         
         const egyptBound = [24.7, 22.0, 33.5, 32];
         
         function lon2x(lon, z) { return (lon + 180) / 360 * Math.pow(2, z); }
         function lat2y(lat, z) { return (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z); }
         
         const tileLeft = x;
         const tileRight = x + 1;
         const tileTop = y;
         const tileBottom = y + 1;
         
         const boundLeft = lon2x(egyptBound[0], z);
         const boundBottom = lat2y(egyptBound[1], z); 
         const boundRight = lon2x(egyptBound[2], z);
         const boundTop = lat2y(egyptBound[3], z); 

         if (boundLeft <= tileLeft && boundRight >= tileRight && boundTop <= tileTop && boundBottom >= tileBottom) {
             fetch(url, { signal: abortController?.signal }).then(res => res.arrayBuffer()).then(data => resolve({ data })).catch(reject);
             return;
         }

         fetch(url, { signal: abortController?.signal })
           .then(res => res.blob())
           .then(blob => createImageBitmap(blob))
           .then(imageBitmap => {
               let canvas, ctx;
               if (typeof OffscreenCanvas !== 'undefined') {
                   canvas = new OffscreenCanvas(256, 256);
                   ctx = canvas.getContext('2d', { willReadFrequently: true });
               } else {
                   canvas = document.createElement('canvas');
                   canvas.width = 256;
                   canvas.height = 256;
                   ctx = canvas.getContext('2d', { willReadFrequently: true });
               }
               ctx.drawImage(imageBitmap, 0, 0, 256, 256);

               const pxLeft = Math.max(0, (boundLeft - x) * 256);
               const pxRight = Math.min(256, (boundRight - x) * 256);
               const pxTop = Math.max(0, (boundTop - y) * 256);
               const pxBottom = Math.min(256, (boundBottom - y) * 256);

               ctx.clearRect(0, 0, 256, pxTop);
               ctx.clearRect(0, pxBottom, 256, 256 - pxBottom);
               ctx.clearRect(0, pxTop, pxLeft, pxBottom - pxTop);
               ctx.clearRect(pxRight, pxTop, 256 - pxRight, pxBottom - pxTop);

               if (typeof OffscreenCanvas !== 'undefined') {
                   return canvas.convertToBlob({ type: 'image/png' });
               } else {
                   return new Promise(res => canvas.toBlob(res, 'image/png'));
               }
           })
           .then(blob => blob.arrayBuffer())
           .then(data => resolve({ data }))
           .catch(reject);
      });
    });
  } catch(err) {
    // Protocol already added or other error
  }
};
addGHybridProtocol();

function ViewerContainer({ children }) {
  const { egyptBound } = useContext(EssentialsContext);
  const mapRef = useRef();

  const [activeBaseLayer, setActiveBaseLayer] = useState("google"); // "google" or "osm"

  // Create bounding box for MapLibre maxBounds
  // egyptBound = [west, south, east, north]
  const maxBounds = [
    [egyptBound[0], egyptBound[1]], // [west, south]
    [egyptBound[2], egyptBound[3]], // [east, north]
  ];

  const getLocationFromScreenXY = async (e) => {
    // In MapLibre, the click event naturally contains lngLat
    const { lng, lat } = e.lngLat;
    
    // Reverse geocode the click using the existing server function
    const govID = await govOfClick(lat, lng);

    if(govID) {
        window.parent.postMessage(govID, "*");
    }
  };

  // Define base maps
  const mapStyles = {
    google: {
      version: 8,
      sources: {
        "google-satellite": {
          type: "raster",
          tiles: ["https://mt0.google.com/vt/lyrs=s&hl=ar&x={x}&y={y}&z={z}"],
          tileSize: 256,
          attribution: "ATTARY"
        },
        "google-hybrid": {
           type: "raster",
           tiles: ["g-hybrid://mt0.google.com/vt/lyrs=y&hl=ar&x={x}&y={y}&z={z}"],
           tileSize: 256,
           attribution: "ATTARY",
           bounds: egyptBound
        }
      },
      layers: [
         {
           id: "google-satellite-layer",
           type: "raster",
           source: "google-satellite",
           paint: {}
         },
         {
           id: "google-hybrid-layer",
           type: "raster",
           source: "google-hybrid",
           paint: {}
         }
      ]
    },
    osm: {
      version: 8,
      sources: {
        "osm": {
           type: "raster",
           tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
           tileSize: 256,
           attribution: "&copy; OpenStreetMap contributors"
        }
      },
      layers: [
         {
           id: "osm-layer",
           type: "raster",
           source: "osm",
           paint: {}
         }
      ]
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <BaseMapContext.Provider value={{ activeBaseLayer, setActiveBaseLayer }}>
        <Map
          ref={mapRef}
          preserveDrawingBuffer={true}
          style={{ width: "100%", height: "100%" }}
          initialViewState={{
            longitude: 0,
            latitude: 20,
            zoom: 1.5
          }}
          onLoad={(e) => {
            e.target.flyTo({
              center: [30.8025, 26.8206],
              zoom: 5,
              duration: 4000,
              essential: true
            });
          }}
          mapStyle={activeBaseLayer === "google" ? mapStyles.google : mapStyles.osm}
          onClick={getLocationFromScreenXY}
          projection="globe"
          interactiveLayerIds={activeBaseLayer === "google" ? ['google-satellite-layer', 'google-hybrid-layer'] : ['osm-layer']}
          attributionControl={false}
        >
          {children}
        </Map>
      </BaseMapContext.Provider>
    </div>
  );
}

export default ViewerContainer;
