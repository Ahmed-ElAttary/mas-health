import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BillboardCollection,
  Billboard,
  useCesium,
  Polyline,
  PolylineCollection,
  Entity,
  Primitive,
  Label,
  LabelCollection,
  CustomDataSource,
} from "resium";

import {
  Transforms,
  Cartesian3,
  Cartesian2,
  PolylineOutlineMaterialProperty,
  Color,
  Material,
  PolylineArrowMaterialProperty,
  HorizontalOrigin,
  VerticalOrigin,
  EntityCluster,
  BillboardGraphics,
} from "cesium";
// import { openBottom } from "../HomeControls/BottomSidebar/BottomSidebar";
import PopupComponent from "../Popup.component";
import Popup from "@cesium-extends/popup";

import { Button } from "primereact/button";
import { EssentialsContext } from "@app/home/EssentialsProvider";

import { DataContext } from "../DataProvider.jsx";

// const legalIcons = { مطابق: "right.png", "غير مطابق": "wrong.png" };

const popups = {};

const Marker = ({ data }) => {
  const {
    longitude,
    latitude,
    color = "excellent",
    id,
    state_of_place_id,
    // legal,
    name,
    location_type_id,
    legendType,
    json__EmergencyEventsTrackLocation,
    api,
  } = data;
  const searchParams = useSearchParams();
  console.log(searchParams.getAll("idsOfPointers"));
  const eLocations =
    json__EmergencyEventsTrackLocation?.map((el) => [el.lng, el.lat]) || [];
  // console.log(eLocations);
  const viewerCs = useCesium();
  const [randColor, setRandColor] = useState(Color.fromRandom({ alpha: 1 }));
  const [details, setDetails] = useState({});
  const { colors, statusIcons, mainIcons, wqiCalc } =
    useContext(EssentialsContext);
  const { popupDetails, labelChecked, averageReadingChecked } =
    useContext(DataContext);
  // useEffect(()=>{

  //  const tooltip=new Tooltip(viewerCs.viewer, {

  //    offset: [30,30],
  //    content: "Hello, World!",
  //  });
  // tooltip.show();
  // },[])
  const popupID = "popup" + id;
  const closePopup = () => {
    popups[popupID]?.switchElementShow(false);
    popups[popupID]?.destroy();
    popups[popupID] = undefined;
  };

  const closeAllPopups = (popupID) => {
    Object.entries(popups).forEach((el) => {
      el[1]?.switchElementShow(false);
      el[1]?.destroy();
      delete popups[el[0]];
    });
  };


  // if (legendType == "5") {
  //   if (json__EmergencyEventsTrackLocation?.length) {
  //     console.log();
  //   }
  // }

 const tableData = Object.entries(data).map((el) => ({
    key: el[0],
    value: el[1],
  }));
  const createCanvasTable = (data) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const font = "bold 12px Arial";
    context.font = font;
    // Padding around each cell text

    // Calculate dynamic column widths with padding
    const columnWidths = data.map((item) => {
      const keyWidth = context.measureText(item.key).width;
      const valueWidth = context.measureText(item.value).width;
      return Math.max(keyWidth, valueWidth); // Add padding to both sides
    });

    // Calculate row height based on font size
    const rowHeight = 16;

    // Set canvas dimensions based on calculated widths and heights
    const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);

    // Draw header row (keys)
    const start = totalWidth + 30;
    let xPosition = start; // Start from the left edge
    canvas.width = totalWidth + start;
    canvas.height = rowHeight * 2;
    data.forEach((item, index) => {
      const columnWidth = columnWidths[index];

      // Draw cell background for the header
      context.fillStyle = "#333";
      context.fillRect(xPosition, 0, columnWidth, rowHeight);

      // Draw the key text in the header cell
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(item.key, xPosition + columnWidth / 2, rowHeight / 2);

      xPosition += columnWidth; // Move to the next column position
    });

    // Draw value row
    xPosition = start; // Reset xPosition to start from the left edge for the value row
    data.forEach((item, index) => {
      const columnWidth = columnWidths[index];

      // Draw cell background for the value row
      context.fillStyle = "#666";
      context.fillRect(xPosition, rowHeight, columnWidth, rowHeight);

      // Draw the value text in the value cell
      context.fillStyle = "yellow";
      context.fillText(
        item.value,
        xPosition + columnWidth / 2,
        rowHeight + rowHeight / 2
      );

      xPosition += columnWidth; // Move to the next column position
    });

    return canvas.toDataURL();
  };
  const wqi = () => {
    const num = Number(details["WQI"]?.toFixed(2));
    return isNaN(num) ? "غير معرف" : num;
  };

  const createCanvasWithText = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const font = "bold 20px Arial"; // Ensure this font supports Arabic
    context.font = font;

    // Set canvas size dynamically based on text length and font size
    const textMetrics = context.measureText(text);
    canvas.width = textMetrics.width + 20;
    // canvas.width = textMetrics.width + 150; // Add some padding
    canvas.height = 60;
    // canvas.height = 20; // Adjust based on font size// Re-draw text on the canvas with updated size
    context.font = font;
    context.fillStyle = "#00000080";

    context.fillRect(10, 0, textMetrics.width, 22);
    context.fillStyle = "yellow";
    context.fillText(text, 10, 18.5);
    // context.strokeStyle = "black";
    // context.strokeText(text, 10, 20);

    return canvas.toDataURL();
  };
  // const svg = `<svg height="1024" width="1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64.00 64.00" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:${colors[color][0]};} .st1{opacity:0.2;} .st2{fill:${colors[color][1]};} .st3{fill:${colors[color][1]};} </style> <g id="Layer_1"> <g> <circle class="st0" cx="32" cy="32" r="32"></circle> </g> <g class="st1"> <g> <path class="st2" d="M52.9,28.1c-0.3-1-1.1-1.6-2.1-1.8l-11.3-1.6l-5.1-10.3c-0.4-0.9-1.4-1.5-2.4-1.5s-1.9,0.6-2.4,1.5 l-5.1,10.3l-11.3,1.6c-1,0.1-1.8,0.8-2.1,1.8c-0.3,1-0.1,2,0.7,2.7l8.2,8L18.1,50c-0.2,1,0.2,2,1,2.6c0.5,0.3,1,0.5,1.5,0.5 c0.4,0,0.8-0.1,1.2-0.3L32,47.5l10.1,5.3c0.4,0.2,0.8,0.3,1.2,0.3c0.5,0,1.1-0.2,1.5-0.5c0.8-0.6,1.2-1.6,1-2.6L44,38.7l8.2-8 C52.9,30.1,53.2,29,52.9,28.1z"></path> </g> </g> <g> <g> <path class="st3" d="M52.9,26.1c-0.3-1-1.1-1.6-2.1-1.8l-11.3-1.6l-5.1-10.3c-0.4-0.9-1.4-1.5-2.4-1.5s-1.9,0.6-2.4,1.5 l-5.1,10.3l-11.3,1.6c-1,0.1-1.8,0.8-2.1,1.8c-0.3,1-0.1,2,0.7,2.7l8.2,8L18.1,48c-0.2,1,0.2,2,1,2.6c0.5,0.3,1,0.5,1.5,0.5 c0.4,0,0.8-0.1,1.2-0.3L32,45.5l10.1,5.3c0.4,0.2,0.8,0.3,1.2,0.3c0.5,0,1.1-0.2,1.5-0.5c0.8-0.6,1.2-1.6,1-2.6L44,36.7l8.2-8 C52.9,28.1,53.2,27,52.9,26.1z"></path> </g> </g> </g> <g id="Layer_2"> </g> </g></svg>`;
  const content = (
    <>
      {legendType == "5" && json__EmergencyEventsTrackLocation?.length && (
        <>
          {/* <Entity
            position={Cartesian3.fromDegrees(+longitude, +latitude, 0)}
            polyline={{
              positions: Cartesian3.fromDegreesArray([
                +longitude,
                +latitude,
                ...json__EmergencyEventsTrackLocation
                  ?.map((el) => [el.lng, el.lat])
                  .flat(),
                // + longitude + 10,
                // +latitude + 10,
              ]),
   

              // material: new PolylineOutlineMaterialProperty({
              //   color: randColor,
              //   outlineColor: Color.BLACK,
              // }),
              width: 5,
            }}
          ></Entity> */}

          {/* <CustomDataSource
            clustering={
              new EntityCluster({
                enabled: true,
                pixelRange: 50,
                minimumClusterSize: 3,
                clusterPoints: true,
                clusterLabels: true,
                clusterBillboards: true,
              })
            }
          > */}
          {json__EmergencyEventsTrackLocation.map((el, index) => (
            <Entity
              key={index}
              position={Cartesian3.fromDegrees(el.lng, el.lat, 0)}
              // onClick={() => showPopup(el.lng, el.lat)}
              billboard={{
                image: "cuw-alert-icon.png",
                scale: 0.04,
                pixelOffset: new Cartesian2(0, 2),
              }}
            ></Entity>

            // <BillboardCollection
            //   key={index}
            //   modelMatrix={Transforms.eastNorthUpToFixedFrame(
            //     Cartesian3.fromDegrees(el.lng, el.lat, 0)
            //   )}
            // >
            //   <Billboard
            //     image="cuw-alert-icon.png"
            //     scale={0.04}
            //     pixelOffset={new Cartesian2(0, 2)}
            //     onClick={() => showPopup(el.lng, el.lat)}
            //   ></Billboard>
            // </BillboardCollection>
          ))}
          {/* </CustomDataSource> */}
          <PolylineCollection>
            {eLocations.length &&
              eLocations?.map((el, index) => {
                // console.log("index", index);
                let positions;
                if (index == 0) {
                  positions = [+longitude, +latitude, ...el];
                } else if (index > 0) {
                  positions = [...eLocations[index - 1], ...el];
                }
                return (
                  <Polyline
                    key={index}
                    positions={Cartesian3.fromDegreesArray(positions)}
                    width={20}
                    material={
                      new Material({
                        fabric: {
                          type: "PolylineArrow",
                          uniforms: {
                            color: randColor,
                          },
                        },
                      })
                    }
                  />
                );
              })}
            {/* <Polyline
              positions={Cartesian3.fromDegreesArray([
                +longitude,
                +latitude,
                ...eLocations.flat(),
              ])}
              width={20}
              material={
                new Material({
                  fabric: {
                    type: "PolylineArrow",
                    uniforms: {
                      color: randColor,
                    },
                  },
                })
              }
            /> */}
          </PolylineCollection>
        </>
      )}

      <BillboardCollection
        modelMatrix={Transforms.eastNorthUpToFixedFrame(
          Cartesian3.fromDegrees(+longitude, +latitude, 0)
        )}
      >
        {/* <Billboard
          image={`/${legalIcons[legal]}`}
          scale={0.12}
          pixelOffset={new Cartesian2(20, -20)}
        ></Billboard> */}

        <Billboard
          image={`/${statusIcons[state_of_place_id]?.image}`}
          scale={0.017 * 0.8}
          pixelOffset={new Cartesian2(-15, 15)}
        ></Billboard>
        {/* --------------------------------------------------------Label---------------------------------------------------------------------- */}
        {averageReadingChecked && (
          <Billboard
            image={createCanvasTable(tableData)}
            scale={1}
            // pixelOffset={new Cartesian2(-15, 15)}
          ></Billboard>
        )}
        {labelChecked && (
          <Billboard
            image={createCanvasWithText(name)}
            scale={1}
            // pixelOffset={new Cartesian2(-15, 15)}
          ></Billboard>
        )}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <Billboard
          // image={`data:image/svg+xml;base64,${btoa(svg)}`}
          image={`/${mainIcons[legendType]?.image}`}
          scale={mainIcons[legendType]?.scale * 0.6}
          // onClick={() => showPopup(longitude, latitude)}
        >

        </Billboard>
      </BillboardCollection>

      {/* <LabelCollection
        modelMatrix={Transforms.eastNorthUpToFixedFrame(
          Cartesian3.fromDegrees(+longitude, +latitude, 0)
        )}
      >
        <Label
          // fillColor={Color.RED}

          showBackground
          position={new Cartesian3(0.0, 0.0, 0.0)}
          font={"99px"}
          // Array.from(name).reverse().join("")
          text={reshape.convertArabic(Array.from(name).reverse().join(""))}
          horizontalOrigin={HorizontalOrigin.CENTER}
          pixelOffset={new Cartesian2(0, -25)}
          // verticalOrigin={VerticalOrigin.BOTTOM}
          // font="Noto Naskh Arabic UI"
          //   horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
          // verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        ></Label>
      </LabelCollection> */}
    </>
  );
  return content;
};

export default Marker;
