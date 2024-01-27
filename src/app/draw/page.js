"use client";
import { GeoJsonDataSource, useCesium } from "resium";
import Controls from "../components/DrawControls/Controls.jsx";

import ViewerContainer from "../components/ViewerContainer.component.jsx";

import { Color, EntityCluster } from "cesium";
import * as data from "./data.json";


export default function Home() {

  return (
    <ViewerContainer>
      <GeoJsonDataSource
        data={data}
        sourceUri=""
        markerColor={Color.RED}
        clustering={
          new EntityCluster({
            enabled: true,
            minimumClusterSize: 2,
            pixelRange: 100,
          })
        }
        // onLoad={(g) => {
        //   // You can process the data source here
        //   g.entities.values[0].name = "Coors Field!";
        //   onLoadAction(g);
        // }}
        // onError={action("onError")}
      />
      <Controls />
    </ViewerContainer>
  );
}
