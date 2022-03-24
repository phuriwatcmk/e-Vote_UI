import { resultService } from '../_services/result.service.js';
// import router from '../_router/index';

const state = {
    checkExist: false,
    payload: {},
    resultGet: {},
}

const getters = {
    checkExist: (state) => {
        return state.checkExist
    },
    ResultList: (state) => {
        return state.resultGet
    }
}

const actions = {

    async checkResult({ commit }, payload) {
        // console.log("Check Result processing ... 🍌");
        // console.log(payload);
        await resultService.checkResult(payload)
            .then( res => {
                    console.log("🍥 Result Check successfull => ")
                    // console.warn(res.data.data)
                    commit('setResult', res.data.data)
                    // router.push({ path: `/event-detail/${voter.TBEventId}`  });
                })
            
        commit('setExist',true); 
    },
}

const mutations = {
    setExist: (state, res) => {
        state.checkExist = res;
    },
    setResult: (state, res) => {
        state.resultGet = res;
    },
}


export const result = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
