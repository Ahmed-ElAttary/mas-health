"use client";
import Controls from "@app/components_maplibre/HomeControls/Controls.jsx";
import Markers from "@app/components_maplibre/Markers/Markers.jsx";
import ViewerContainer from "@app/components_maplibre/ViewerContainer.component.jsx";

import GeojsonComp from "@app/components_maplibre/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "./DataProvider.jsx";
import EssentialsProvider from "./EssentialsProvider.jsx";
import LoadingSpinner from "@app/components_maplibre/LoadingSpinner/LoadingSpinner.jsx";
import CanalsDrains from "@app/components_maplibre/CanalsDrains/CanalsDrains.jsx";
export default  function Home() {
  return (
    <EssentialsProvider>
      <ViewerContainer>
        <DataProvider>
          <GeojsonComp />
          <LoadingSpinner />
          <Markers />
          <CanalsDrains />
          <Controls />
        </DataProvider>
      </ViewerContainer>
    </EssentialsProvider>
  );
}
