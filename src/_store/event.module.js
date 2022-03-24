import { eventService } from '../_services/event.service.js';
import { account } from "./account.module";


const state = {
    events: [],
    // Form
    event: {},
}

const getters = {
    allEvents: state => state.events,
    event: state => state.event
}


const actions = {
    addEvent({commit}, event) {
        console.log("Add event processing ... 🍌");
        console.log(event);
        // console.log(account)
        event.OrganizationNameTha = account.state.user.organizationNameTha;
        eventService.addEvent(event)
            .then(
                events => {
                    console.log("🍥 Event can back to module => ")
                    console.log(events.data.data)
                    commit('setEvents', events.data.data)
                }
            )
    },

    // updateEvent() {}
    deleteEvent({ commit }, tbEventId) {
        eventService.deleteEvent(tbEventId)
            .then(
                deletedEvent => {
                    console.log("🍥 Event can back to module => ");
                    console.log(deletedEvent.data);
                    if(deletedEvent.data) {
                        // remove from array
                        commit('deleteEvent', deletedEvent.data)
                    }
                }
            )
    },
    getAllEvent({ commit }, eventTitle) {
        console.log("get all event processing ... 🍌");
        eventService.getAllEvent(eventTitle)
            .then(
                events => {
                    console.log("🍥 Event can back to module => ")
                    console.log(events.data)
                    commit('setEvents', events.data.data)
                }
            )
    },

    getEventByIdLocal({ commit }, tbEventId) { // ขาด api get event by tbEventId
        console.log("🍙 get event data by ID :")
        console.log(tbEventId);
        commit('setEventById', tbEventId)
        // returnเลยแล้วติด Promise
    },

    getEventById({ commit }, tbEventId) { // ขาด api get event by tbEventId
        console.log("🍙 get event data by ID :")
        console.log(tbEventId);
        eventService.getEventById(tbEventId)
            .then(
                event => {
                    console.log("🍥 Get Event By Id can back to module => ")
                    console.log(event)
                    commit('setEvent', event)
                    // return event;
                }
            )
        // returnเลยแล้วติด Promise
    },

    updateEvent({ commit }, event ) {
        console.log("🛠 get data to update :");
        console.log(event);
        eventService.updateEvent(event)
            .then(
                events => {
                    console.log("🍥 Event can back to module => ")
                    console.log(events.data)
                    commit('setEvents', events.data.data)
                }
            )
    }

    // getEventByAcc() {}

}

const mutations = {
    setEvents(state, events) {
        state.events = events;
    },
    deleteEvent(state, deletedEvent) {
        state.events = state.events.filter(event => event.tbEventId != deletedEvent.tbEventId)
    },
    setEventById: (state, tbEventId) => { //? ที่ edit Form
        let getEvent = state.events.filter(event => event.tbEventId === tbEventId); // 
        console.log(getEvent)
        state.event = JSON.parse(JSON.stringify(getEvent[0])); 
    },
    setEvent: (state, event) => { //? จาก api
        state.event = event[0]; // ได้ [0] ตลอดเลย
    },
}

export const event = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};