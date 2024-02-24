import React, { useState } from "react";
import Marker from "./Marker";

import { useContext } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";
import { ProgressSpinner } from "primereact/progressspinner";

const Markers = () => {
  const { filteredData, isLoading } = useContext(DataContext);

  return (
    <>
      {isLoading && (
        <ProgressSpinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: "200px",
            height: "200px",
          }}
          strokeWidth="5"
        />
      )}
      {filteredData.map((data) => {
        return <Marker data={data} key={data.id} />;
      })}
    </>
  );
};

export default Markers;
