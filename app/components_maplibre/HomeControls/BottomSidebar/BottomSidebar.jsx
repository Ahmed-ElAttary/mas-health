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
    // console.log(details);
    setDate(details?.LastReadings[0]?.DateTime);
    console.log("last date", details?.LastReadings);
    const reading = details.LastReadings.reduce((acc, curr) => {
      if (curr.low == "NaN") curr.low = "-";
      if (curr.high == "NaN") curr.high = "-";
      if (curr.Unit == "NaN") curr.Unit = "-";
      if (curr.equal == "NaN") curr.equal = "-";
      if (curr.Reading == "NaN") curr.Reading = "-";
      const color = () => {
        switch (curr.type_of_criterion) {
          case 0:
            if (curr.Reading >= curr.low && curr.Reading <= curr.high)
              return "success";
            else return "danger";
          case 1:
            if (curr.Reading >= curr.low) return "success";
            else return "danger";

          case 2:
            if (curr.Reading <= curr.high) return "success";
            else return "danger";

          case 3:
            if (curr.Reading == curr.equal) return "success";
            else return "danger";

          case 4:
            if (curr.Reading >= curr.low && curr.Reading <= curr.high)
              return "success";
            else return "danger";

          case 5:
            if (curr.Reading <= curr.high) return "success";
            else return "danger";

          case 6:
            if (curr.Reading >= curr.low) return "success";
            else return "danger";
          default:
            return "info";
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

  // const neglectTimeZone = (dateString) => {
  //   const parts = dateString.split(/[-T:Z]/);
  //   const date = new Date(
  //     parts[0],
  //     parts[1] - 1,
  //     parts[2],
  //     parts[3],
  //     parts[4],
  //     parts[5]
  //   );

  // };
  return (
    <Sidebar
      visible={bottomBarVis}
      onHide={() => setBottomBarVis(false)}
      position="bottom"
      // className="h-full" test
      content={() => (
        <Fieldset
          dir="rtl"
          legend={
            <>{` تاريخ أخر قراءة : ${new Date(date).toLocaleDateString(
              "ar-EG",
              {
                weekday: "long", // Show the day of the week
                year: "numeric", // Show the year
                month: "long", // Show the full month name
                day: "numeric", // Show the day of the month
                hour: "numeric", // Show hours
                minute: "numeric", // Show minutes
                // second: "numeric", // Show seconds
                hour12: true, // Use 24-hour time
                timeZone: "UTC", // Time zone to use for formatting
              }
            )}`}</>
          }
        >
          <div className="card" style={{ width: "97vw" }}>
            <DataTable
              showGridlines
              value={lastReading}
              scrollable
              tableStyle={{ minWidth: "50rem", fontSize: "small" }}
              size="small"
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
          </div>
        </Fieldset>
      )}
    ></Sidebar>
  );
};

export default BottomSidebar;
