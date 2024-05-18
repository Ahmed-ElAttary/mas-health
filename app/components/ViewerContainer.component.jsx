"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import React, {
  useState,
  useEffect,
  Children,
  useRef,
  useContext,
} from "react";
import {
  Viewer,
  CameraFlyTo,
  Provider,
  Globe,
  Scene,
  useCesium,
  ImageryLayer,
} from "resium";
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
  Cartesian2,
  ClippingPlaneCollection,
  ClippingPlane,
  Rectangle,
  GeoJsonDataSource,
} from "cesium";
import Markers from "./Markers/Markers";
import Controls from "./HomeControls/Controls";
import { EssentialsContext } from "@app/home/EssentialsProvider";
import { govOfClick } from "@app/home/server";
if (typeof window !== "undefined")
  window.CESIUM_BASE_URL = "/cesium/Build/CesiumUnminified";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmI4NDZkNS05YjE1LTRmNGMtOWIxZC1kYWM2NjkyNzQxYzUiLCJpZCI6MTM2MTc3LCJpYXQiOjE2ODI4Mzk1MzZ9.iEG0SY_0StIfWUg57qVwbPe5NHlD48ZMf3AGqC_nVdI";

function ViewerContainer({ children }) {
  const viewerRef = useRef();
  const image = useRef();
  const radiansToDegrees = (radians) => {
    const pi = Math.PI;
    return radians * (180 / pi);
  };
  const getLocationFromScreenXY = async (e) => {
    const { x, y } = e.position;
    const scene = viewerRef.current?.cesiumElement?.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(
      new Cartesian2(x, y),
      ellipsoid
    );
    if (!cartesian) return;
    const { latitude, longitude } =
      ellipsoid.cartesianToCartographic(cartesian);
    const govID = await govOfClick(
      radiansToDegrees(latitude),
      radiansToDegrees(longitude)
    );

    window.parent.postMessage(govID, "*");
  };

  return (
    <div>
      <Viewer
        ref={viewerRef}
        onClick={getLocationFromScreenXY}
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
            // url: "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer",
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
          <ImageryLayer
            ref={image}
            imageryProvider={
              new WebMapTileServiceImageryProvider({
                // url: "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer",
                url: "https://mt0.google.com/vt/lyrs=y&hl=ar&x={TileCol}&y={TileRow}&z={TileMatrix}",
                rectangle: Rectangle.fromDegrees(
                  24.7066669999999995,
                  22.0,
                  33.5,
                  31.6762034861141828
                ),

                layer: "OpenStreetMap",
                format: "image/png",
                style: "default",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 22,
                credit: new Credit("ATTARY"),
              })
            }
          ></ImageryLayer>
          <Globe baseColor={Color.BLACK}>{children}</Globe>
        </Scene>
      </Viewer>
    </div>
  );
}

export default ViewerContainer;
