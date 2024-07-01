"use client";
import Controls from "@app/components/HomeControls/Controls.jsx";
import Markers from "@app/components/Markers/Markers.jsx";
import ViewerContainer from "@app/components/ViewerContainer.component.jsx";

import GeojsonComp from "@app/components/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "@app/home/DataProvider.jsx";
import EssentialsProvider from "@app/home/EssentialsProvider.jsx";
import LoadingSpinner from "@app/components/LoadingSpinner/LoadingSpinner.jsx";
export default async function Report() {
  return (
    <EssentialsProvider>
      <ViewerContainer>
        <DataProvider>
        <GeojsonComp useWQI />

        </DataProvider>
      </ViewerContainer>
    </EssentialsProvider>
  );
}
