"use server";
import govs from "@public/simplified.json";
import booleanWithin from "@turf/boolean-within";
import axios from "axios";
const { HOST, USER, PASS, PUBLIC_HOST } = process.env;

export const getToken = async () => {
  try {
    const { data } = await axios.post(`${HOST}/api/token/`, {
      username: USER,
      password: PASS,
    });

    return data.access;
  } catch (err) {
    console.log(err);
  }
};

export const getCanalsDrains = async (id) => {
  try {
    const { data } = await axios.get(
      `${HOST}/api/secondary-water-body-type-handle?length=100000000&start=1&id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getNile = async () => {
  try {
    const { data } = await axios.get(
      `${HOST}/api/nile-geom-handle?length=100000000&start=1`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (params) => {
  const urlParams = new URLSearchParams(params).toString();

  try {
    ///// locations
    const { data: res1 } = await axios.get(
      `${HOST}/api/location-handle?start=1&length=100000000&${urlParams}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ///// emergency
    const { data: res2 } = await axios.get(
      `${HOST}/api/emergency-events-location_handle?start=1&length=100000000&${urlParams}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ////// research
    const { data: res3 } = await axios.get(
      `${HOST}/api/handle-research-study?start=1&length=100000000&${urlParams}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ////////////////////////////
    res1.data.forEach((el) => {
      el.api = "location-handle";
      if (el.bodies_of_water_id == 16 || el.bodies_of_water_id == 17) {
        if (el.bodies_of_water_id == 16) el.legendType = "16";
        if (el.bodies_of_water_id == 17) el.legendType = "17";
        el.location_type_id = 0;
      } else {
        el.legendType = String(el.location_type_id);
      }
    });
    res2.data.forEach((el) => {
      el.api = "emergency-events-location_handle";
      el.legendType = "5";
      el.location_type_id = 0;
    });
    res3.data.forEach((el) => {
      el.api = "handle-research-study";
      el.legendType = "4";
      el.location_type_id = 0;
    });

    return [...res1.data, ...res2.data, ...res3.data];
  } catch (err) {
    console.log(err);
  }
};

export const detailsById = async (id, api) => {
  // console.log(api);
  const { data } = await axios.get(`${HOST}/api/${api}?id=${id}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
  // console.log(data.data);
  return {
    ...data.data,
    url: `${PUBLIC_HOST}${data.data.line}`,
  };
};
export const getLookups = async () => {
  try {
    const { data: res } = await axios.get(`${HOST}/api/handle-all-essentials`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const govOfClick = async (lat, lng) => {
  const point = {
    type: "Feature",
    geometry: {
      coordinates: [lng, lat],
      type: "Point",
    },
  };
  const govID = govs.features.find((gov) => booleanWithin(point, gov))
    ?.properties?.id;
  return govID;
};
