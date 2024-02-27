import { useContext } from "react";
import { GeoJsonDataSource, useCesium } from "resium";
import { Color } from "cesium";
import { EssentialsContext } from "@app/home/EssentialsProvider";
const GeojsonComp = () => {
  const { colors } = useContext(EssentialsContext);

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
