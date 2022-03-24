<template>
  <div>
    <v-container
      fluid
      class="white lighten-5 d-block pl-9 pr-9 elevation-2 pb-15"
      rounded="lg"
    >
      <v-row class="ml-1 mb-7 mt-4 justify-space-between">
        <h2 class="">โครงการ : {{ event.eventTitle }}</h2>
        <v-col cols="3" v-if="($route.path == `/event-detail/${tbEventId}`)"></v-col>
        <v-btn 
          :to="{ path: `/event-detail/${tbEventId}` }" 
          color="primary darken-1" 
          text
          v-if="!($route.path == `/event-detail/${tbEventId}`)"
        >
          กลับไปหน้าหลักของโครงการ
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <div>
        <Router-view />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ["tbEventId"], // get from parameter
  name: "EventDetail",
  data() {
    return {
      
    };
  },
  mounted() { 
    this.getEventById(this.tbEventId);
    console.log("tbEventId : " + this.tbEventId);
  },
  methods: { 
    ...mapActions("event",["getEventById"]),
  },
  computed: { 
    ...mapGetters("event",["event"]),
  }
};
</script>
