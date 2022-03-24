<template>
  <div>

    <!-- begin::เมื่อเคยสมัคร -->
    <v-card v-if="checkExist">
      <v-card-title class="justify-center">
        <h2 class="align-center purple--text mt-10">คุณได้ลงสมัครโครงการนี้เอาไว้แล้ว</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="justify-center">
            <v-col cols="12" sm="4" md="8">
              <v-row class="justify-center">
                <v-img
                      max-height="150"
                      max-width="150"
                      :src="imageUrl"
                      lazy-src="../../assets/key-title-logo.png"
                />
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6" class="pa-0 mt-5 mb-5" >
                  <!--  -->
                  <v-file-input
                    v-model="image"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    truncate-length="7"
                    dense
                    outlined
                    label="Avatar"
                    class="pa-0 mt-1"
                    @click:clear="imageUrl = ''"
                    @change="onFileChange"
                  />
                  <!--  -->
                </v-col>
              </v-row>
            </v-col>

            <!--  -->
            <v-col cols="12" sm="6" md="8" class="pt-0">

              <!--  -->
              <p>รหัสนักศึกษา</p>
              <v-text-field
                v-model="editCandidateForm.StudentID"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!--  -->
              <p>อีเมล</p>
              <v-text-field
                v-model="editCandidateForm.EmailCMU"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!-- คำนำหน้า -->
              <p>คำนำหน้า</p>
              <v-text-field
                v-model="editCandidateForm.PreNameTha"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>ชื่อ</p>
              <v-text-field
                v-model="editCandidateForm.FirstNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>นามสกุล</p>
              <v-text-field
                v-model="editCandidateForm.LastNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>คณะ</p>
              <v-text-field
                v-model="editCandidateForm.OrganizationNameTha"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->

              <p>รายละเอียด</p>
              <v-textarea
                v-model="editCandidateForm.candidateDetail"
                outlined
                dense
                filled
              ></v-textarea>

            </v-col>
            <!--  -->
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" class="white--text mr-5" :to="{ path:'/event-detail/' + tbEventId }"> ย้อนกลับ </v-btn>
        <v-btn color="primary darken-1" class="white--text mr-5"  @click="detele()">ยกเลิกการลงสมัคร</v-btn>
        <v-btn color="primary darken-1" class="white--text"  @click="update()">แก้ไขข้อมูล</v-btn>
      </v-card-actions>
    </v-card>
    <!-- end::เมื่อเคยสมัคร -->

    <!-- begin::เมื่อไม่เคยสมัคร -->
    <v-card v-if="!checkExist">
      <v-card-title class="justify-center">
        <h2 class="mt-10">ลงทะเบียนเพื่อสมัครรับเลือกตั้ง</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="justify-center">
            <v-col cols="12" sm="4" md="8">
              <v-row class="justify-center">
                <v-img
                      max-height="150"
                      max-width="150"
                      :src="imageUrl"
                      lazy-src="https://cdn.discordapp.com/attachments/797746132813086740/867312131987996682/key-title-logo.png"
                />
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6" class="pa-0 mt-5 mb-5" >
                  <!--  -->
                  <v-file-input
                    v-model="image"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    truncate-length="7"
                    dense
                    outlined
                    label="Avatar"
                    class="pa-0 mt-1"
                    @click:clear="imageUrl = ''"
                    @change="onFileChange"
                  />
                  <!--  -->
                </v-col>
              </v-row>
            </v-col>

            <!--  -->
            <v-col cols="12" sm="6" md="8" class="pt-0">

              <!--  -->
              <p>รหัสนักศึกษา</p>
              <v-text-field
                v-model="regisCandidateForm.StudentID"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!--  -->
              <p>อีเมล</p>
              <v-text-field
                v-model="regisCandidateForm.EmailCMU"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->


              <!-- คำนำหน้า -->
              <p>คำนำหน้า</p>
              <v-text-field
                v-model="regisCandidateForm.PreNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>ชื่อ</p>
              <v-text-field
                v-model="regisCandidateForm.FirstNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>นามสกุล</p>
              <v-text-field
                v-model="regisCandidateForm.LastNameTha"
                outlined
                dense
              ></v-text-field>
              <!--  -->

              <!--  -->
              <p>คณะ</p>
              <v-text-field
                v-model="regisCandidateForm.OrganizationNameTha"
                outlined
                disabled
                dense
              ></v-text-field>
              <!--  -->

              <p>รายละเอียด</p>
              <v-textarea
                v-model="regisCandidateForm.candidateDetail"
                outlined
                dense
                filled
              ></v-textarea>


            </v-col>
            <!--  -->
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions >
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" class="white--text mr-5" :to="{ path:'/event-detail/' + tbEventId }"> ย้อนกลับ </v-btn>
        <v-btn color="primary darken-1" class="white--text " @click="save()"> ลงสมัคร </v-btn>
      </v-card-actions>
    </v-card>
    <!-- end::เมื่อไม่เคยสมัคร -->

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  props: ['tbEventId'],
  name: "RegisterCan",
  data() {
    return {
      // 
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
    };
  },
  mounted() {
    console.log("tbEventId : " + this.tbEventId);
    this.checkExistCandidate(this.tbEventId) 
  },
  methods: {
    ...mapActions("candidate", ["addCandidate", "checkExistCandidate","deteleCandidate","updateCandidate"]),
    onFileChange() {
      this.imageUrl = URL.createObjectURL(this.image);
    },
    close() {
      this.dialog = false;
    },
    save() {
      this.regisCandidateForm.TBEventId = this.tbEventId;
      this.addCandidate(this.regisCandidateForm, this.tbEventId);
    },
    update() {
      console.log("update : ")
      console.log(this.editCandidateForm);
      console.log(this.tbEventId)
      this.updateCandidate(this.editCandidateForm, this.tbEventId)
    },
    detele() {
      this.deteleCandidate(this.tbEventId);
    },
  },
  computed: {
    ...mapGetters('candidate',['regisCandidateForm','checkExist','candidate','editCandidateForm'])
  },
};
</script>

<style>
</style>
