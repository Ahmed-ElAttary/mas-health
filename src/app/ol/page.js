"use client";
import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
import "ol/ol.css";
import "./Map.styles.css";

import Map from "ol/Map.js";

import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ";

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
      ],
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <div ref={mapRef} id="map"></div>
    </>
  );
}

export default MapComponent;
