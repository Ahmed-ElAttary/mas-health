"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import React, { useState, useEffect, Children, useRef } from "react";
import { Viewer, CameraFlyTo, Provider, Globe, Scene } from "resium";
import {
  WebMapTileServiceImageryProvider,
  createWorldTerrain,
  createWorldTerrainAsync,
  Credit,
  Cartesian3,
  Color,
  Ion,
  viewerCesiumInspectorMixin,
  viewerDragDropMixin,
  Cartographic,
  Math,
  defined,
  Cesium3DTileset,
  Light,
} from "cesium";
import Markers from "./Markers/Markers";
import Controls from "./HomeControls/Controls";
if (typeof window !== "undefined")
  window.CESIUM_BASE_URL = "/cesium/Build/CesiumUnminified";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmI4NDZkNS05YjE1LTRmNGMtOWIxZC1kYWM2NjkyNzQxYzUiLCJpZCI6MTM2MTc3LCJpYXQiOjE2ODI4Mzk1MzZ9.iEG0SY_0StIfWUg57qVwbPe5NHlD48ZMf3AGqC_nVdI";

const popups = {};

function ViewerContainer({ children }) {
  return (
    <Viewer
      shouldAnimate={true}
      homeButton={false}
      sceneModePicker={false}
      geocoder={false}
      timeline={false}
      navigationHelpButton={false}
      animation={false}
      baseLayerPicker={false}
      fullscreenButton={false}
      selectionIndicator={false}
      infoBox={false}
      /*   terrainProvider={createWorldTerrain({
   requestWaterMask: true,
          requestVertexNormals: true,

        })}
*/
      creditContainer={
        typeof document !== "undefined" ? document.createElement("div") : null
      }
      imageryProvider={
        new WebMapTileServiceImageryProvider({
          url: "https://mt0.google.com/vt/lyrs=s&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
          layer: "OpenStreetMap",
          format: "image/png",
          style: "default",
          tileMatrixSetID: "GoogleMapsCompatible",
          maximumLevel: 22,
          credit: new Credit("ATTARY"),
        })
      }
      extend={viewerDragDropMixin}
      full
      style={{ overflow: "hidden" }}
    >
      <Scene>
        <Globe>
          {/* <CameraFlyTo
            duration={0}
            destination={Cartesian3.fromDegrees(30.2, 28, 2000000)}
          /> */}
          {children}
        </Globe>
      </Scene>
    </Viewer>
  );
}

export default ViewerContainer;
