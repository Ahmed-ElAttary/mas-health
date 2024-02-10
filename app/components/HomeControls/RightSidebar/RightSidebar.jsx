import React, { useEffect, useRef, useState, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import ComboBox from "./ComboBox";
import "./RightSidebar.css";

import { DataContext } from "@app/home/DataProvider.jsx";

export const fields = {
  geha: "الجهة",
  gov: "المحافظة",
  city: "المدينة",
  village: "القرية",
  water_type: "نوعية المياه",
  water_bodies: "المسطحات المائية",
  point_type: "نوع النقطة",

  status: "الحالة",
  legal: "المطابقة",
};
const RightSidebar = () => {
  const { applyFilter } = useContext(DataContext);
  const [sideBarVis, setSideBarVis] = useState(false);
  const searchParams = useRef({});

  return (
    <>
      <Sidebar
        visible={sideBarVis}
        onHide={() => setSideBarVis(false)}
        position="right"
        dir="rtl"
      >
        <div className="card flex flex-column gap-5 mt-4 justify-content-center">
          {Object.entries(fields).map((field, index) => (
            <ComboBox
              key={index}
              id={field[0]}
              label={field[1]}
              searchParams={searchParams}
            />
          ))}

          <Button
            icon="pi pi-search"
            label="بحث"
            iconPos="right"
            onClick={() => applyFilter(searchParams.current)}
          />
        </div>
      </Sidebar>
      <Button icon="pi pi-search" onClick={() => setSideBarVis(true)} />
    </>
  );
};

export default RightSidebar;
