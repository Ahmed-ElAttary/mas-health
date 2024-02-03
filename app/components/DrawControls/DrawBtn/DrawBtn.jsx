import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";
import Drawer from "@cesium-extends/drawer";
const DrawBtn = () => {
  const viewerCs = useCesium();
  const att = () => {
    let drawer = new Drawer(viewerCs, {
      tips: {
        init: "点击绘制",
        start: "左键添加点，右键移除点，双击结束绘制",
      },
    });
  };

  return (
    <Button
      icon="pi pi-pencil"
      onClick={() => {
        att();
      }}
    />
  );
};

export default DrawBtn;
