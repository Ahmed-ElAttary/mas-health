"use client";
import { useContext, useEffect, useRef } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";
import { DataContext } from "@app/home/DataProvider.jsx";
const GeojsonComp = ({ useWQI }) => {
  const { colors, egyptBound } = useContext(EssentialsContext);
  const { searchParams, lookups } = useContext(DataContext);
  const viewerCs = useCesium();
  const layerRef = useRef();
  useEffect(() => {
    console.log(lookups, layerRef);
    if (useWQI && layerRef.current && lookups.current) {
      layerRef.current.entities.values.forEach((entity) => {
        console.log("from effect");
        console.log(entity.polygon.material);
        entity.polygon.material = new Color.fromCssColorString("green");
        entity.polygon.outline = true;
        entity.polygon.outlineColor = new Color.fromCssColorString("black");
      });
    }
  }, [lookups.current, layerRef.current]);
  const coloring = (layer) => {
    layerRef.current = layer;
    // console.log(layer);
    viewerCs.viewer.flyTo(layer);
    layerRef.current.entities.values.forEach((entity) => {
      const id = entity.properties.id._value;

      if (searchParams?.current?.governorate_id?.code) {
        if (searchParams?.current?.governorate_id?.code == id) {
          entity.polygon.material = Color.RED.withAlpha(0.2);
          entity.polygon.outline = true;

          entity.polygon.outlineColor = Color.RED.withAlpha(1);

          viewerCs.viewer.flyTo(entity);
        } else {
          // entity.polygon.material = Color.WHITE.withAlpha(0);
          // entity.polygon.outline = true;
          // entity.polygon.outlineColor = Color.RED.withAlpha(0);
        }
      } else {
        // entity.polygon.material = Color.WHITE.withAlpha(0.1);
        // entity.polygon.outline = true;
        // entity.polygon.outlineColor = Color.BLUE.withAlpha(1);
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
