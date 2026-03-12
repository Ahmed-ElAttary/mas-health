"use client";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { useMap } from "react-map-gl/maplibre";
import html2canvas from "html2canvas";

import { EssentialsContext } from "@app/home_maplibre/EssentialsProvider";

const PrintBtn = () => {
  const { reference } = useContext(EssentialsContext);
  const { current: map } = useMap();
  
  return (
    <Button
      icon="pi pi-print"
      onClick={() => {
        if (!map) {
          alert("Map instance not found.");
          return;
        }
        try {
          // Use html2canvas to capture both the WebGL map and HTML markers overlaying it
          map.once("render", () => {
              const mapContainer = map.getContainer();
              html2canvas(mapContainer, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
              }).then(canvas => {
                  var link = document.createElement("a");
                  link.href = canvas.toDataURL("image/png");
                  link.download = "map_print.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
              }).catch(e => {
                  console.error("html2canvas error:", e);
                  alert("html2canvas Error: " + e.message);
              });
          });
          map.triggerRepaint();
        } catch(e) {
          alert("Print Error: " + e.message);
        }
      }}
    />
  );
};

export default PrintBtn;
