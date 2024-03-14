"use client";
import { useContext } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";
import { DataContext } from "@app/home/DataProvider.jsx";
const GeojsonComp = () => {
  const { colors } = useContext(EssentialsContext);
  const { searchParams } = useContext(DataContext);
  const coloring = (layer) => {
    const entities = layer.entities.values;
    entities.forEach((entity) => {
      const color = entity.properties.color._value;
      const id = entity.properties.id._value;

      if (searchParams.current.governorate_id?.code) {
        if (searchParams.current.governorate_id?.code == id) {
          entity.polygon.material = Color.fromCssColorString(
            colors[color][0]
          ).withAlpha(0.4);
        } else {
          entity.polygon.material = Color.fromCssColorString(
            colors[color][0]
          ).withAlpha(0);
        }
      } else {
        entity.polygon.material = Color.fromCssColorString(
          colors[color][0]
        ).withAlpha(0.4);
      }
    });
  };

  return (
    <GeoJsonDataSource
      data="./shapefile.geojson"
      clampToGround
      onLoad={(layer) => coloring(layer)}
      on
      stroke={Color.RED}
      strokeWidth={10}
      fill={Color.RED.withAlpha(0.5)}
    />
  );
};

export default GeojsonComp;
