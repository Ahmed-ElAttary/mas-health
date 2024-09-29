import { DataContext } from "@app/home/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import {
  GeoJsonDataSource,
  Polyline,
  PolylineCollection,
  useCesium,
} from "resium";
import { parse } from "wkt";
import proj4 from "proj4";
import { BoundingSphere, Cartesian3, Color, Material, Rectangle } from "cesium";
import * as turf from "@turf/turf";
const Nile = ({ params }) => {
  const { searchParams, nile } = useContext(DataContext);
  const [geojson, setGeojson] = useState(null);

  const viewerCs = useCesium();

  proj4.defs(
    "EPSG:32636",
    "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs +type=crs"
  );

  useEffect(() => {
    // setGeojson(null);
    (async () => {
      const res = await nile();

      if (res?.data[0]?.WKT) {
        const parsed = parse(res?.data[0]?.WKT);
        console.log("nile", parsed);
        turf.coordEach(parsed, (coord) => {
          const projectedCoord = proj4("EPSG:32636", "EPSG:4326", coord);
          coord[0] = projectedCoord[0];
          coord[1] = projectedCoord[1];
        });

        // console.log(viewerCs);
        setGeojson(parsed);
      } else {
        setGeojson(null);
      }
    })();
  }, []);

  const coloring = (layer) => {
    layer.entities.values.forEach((entity) => {
      entity.polygon.material = Color.CYAN.withAlpha(1);
      entity.polygon.outline = true;
      entity.polygon.outlineColor = Color.CYAN.withAlpha(1);
    });
  };
  return params?.BodiesOfWater == 7 ? (
    <GeoJsonDataSource data={geojson} onLoad={(layer) => coloring(layer)} />
  ) : null;
};

export default Nile;
