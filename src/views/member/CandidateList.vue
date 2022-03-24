<template>
  <div>
    <v-container
      fluid
      class="white lighten-5 d-block pl-9 elevation-2"
      rounded="lg"
    >
      <div class="mb-10">
        <h4 class="text-center">รายชื่อผู้ลงสมัครรับคะแนนเสียง</h4>
        <h4 class="text-center">{{ event.eventTitle }} ณ วันที่ {{ currentDateTime() }}</h4>
      </div>
      <v-list-item three-line v-if="this.allCandidate.length === 0">
        <v-list-item-content>
          <v-list-item-title class="mt-5 mb-1 text-center">
            ยังไม่มีผู้ลงสมัคร
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="d-flex justify-center flex-wrap" width="80%">
        <div class="mt-10 mx-10 my-10" v-for="candidate in allCandidate" :key="candidate.tbCandidateId">
          <v-card class="mx-auto" width="250" outlined elevation="1">
            <v-row align="center" class="mt-n16">
              <v-col align="center" class="pa-0" cols="12">
                <v-card
                  class="mx-auto rounded-card"
                  max-width="175"
                  max-height="auto"
                  elevation="5"
                >
                  <v-img
                    src="../../assets/key-title-logo.png"
                  ></v-img>
                  <!-- :src="candidate.imgpath" -->
                </v-card>
              </v-col>
            </v-row>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="mt-5 mb-1 text-center">
                  {{ candidate.preNameTha }} {{ candidate.firstNameTha }} {{ candidate.lastNameTha }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  สาขาวิชา {{ candidate.organizationNameTha }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


            <v-card-actions class="d-flex justify-center">
              <!-- dialog -->
              <v-dialog transition="dialog-bottom-transition" max-width="800">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on">รายละเอียด</v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card class="pt-10">
                    <div class="text-center pt-3">
                    <v-avatar class="profile" color="grey" size="164" tile>
                      <v-img
                      src="../../assets/key-title-logo.png"
                      ></v-img>
                      </v-avatar>
                    </div>
                      <v-card-text>
                      <div class="text-center text-h5 pt-3">
                        รายละเอียดผู้ลงสมัครเลือกตั้ง
                      </div>
                      <div class="text-center text-subtitle-1">
                        ชื่อ : {{ candidate.preNameTha }} {{ candidate.firstNameTha }} {{ candidate.lastNameTha }}
                      </div>
                      <div class="text-center text-subtitle-1">
                        คณะ : {{ candidate.organizationNameTha }}
                      </div>

                      <div class="text-center text-subtitle-1">
                        รหัสนักศึกษา : {{ candidate.studentID }}
                      </div>
                      <div class="text-center text-subtitle-1">
                      <p>รายละเอียด</p>
                        <v-textarea
                          v-model="candidate.candidateDetail"
                          outlined
                          dense
                          rows="1"
                          filled
                          readonly
                        ></v-textarea>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <!-- dialog -->

            </v-card-actions>

          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["tbEventId"],
  name: "Candidatelist",
  components: {
    // CandidateCard,
  },
  data() {
    return {
      dateNow: "",
      candidateList: {
        id: 1,
        name: "ณเดช คุคิมิยะ",
        detail: "รายละเอียด",
      },
    };
  },
  mounted() {
    this.getEventById(this.tbEventId);
    this.getAllcandidateByEvent(this.tbEventId)
  },
  methods: {
    ...mapActions("candidate",["getAllcandidateByEvent"]),
    ...mapActions("event",["getEventById"]),
    currentDateTime() {
      const current = new Date();
      const date = current.getDate()+'-'+(current.getMonth()+1)+'-'+current.getFullYear();
      const time = current.getHours() + ":" + current.getMinutes()
      const dateTime = date +' '+ time;
      
      return dateTime;
    },
  },
  computed: {
    ...mapGetters("candidate",["allCandidate"]),
    ...mapGetters("event",["event"]),
  }
};
</script>

<style scoped>
  .rounded-card {
    border-radius: 20px;
  }
  .container_img {
    object-fit: fill;
    display: block;
  }
</style>