'use client'
import {
  AutoComplete,
  Drawer,
  ButtonToolbar,
  Button,
  Placeholder,
  Toggle,
  InputPicker,
  Form,
} from "rsuite";

import { CustomProvider } from "rsuite";
// import "./sideBar.styles.less";
import { useRef, useState, useEffect } from "react";
export let openSideBar;
export let setStationNames;
// import { allDataEx, setAllDataFilteredEx } from "../RmMap/RmMap.compnent";

export const SideBar = () => {
  const [open, setOpen] = useState(false);

  openSideBar = setOpen;
  // const { colorMode, toggleColorMode } = useColorMode();
  const [nileStationFilter, setNileStationFilter] = useState(true);
  const [industrialDrainageFilter, setIndustrialDrainageFilter] =
    useState(true);
  const [agriculturalBanksFilter, setAgriculturalBanksFilter] = useState(true);
  const [coastalWatersFilter, setCoastalWatersFilter] = useState(true);
  const [lakeStationsFilter, setLakeStationsFilter] = useState(true);
  const [stationNames, setStationNamesSetter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statuesFilter, setStatuesFilter] = useState("");
  const [readingStateFilter, setReadingStateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  setStationNames = setStationNamesSetter;
  const layersFilter = {
    nileStation: [nileStationFilter, setNileStationFilter],
    industrialDrainage: [industrialDrainageFilter, setIndustrialDrainageFilter],
    agriculturalBanks: [agriculturalBanksFilter, setAgriculturalBanksFilter],
    coastalWaters: [coastalWatersFilter, setCoastalWatersFilter],
    lakeStations: [lakeStationsFilter, setLakeStationsFilter],
  };
  // useEffect(() => {
  //   const filteredAllData = allDataEx.filter((el) => {
  //     return (
  //       Object.entries(layersFilter)
  //         .filter((el) => el[1][0] == true)
  //         .map((el) => el[0])
  //         .includes(el.layer_name) &&
  //       el.statues.includes(statuesFilter) &&
  //       el.ReadingState.includes(readingStateFilter) &&
  //       el.name.includes(nameFilter) &&
  //       el.type_station.includes(typeFilter)
  //     );
  //   });
  //   setAllDataFilteredEx(filteredAllData);
  // }, [
  //   nileStationFilter,
  //   coastalWatersFilter,
  //   agriculturalBanksFilter,
  //   industrialDrainageFilter,
  //   lakeStationsFilter,
  //   nameFilter,
  //   statuesFilter,
  //   readingStateFilter,
  //   typeFilter,
  // ]);

  return (
    <CustomProvider theme="light">
      <Drawer open={open} onClose={() => setOpen(false)} size="xs">
        <Drawer.Header dir="rtl">
          <Drawer.Title>قائمة البحث</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Form layout="vertical" dir="rtl">
            <Form.Group controlId="type">
              <Form.ControlLabel>النوع</Form.ControlLabel>

              <InputPicker
                data={["رصد يدوى", "رصد لحظى"].map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={typeFilter}
                onSelect={setTypeFilter}
                onClean={() => {
                  setTypeFilter("");
                }}
              />
            </Form.Group>
            <Form.Group controlId="statues">
              <Form.ControlLabel>الحالة</Form.ControlLabel>

              <InputPicker
                data={["تعمل", "متوقفة", "تحت الصيانة"].map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={statuesFilter}
                onSelect={setStatuesFilter}
                onClean={() => {
                  setStatuesFilter("");
                }}
              />
            </Form.Group>
            <Form.Group controlId="readingState">
              <Form.ControlLabel>حالة القراءة</Form.ControlLabel>

              <InputPicker
                data={["مطابقة", "مخالفة"].map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={readingStateFilter}
                onSelect={setReadingStateFilter}
                onClean={() => {
                  setReadingStateFilter("");
                }}
              />
            </Form.Group>
            <Form.Group controlId="station_name">
              <Form.ControlLabel>الاسم</Form.ControlLabel>

              <AutoComplete
                data={stationNames}
                value={nameFilter}
                onChange={setNameFilter}
                onSelect={setNameFilter}
              />
            </Form.Group>
            <Form.Group controlId="nileStation">
              <Form.ControlLabel>
                محطات / نقاط رصد نوعية مياه نهر النيل
              </Form.ControlLabel>

              <Toggle
                onChange={(e) => {
                  setNileStationFilter(!nileStationFilter);
                  layersFilter["nileStation"][1](!nileStationFilter);
                }}
                checked={nileStationFilter}
              />
            </Form.Group>
            <Form.Group controlId="lakeStations">
              <Form.ControlLabel>
                محطات / نقاط رصد نوعية مياه البحيرات
              </Form.ControlLabel>

              <Toggle
                onChange={(e) => {
                  setLakeStationsFilter(!lakeStationsFilter);
                  layersFilter["lakeStations"][1](!lakeStationsFilter);
                }}
                checked={lakeStationsFilter}
              />
            </Form.Group>
            <Form.Group controlId="industrialDrainage">
              <Form.ControlLabel>
                محطات رصد صرف المنشأت الصناعية
              </Form.ControlLabel>

              <Toggle
                onChange={(e) => {
                  setIndustrialDrainageFilter(!industrialDrainageFilter);
                  layersFilter["industrialDrainage"][1](
                    !industrialDrainageFilter
                  );
                }}
                checked={industrialDrainageFilter}
              />
            </Form.Group>
            <Form.Group controlId="coastalWaters">
              <Form.ControlLabel>
                محطات / نقاط رصد نوعية المياه الساحلية
              </Form.ControlLabel>

              <Toggle
                onChange={(e) => {
                  setCoastalWatersFilter(!coastalWatersFilter);
                  layersFilter["coastalWaters"][1](!coastalWatersFilter);
                }}
                checked={coastalWatersFilter}
              />
            </Form.Group>
            <Form.Group controlId="agriculturalBanks">
              <Form.ControlLabel>
                محطات / نقاط رصد نوعية مياه المصارف الزراعية
              </Form.ControlLabel>

              <Toggle
                onChange={(e) => {
                  setAgriculturalBanksFilter(!agriculturalBanksFilter);
                  layersFilter["agriculturalBanks"][1](
                    !agriculturalBanksFilter
                  );
                }}
                checked={agriculturalBanksFilter}
              />
            </Form.Group>
          </Form>
        </Drawer.Body>
      </Drawer>
    </CustomProvider>
  );
};
