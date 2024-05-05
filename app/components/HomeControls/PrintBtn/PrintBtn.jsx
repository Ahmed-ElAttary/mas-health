import React from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";
const PrintBtn = () => {
  const viewerCs = useCesium();
  return (
    <Button
      icon="pi pi-print"
      onClick={() => {
        viewerCs.viewer.render();
        var link = document.createElement("a");
        link.href = viewerCs.viewer.canvas.toDataURL();
        link.download = "map_print.png";
        link.click();
      }}
    />
  );
};

export default PrintBtn;
