"use client";
import Controls from "./Controls/Controls.jsx";
import Markers from "./Markers/Markers.jsx";

import ViewerContainer from "@app/components/ViewerContainer.component.jsx";

import DataProvider from "./DataProvider.jsx";
import EssentialsProvider from "../home/EssentialsProvider.jsx";

export default function Average() {
  return (
    <EssentialsProvider>
      <ViewerContainer>
        <DataProvider>
          <Markers />
          <Controls />
        </DataProvider>
      </ViewerContainer>
    </EssentialsProvider>
  );
}
