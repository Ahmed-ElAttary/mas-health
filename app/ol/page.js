"use client";
import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
// import { Button } from "primereact/button";
import "ol/ol.css";
import "./Map.styles.css";
import View from 'ol/View';

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from 'ol/proj';
function MapComponent({}) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
          }),
        }),
      //   new TileLayer({ source: new OSM() })
      ],
      view: new View({
        center: fromLonLat([30.2, 28]),
        zoom: 5.8,
    }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <div ref={mapRef} id="map"  ></div>
    </>
  );
}

export default MapComponent;
