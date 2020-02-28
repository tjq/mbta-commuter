import { apiKey } from "./api-key.js";

const axios = require('axios');
const BASE_URI = 'https://api-v3.mbta.com/';
const COMMUTER_RAIL_ROUTE_TYPE = 2;

export const getCommuterRailStops = async () => {
  let url = `${BASE_URI}stops?filter[route_type]=${COMMUTER_RAIL_ROUTE_TYPE}&filter[location_type]=0&fields[stop]=id`;
  try {
    let { data } = await axios.get(url, {
      headers: {
        'x-api-key': apiKey
      }
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStopSchedule = async (stop) => {
  const now = new Date();
  let hours = now.getHours().toString();
  let minutes = now.getMinutes().toString();
  hours = hours.length === 1 ? `0${hours}` : hours;
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  let url = `${BASE_URI}schedules?&filter[stop]=${stop}&filter[min_time]=${hours}:${minutes}&include=route,trip,stop,prediction&sort=departure_time`
  try {
    let { data } = await axios.get(url, {
      headers: {
        'x-api-key': apiKey
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};