import React from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3, Cartographic } from "cesium";
const ZoomBtn = () => {
  const viewerCs = useCesium();
  const amount = () => {
    const height = Cartographic.fromCartesian(
      viewerCs.camera.positionWC
    ).height;
    return Math.min(50000, height * 0.5);
  };
  return (
    <>
      <Button
        icon="pi pi-plus"
        onClick={() => {
          viewerCs.camera.zoomIn(amount());
        }}
      />
      <Button
        icon="pi pi-minus"
        onClick={() => {
          viewerCs.camera.zoomOut(amount());
        }}
      />
    </>
  );
};

export default ZoomBtn;
