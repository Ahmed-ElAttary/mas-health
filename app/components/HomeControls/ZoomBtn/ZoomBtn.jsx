import React from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";
const ZoomBtn = () => {
  const viewerCs = useCesium();
  return (
    <>
      <Button
        icon="pi pi-plus"
        onClick={() => {
          viewerCs.camera.zoomIn();
        }}
      />
      <Button
        icon="pi pi-minus"
        onClick={() => {
          viewerCs.camera.zoomOut();
        }}
      />
    </>
  );
};

export default ZoomBtn;
