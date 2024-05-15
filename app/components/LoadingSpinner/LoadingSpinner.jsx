"use client";
import React, { useContext } from "react";
import { DataContext } from "@app/home/DataProvider.jsx";
import { ProgressSpinner } from "primereact/progressspinner";
import { BlockUI } from "primereact/blockui";
const LoadingSpinner = () => {
  const { isLoading } = useContext(DataContext);

  return (
    <>
      {/* <BlockUI blocked={isLoading} fullScreen /> */}
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
      ;
    </>
  );
};
export default LoadingSpinner;
