import React, { useContext } from "react";

import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { ScrollPanel } from "primereact/scrollpanel";
import { EssentialsContext } from "@app/home/EssentialsProvider";
const avatar = (color) =>
  `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="${color}"/></svg>`
  )}`;
const Legend = () => {
  const { statusIcons, mainIcons } = useContext(EssentialsContext);
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
                <Chip key={key} label={val.name} image={val.image} />
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
