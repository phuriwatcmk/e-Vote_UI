import { candidateService } from '../_services/candidate.service.js';
// import { castvoteService } from '../_services/castvote.service.js';
import { account } from "./account.module";
import router from '../_router/index';
// console.log(account)


const state = {
    checkExist: false,
    candidate: { 
        candidateCreate: null,
        candidateDetail: null,
        candidateUpdate: null,
        emailCMU: null,
        firstNameEng: null,
        firstNameTha: null,
        lastNameEng: null,
        lastNameTha: null,
        organizationNameEng: null,
        organizationNameTha: null,
        preNameEng: null,
        preNameTha: null,
        studentID: null,
        tbCandidateId: null,
        tbEventId: null,
     },
    allCandidate: null,
    payload: null,
}

const getters = {
    allCandidate: () => { 
        return state.allCandidate;
    },
    candidate: (state) => {
        return state.candidate;
    },
    regisCandidateForm: () => { 
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
            candidateDetail : ''
        } // set value in vuex and get to component
    },
    editCandidateForm: (state) => {
        return {
            TBCandidateId: state.candidate.tbCandidateId,
            TBEventId: state.candidate.tbEventId,
            EmailCMU : state.candidate.emailCMU,
            PreNameTha : state.candidate.preNameTha,
            PreNameEng : state.candidate.preNameEng,
            FirstNameTha : state.candidate.firstNameTha,
            LastNameTha : state.candidate.lastNameTha,
            FirstNameEng : state.candidate.firstNameEng,
            LastNameEng : state.candidate.lastNameEng,
            StudentID : state.candidate.studentID,
            OrganizationNameTha : state.candidate.organizationNameTha,
            OrganizationNameEng : state.candidate.organizationNameEng,
            candidateDetail : state.candidate.candidateDetail,
        }
    },
    checkExist: (state) => {
        return state.checkExist
    },
    payload: (state) => {
        return state.payload
    },

}

const actions = {
    addCandidate({ commit }, candidate) { // push just 2 parameter ?
        console.log("Add candidate processing ... 🍌");
        console.log(candidate);
        candidateService.addCandidate(candidate)
            .then(
                () => {
                    console.log("🍥 Candidate register successfull => ")
                    router.push({ path: `/event-detail/${candidate.TBEventId}`  });
                }
            )
        commit('empty'); 
    },

    updateCandidate({ commit }, candidate) {
        console.log("Update candidate processing ... 🍌");
        console.log(candidate);
        candidateService.updateCandidate(candidate)
            .then(
                (updatedCandidate) => {
                    console.log("🍥 Candidate updated successfull => ");
                    console.log(updatedCandidate);
                    router.push({ path: `/event-detail/${candidate.TBEventId}`  });
                }
            )
        commit('empty')
    },

    deteleCandidate({ commit }, TBEventId) {
        console.log("Delete candidate processing ... 🍌");
        console.log(state.candidate.tbEventId) // ไม่ได้
        console.log(state.candidate.tbCandidateId) // ได้
        candidateService.deteleCandidate(state.candidate.tbEventId, state.candidate.tbCandidateId)
            .then(() => {
                commit('removeCandidate');
                router.push({ path: `/event-detail/${TBEventId}`  });
            }) 
    },

    checkExistCandidate({ commit }, tbEventId) {
        console.log("Check candidate processing ... 🍌");
        console.log(tbEventId)
        candidateService.checkExistCandidate(tbEventId)
            .then(
                res => {
                    console.log("🍥 Candidate check successfull => ")
                    console.log(res.data.data);
                    if(res.data.data === null) {
                        commit('setExist', false);
                        // this.addCandidate(candidate, tbEventId);
                        // return false;
                    } else {
                        commit('setExist', true);
                        // this.updateCandidate(candidate, tbEventId);
                        // return true;
                    }
                    commit('setCandidate',res.data.data);
                }
            ).catch(err => {
                console.log(err);
            })
    },
    getAllcandidateByEvent({ commit }, tbEventId) {
        console.log("Get All candidate processing ... 🍌");
        console.log(tbEventId)
        candidateService.getAllcandidateByEvent(tbEventId)
            .then(candidates => {
                console.log("🍥 Candidates get successfull => ");
                console.log(candidates);
                commit('setAllCandidate',candidates);
                // console.log(state.allCandidate)
            })
    },
    voteCandidate(payload){
        console.log("Vote candidate processing ... 🍌");
        console.log(payload)
        // castvoteService.castCandidate(payload)
        //     .then(cast => {
        //         console.log("🍥 Candidates vote successfull => ");
        //         console.log(cast);
        //     })
    },
}

const mutations = {
    setExist: (state, res) => {
        state.checkExist = res;
    },
    setCandidate: (state, candidate) => {
        state.candidate = candidate; // null / data
    },
    removeCandidate: (state) => {
        state.candidate =  { // after delete and come back to register. it will not error
            candidateCreate: null,
            candidateDetail: null,
            candidateUpdate: null,
            emailCMU: null,
            firstNameEng: null,
            firstNameTha: null,
            lastNameEng: null,
            lastNameTha: null,
            organizationNameEng: null,
            organizationNameTha: null,
            preNameEng: null,
            preNameTha: null,
            studentID: null,
            tbCandidateId: null,
            tbEventId: null,
         };
    },
    setAllCandidate: (state, candidates) => {
        // console.log("in mutation")
        // console.log(candidates)
        state.allCandidate = candidates;
    },
    empty: () => { }
}



export const candidate = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};