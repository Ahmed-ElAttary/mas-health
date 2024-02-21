import React, { useContext, useEffect, useRef } from "react";
import {
  Entity,
  BillboardGraphics,
  Label,
  LabelCollection,
  BillboardCollection,
  Billboard,
  EntityDescription,
  useCesium,
} from "resium";
import {
  Transforms,
  Cartesian3,
  Color,
  Viewer,
  NearFarScalar,
  LabelStyle,
  Cartesian2,
  VerticalOrigin,
  HeightReference,
} from "cesium";
import { openBottom } from "../HomeControls/BottomSidebar/BottomSidebar";
import PopupComponent from "../Popup.component";
import Popup from "@cesium-extends/popup";
import { DataContext } from "@app/home/DataProvider";
const statusIcons = {
  تعمل: "green-static.png",
  "لا تعمل": "red-static.png",
  "تحت الصيانة": "yellow-static.png",
};
const legalIcons = { مطابق: "right.png", "غير مطابق": "wrong.png" };

const popups = {};

const Marker = ({ data }) => {
  const { lon, lat, color, id, status, legal, name } = data;
  const viewerCs = useCesium();

  const { colors } = useContext(DataContext);
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

  const showPopup = () => {
    closeAllPopups();
    const element = document.getElementById(popupID);
    if (element) {
      popups[popupID] = new Popup(viewerCs.viewer, {
        position: [lon, lat],
        element,
        offset: [0, -30],
      });
    }
  };

  const svg = `<svg height="1024" width="1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64.00 64.00" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:${colors[color][0]};} .st1{opacity:0.2;} .st2{fill:${colors[color][1]};} .st3{fill:${colors[color][1]};} </style> <g id="Layer_1"> <g> <circle class="st0" cx="32" cy="32" r="32"></circle> </g> <g class="st1"> <g> <path class="st2" d="M52.9,28.1c-0.3-1-1.1-1.6-2.1-1.8l-11.3-1.6l-5.1-10.3c-0.4-0.9-1.4-1.5-2.4-1.5s-1.9,0.6-2.4,1.5 l-5.1,10.3l-11.3,1.6c-1,0.1-1.8,0.8-2.1,1.8c-0.3,1-0.1,2,0.7,2.7l8.2,8L18.1,50c-0.2,1,0.2,2,1,2.6c0.5,0.3,1,0.5,1.5,0.5 c0.4,0,0.8-0.1,1.2-0.3L32,47.5l10.1,5.3c0.4,0.2,0.8,0.3,1.2,0.3c0.5,0,1.1-0.2,1.5-0.5c0.8-0.6,1.2-1.6,1-2.6L44,38.7l8.2-8 C52.9,30.1,53.2,29,52.9,28.1z"></path> </g> </g> <g> <g> <path class="st3" d="M52.9,26.1c-0.3-1-1.1-1.6-2.1-1.8l-11.3-1.6l-5.1-10.3c-0.4-0.9-1.4-1.5-2.4-1.5s-1.9,0.6-2.4,1.5 l-5.1,10.3l-11.3,1.6c-1,0.1-1.8,0.8-2.1,1.8c-0.3,1-0.1,2,0.7,2.7l8.2,8L18.1,48c-0.2,1,0.2,2,1,2.6c0.5,0.3,1,0.5,1.5,0.5 c0.4,0,0.8-0.1,1.2-0.3L32,45.5l10.1,5.3c0.4,0.2,0.8,0.3,1.2,0.3c0.5,0,1.1-0.2,1.5-0.5c0.8-0.6,1.2-1.6,1-2.6L44,36.7l8.2-8 C52.9,28.1,53.2,27,52.9,26.1z"></path> </g> </g> </g> <g id="Layer_2"> </g> </g></svg>`;

  return (
    <>
      <BillboardCollection
        modelMatrix={Transforms.eastNorthUpToFixedFrame(
          Cartesian3.fromDegrees(lon, lat, 0)
        )}
      >
        {/* <Billboard
          image={`/${legalIcons[legal]}`}
          scale={0.12}
          pixelOffset={new Cartesian2(20, -20)}
        ></Billboard> */}
        <Billboard
          image={`/${statusIcons[status]}`}
          scale={0.017}
          pixelOffset={new Cartesian2(-18, 18)}
        ></Billboard>

        <Billboard
          image={`data:image/svg+xml;base64,${btoa(svg)}`}
          scale={0.045}
          onClick={showPopup}
          // scaleByDistance={new NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5)}
          // eyeOffset={ new Cartesian3(0,0,-9999) }
        >
          {
            <PopupComponent id={popupID} closePopup={closePopup}>
              <>
                <div>{name}</div>
                <button onClick={() => openBottom(name)}>عرض أخر قراءة</button>
              </>
            </PopupComponent>
          }
        </Billboard>
      </BillboardCollection>
    </>
  );
};

export default Marker;
