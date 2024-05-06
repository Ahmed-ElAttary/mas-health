"use client";
import React from "react";
import ReactDOM from "react-dom";
import MyDocument from "./MyDocument";
import { PDFViewer } from "@react-pdf/renderer";

const ToPrint = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);
export default ToPrint;
