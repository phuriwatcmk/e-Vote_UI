import Vue from "vue";
import App from "./App.vue";
import router from "./_router";
import { store } from "./_store";
import vuetify from "./_plugins/vuetify";
import apexchart from "./_plugins/apexcharts";
// import sweetalert from "./_plugins/sweetalert2";
import "./assets/main.css";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2); // **

new Vue({
  router,
  store,
  vuetify,
  apexchart,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
