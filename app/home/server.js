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
    const { data: res } = await axios.get(
      `${HOST}/api/location-handle?start=1&length=100000000`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
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
