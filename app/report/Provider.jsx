"use client";

import { Cartesian3, Rectangle } from "cesium";

import React, { useRef, useState } from "react";
import { createContext, useEffect } from "react";
import { useCesium } from "resium";

export const Context = createContext();
import { getLookups } from "@app/home/server";

const Provider = ({ params, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lookups, setLookups] = useState([]);

  const intial = async () => {
    try {
      const lookupsReq = (await getLookups()) || [];

      setLookups(lookupsReq);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    intial();
  }, []);

  return (
    <Context.Provider
      value={{
        lookups,
        isLoading,

        params,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
