"use client";
import React from "react";
import Marker from "./Marker";

import { useContext } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";

const Markers = () => {
  const { filteredData } = useContext(DataContext);

  return (
    <>
      {filteredData.map((data) => {
        return <Marker data={data} key={data.id} />;
      })}
    </>
  );
};

export default Markers;
