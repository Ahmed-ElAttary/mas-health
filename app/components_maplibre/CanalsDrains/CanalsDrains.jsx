import { DataContext } from "@app/home/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import { Source, Layer, useMap } from "react-map-gl/maplibre";
import { parse } from "wkt";
import proj4 from "proj4";
import * as turf from "@turf/turf";

// Define the CRS from the original code
proj4.defs(
    "EPSG:32636",
    "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs +type=crs"
);

const CanalsDrains = () => {
  const { searchParams, canalsDrains } = useContext(DataContext);
  const [geojson, setGeojson] = useState(null);
  const { current: map } = useMap();

  useEffect(() => {
    (async () => {
      const res = await canalsDrains(
        searchParams.current?.secondary_water_body_type_id?.code
      );
      if (res?.data?.WKT) {
        // Parse the Well-Known Text into a GeoJSON geometry
        const parsedGeometry = parse(res?.data?.WKT);
        
        // Reproject coordinates from UTM Zone 36N to WGS84
        turf.coordEach(parsedGeometry, (coord) => {
          const projectedCoord = proj4("EPSG:32636", "EPSG:4326", coord);
          coord[0] = projectedCoord[0];
          coord[1] = projectedCoord[1];
        });

        // Convert the geometry to a full Feature for MapLibre
        const feature = turf.feature(parsedGeometry);
        setGeojson(feature);

        // Calculate bounding box and fly to it
        if(map) {
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
  }, [searchParams.current?.secondary_water_body_type_id?.code, map]);

  if (!geojson) return null;

  return (
    <Source id="canals-drains-source" type="geojson" data={geojson}>
        <Layer 
            id="canals-drains-layer"
            type="line"
            paint={{
                'line-color': '#00FFFF', // CYAN
                'line-width': 8           // Width adjusted for 2D map viewing
            }}
        />
        <Layer 
            id="canals-drains-arrows"
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

export default CanalsDrains;
