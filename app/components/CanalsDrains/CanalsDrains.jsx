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
const CanalsDrains = () => {
  const { searchParams, canalsDrains } = useContext(DataContext);
  const [geojson, setGeojson] = useState(null);

  const viewerCs = useCesium();

  proj4.defs(
    "EPSG:32636",
    "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs +type=crs"
  );

  useEffect(() => {

    // setGeojson(null);
    (async () => {
      const res = await canalsDrains(
        searchParams.current?.secondary_water_body_type_id?.code
      );
      if (res?.data?.WKT) {
        const parsed = parse(res?.data?.WKT);
        turf.coordEach(parsed, (coord) => {
          const projectedCoord = proj4("EPSG:32636", "EPSG:4326", coord);
          coord[0] = projectedCoord[0];
          coord[1] = projectedCoord[1];
        });

        // console.log(viewerCs);
        setGeojson(parsed);

        const bbox = turf.bbox(parsed);
        var positions = [
          Cartesian3.fromDegrees(bbox[0], bbox[1]),
          Cartesian3.fromDegrees(bbox[2], bbox[3]),
        ];
        var boundingSphere = BoundingSphere.fromPoints(positions);
        viewerCs.viewer.camera.flyToBoundingSphere(boundingSphere, {
          duration: 3,
        });
      } else {
        setGeojson(null);
      }
    })();
  }, [searchParams.current?.secondary_water_body_type_id?.code]);

  return (
    // <GeoJsonDataSource
    //   data={geojson}
    //   //   onLoad={(layer) => {
    //   //     layer.entities.values[0].polyline.material = Color.RED;

    //   //     viewerCs.viewer.flyTo(layer.entities.values[0]);
    //   //   }}
    //   //   onLoad={() => console.log("loaded")}
    //   //   stroke={Color.RED}

    //   strokeWidth={10}
    // ></GeoJsonDataSource>
    <PolylineCollection>
      {geojson &&
        turf.cleanCoords(geojson)?.coordinates[0]?.map((el, index) => {
          let positions;

          const coords = turf.cleanCoords(geojson)?.coordinates[0];
          //   console.log(el, index, coords);
          if (index == 0) {
            return null;
          } else if (index > 0) {
            positions = [...coords[index - 1], ...el];
            // console.log(positions);
            // console.log("index", index);

            return (
              <Polyline
                key={index}
                positions={Cartesian3.fromDegreesArray(positions)}
                width={30}
                material={
                  new Material({
                    fabric: {
                      type: "PolylineArrow",
                      uniforms: {
                        color: Color.CYAN,
                      },
                    },
                  })
                }
              />
            );
          }
        })}
    </PolylineCollection>
  );
};

export default CanalsDrains;
