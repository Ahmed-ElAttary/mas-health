"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import React, { useContext, useRef } from "react";
import { Viewer, Globe, Scene, ImageryLayer, CameraFlyTo } from "resium";
import {
  WebMapTileServiceImageryProvider,
  Credit,
  Color,
  Ion,
  viewerDragDropMixin,
  Rectangle,
  Cartesian3,
} from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";

if (typeof window !== "undefined")
  window.CESIUM_BASE_URL = "/cesium/Build/CesiumUnminified";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmI4NDZkNS05YjE1LTRmNGMtOWIxZC1kYWM2NjkyNzQxYzUiLCJpZCI6MTM2MTc3LCJpYXQiOjE2ODI4Mzk1MzZ9.iEG0SY_0StIfWUg57qVwbPe5NHlD48ZMf3AGqC_nVdI";

function ViewerComp({ children }) {
  const { egyptBound } = useContext(EssentialsContext);
  const centerPosition = Cartesian3.fromDegrees(30, 27, 2050000.0);
  const viewerRef = useRef();
  const image = useRef();

  return (
    <div>
      <Viewer
        ref={viewerRef}
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
                rectangle: Rectangle.fromDegrees(...egyptBound),

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
          <CameraFlyTo
            duration={0} // Duration in seconds
            destination={centerPosition}
          />
        </Scene>
      </Viewer>
    </div>
  );
}

export default ViewerComp;
