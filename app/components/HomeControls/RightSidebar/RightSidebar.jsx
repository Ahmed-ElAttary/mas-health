import React, { useEffect, useRef, useState, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import ComboBox from "./ComboBox";
import "./RightSidebar.css";

import { DataContext } from "@app/home/DataProvider.jsx";
import { ScrollPanel } from "primereact/scrollpanel";
import { Card } from "primereact/card";

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
  const { applyFilter,resetFilter } = useContext(DataContext);
  const [sideBarVis, setSideBarVis] = useState(false);
  const searchParams = useRef({});
  const [reload,setReload]=useState(0);

  return (
    <>

      <Sidebar
        visible={sideBarVis}
        onHide={() => setSideBarVis(false)}
        position="right"
        dir="rtl"
      
      >
          <Card >
            
        <div className="card flex flex-column gap-5  justify-content-center">
          {Object.entries(fields).map((field, index) => (
            <ComboBox
            key={index}
            id={field[0]}
            label={field[1]}
            searchParams={searchParams}
            reload={reload}
            />
          ))}
<div className="card flex  gap-6  justify-content-center">

          <Button
            icon="pi pi-search"
            label="بحث"
            iconPos="right"
            severity="success"
            onClick={() => applyFilter(searchParams.current)}
            />
                   <Button
            icon="pi pi-times"
            label="إلغاء"
            severity="danger"
            iconPos="right"
            onClick={() =>{searchParams.current={}; setReload(reload+1); resetFilter();}}
            />
            </div>
        </div>
         
            </Card>
      </Sidebar>
      <Button icon="pi pi-search" onClick={() => setSideBarVis(true)} />
     
    </>
  );
};

export default RightSidebar;
