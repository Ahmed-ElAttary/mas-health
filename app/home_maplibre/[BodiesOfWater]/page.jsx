"use client";
import Controls from "@app/components_maplibre/HomeControls/Controls.jsx";
import Markers from "@app/components_maplibre/Markers/Markers.jsx";
import Nile from "@app/components_maplibre/Nile/Nile.jsx";
import ViewerContainer from "@app/components_maplibre/ViewerContainer.component.jsx";

import GeojsonComp from "@app/components_maplibre/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "../DataProvider.jsx";
import EssentialsProvider from "../EssentialsProvider.jsx";
import LoadingSpinner from "@app/components_maplibre/LoadingSpinner/LoadingSpinner.jsx";
import CanalsDrains from "@app/components_maplibre/CanalsDrains/CanalsDrains.jsx";
export default  function BodiesOfWater({ params }) {
  console.log(params);
  return (
    <EssentialsProvider params={params}>
      <ViewerContainer>
        <DataProvider params={params}>
          <Nile params={params} />
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
