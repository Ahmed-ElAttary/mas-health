import React, { useContext } from "react";
import { Button } from "primereact/button";
import { BaseMapContext } from "../../ViewerContainer.component";

const BaseLayerBtn = () => {
  const context = useContext(BaseMapContext);
  const setActiveBaseLayer = context?.setActiveBaseLayer;

  const changeHandler = () => {
    if (setActiveBaseLayer) {
        setActiveBaseLayer(prev => prev === "google" ? "osm" : "google");
    }
  };

  return (
    <Button
      icon="pi pi-globe"
      onClick={changeHandler}
    />
  );
};

export default BaseLayerBtn;
