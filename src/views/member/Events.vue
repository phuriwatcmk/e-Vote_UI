<template>
  <div>
    <v-container fluid class="white lighten-5 elevation-2" rounded="lg">
      <v-row class="mb-0 mt-2 ml-2">
        <v-col><h2>รายการโหวตลงคะแนน</h2></v-col>
      </v-row>
      <v-divider width="85%" class="ml-10"></v-divider>
        <!-- <EventList /> -->
      <div class="mt-5">
        <!-- <v-card-title>
          
        </v-card-title> -->
        <!-- begin::Table -->
        <v-data-table
          :headers="headers"
          :items="allEvents"
          class="elevation-1"
          :disable-sort="true"
        >

          <template v-slot:top>

            <!-- begin:: toolbar  -->
            <v-toolbar flat>
              <!--  -->
              <v-row>
                <v-col cols="6" align-self="start">
                <v-text-field
                  v-model="eventTitle"
                  append-icon="mdi-magnify"
                  label='Search by "ชื่อโครงการ"'
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" align-self="end" class="ml-0" >
                <ModalAddEvent/>
              </v-col>
              </v-row>
              
            </v-toolbar>
            <!-- end:: toolbar -->

          </template>

          <template #[`item.status`]="{ item }">
            <router-link
              class="event-link"
              :to="{ path: `/event-detail/${item.tbEventId}`}"
            >
              <v-btn 
                color="primary"
                class="white--text"
              >ดูเพิ่มเติม
              </v-btn>
            </router-link>
          </template>

          <template #[`item.eventRegister`]="{ item }">
            <p class="mt-3">
              วันที่เริ่ม : {{ dateFormat(item.eventRegisterStart) }} {{ timeFormat(item.eventRegisterStart) }}
            </p>
            <p class="mb-3">
              วันที่สิ้นสุด : {{ dateFormat(item.eventRegisterEnd) }} {{ timeFormat(item.eventRegisterEnd) }}
            </p>
          </template>

          <template #[`item.eventVoting`]="{ item }">
            <p class="mt-3">
              วันที่เริ่ม : {{ dateFormat(item.eventVotingStart) }} {{ timeFormat(item.eventVotingStart) }}
            </p>
            <p class="mb-3">
              วันที่สิ้นสุด : {{ dateFormat(item.eventVotingEnd) }} {{ timeFormat(item.eventVotingEnd) }}
            </p>
          </template>


          <template #[`item.actions`]="{ item }" >
            <!-- ปุ่มแก้ไข -->
            <ModalEditEvent :tbEventId="item.tbEventId"/>

            <v-icon
              small
              @click="deleteEvent(item.tbEventId)"
            >
            mdi-delete
            </v-icon>
          </template>

        </v-data-table>
        <!-- end::Table -->

      </div>


    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalAddEvent from "./modal/ModalAddEvent.vue";
import ModalEditEvent from "./modal/ModalEditEvent.vue";

export default {
  name: "Events",
  components: { ModalAddEvent, ModalEditEvent },
  data() {
    return {
      eventTitle: '',
// Table
      // column
      headers: [
        { text: "ชื่อโครงการ", value: "eventTitle", align: "start", sortable: false },
        { text: "คณะ", value: "organizationNameTha" },
        { text: "ช่วงการรับสมัคร", value: "eventRegister" },
        { text: "ช่วงการลงคะแนน", value: "eventVoting" },
        { text: "รายละเอียด", value: "status" },
        { text: "เมนู", value: "actions" },
      ],
    };
  },
    mounted() {
    this.getAllEvent(this.eventTitle)
  },
  created() {
    console.log(this.allEvents)
  },
  computed: {
    ...mapGetters('event',['allEvents']),
  },
  watch: {
    eventTitle: function() {
      this.getAllEvent(this.eventTitle)
    }
  },
  methods: {
    ...mapActions("event", ["getAllEvent", "deleteEvent"]),
    dateFormat(date) { 
      return date.split("T")[0]
    },
    timeFormat(time) {
      return time.split("T")[1];
    }
  },
};
</script>

<style scoped>
.event-link{
  text-decoration: none;
}
</style>
