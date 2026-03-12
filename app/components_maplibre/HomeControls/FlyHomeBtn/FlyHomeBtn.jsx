import React from "react";
import { Button } from "primereact/button";
import { useMap } from "react-map-gl/maplibre";

const FlyHomeBtn = () => {
  const { current: map } = useMap();
  
  return (
    <Button
      icon="pi pi-home"
      onClick={() => {
          if (map) {
              map.flyTo({
                  center: [30.2, 28], // longitude, latitude
                  zoom: 5,            // Approximate country-level zoom
                  duration: 3000      // 3 seconds
              });
          }
      }}
    />
  );
};

export default FlyHomeBtn;
