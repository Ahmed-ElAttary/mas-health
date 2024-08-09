"use client";
import { createContext, useEffect, useRef, useState } from "react";

export const EssentialsContext = createContext();
const egyptBound = [24.7, 22.0, 33.5, 32];
const wqiCalc = (val) => {
  if (val == 0) return "سيئة";
  if (val > 0 && val < 44) return "سيئة";
  if (val >= 44 && val < 64) return "ضعيفة";
  if (val >= 64 && val < 79) return "مقبولة";
  if (val >= 79 && val < 94) return "جيدة";
  if (val >= 94 && val <= 100) return "ممتازة";
  return "";
};
const colors = {
  سيئة: ["rgb(240, 0, 0)", "rgb(255, 163, 163)"],
  ضعيفة: ["rgb(208, 121, 22)", "rgb(255, 174, 61)"],
  مقبولة: ["rgb(255, 235, 10)", "rgb(255, 243, 168)"],
  جيدة: ["rgb(0, 200, 250)", "rgb(148, 228, 255)"],
  ممتازة: ["rgb(0, 214, 43)", "rgb(150, 255, 148)"],
};
const statusIcons = {
  2: { name: "تعمل", image: "green-static.png" },
  3: { name: "لا تعمل", image: "red-static.png" },
  1: { name: "تحت الصيانة", image: "yellow-static.png" },
  4: { name: "مستمرة", image: "cycle.png" },
  5: { name: "تم إلغائها", image: "cancel.png" },
};
const icons = {
  1: {
    name: "نقطة رصد دورية (عذبة/غير عذبة)",
    image: "f7406b70-c594-45b3-89ce-1d5173a86eff.png",
    scale: 0.10,
  },
  2: {
    name: "مأخذ محطة تنقية مياه",
    image: "bbbc4622-358e-4e5d-a956-e047be529219.png",
    scale: 0.07,
  },
  3: {
    name: "رصد لحظي مستمر (عذبة/غير عذبة)",
    image: "85d7bcdb-bec6-477a-b0b5-472f43f77dd5.png",
    scale: 0.20,
  },
  4: {
    name: "مواقع الرصد البحثية",
    image: "3b330465-141b-4452-9a26-3a2e175f62cf.png",
    scale: 0.10,
  },
  5: {
    name: "مواقع رصد الأحداث الطارئة",
    image: "e472e82b-5e55-4720-8f07-a720f665c297.png",
    scale: 0.11,
  },
  16: {
    name: "صرف صحي",
    image: "waste-sewer-svgrepo-com.png",
    scale: 0.11,
  },
  17: {
    name: "صرف صناعي",
    image: "industry-svgrepo-com.png",
    scale: 0.11,
  },
};

let mainIcons = {};

const EssentialsProvider = ({ params, children }) => {
  const reference = useRef();
  if (params?.BodiesOfWater == 16) {
    mainIcons[16] = icons[16];
    mainIcons[5] = icons[5];
  } else if (params?.BodiesOfWater == 17) {
    mainIcons[17] = icons[17];
    mainIcons[5] = icons[5];
  } else mainIcons = icons;

  // useEffect(() => {}, []);
  return (
    <EssentialsContext.Provider
      value={{ colors, statusIcons, mainIcons, reference, wqiCalc, egyptBound }}
    >
      {children}
    </EssentialsContext.Provider>
  );
};
export default EssentialsProvider;
