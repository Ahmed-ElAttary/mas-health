"use client";
import React from "react";
import Marker from "./Marker";

import { useContext } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";

const Markers = () => {
  const { filteredData } = useContext(DataContext);

  return (
    <>
      {filteredData.map((data, index) => {
        return <Marker data={data} key={index} />;
      })}
    </>
  );
};

export default Markers;
