import axios from 'axios';
const baseUrl = 'http://52.90.85.191:3000';
export const appointmentService={
    findFreeSlot,
    createEvent,
    showEvent
};
async function findFreeSlot(param){
    const response = await axios.get(`${baseUrl}/availabilities?date=${param.dateTime}&timezone=${param.timeZone}`);
    return response;
}

async function createEvent(param){
    const response = await axios.post(`${baseUrl}/event`,param);
    return response;
}

async function showEvent(param){
    const response = await axios.get(`${baseUrl}/event?startDate=${param.startDate}&endDate=${param.endDate}`);
    //const response = await axios.get(`${baseUrl}/event?startDate=2021-03-27T16:00:00-04:00&endDate=2021-03-27T20:00:00-04:00`);
    return response;
}

