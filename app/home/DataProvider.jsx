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
    const multiPropsFilter = (data, filters) => {
      const filterKeys = Object.keys(filters);
      return data.filter((el) => {
        return filterKeys.every((key) => {
          if (!filters[key]?.length) return true;
          if (Array.isArray(el[key])) {
            return el[key].some((keyEle) => filters[key].includes(keyEle));
          }
          return filters[key].includes(el[key]);
        });
      });
    };

    setFilteredData(multiPropsFilter(allData, searchParams));
  };
  return (
    <DataContext.Provider value={{ filteredData, applyFilter }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
