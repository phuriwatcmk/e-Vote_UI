import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#C490E4',
          secondary: '#F6C6EA',
          accent: '63327D',
          base: '#F6C6EA',
        },
      },
    },
  })