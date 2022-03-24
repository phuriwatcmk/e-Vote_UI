import axios from 'axios';
import Toast from './alert.service'
import env from '../_config/env'
export const castvoteService = {
    castCandidate,
}

async function castCandidate(payload) {
    console.log('🍉 Cast candidate start => ')
    return await axios.post(`${env.apiUrl}/api/v1/event/${payload.tbEventId}/voting/${payload.tbCandidateId}`, payload, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}} )
        .then( cast => {
            Toast.fire({ icon: 'success', title: 'ลงคะแนนเสียงเรียบร้อย' })
            console.log('🍉 Cast candidate success => ')
            console.log(cast)
            return cast
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่ลงคะแนนเสียงได้' })
          })
}