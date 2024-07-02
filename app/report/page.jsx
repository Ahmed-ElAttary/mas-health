"use client";
import ViewerComp from "./ViewerComp";
import Govs from "./Govs";
import EssentialsProvider from "@app/home/EssentialsProvider";
import Provider from "./Provider";
export default async function Report() {
  return (
    <EssentialsProvider>
      <Provider>
        <ViewerComp>
          <Govs></Govs>
        </ViewerComp>
      </Provider>
    </EssentialsProvider>
  );
}
