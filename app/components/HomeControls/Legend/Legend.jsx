import React, { useContext, useEffect, useState } from "react";

import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { ScrollPanel } from "primereact/scrollpanel";
import { EssentialsContext } from "@app/home/EssentialsProvider";
import { Checkbox } from "primereact/checkbox";
import { DataContext } from "@app/home/DataProvider";
const avatar = (color) =>
  `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="${color}"/></svg>`
  )}`;
const Legend = () => {
  const { statusIcons, mainIcons } = useContext(EssentialsContext);
  const { checked, checkHandler } = useContext(DataContext);
  // const [checked, setChecked] = useState({ 5: true });

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
          <ScrollPanel style={{ height: "600px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Divider type="solid">المواقع</Divider>
              {Object.entries(mainIcons).map(([key, val]) => (
                <div key={key}>
                  <Chip
                    label={val.name}
                    image={val.image}
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
                  ></Chip>
                  <Checkbox
                    style={{}}
                    onChange={(e) => checkHandler(key, e.checked)}
                    checked={checked[key]}
                  ></Checkbox>
                </div>
              ))}
              <Divider type="solid">الحالة</Divider>
              {Object.entries(statusIcons).map(([key, val]) => (
                <Chip key={key} label={val.name} image={val.image} />
              ))}

              {/* <Divider type="solid" >المطابقة</Divider>
    <Chip label="مطابق" image="right.png" />
    <Chip label="غير مطابق" image="wrong.png" /> */}
              {/* <Divider type="solid">WQI</Divider>
              <Chip label="سيئة" image={avatar("#f00000")} />
              <Chip label="ضعيفة" image={avatar("#d07916")} />
              <Chip label="مقبولة" image={avatar("#ffeb0a")} />
              <Chip label="جيدة" image={avatar("#00c8fa")} />
              <Chip label="ممتازة" image={avatar("#00d62b")} /> */}
            </div>
          </ScrollPanel>
        </Fieldset>
      </InplaceContent>
    </Inplace>
  );
};

export default Legend;
