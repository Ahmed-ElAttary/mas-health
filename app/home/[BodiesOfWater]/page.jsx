"use client";
import Controls from "@app/components/HomeControls/Controls.jsx";
import Markers from "@app/components/Markers/Markers.jsx";
import Nile from "@app/components/Nile/Nile.jsx";
import ViewerContainer from "@app/components/ViewerContainer.component.jsx";

import GeojsonComp from "@app/components/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "../DataProvider.jsx";
import EssentialsProvider from "../EssentialsProvider.jsx";
import LoadingSpinner from "@app/components/LoadingSpinner/LoadingSpinner.jsx";
import CanalsDrains from "@app/components/CanalsDrains/CanalsDrains.jsx";
export default async function BodiesOfWater({ params }) {
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
