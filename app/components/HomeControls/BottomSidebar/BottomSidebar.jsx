"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Fieldset } from "primereact/fieldset";
export let openBottom;
const BottomSidebar = () => {
  const [bottomBarVis, setBottomBarVis] = useState(false);
  const [lastReading, setLastReading] = useState([]);
  const [date, setDate] = useState();
  openBottom = (details) => {
    setBottomBarVis(true);
    console.log(details);
    setDate(details?.LastReadings[0]?.DateTime);
    const reading = details.LastReadings.reduce((acc, curr) => {
      const color = () => {
        switch (curr.type_of_criterion) {
          case 0:
            if (curr.Reading >= curr.low && curr.Reading <= curr.high)
              return "success";
            else "danger";
            break;
          case 1:
            if (curr.Reading >= curr.low) return "success";
            else "danger";
            break;
          case 2:
            if (curr.Reading <= curr.high) return "success";
            else "danger";
            break;
          case 3:
            if (curr.Reading == curr.equal) return "success";
            else "danger";
            break;
          case 4:
            if (curr.Reading >= curr.low && curr.Reading <= curr.high)
              return "success";
            else "danger";
            break;
          case 5:
            if (curr.Reading <= curr.high) return "success";
            else "danger";
            break;
          case 6:
            if (curr.Reading >= curr.low) return "success";
            else "danger";
          default:
            "info";
            break;
        }
      };
      acc[curr.PointerName] = (
        <Tag
          dir="rtl"
          severity={color()}
          value={`${curr.Reading} ${curr.Unit}`}
        />
      );
      return acc;
    }, {});
    const criterion = details.LastReadings.reduce((acc, curr) => {
      switch (curr.type_of_criterion) {
        case 0:
          acc[
            curr.PointerName
          ] = `الحد الأدني المسموح به  (${curr.low}  / ${curr.Unit})  / الحد الأقصي المسموح به  (${curr.high}/ ${curr.Unit})`;
          break;
        case 1:
          acc[
            curr.PointerName
          ] = `الحد الأدني المسموح به  (${curr.low}  / ${curr.Unit})`;
          break;
        case 2:
          acc[
            curr.PointerName
          ] = `الحد الأقصي المسموح به  (${curr.high}  / ${curr.Unit})`;
          break;
        case 3:
          acc[
            curr.PointerName
          ] = `يجب ان يبقي   (${curr.equal}  / ${curr.Unit})`;
          break;
        case 4:
          acc[
            curr.PointerName
          ] = `الحد الأدني المسموح به  (${curr.low}  / ${curr.Unit})  / الحد الأقصي المسموح به  (${curr.high}/ ${curr.Unit})`;
          break;
        case 5:
          acc[
            curr.PointerName
          ] = ` لا تزيد عن (${curr.high}/ ${curr.Unit}) عن المجري المائي المستقبل`;
          break;
        case 6:
          acc[
            curr.PointerName
          ] = ` لا تقل عن (${curr.low}/ ${curr.Unit}) عن المجري المائي المستقبل`;
          break;
        default:
          acc[curr.PointerName] = "لايوجد معيار";
          break;
      }

      return acc;
    }, {});

    setLastReading([criterion, reading]);
  };
  return (
    <>
      <Sidebar
        visible={bottomBarVis}
        onHide={() => setBottomBarVis(false)}
        position="bottom"
        className="h-full md:h-15rem lg:h-25rem"
      >
        <Fieldset
          dir="rtl"
          legend={
            <>{` تاريخ أخر قراءة : ${new Date(date).toLocaleDateString()}`}</>
          }
        >
          <DataTable
            showGridlines
            value={lastReading}
            tableStyle={{ minWidth: "50rem" }}
          >
            {lastReading.length &&
              Object.keys(lastReading[0]).map((el, index) => (
                <Column
                  align="center"
                  key={index}
                  field={el}
                  header={el}
                ></Column>
              ))}
          </DataTable>
        </Fieldset>
      </Sidebar>
    </>
  );
};

export default BottomSidebar;
