"use client";
import React, { useContext, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Marker as MapLibreMarker, Popup, Source, Layer } from "react-map-gl/maplibre";
import { openBottom } from "../HomeControls/BottomSidebar/BottomSidebar";
import { Button } from "primereact/button";
import { EssentialsContext } from "@app/home_maplibre/EssentialsProvider";
import { DataContext } from "@app/home_maplibre/DataProvider";

const Marker = ({ data }) => {
  const {
    longitude,
    latitude,
    color = "excellent",
    id,
    state_of_place_id,
    name,
    legendType,
    json__EmergencyEventsTrackLocation,
    api,
  } = data;
  
  const searchParams = useSearchParams();
  const eLocations = json__EmergencyEventsTrackLocation?.map((el) => [el.lng, el.lat]) || [];
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupLocation, setPopupLocation] = useState(null);
  const [details, setDetails] = useState({});
  
  const { colors, statusIcons, mainIcons, wqiCalc } = useContext(EssentialsContext);
  const { popupDetails, labelChecked, averageReadingChecked } = useContext(DataContext);

  // Generate a stable random HSL color per marker id
  const randomColor = useMemo(() => {
    const hash = String(id).split('').reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0);
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 80%, 55%)`;
  }, [id]);
  
  const handleMarkerClick = async (lng, lat) => {
    const data = await popupDetails(id, api);
    setDetails(data);
    setPopupLocation({ lng, lat });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupLocation(null);
  };

  const testTable = [
    { key: "Name", value: "Alice" },
    { key: "Age", value: "30" },
    { key: "Country", value: "UAE" },
    { key: "Occupation", value: "Engineer" },
  ];

  const createCanvasTable = (data) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const font = "bold 16px Arial";
    context.font = font;

    const columnWidths = data.map((item) => {
      const keyWidth = context.measureText(item.key).width;
      const valueWidth = context.measureText(item.value).width;
      return Math.max(keyWidth, valueWidth) + 10; 
    });

    const rowHeight = 16;
    const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
    const start = 30; // Offset replaced the hardcoded calculation 
    
    canvas.width = totalWidth + start;
    canvas.height = rowHeight * 2;
    
    let xPosition = start; 
    data.forEach((item, index) => {
      const columnWidth = columnWidths[index];
      context.fillStyle = "#333";
      context.fillRect(xPosition, 0, columnWidth, rowHeight);
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(item.key, xPosition + columnWidth / 2, rowHeight / 2);
      xPosition += columnWidth; 
    });

    xPosition = start; 
    data.forEach((item, index) => {
      const columnWidth = columnWidths[index];
      context.fillStyle = "#666";
      context.fillRect(xPosition, rowHeight, columnWidth, rowHeight);
      context.fillStyle = "yellow";
      context.fillText(item.value, xPosition + columnWidth / 2, rowHeight + rowHeight / 2);
      xPosition += columnWidth;
    });

    return canvas.toDataURL();
  };

  const wqi = () => {
    const num = Number(details["WQI"]?.toFixed(2));
    return isNaN(num) ? "غير معرف" : num;
  };

  const createCanvasWithText = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const font = "bold 20px Arial"; 
    context.font = font;

    const textMetrics = context.measureText(text);
    canvas.width = textMetrics.width + 20;
    canvas.height = 30;

    context.font = font;
    context.fillStyle = "#00000080";
    context.fillRect(10, 0, textMetrics.width, 22);
    context.fillStyle = "yellow";
    context.fillText(text, 10, 18.5);

    return canvas.toDataURL();
  };

  // Convert track locations to GeoJSON LineString
  const getTrackLineGeoJSON = () => {
    if (!eLocations.length) return null;
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[+longitude, +latitude], ...eLocations]
      }
    };
  };

  return (
    <>
      {legendType == "5" && json__EmergencyEventsTrackLocation?.length > 0 && (
        <>
          {json__EmergencyEventsTrackLocation.map((el, index) => (
            <MapLibreMarker 
              key={`alert-${index}`} 
              longitude={el.lng} 
              latitude={el.lat} 
              anchor="bottom"
              offset={[0, 15]}
              onClick={e => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(el.lng, el.lat);
              }}
            >
              <img src="/cuw-alert-icon.png" style={{ width: '40px', cursor: 'pointer' }} alt="Alert" />
            </MapLibreMarker>
          ))}
          
          <Source id={`track-lines-${id}`} type="geojson" data={getTrackLineGeoJSON()}>
            <Layer 
              id={`track-lines-layer-${id}`} 
              type="line" 
              paint={{
                'line-color': randomColor,
                'line-width': 4
              }}
            />
            <Layer
              id={`track-lines-arrows-${id}`}
              type="symbol"
              layout={{
                'symbol-placement': 'line',
                'symbol-spacing': 60,
                'text-field': '▶',
                'text-size': 18,
                'text-keep-upright': false
              }}
              paint={{
                'text-color': randomColor,
                'text-halo-color': '#ffffff',
                'text-halo-width': 1
              }}
            />
          </Source>
        </>
      )}

      {/* Main Location Marker */}
      <MapLibreMarker 
          longitude={+longitude} 
          latitude={+latitude} 
          anchor="center"
          onClick={e => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(+longitude, +latitude);
          }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            {averageReadingChecked && (
              <img src={createCanvasTable(testTable)} style={{ position: 'absolute', top: '-40px', left: '20px' }} alt="Table Info" />
            )}
            {labelChecked && (
              <img src={createCanvasWithText(name)} style={{ position: 'absolute', top: '-25px', left: '20px' }} alt="Label" />
            )}
            
            {statusIcons[state_of_place_id]?.image && (
              <img 
                 src={`/${statusIcons[state_of_place_id]?.image}`} 
                 style={{ position: 'absolute', bottom: '-15px', left: '-15px', width: '22px' }} 
                 alt="Status" 
              />
            )}
            
            {mainIcons[legendType]?.image && (
              <img 
                 src={`/${mainIcons[legendType]?.image}`} 
                 style={{ 
                     width: `${(mainIcons[legendType]?.scale || 1) * 500}px`,
                     height: `${(mainIcons[legendType]?.scale || 1) * 500}px` 
                 }} 
                 alt="Main Icon" 
              />
            )}
        </div>
      </MapLibreMarker>

      {/* Shared Popup Window */}
      {showPopup && popupLocation && (
        <Popup 
            longitude={popupLocation.lng} 
            latitude={popupLocation.lat} 
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            offset={[0, -20]}
            onClose={closePopup}
            style={{ zIndex: 10 }}
            className="custom-popup" // MapLibre will inject this into standard DOM
        >
            <div style={{ 
                textAlign: "center", 
                minWidth: "200px", 
                maxWidth: "400px",
                fontWeight: "800", 
                fontSize: "16px",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: "#1f2d40",
                color: "white"
            }}>
              <div style={{ marginBottom: "5px" }}>{name}</div>
              <div style={{ marginBottom: "5px" }}>المحافظة : {details.governorate}</div>
              {api === "location-handle" && (
                <>
                  <div>WQI :{wqi()}</div>
                  <div style={{
                      fontSize: "x-large",
                      fontWeight: 800,
                      color: colors[wqiCalc(details["WQI"])]?.[0],
                    }}
                  >
                    {wqiCalc(details["WQI"])}
                  </div>
                </>
              )}
              <div className="flex flex-column gap-2" style={{ marginTop: "15px" }}>
                <Button
                  icon="pi pi-file-edit"
                  severity="info"
                  label="عرض أخر قراءة"
                  visible={Boolean(details.LastReadings?.length)}
                  onClick={() => openBottom(details)}
                />
                <Button
                  icon="pi pi-book"
                  visible={Boolean(details.line)}
                  severity="info"
                  label="عرض تفاصيل الموقع"
                  onClick={() => window.open(details.url)}
                />
              </div>
            </div>
        </Popup>
      )}
    </>
  );
};

export default Marker;
