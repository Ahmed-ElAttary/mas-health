"use client";
import { useContext } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { Context } from "./Provider";
import { EssentialsContext } from "@app/home/EssentialsProvider";

const Govs = () => {
  const { lookups } = useContext(Context);
  const { colors, statusIcons, mainIcons, wqiCalc } =
    useContext(EssentialsContext);
  console.log(lookups);
  const viewerCs = useCesium();

  const coloring = (layer) => {
    layer.entities.values.forEach((entity) => {
      const id = entity.properties.id._value;
      const gov = lookups.Governorate?.find((el) => el.id == id);
      console.log(gov);
      if (gov?.hasOwnProperty("WQI"))
        if (Array.isArray(colors[wqiCalc(gov.WQI)])) {
          entity.polygon.material = Color.fromCssColorString(
            colors[wqiCalc(gov.WQI)][0]
          ).withAlpha(0.7);
          entity.polygon.outline = false;
        } else {
          entity.polygon.material = Color.RED.withAlpha(0);
          entity.polygon.outline = false;
        }
      //   entity.polygon.outline = true;
      //   entity.polygon.outlineColor = Color.BLUE.withAlpha(1);
    });
  };

  return (
    <GeoJsonDataSource
      data="/simplified.json"
      // clampToGround
      onLoad={(layer) => coloring(layer)}
      stroke={Color.RED}
      strokeWidth={1}
      fill={Color.RED.withAlpha(0.5)}
    />
  );
};

export default Govs;
