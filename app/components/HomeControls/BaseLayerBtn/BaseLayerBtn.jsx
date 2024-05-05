import React, { useState } from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import {
  Cartesian3,
  Credit,
  OpenStreetMapImageryProvider,
  WebMapTileServiceImageryProvider,
} from "cesium";
const BaseLayerBtn = () => {
  const viewerCs = useCesium();
  const [currentLayer, setCurrentLayer] = useState(false);
  const changeHandler = () => {
    setCurrentLayer((perv) => !perv);
  };
  const layersURL = [
    new OpenStreetMapImageryProvider({
      url: "https://tile.openstreetmap.org/",
    }),
    new WebMapTileServiceImageryProvider({
      url: "https://mt0.google.com/vt/lyrs=y&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
      layer: "GoogleMap",
      format: "image/png",
      style: "default",
      tileMatrixSetID: "GoogleMapsCompatible",
      maximumLevel: 22,
      credit: new Credit("ATTARY"),
    }),
  ];

  return (
    <Button
      icon="pi pi-globe"
      onClick={() => {
        changeHandler();
        var layers = viewerCs.viewer.imageryLayers;
        var baseLayer = layers.get(0);
        layers.remove(baseLayer);
        layers.addImageryProvider(layersURL[Number(currentLayer)]);
      }}
    />
  );
};

export default BaseLayerBtn;
