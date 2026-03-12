import React from "react";
import { Button } from "primereact/button";
import { useMap } from "react-map-gl/maplibre";

const ZoomBtn = () => {
  const { current: map } = useMap();

  return (
    <>
      <Button
        icon="pi pi-plus"
        onClick={() => {
          if (map) map.zoomIn();
        }}
      />
      <Button
        icon="pi pi-minus"
        onClick={() => {
          if (map) map.zoomOut();
        }}
      />
    </>
  );
};

export default ZoomBtn;
