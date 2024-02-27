"use client";
import axios from "axios";
import { Cartesian3, Rectangle } from "cesium";
import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";
import { useCesium } from "resium";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  // const [allData, setAllData] = useState([]);
  const viewerCs = useCesium();
  const allData = useRef();
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lookups = useRef([]);
  const [token, setToken] = useState();
  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (token) {
      getData();
      getLookups();
    }
  }, [token]);

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
  const auth = async () => {
    try {
      const { data } = await axios.get("./api/token/");
      setToken(data.access);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const { data: res } = await axios.post("./api/location-handle", {
        token,
      });
      // const StationsNames = res.data.map(({ name }) => {
      //   return { name, id: name };
      // });
      // lookups.current = { ...lookups.current, StationsNames };
      allData.current = res.data;
      setFilteredData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getLookups = async () => {
    try {
      const { data: res } = await axios.post("./api/handle-all-essentials", {
        token,
      });

      lookups.current = { ...lookups.current, ...res.data };
    } catch (err) {
      console.log(err);
    }
  };

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
    const dataFiltered = multiDimensionalFilter(allData.current, searchParams);
    setFilteredData(dataFiltered);
  };
  const resetFilter = () => {
    setFilteredData(allData.current);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
