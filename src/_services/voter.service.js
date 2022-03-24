import axios from 'axios';
import Toast from './alert.service'
import env from '../_config/env'

export const voterService = {
    checkExistVoter,
    addVoter
}

async function checkExistVoter(tbEventId) {
    console.log("in service : " + tbEventId)
    return await axios.get(`${env.apiUrl}/api/v1/event/${tbEventId}/check`, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}})
        .then( res => {
            console.log('🍉 check voter success => ')
            console.log(res)
            return res;
        })
}


async function addVoter(voter) {
    return await axios.post(`${env.apiUrl}/api/v1/event/registervoter`, voter, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}} )
        .then( voter => { 
            Toast.fire({ icon: 'success', title: 'ลงทะเบียนการเลือกตั้งเรียบร้อย' })
            console.log('🍉 Add voter success => ')
            console.log(voter.data)
        }).catch(err => {
            console.log(err)
        })
} 