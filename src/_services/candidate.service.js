import axios from 'axios';
import Toast from './alert.service'
import env from '../_config/env'

export const candidateService = {
    addCandidate,
    checkExistCandidate,
    updateCandidate,
    deteleCandidate,
    getAllcandidateByEvent,
}



async function addCandidate(candidate) {
    return await axios.post(`${env.apiUrl}/api/v1/event/registercandidate`, candidate, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}} )
        .then( candidate => {
            Toast.fire({ icon: 'success', title: 'ลงสมัครเลือกตั้งเรียบร้อย' })
            console.log('🍉 Add candidate success => ')
            console.log(candidate)
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่สามารถลงทะเบียนผู้สมัครลงเลือกตั้งได้' })
          })
}

async function updateCandidate(candidate) {
    return await axios.put(`${env.apiUrl}/api/v1/event/registercandidate`, candidate, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}})
        .then( updatedCandidate => {
            Toast.fire({ icon: 'success', title: 'แก้ไขข้อมูลสำเร็จ' })
            console.log('🍉 Updated candidate success => ')
            console.log(updatedCandidate.data)
            return updatedCandidate.data.data;
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่สามารถแก้ไขข้อมูลผู้สมัครลงเลือกตั้งได้' })
          })
}

async function deteleCandidate(tbEventId, tbCandidateId) {
    return await axios.delete(`${env.apiUrl}/api/v1/event/${tbEventId}/delCandidate/${tbCandidateId}`, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}})
        .then( res => {
            if(res.data) {
                Toast.fire({ icon: 'success', title: 'ยกเลิกการสมัครเรียบร้อย' })
                console.log("detele Successfull")
            } else {
                console.log("detele not Successfull")
            }
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่สามารถยกเลิกการสมัตรลงเลือกตั้งได้' })
          })
}

async function checkExistCandidate(tbEventId) {
    console.log("in service : " + tbEventId)
    return await axios.get(`${env.apiUrl}/api/v1/event/${tbEventId}/getCandidate`, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}})
        .then( res => {
            console.log('🍉 check candidate success => ')
            console.log(res)
            return res;
        })
}

async function getAllcandidateByEvent(tbEventId) {
    console.log("in service : " + tbEventId);
    return await axios.get(`${env.apiUrl}/api/v1/result/${tbEventId}`, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}})
        .then( res => {
            console.log('🍉 get candidates success => ')
            console.log(res)
            return res.data.data[0].tbCandidate;
        }) // res.data.data[0].tbCandidate[0]
}