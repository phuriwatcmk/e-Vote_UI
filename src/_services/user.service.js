import axios from 'axios';
import router from '../_router/index';
import Toast from './alert.service'
import env from '../_config/env'

export const userService = {
    login,
    logout
}

async function login(payload)  {
    return await axios.get(`${env.apiUrl}/api/callback?code=${payload}`)
        .then(user => {
            if (user) {
                Toast.fire({ icon: 'success', title: 'Login in successfully' });
                console.log('🍉 Login successfull => ');
                console.log(user);
                sessionStorage.setItem('user', JSON.stringify(user.data));
                sessionStorage.setItem('accesstoken', user.data.accesstoken);
                return user;
            }
        }).catch(() => {
            Toast.fire({ icon: 'error', title: 'ไม่สามารถ Login ได้ในขณะนี้' })
          })
}

async function logout() {
    Toast.fire({ icon: 'success', title: 'Logout in successfully' })
    sessionStorage.removeItem('user');
    router.push('../');
}