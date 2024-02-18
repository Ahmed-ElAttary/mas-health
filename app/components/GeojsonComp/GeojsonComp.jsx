import { useContext, useEffect } from "react";
import { useCesium } from "resium";
import {
  ClassificationType,
  Color,
  ConstantProperty,
  GeoJsonDataSource,
  HeightReference,
} from "cesium";
import { DataContext } from "@app/home/DataProvider";
const GeojsonComp = () => {
  const viewerCs = useCesium();

  const { colors } = useContext(DataContext);

  useEffect(() => {
    (async () => {
      const data = await GeoJsonDataSource.load("/shapefile.geojson");

      viewerCs.viewer.dataSources.add(data);

      const entities = data.entities.values;
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const color = entity.properties.color._value;
        entity.polygon.outlineColor = Color.fromCssColorString(
          colors[color][0]
        );
        entity.polygon.material = Color.fromCssColorString(
          colors[color][0]
        ).withAlpha(0.3);

        // entity.polygon.outline = true;

        // viewerCs.viewer.flyTo(data);
        entity.polygon.heightReference = HeightReference.RELATIVE_TO_GROUND;
        // entity.polygon.extrudedHeight=1000*entity.properties._Shape_Area._value
      }
    })();
  }, []);
  return <div></div>;
};

export default GeojsonComp;
