import { userService } from '../_services/user.service';
import router from '../_router/index';


const user = JSON.parse(sessionStorage.getItem('user'));
const accesstoken = sessionStorage.getItem('accesstoken');

const state = {
    user: user ? user : null,
    accesstoken: accesstoken ? accesstoken : null
}

const actions = {
    login({ commit }, { payload }) {
        console.log("login process ... 🍌");
        console.log("this is payload : " + payload);
        commit('loginRequest', payload);
        userService.login(payload)
            .then(
                user => {
                    console.log("🍥 User can back to module => " + user);
                    commit('loginSuccess', user.data);
                    console.log(state.accesstoken)
                    console.log(state.user)
                    router.push('/');
                }
            )
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    }
}

const mutations = {
    loginRequest(state, user) {
        state.user = user;
    },
    loginSuccess(state, user) {
        state.user = user;
    },
    logout(state) {
        state.user = null;
    },
}


export const account = {
    namespaced: true,
    state,
    actions,
    mutations,
};