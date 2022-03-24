<template>
  <div>
    <!-- row1 -->
    <v-row class="mt-5">
    <!-- ลงสมัครเลือกตั้ง -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId +'/register'}" > 
                <v-icon large class="mr-2">mdi-account-plus</v-icon> ลงสมัครเลือกตั้ง 
            </v-btn>
        </v-col>

        <!-- ตรวจสอบรายชื่อผู้สมัคร -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId + '/candidate'}">
                <v-icon large class="mr-2">mdi-account-group</v-icon> ตรวจสอบรายชื่อผู้สมัคร
            </v-btn>
        </v-col>
    </v-row>
    <!--  -->

    <!-- row2 -->
    <v-row>
        <!-- ลงคะแนนเสียง -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId + '/voting'}"> 
                <v-icon large class="mr-2">mdi-vote</v-icon> ลงคะแนนเสียง 
            </v-btn>
        </v-col>

        <!-- ตรวจสอบสิทธิ์การเลือกตั้ง -->
        <v-col>
            <v-btn color="primary" x-large block large @click="CheckVote()"> 
                <v-icon large class="mr-2">mdi-account-check</v-icon> ตรวจสอบสิทธิ์การเลือกตั้ง 
            </v-btn>
        </v-col>
    </v-row>
    <!--  -->

    <!-- row3 -->
    <v-row>

        <!-- ผลการเลือกตั้ง -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId + '/result'}"> 
                <v-icon large class="mr-2">mdi-account-star</v-icon> ผลการเลือกตั้ง 
            </v-btn>
        </v-col>

        <!-- ลงทะเบียนเพื่อลงคะแนน -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId + '/register-voter'}"> 
                <v-icon large class="mr-2">mdi-account-plus</v-icon> ลงทะเบียนเพื่อลงคะแนน 
            </v-btn>
        </v-col>
        
        <!-- ถอดรหัสผลคะแนน -->
        <v-col>
            <v-btn color="primary" x-large block large elevation="2" :to="{ path: '/event-detail/'+ tbEventId + '/decrypt-votes'}"> 
                <v-icon large class="mr-2">mdi-account-plus</v-icon> ถอดรหัสผลคะแนน 
            </v-btn>
        </v-col>
        
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import VoterCheck from "./VoterCheck.vue";


export default {
  props: ["tbEventId"], // get from parameter
  name: "DecryptVotes",
  data() {
    return {
        
    };
  },
  mounted() { 
    this.getEventById(this.tbEventId);
    console.log("tbEventId : " + this.tbEventId);
    this.checkExistVoter(this.tbEventId); // check now
  },
  methods: { 
    ...mapActions("event",["getEventById"]),
    ...mapActions("voter",["checkExistVoter"]),
    async CheckVote() { 
        await this.checkExistVoter(this.tbEventId);
        if(this.checkExist) { 
            this.$swal('ผลการตรวจสอบสิทธิ์การเลือกตั้ง \n " มีสิทธิ์ "', 'คุณได้ลงทะเบียนเพื่อลงคะแนนเรียบร้อยแล้ว', 'success');
        } else {
            this.$swal('ผลการตรวจสอบสิทธิ์การเลือกตั้ง \n" ไม่มีสิทธิ์ "', 'คุณต้องลงทะเบียนก่อน', 'error');
        }
        
    }
  },
  computed: { 
    ...mapGetters("event",["event"]),
    ...mapGetters("voter",["checkExist"]),
  }
}
</script>

<style>

</style>