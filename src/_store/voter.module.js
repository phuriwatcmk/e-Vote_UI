import { voterService } from '../_services/voter.service.js';
import { account } from "./account.module";
import router from '../_router/index';


const state = {
    checkExist: false,
    voter: null,
}

const getters = {
    regisVoterForm: () => { 
        return {
            TBEventId: null,
            EmailCMU : account.state.user.emailCMU,
            PreNameTha : account.state.user.preNameTha,
            PreNameEng : account.state.user.preNameEng,
            FirstNameTha : account.state.user.firstNameTha,
            LastNameTha : account.state.user.lastNameTha,
            FirstNameEng : account.state.user.firstNameEng,
            LastNameEng : account.state.user.lastNameEng,
            StudentID : account.state.user.studentID,
            OrganizationNameTha : account.state.user.organizationNameTha,
            OrganizationNameEng : account.state.user.organizationNameEng,
        } // set value in vuex and get to component
    },
    checkExist: (state) => {
        return state.checkExist
    },
}


const actions = {
    addVoter({ commit }, voter) {
        console.log("Add voter processing ... 🍌");
        console.log(voter);
        voterService.addVoter(voter)
            .then(() => {
                    console.log("🍥 Voter register successfull => ")
                    router.push({ path: `/event-detail/${voter.TBEventId}`  });
                }
            )
        commit('empty'); 
    },

    checkExistVoter({ commit }, tbEventId) {
        console.log("Check voter processing ... 🍌");
        console.log(tbEventId)
        voterService.checkExistVoter(tbEventId)
            .then(
                res => {
                    console.log("🍥 Voter check successfull => ")
                    console.log(res.data.data);
                    if(res.data.data === null) {
                        commit('setExist', false); // ยังไม่เคย register
                    } else {
                        commit('setExist', true); // เคย register
                    }
                    commit('setVoter',res.data.data);
                }
            ).catch(err => {
                console.log(err);
            })
    }
}


const mutations = {
    setExist: (state, res) => {
        state.checkExist = res;
    },
    setVoter: (state, voter) => {
        state.voter = voter; // null / data
    },
    empty: () => { }
}


export const voter = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};