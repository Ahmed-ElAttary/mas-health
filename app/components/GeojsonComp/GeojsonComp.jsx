"use client";
import { useContext } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";
import { DataContext } from "@app/home/DataProvider.jsx";
const GeojsonComp = () => {
  const { colors } = useContext(EssentialsContext);
  const { searchParams } = useContext(DataContext);
  const viewerCs = useCesium();
  const coloring = (layer) => {
    const entities = layer.entities.values;
    entities.forEach((entity) => {
      const id = entity.properties.id._value;

      if (searchParams.current.governorate_id?.code) {
        if (searchParams.current.governorate_id?.code == id) {
          entity.polygon.material = Color.RED.withAlpha(0.2);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Color.RED.withAlpha(1);

          viewerCs.viewer.flyTo(entity);
        } else {
          entity.polygon.material = Color.WHITE.withAlpha(0);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Color.RED.withAlpha(0);
        }
      } else {
        entity.polygon.material = Color.WHITE.withAlpha(0.1);
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Color.BLUE.withAlpha(1);
      }
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

export default GeojsonComp;
