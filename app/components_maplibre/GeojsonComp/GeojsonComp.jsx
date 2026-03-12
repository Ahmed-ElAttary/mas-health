"use client";
import React, { useContext, useMemo } from "react";
import { Source, Layer, useMap } from "react-map-gl/maplibre";
import { EssentialsContext } from "@app/home_maplibre/EssentialsProvider";
import { DataContext } from "@app/home_maplibre/DataProvider.jsx";
import * as turf from "@turf/turf";

const GeojsonComp = () => {
  const { colors, egyptBound } = useContext(EssentialsContext);
  const { searchParams, lookups } = useContext(DataContext);
  const { current: map } = useMap();

  const selectedGovCode = searchParams?.current?.governorate_id?.code;

  // React-map-gl paint properties for the fill layer
  const fillPaint = useMemo(() => {
    if (selectedGovCode) {
      return {
        "fill-color": [
          "case",
          ["==", ["to-string", ["get", "id"]], String(selectedGovCode)],
          "rgba(0, 0, 255, 0.4)", // BLUE with 0.4 alpha (selected)
          "rgba(255, 255, 255, 0)" // Transparent otherwise (hide unselected)
        ]
      };
    } else {
      return {
        "fill-color": "rgba(255, 255, 255, 0.2)" // Global default (White fill 0.2 opacity)
      };
    }
  }, [selectedGovCode]);

  // React-map-gl paint properties for the stroke layer
  const strokePaint = useMemo(() => {
    if (selectedGovCode) {
      return {
        "line-color": [
          "case",
          ["==", ["to-string", ["get", "id"]], String(selectedGovCode)],
          "rgba(0, 255, 255, 1)", // Cyan (selected)
          "rgba(0, 0, 255, 0)"  // Transparent (hide unselected)
        ],
        "line-width": 1
      };
    } else {
      return {
        "line-color": "rgba(0, 0, 255, 1)", // Global outline default (Blue)
        "line-width": 1
      };
    }
  }, [selectedGovCode]);

  const [geoData, setGeoData] = React.useState(null);

  React.useEffect(() => {
     fetch("/simplified.json")
       .then((res) => res.json())
       .then((data) => setGeoData(data))
       .catch((err) => console.error("Error loading Egypt boundaries:", err));
  }, []);

  React.useEffect(() => {
    // Zoom to the selected governorate bounding box if the map and feature data are ready
    if (selectedGovCode && map && geoData) {
        const selectedFeature = geoData.features.find(f => String(f.properties.id) === String(selectedGovCode));
        if (selectedFeature) {
            const bbox = turf.bbox(selectedFeature);
            map.fitBounds([
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]]
            ], { padding: 50, duration: 1500 });
        }
    }
  }, [selectedGovCode, map, geoData]);

  if(!geoData) return null;

  return (
    <Source 
        id="egypt-boundaries" 
        type="geojson" 
        data={geoData}
    >
      <Layer 
        id="egypt-boundaries-fill" 
        type="fill" 
        paint={fillPaint} 
      />
      <Layer 
        id="egypt-boundaries-stroke" 
        type="line" 
        paint={strokePaint} 
      />
    </Source>
  );
};

export default GeojsonComp;
