"use client";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import * as download from "downloadjs";
import { EssentialsContext } from "@app/home/EssentialsProvider";
const generatePDF = async () => {
  // Capture the map container as an image
  const mapContainer = document.getElementById("attary");

  const imgData = await domtoimage.toPng(mapContainer);
  console.log("Captured image data:", imgData); // Log captured image data
  const pdf = new jsPDF();

  // Add the captured image to the PDF
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

  // Save or download the PDF
  pdf.save("map.pdf");
};
const PrintBtn = () => {
  const { reference } = useContext(EssentialsContext);
  const viewerCs = useCesium();
  return (
    <Button
      icon="pi pi-print"
      onClick={() => {
        // viewerCs.viewer.render();
        // var link = document.createElement("a");
        // link.href = viewerCs.viewer.canvas.toDataURL();
        // link.download = "map_print.png";
        // link.click();
        // generatePDF();
        console.log(reference.current);
        toPng(reference.current, { cacheBust: true }).then(function (dataUrl) {
          download(dataUrl, "my-node.png");
        });
      }}
    />
  );
};

export default PrintBtn;
