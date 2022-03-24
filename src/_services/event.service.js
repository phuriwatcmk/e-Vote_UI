import axios from "axios";
// import router from '../router/index';
import Toast from './alert.service'
import env from '../_config/env'

export const eventService = {
  addEvent,
  getAllEvent,
  deleteEvent,
  updateEvent,
  getEventById,
};

async function addEvent(event) {
  console.log("🌏 In service : ");
  console.log(event);
  return await axios
    .post(`${env.apiUrl}/api/v1/createEvent`, event, {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    })
    .then((events) => {
      Toast.fire({ icon: 'success', title: 'เพิ่มโครงการเรียบร้อย' })
      console.log("🍉 Create event success => " + events);
      return events;
    }).catch(() => {
      Toast.fire({ icon: 'error', title: 'ไม่สามารถเพิ่มโครงการได้' })
    })
    ;
}

async function getAllEvent(eventTitle) {
  let title = { eventTitle: eventTitle };
  return await axios
    .post(`${env.apiUrl}/api/v1/Result/search`, title, {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    })
    .then((events) => {
      console.log("🍉 Get all event success => " + events);
      return events;
    }).catch(() => {
      Toast.fire({ icon: 'error', title: 'ไม่สามารถดึงข้อมูลโครงการมาแสดงได้' })
    });
}

async function deleteEvent(tbEventId) {
  return await axios
    .delete(`${env.apiUrl}/api/v1/delEvent/${tbEventId}`, {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    })
    .then((deletedEvent) => {
      Toast.fire({ icon: 'success', title: 'ลบโครงการเรียบร้อย' })
      console.log("🍉 Delete Event success => ");
      console.log(deletedEvent.data);
      return deletedEvent;
    }).catch(() => {
      Toast.fire({ icon: 'error', title: 'ไม่สามารถลบโครงการได้' })
    });
}

async function updateEvent(event) {
  return await axios
    .put(`${env.apiUrl}/api/v1/createEvent`, event, {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    })
    .then((updatedEventList) => {
      Toast.fire({ icon: 'success', title: 'แก้ไขโครงการเรียบร้อย' })
      console.log("🍉 Update Event success => ");
      return updatedEventList;
    }).catch(() => {
      Toast.fire({ icon: 'error', title: 'ไม่สามารถแก้ไขโครงการได้' })
    });
}

async function getEventById(tbEventId) {
  return await axios
    .get(`${env.apiUrl}/api/v1/result/${tbEventId}`, {
      headers: { Authorization: `Bearer ${env.accessToken}` },
    })
    .then((event) => {
      console.log("🍉 Get Event By Event success => ");
      console.log(event.data);
      return JSON.parse(JSON.stringify(event.data.data));
    }).catch(() => {
      Toast.fire({ icon: 'error', title: 'ไม่สามารถดึงข้อมูลโครงการได้' })
    });
}
