"use client";
import axios from "axios";
import { Cartesian3, Rectangle } from "cesium";

import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";
import { useCesium } from "resium";
const HOST = process.env.NEXT_PUBLIC_BASE_URL;
const username = process.env.NEXT_PUBLIC_USERNAME;
const password = process.env.NEXT_PUBLIC_PASSWORD;
export const DataContext = createContext();

const DataProvider = ({ children }) => {
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
      const { data } = await axios.post(`${HOST}/api/token/`, {
        username,
        password,
      });
      setToken(data.access);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const { data: res } = await axios.get(
        `${HOST}/api/location-handle?start=1&length=100000000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      allData.current = res.data;
      setFilteredData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const detailsRedirect = async (id) => {
    const { data } = await axios.get(`${HOST}/api/location-handle?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.open(`${HOST}${data.data.line}`, "_blank");
  };
  const getLookups = async () => {
    try {
      const { data: res } = await axios.get(
        `${HOST}/api/handle-all-essentials`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        detailsRedirect,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
