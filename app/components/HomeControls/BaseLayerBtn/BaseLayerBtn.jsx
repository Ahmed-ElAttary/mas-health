import React, { useState } from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import {
  Cartesian3,
  Credit,
  OpenStreetMapImageryProvider,
  Rectangle,
  WebMapTileServiceImageryProvider,
} from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";
const BaseLayerBtn = () => {
  const { egyptBound } = useContext(EssentialsContext);
  const viewerCs = useCesium();
  const [currentLayer, setCurrentLayer] = useState(false);
  const changeHandler = () => {
    setCurrentLayer((perv) => !perv);
  };
  const clipped = [
    new OpenStreetMapImageryProvider({
      url: "https://tile.openstreetmap.org/",
      rectangle: Rectangle.fromDegrees(...egyptBound),
    }),
    new WebMapTileServiceImageryProvider({
      url: "https://mt0.google.com/vt/lyrs=y&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
      layer: "GoogleMap",
      format: "image/png",
      style: "default",
      tileMatrixSetID: "GoogleMapsCompatible",
      maximumLevel: 22,
      credit: new Credit("ATTARY"),
      rectangle: Rectangle.fromDegrees(...egyptBound),
    }),
  ];

  const base = [
    new OpenStreetMapImageryProvider({
      url: "https://tile.openstreetmap.org/",
    }),
    new WebMapTileServiceImageryProvider({
      url: "https://mt0.google.com/vt/lyrs=s&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
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

        layers.removeAll();
        layers.addImageryProvider(base[Number(currentLayer)]);
        layers.addImageryProvider(clipped[Number(currentLayer)]);
      }}
    />
  );
};

export default BaseLayerBtn;
