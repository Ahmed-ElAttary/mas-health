"use server";

import axios from "axios";
const { HOST, USER, PASS } = process.env;

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

export const getData = async () => {
  try {
    ///// locations
    const { data: res1 } = await axios.get(
      `${HOST}/api/location-handle?start=1&length=100000000`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ///// emergency
    const { data: res2 } = await axios.get(
      `${HOST}/api/emergency-events-location_handle?start=1&length=100000000`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ////// research
    const { data: res3 } = await axios.get(
      `${HOST}/api/handle-research-study?start=1&length=100000000`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    ////////////////////////////
    res1.data.forEach((el) => {
      if (el.bodies_of_water_id == 16 || el.bodies_of_water_id == 17) {
        if (el.bodies_of_water_id == 16) el.legendType = "16";
        if (el.bodies_of_water_id == 17) el.legendType = "17";
        el.location_type_id = 0;
      } else {
        el.legendType = String(el.location_type_id);
      }
    });
    res2.data.forEach((el) => {
      el.legendType = "5";
      el.location_type_id = 0;
    });
    res3.data.forEach((el) => {
      el.legendType = "4";
      el.location_type_id = 0;
    });

    return [...res1.data, ...res2.data, ...res3.data];
  } catch (err) {
    console.log(err);
  }
};

export const detailsLink = async (id) => {
  const { data } = await axios.get(`${HOST}/api/location-handle?id=${id}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  return `${HOST}${data.data.line}`;
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
