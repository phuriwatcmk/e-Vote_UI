<template>
  <div>
    <!-- begin::เมื่อไม่เคยสมัคร -->
    <v-card v-if="!checkExist">
      <v-card-title class="justify-center">
        <h2 class="mt-10">ลงทะเบียนเพื่อลงคะแนนโครงการ "{{ event.eventTitle }}"</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="justify-center">
            <!--  -->
            <v-col cols="12" sm="6" md="8" class="pt-0 mt-5">

              <!--  -->
              <p>รหัสนักศึกษา</p>
              <v-text-field
                v-model="regisVoterForm.StudentID"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!--  -->
              <p>อีเมล</p>
              <v-text-field
                v-model="regisVoterForm.EmailCMU"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!-- คำนำหน้า -->
              <p>คำนำหน้า</p>
              <v-text-field
                v-model="regisVoterForm.PreNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>ชื่อ</p>
              <v-text-field
                v-model="regisVoterForm.FirstNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>นามสกุล</p>
              <v-text-field
                v-model="regisVoterForm.LastNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>คณะ</p>
              <v-text-field
                v-model="regisVoterForm.OrganizationNameTha"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->

            </v-col>
            <!--  -->
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" class="white--text mr-5" :to="{ path:'/event-detail/' + tbEventId }"> ย้อนกลับ </v-btn>
        <v-btn color="primary darken-1" class="white--text " @click="save()"> ยืนยันสิทธิ์ </v-btn>
      </v-card-actions>
    </v-card>
    <!-- end::เมื่อไม่เคยสมัคร -->

    <v-row v-if="checkExist" class="justify-center">
      <h2 class="mt-10">คุณได้ทำการลงสมัครเอาไว้กับโครงการ "{{ event.eventTitle }}" เรียบร้อยแล้ว</h2>
    </v-row>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ["tbEventId"],
    name: "RegisVoter",
    data() {
        return {
            dialog: false,
            image: undefined,
            imageUrl: "",

            rules: [
                (value) =>
                !value ||
                value.size < 2000000 ||
                "Avatar size should be less than 2 MB!",
            ],
            // checkExist: false,
            
        }
    },
    mounted() {
        this.getEventById(this.tbEventId); // เอาชื่อ event มาแสดง

        this.CheckVote();

    },
    methods: {
        ...mapActions("event",["getEventById"]),
        ...mapActions("voter",["checkExistVoter", "addVoter"]),
        save() {
            this.regisVoterForm.TBEventId = this.tbEventId;
            this.addVoter(this.regisVoterForm);
        },
        async CheckVote() { 
          await this.checkExistVoter(this.tbEventId);
          if(this.checkExist) { 
              this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId).then(this.$swal('ผลการตรวจสอบสิทธิ์การเลือกตั้ง', 'คุณได้ลงทะเบียนเพื่อลงคะแนนเรียบร้อยแล้ว', 'success'));
          } else {
              this.$swal('ยินดีต้อนรับ การยืนยันสิทธิ์', 'คุณต้องลงทะเบียนก่อน', 'success');
          }
      }
    },
    computed: {
        ...mapGetters('voter',['regisVoterForm','checkExist']),
        ...mapGetters("event",["event"]),
    }
}
</script>

<style>

</style>