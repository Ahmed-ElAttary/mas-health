"use client";
import Controls from "../components/HomeControls/Controls.jsx";
import Markers from "../components/Markers/Markers.jsx";
import ViewerContainer from "../components/ViewerContainer.component.jsx";

export default function Home() {
  return (
    <ViewerContainer>
      <Markers />
      <Controls />
    </ViewerContainer>
  );
}
