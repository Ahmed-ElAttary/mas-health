"use client";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";

import { EssentialsContext } from "@app/home/EssentialsProvider";

const PrintBtn = () => {
  const { reference } = useContext(EssentialsContext);
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
