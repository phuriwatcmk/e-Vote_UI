import axios from 'axios';
import Toast from './alert.service'
import env from '../_config/env'

export const resultService = {
    checkResult,
}

async function checkResult(payload) {
    console.log('🍉 Cast candidate start => ')
    return await axios.post(`${env.apiUrl}/api/v1/checking/result/event/`, payload, { headers: { 'Authorization' : `Bearer ${env.accessToken}`}} )
        .then( cast => {
            Toast.fire({ icon: 'success', title: 'ถอดรหัสคะแนนเสียงเรียบร้อย' })
            // console.log(cast)
            return cast
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่สามารถถอดรหัสคะแนนเสียงได้' })
          })
}

