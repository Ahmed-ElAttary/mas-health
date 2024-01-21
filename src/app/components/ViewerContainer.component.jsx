"use client";

window.CESIUM_BASE_URL = "/cesium/build/CesiumUnminified";
import "cesium/Build/Cesium/Widgets/widgets.css";
import React, { useState, useEffect, Children, useRef } from "react";
import {  Viewer, CameraFlyTo, useCesium, } from "resium";
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
import Marker from "./Marker.component";
import Controls from "./Controls.component";


Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmI4NDZkNS05YjE1LTRmNGMtOWIxZC1kYWM2NjkyNzQxYzUiLCJpZCI6MTM2MTc3LCJpYXQiOjE2ODI4Mzk1MzZ9.iEG0SY_0StIfWUg57qVwbPe5NHlD48ZMf3AGqC_nVdI";
function ViewerContainer({

}) {


  const handleMapClick = async (click) => {
  //   const viewer = viewerRef.current.cesiumElement;
  //   const cartesian = viewer.camera.pickEllipsoid(click.position);
  //   const cartographic = Cartographic.fromCartesian(cartesian);
  //   const latitude = Math.toDegrees(cartographic.latitude);
  //   const longitude = Math.toDegrees(cartographic.longitude);

  //   placeTroopFunc(latitude, longitude);
  };

  return (
    <Viewer
    
      shouldAnimate={true}
      onClick={handleMapClick}
      homeButton={false}
      sceneModePicker={false}
      geocoder={false}
      timeline={false}
      navigationHelpButton={false}
      animation={false}
      baseLayerPicker={false}
      fullscreenButton={false}
    
      selectionIndicator={false}
      // infoBox={false}
      // terrainProvider={createWorldTerrain({
      //   requestWaterMask: true,
      //   requestVertexNormals: true,
      // })}
      creditContainer={document.createElement("div")}
      imageryProvider={
        new WebMapTileServiceImageryProvider({
          url: "http://mt0.google.com/vt/lyrs=s&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
          layer: "OpenStreetMap",
          format: "image/png",
          style: "default",
          tileMatrixSetID: "GoogleMapsCompatible",
          maximumLevel: 19,
          credit: new Credit("ATTARY"),
        })
      }
      extend={viewerDragDropMixin}
      full
    >
      <CameraFlyTo
        duration={0}
        destination={Cartesian3.fromDegrees(30.2,28,2000000)}
      />
    {/* <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        background: "rgba(42, 42, 42, 0.8)",
        color: "#edffff",
        width: "20vw",
        height:"100vh",
        padding: "10px",
        border: "1px solid black",
        zIndex: "9999",
      }}
    >
      <h1>points</h1>
      </div> */}

      

<Controls/>
<Marker color="bad" lon={31} lat={30} idd={1} popupContent='محطة 1'/>
<Marker color="good" lon={31} lat={26} idd={2} 
popupContent='2 محطة'

/>
    </Viewer>
  );
}

export default ViewerContainer;
