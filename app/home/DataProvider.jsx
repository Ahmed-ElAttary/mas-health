"use client";

import { Cartesian3, Rectangle } from "cesium";

import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";
import { useCesium } from "resium";

export const DataContext = createContext();
import { getData, getLookups, detailsById } from "./server";

const DataProvider = ({ params, children }) => {
  const [checked, setChecked] = useState({ 5: true });
  const checkHandler = (key, value) => {
    // console.log(key, value);
    setChecked((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  };
  const ApplyCheckHandler = () => {
    searchParams.current.legendType = {
      code: Object.keys(checked).filter((key) => checked[key] === true),
    };
    applyFilter(searchParams.current);
  };
  useEffect(ApplyCheckHandler, [checked]);
  const viewerCs = useCesium();
  const allData = useRef();

  const searchParams = useRef({});

  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lookups = useRef([]);

  const intial = async () => {
    try {
      const data = (await getData(params)) || [];

      allData.current = data;

      setFilteredData(data.filter((el) => el.legendType == "5"));
      // console.log(allData.current);
      const lookupsReq =  [];
      //(await getLookups()) ||
      lookups.current = { ...lookups.current, ...lookupsReq };
      // console.log(lookups.current);
      data && lookupsReq && setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const popupDetails = async (id, api) => {
    const details = await detailsById(id, api);
    // console.log(details);
    return details;
  };
  useEffect(() => {
    intial();
  }, []);

  useEffect(() => {
    const latitudes = filteredData.map((el) => el.latitude);
    const longitudes = filteredData.map((el) => el.longitude);
    const north = Math.max(...latitudes);
    const east = Math.max(...longitudes);
    const south = Math.min(...latitudes);
    const west = Math.min(...longitudes);

    const dist = () => {
      if (filteredData.length == 0)
        return Cartesian3.fromDegrees(30.2, 28, 2000000);

      if (
        isFinite(north) &&
        isFinite(east) &&
        isFinite(south) &&
        isFinite(west)
      ) {
        if (filteredData.length == 1)
          return Cartesian3.fromDegrees(
            (east + west) / 2,
            (south + north) / 2,
            1000
          );
        else return Rectangle.fromDegrees(west, south, east, north);
      }
    };

    viewerCs.camera.flyTo({
      duration: 3,
      destination: dist(),
    });
  }, [filteredData]);

  const multiDimensionalFilter = (data, filters) => {
    const filterKeys = Object.keys(filters);
    return data.filter((el) => {
      return filterKeys.every((key) => {
        if (!filters[key]) return true;
        if (Array.isArray(el[key])) {
          return el[key].code?.some((keyEle) =>
            filters[key].code?.includes(keyEle)
          );
        }
        return filters[key].code?.includes(el[key]);
      });
    });
  };

  const applyFilter = (searchParams) => {
    if (allData.current) {
      const dataFiltered = multiDimensionalFilter(
        allData.current,
        searchParams
      );
      setFilteredData(dataFiltered);
    }
  };
  const resetFilter = () => {
    setFilteredData(allData.current);
    ApplyCheckHandler();
  };

  return (
    <DataContext.Provider
      value={{
        filteredData,
        applyFilter,
        resetFilter,
        lookups,
        isLoading,
        multiDimensionalFilter,
        popupDetails,
        searchParams,
        checked,
        checkHandler,
        params,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
