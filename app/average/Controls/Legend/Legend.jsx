import React, { useContext, useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { ScrollPanel } from "primereact/scrollpanel";
import { EssentialsContext } from "@app/home/EssentialsProvider";

import { DataContext } from "../../DataProvider";
import Image from "next/image";
import { Tree } from "primereact/tree";
import styles from "./Legend.module.css";
const avatar = (color) =>
  `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="${color}"/></svg>`
  )}`;
const LegendItem = ({ image, label }) => {
  return (
    <div className={styles.item}>
      <span>
        <Image width="30" height="30" alt={label} src={`/${image}`} />
      </span>
      <span>{label}</span>
    </div>
  );
};
const Legend = () => {
  const { statusIcons, mainIcons } = useContext(EssentialsContext);
  const {
    selectedLocations,
    setSelectedLocations,
    labelChecked,
    setLabelChecked,
    averageReadingChecked,
    setAverageReadingChecked,
  } = useContext(DataContext);

  const [locations, setLocations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    setLocations(
      Object.entries(mainIcons).map(([key, val]) => ({
        key: key,
        label: <LegendItem image={val.image} label={val.name}></LegendItem>,
      }))
    );
    setStatuses(
      Object.entries(statusIcons).map(([key, val]) => ({
        key: key,
        label: <LegendItem image={val.image} label={val.name}></LegendItem>,
      }))
    );
  }, []);

  return (
    <Inplace closable>
      <InplaceDisplay>
        <Button icon="pi pi-map" />
      </InplaceDisplay>
      <InplaceContent>
        <Fieldset
          legend={
            <div className="flex align-items-center text-primary">
              <span className="pi pi-map mr-2"></span>
              <span className="font-bold text-lg">Legend</span>
            </div>
          }
        >
          <ScrollPanel style={{ height: "510px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0px" }}
            >
              <div className="flex align-items-center">
                <Checkbox
                  name="label-check"
                  onChange={() => setLabelChecked(!labelChecked)}
                  checked={labelChecked}
                />
                <label htmlFor="label-check" className="ml-2">
                  إظهار اسم الموقع
                </label>
              </div>
              <div className="flex align-items-center">
                <Checkbox
                  name="label-check"
                  onChange={() =>
                    setAverageReadingChecked(!averageReadingChecked)
                  }
                  checked={averageReadingChecked}
                />
                <label htmlFor="label-check" className="ml-2">
                  إظهار متوسط القراءات
                </label>
              </div>
              <Divider type="solid">المواقع</Divider>
              <Tree
                value={locations}
                // selectionMode="checkbox"
                selectionKeys={selectedLocations}
                onSelectionChange={(e) => {
                  // console.log(e.value);
                  setSelectedLocations(e.value);
                }}
              />
              {/* {Object.entries(mainIcons).map(([key, val]) => (
                <div key={key}>
                  <Chip
                    label={val.name}
                    image={`/${val.image}`}

                  ></Chip>
                  <Checkbox
                    style={{}}
                    onChange={(e) => checkHandler(key, e.checked)}
                    checked={checked[key]}
                  ></Checkbox>
                </div>
              ))} */}
              <Divider type="solid">الحالة</Divider>
              <Tree value={statuses} />
              {/* {Object.entries(statusIcons).map(([key, val]) => (
                <Chip key={key} label={val.name} image={`/${val.image}`} />
              ))} */}
            </div>
          </ScrollPanel>
        </Fieldset>
      </InplaceContent>
    </Inplace>
  );
};

export default Legend;

{
  /* <Divider type="solid" >المطابقة</Divider>
    <Chip label="مطابق" image="right.png" />
    <Chip label="غير مطابق" image="wrong.png" /> */
}
{
  /* <Divider type="solid">WQI</Divider>
              <Chip label="سيئة" image={avatar("#f00000")} />
              <Chip label="ضعيفة" image={avatar("#d07916")} />
              <Chip label="مقبولة" image={avatar("#ffeb0a")} />
              <Chip label="جيدة" image={avatar("#00c8fa")} />
              <Chip label="ممتازة" image={avatar("#00d62b")} /> */
}

// template={() => (
//   <div
//     style={{
//       display: "flex",

//       // width: "-webkit-fill-available",
//     }}
//   >
//     <img style={{}} src={val.image}></img>
//     <div style={{}}>{val.name}</div>
//     <Checkbox
//       style={{}}
//       onChange={(e) => checkHandler(key, e.checked)}
//       checked={checked[key]}
//     ></Checkbox>
//   </div>
// )}
