import axios, { all } from "axios";
import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";

export const DataContext = createContext();
const colors = {
  bad: ["rgb(240, 0, 0)", "rgb(255, 163, 163)"],
  weak: ["rgb(208, 121, 22)", "rgb(255, 174, 61)"],
  passed: ["rgb(255, 235, 10)", "rgb(255, 243, 168)"],
  good: ["rgb(0, 200, 250)", "rgb(148, 228, 255)"],
  excellent: ["rgb(0, 214, 43)", "rgb(150, 255, 148)"],
};
const DataProvider = ({ children }) => {
  // const [allData, setAllData] = useState([]);
  const allData = useRef();
  const [filteredData, setFilteredData] = useState([]);
  const lookups = useRef();
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
      const StationsNames = res.data.map(({ name }) => {
        return { name, id: name };
      });
      lookups.current = { ...lookups.current, StationsNames };
      allData.current = res.data;
      setFilteredData(res.data);
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
  const applyFilter = (searchParams) => {
    const multiDimensionalFilter = (data, filters) => {
      const filterKeys = Object.keys(filters);
      return data.filter((el) => {
        return filterKeys.every((key) => {
          if (!filters[key]) return true;
          if (Array.isArray(el[key])) {
            return el[key].code.some((keyEle) =>
              filters[key].code.includes(keyEle)
            );
          }

          return filters[key].code.includes(el[key]);
        });
      });
    };
    setFilteredData(multiDimensionalFilter(allData.current, searchParams));
  };
  const resetFilter = () => {
    setFilteredData(allData.current);
  };

  return (
    <DataContext.Provider
      value={{ filteredData, applyFilter, resetFilter, lookups, colors }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
