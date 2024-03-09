import Controls from "../components/HomeControls/Controls.jsx";
import Markers from "../components/Markers/Markers.jsx";
import ViewerContainer from "../components/ViewerContainer.component.jsx";

import GeojsonComp from "../components/GeojsonComp/GeojsonComp.jsx";
import DataProvider from "./DataProvider.jsx";
import EssentialsProvider from "./EssentialsProvider.jsx";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
export default async function Home() {

  return (
    <EssentialsProvider>
      <ViewerContainer>
        <GeojsonComp />
        <DataProvider>
          <LoadingSpinner />
          <Markers />

          <Controls />
        </DataProvider>
      </ViewerContainer>
    </EssentialsProvider>
  );
}
