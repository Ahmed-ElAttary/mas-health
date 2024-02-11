import axios, { all } from "axios";
import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("./api/data");
      setAllData(data.default);
      setFilteredData(data.default);
    };
    getData();
  }, []);
  const applyFilter = (searchParams) => {
    const multiDimensionalFilter = (data, filters) => {
      const filterKeys = Object.keys(filters);
      return data.filter((el) => {
        return filterKeys.every((key) => {
          if (!filters[key]) return true;
          if (Array.isArray(el[key])) {
            return el[key].code.some((keyEle) => filters[key].code.includes(keyEle));
          }
          return filters[key].code.includes(el[key]);
        });
      });
    };
    setFilteredData(multiDimensionalFilter(allData, searchParams));

  };
const resetFilter = ()=>{setFilteredData(allData)}


  return (
    <DataContext.Provider value={{ filteredData, applyFilter,resetFilter }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
