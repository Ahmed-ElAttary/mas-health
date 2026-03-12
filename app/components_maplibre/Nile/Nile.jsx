import { DataContext } from "@app/home_maplibre/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import { Source, Layer, useMap } from "react-map-gl/maplibre";
import { parse } from "wkt";
import proj4 from "proj4";
import * as turf from "@turf/turf";

proj4.defs(
  "EPSG:32636",
  "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs +type=crs"
);

const Nile = ({ params }) => {
  const { searchParams, nile } = useContext(DataContext);
  const [geojson, setGeojson] = useState(null);
  const { current: map } = useMap();

  useEffect(() => {
    (async () => {
      const res = await nile();

      if (res?.data[0]?.WKT) {
        const parsedGeometry = parse(res?.data[0]?.WKT);
        // console.log("nile", parsedGeometry);
        
        turf.coordEach(parsedGeometry, (coord) => {
          const projectedCoord = proj4("EPSG:32636", "EPSG:4326", coord);
          coord[0] = projectedCoord[0];
          coord[1] = projectedCoord[1];
        });

        const feature = turf.feature(parsedGeometry);
        setGeojson(feature);

        if (map && params?.BodiesOfWater == 7) {
            const bbox = turf.bbox(feature);
            map.fitBounds([
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]]
            ], { padding: 50, duration: 3000 });
        }
      } else {
        setGeojson(null);
      }
    })();
  }, [map, params?.BodiesOfWater]);

  if (params?.BodiesOfWater != 7 || !geojson) return null;

  return (
    <Source id="nile-source" type="geojson" data={geojson}>
        <Layer 
            id="nile-fill-layer"
            type="fill"
            paint={{
                'fill-color': '#00FFFF', // CYAN
                'fill-opacity': 1,
                'fill-outline-color': '#00FFFF'
            }}
        />
        <Layer 
            id="nile-line-layer"
            type="line"
            paint={{
                'line-color': '#00FFFF', // CYAN
                'line-width': 4
            }}
        />
        <Layer 
            id="nile-arrows"
            type="symbol"
            layout={{
                'symbol-placement': 'line',
                'symbol-spacing': 50,
                'text-field': '▶',
                'text-size': 16,
                'text-keep-upright': false
            }}
            paint={{
                'text-color': '#000000',
                'text-halo-color': '#00FFFF',
                'text-halo-width': 1
            }}
        />
    </Source>
  );
};

export default Nile;
