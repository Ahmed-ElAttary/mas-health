import { useContext, useEffect } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { DataContext } from "@app/home/DataProvider";
const GeojsonComp = () => {
  const { colors } = useContext(DataContext);

  const coloring = (layer) => {
    const entities = layer.entities.values;
    entities.forEach((entity) => {
      const color = entity.properties.color._value;
      entity.polygon.outlineColor = Color.fromCssColorString(colors[color][0]);
      entity.polygon.material = Color.fromCssColorString(
        colors[color][0]
      ).withAlpha(0.4);
    });
  };

  return (
    <GeoJsonDataSource
      data="./shapefile.geojson"
      clampToGround
      onLoad={(layer) => coloring(layer)}
      stroke={Color.RED}
      strokeWidth={10}
      fill={Color.RED.withAlpha(0.5)}
    />
  );
};

export default GeojsonComp;
