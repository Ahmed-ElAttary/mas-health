import React from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";
const FlyHomeBtn = () => {
  const viewerCs = useCesium();
  return (
    <Button
      icon="pi pi-home"
      onClick={() => {
          viewerCs.camera.flyTo({
          duration:3,
            destination:Cartesian3.fromDegrees(30.2,28,2000000)
        })

      
      }}
    />
  );
};

export default FlyHomeBtn;
