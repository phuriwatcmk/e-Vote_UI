import Vue from "vue";
import Vuex from "vuex";
import { account } from "./account.module";
import { event } from "./event.module";
import { candidate } from "./candidate.module";
import { voter } from "./voter.module";
import { result } from "./result.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    account,
    event,
    candidate,
    voter,
    result,
  }
});