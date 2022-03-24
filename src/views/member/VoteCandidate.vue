<template>
    <v-card>
      <div class="d-flex justify-center flex-wrap" width="80%">
      <v-list-item three-line v-if="this.allCandidate.length === 0">
        <v-list-item-content>
          <v-list-item-title class="mt-5 mb-1 text-center">
            ยังไม่มีผู้ลงสมัคร
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        <!-- ?begin::  -->
          
        <div class="mt-10 mx-10 my-10" v-for="candidate in allCandidate" :key="candidate.tbCandidateId">
          <v-card class="mx-auto mt-15" width="250" outlined elevation="1">
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
                  {{ candidate.tbCandidateId}}. {{ candidate.preNameTha }} {{ candidate.firstNameTha }} {{ candidate.lastNameTha }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  สาขาวิชา {{ candidate.organizationNameTha }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!--  -->
            <v-card-actions class="d-flex justify-center">


              <!--  -->
              <v-btn color="primary" @click="dialog1 = true" align="center"> โหวต </v-btn>
              <v-dialog
                v-model="dialog1"
                persistent
                max-width="300px"
                :retain-focus="false"
              >
                <v-card>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="mt-5 mb-5 text-center">
                       <h2> ท่านยืนยันที่จะโหวต </h2> 
                      </v-list-item-title>
                      
                      <v-list-item-title class=" text-center pb-1">
                        <h3>** หมายเลข {{ candidate.tbCandidateId }} **</h3> 
                      </v-list-item-title>
                      <v-list-item-title class=" text-center pb-1">
                        <h2>{{ candidate.firstNameTha + " " +  candidate.lastNameTha}}</h2>
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-center pb-1 mt-2">
                        <v-btn  color="primary" large @click="vote(candidate.tbCandidateId)">ยืนยัน</v-btn>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                    <v-card-actions class="justify-end">
                <v-btn color="accent darken-1" text @click="dialog1 = false">
                    ยกเลิก
                  </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--  -->

            </v-card-actions>
            <!--  -->
          </v-card>
        </div>
        <!-- *end:: -->
        
      </div>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { castvoteService } from '../../_services/castvote.service.js';
export default {
  props: ["tbEventId"],
  name: "VoteCandidate",
  data() {
    return {
      dialog1: false,
    };
  },
  mounted() {
    this.CheckVote()
    this.getEventById(this.tbEventId);
    this.getAllcandidateByEvent(this.tbEventId)
    console.log(this.allCandidate)
  },
  methods: {
    ...mapActions("candidate",["getAllcandidateByEvent","voteCandidate"]),
    ...mapActions("event",["getEventById"]),
    async vote(candidateId) {
      console.log(this.tbEventId)
      console.log(candidateId)
      this.dialog1 = false;
      const payload = {
        tbEventId: this.tbEventId,
        tbCandidateId: candidateId,
        bodyText: candidateId.toString(),
      };
      try {
        const res = await castvoteService.castCandidate(payload)
        if (res.status === 200) {
          this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId)
        } else {
          console.log(res.status)
          }
      } catch (err) {
        console.log(err)
        }
      // castvoteService.castCandidate(payload).then(this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId))
    },
    CheckVote() { 
      if(!this.checkExist) { 
        this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId).then(this.$swal('ผลการตรวจสอบสิทธิ์การเลือกตั้ง "ไม่มีสิทธิ์"', 'คุณต้องลงทะเบียนก่อน', 'error'));
        } else {
          console.warn(this.checkExist)
          this.$swal('ยินดีต้อนรับ การลงคะแนนเสียง', 'กรุณาตรวจสอบก่อนลงคะแนน', 'success');
          }
      }
  },
  computed: {
    ...mapGetters("candidate",["allCandidate"]),
    ...mapGetters("event",["event"]),
    ...mapGetters("voter",["checkExist"]),
  }
};
</script>

<style></style>
