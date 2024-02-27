"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import ComboBox from "./ComboBox";
import "./RightSidebar.css";

import { DataContext } from "@app/home/DataProvider.jsx";

import { Card } from "primereact/card";
import { Message } from "primereact/message";

export const fields = {
  Entity: { label: "الجهة", filter_id: "entity_id", column: "name" },
  Governorate: {
    label: "المحافظة",
    filter_id: "governorate_id",
    column: "name",
  },
  Centeralization: {
    label: "المدينة",
    filter_id: "centeralization_id",
    column: "name",
    dependancy: "governorate_id",
  },
  City: {
    label: "القرية",
    filter_id: "city_id",
    column: "name",
    dependancy: "centeralization_id",
  },

  // water_type: "نوعية المياه",
  BodiesOfWater: {
    label: "المسطحات المائية",
    filter_id: "bodies_of_water_id",
    column: "name",
  },
  LocationType: {
    label: "نوع الموقع",
    filter_id: "location_type_id",
    column: "name",
  },

  StateOfPlace: {
    label: "الحالة",
    filter_id: "state_of_place_id",
    column: "state",
  },
  StationsNames: {
    label: "اسم الموقع",
    filter_id: "name",
    column: "name",
  },
};
const RightSidebar = () => {
  const {
    applyFilter,
    resetFilter,
    filteredData,
    multiDimensionalFilter,
    lookups,
  } = useContext(DataContext);
  const [sideBarVis, setSideBarVis] = useState(false);
  const searchParams = useRef({});
  const [reload, setReload] = useState(0);
  const reloadHandler = () => {
    const dataFiltered = multiDimensionalFilter(
      filteredData,
      searchParams.current
    );
    const StationsNames = dataFiltered.map(({ name }) => {
      return { name, id: name };
    });

    lookups.current = { ...lookups.current, StationsNames };
    setReload(reload + 1);
  };

  return (
    <>
      <Sidebar
        visible={sideBarVis}
        onHide={() => setSideBarVis(false)}
        position="right"
        dir="rtl"
        style={{ width: "20%", minWidth: "400px" }}
        onShow={reloadHandler}
      >
        <Card>
          <div className="card flex flex-column gap-5  justify-content-center">
            {Object.entries(fields).map((field, index) => (
              <ComboBox
                key={index}
                id={field[0]}
                label={field[1].label}
                filter_id={field[1].filter_id}
                column={field[1].column}
                searchParams={searchParams}
                reload={reload}
                dependancy={field[1].dependancy}
                reloadHandler={reloadHandler}
              />
            ))}

            {!filteredData.length && (
              <Message severity="warn" text="لايوجد نتيجة للبحث" />
            )}
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
                onClick={() => {
                  searchParams.current = {};
                  reloadHandler();
                  resetFilter();
                }}
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
