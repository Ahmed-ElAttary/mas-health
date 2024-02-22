"use client";

import Controls from "../components/HomeControls/Controls.jsx";
import Markers from "../components/Markers/Markers.jsx";
import ViewerContainer from "../components/ViewerContainer.component.jsx";

import GeojsonComp from "../components/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "./DataProvider.jsx";

export default function Home() {


  return (
    <DataProvider>
      <ViewerContainer>
 
        <GeojsonComp/>
        <Markers />

        <Controls />
      </ViewerContainer>
    </DataProvider>
  );
}
