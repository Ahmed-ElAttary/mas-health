"use client";
import Controls from "@app/components/HomeControls/Controls.jsx";
import Markers from "@app/components/Markers/Markers.jsx";
import ViewerContainer from "@app/components/ViewerContainer.component.jsx";

import GeojsonComp from "@app/components/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "../DataProvider.jsx";
import EssentialsProvider from "../EssentialsProvider.jsx";
import LoadingSpinner from "@app/components/LoadingSpinner/LoadingSpinner.jsx";
export default async function BodiesOfWater({ params }) {
  return (
    <EssentialsProvider>
      <ViewerContainer>
        <DataProvider params={params}>
          <GeojsonComp />
          <LoadingSpinner />
          <Markers />

          <Controls />
        </DataProvider>
      </ViewerContainer>
    </EssentialsProvider>
  );
}