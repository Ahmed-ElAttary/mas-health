"use client";

import { Cartesian3, Rectangle } from "cesium";

import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";
import { useCesium } from "resium";

export const DataContext = createContext();
import { getData, getLookups, detailsLink } from "./server";

const DataProvider = ({ children }) => {
  const [checked, setChecked] = useState({ 5: true });
  const checkHandler = (key, value) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const lookups = useRef([]);

  const intial = async () => {
    try {
      const data = (await getData()) || [];

      allData.current = data;
      setFilteredData(data.filter((el) => el.legendType == "5"));

      const lookupsReq = (await getLookups()) || [];
      lookups.current = { ...lookups.current, ...lookupsReq };
      console.log(lookups.current);
      data && lookupsReq && setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const detailsRedirect = async (id) => {
    window.open(await detailsLink(id), "_blank");
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
    if (
      isFinite(north) &&
      isFinite(east) &&
      isFinite(south) &&
      isFinite(west)
    ) {
      viewerCs.camera.flyTo({
        duration: 3,
        destination:
          filteredData.length == 1
            ? Cartesian3.fromDegrees(
                (east + west) / 2,
                (south + north) / 2,
                1000
              )
            : Rectangle.fromDegrees(west, south, east, north),
      });
    }
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
        detailsRedirect,
        searchParams,
        checked,
        checkHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
