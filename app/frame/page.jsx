"use client";
import React, { useEffect, useState } from "react";

const Frame = () => {
  const [val, setVal] = useState("");
  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log(e.data);
      if (typeof e.data == "number") {
        setVal(e.data);
      }
    });
  }, []);
  return (
    <div>
      fdgfg
      {val}
      <iframe src="/home" width="100%" height="800px"></iframe>
    </div>
  );
};

export default Frame;
