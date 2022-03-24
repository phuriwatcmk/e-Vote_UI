<template>
  <div>
      <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        กรอก Private Key
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        ผลการนับคะแนน
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        ยืนยันประกาศผลคะแนน
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-auto"
          color="lighten-1 elevation-0"
        >
                <!-- ?begin::Title -->
        <v-card-title class="justify-center">
                          <span class="text-center">ถอดรหัสเพื่อนับผลคะแนนเสียง</span>
                        </v-card-title>
                        <div class="text-center grey--text ms-4 mt-n3">
                          กรอก Private Key ของท่าน :
                        </div>
                        <!-- *end::Title -->

                        <!-- ?begin::form -->
                        <v-card-text>
                          <v-container>
                            <v-row class="justify-center">
                              <v-col cols="12" sm="6" md="6">
                                <v-textarea
                                  outlined
                                  v-model="checkVoteForm.PrivateKey"
                                  name="input-7-4"
                                  label="กรอก Private Key"
                                  required
                                  @input="$v.checkVoteForm.PrivateKey.$touch()"
                                  @blur="$v.checkVoteForm.PrivateKey.$touch()"
                                  :error-messages="privateKeyError"
                                >
                                </v-textarea>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
        </v-card>
        <v-card-actions
        class="justify-center mt-n5"
        >
        <v-col cols="6">
        <v-btn
        color="primary"
        large
        block
        @click="checkFormStep1()"
        >
          ตรวจสอบ
        </v-btn>
        </v-col>
        </v-card-actions>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12 mx-auto"
          color="lighten-1 elevation-0"
        >
        <v-card-title class="justify-center">
          <span class="text-center">ผลการนับคะแนนเสียง</span>
        </v-card-title>
        <div id="chart">
          <apexchart
            width="100%"
            height="350"
            type="bar"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          </div>
        </v-card>


        <v-btn
        text
        @click="resetInput()">
          Back
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12 mx-auto"
          color="lighten-1 elevation-0"
        >
        <v-card-title class="justify-center">
          <span class="text-center">ยืนยันผลการนับคะแนนเสียง</span>
        </v-card-title>
        <div id="chart">
          <apexchart
            width="100%"
            height="350"
            type="bar"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          </div>
        </v-card>
        
        <v-btn
        text
        @click="e1 = 2">
          Back
        </v-btn>
        <v-btn
          color="primary"
          @click="publishResult()"
        >
          Continue
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ["tbEventId"], // get from parameter
  name: "DecryptVotes",
  mixins: [validationMixin],
  validations: {
    checkVoteForm: {
      PrivateKey: { required },
        },
    },
  data () {
    return {
      e1: 1,
      checkVoteForm: {
        TBEventId: this.tbEventId,
        PrivateKey: '',
        },
      series: [
        {
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        },
      ],
      candidatenames: null,
      chartOptions: {
        chart: {
          animations: {
            speed: 200
          }
        },
        noData: {
          text: 'Loading...'
          },
        plotOptions: {
          bar: {
            borderRadius: 4,
            distributed: true
            // horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['1'],
        },
      },
      }
  },
  mounted() {
    this.getAllcandidateByEvent(this.tbEventId)
  },
  computed: {
    ...mapGetters("candidate",["allCandidate"]),
    ...mapGetters("event",["event"]),
    ...mapGetters("result",["ResultList"]),

    privateKeyError() {
      const errors = []
      if (!this.$v.checkVoteForm.PrivateKey.$dirty) return errors
      !this.$v.checkVoteForm.PrivateKey.required && errors.push('จำเป็นต้องใส่ "PrivateKey"')
      return errors
        },
  },
  methods: {
    ...mapActions("candidate",["getAllcandidateByEvent"]),
    ...mapActions('result',['checkResult']),

    checkFormStep1() {
      if(this.$v.checkVoteForm.PrivateKey.$invalid) {
        this.e1 = 1;
        this.$swal('กรุณากรอก Private Key', '', 'error')
        return;
      }
      this.checkVoteEvent();
    },
    updateChart() {
      const values = Object.values(this.ResultList);
      const pushData = [];
      pushData.push(values.toString())
      // In the same way, update the series option
      this.series = [{
        data: pushData
      }]
      this.chartOptions = {
      theme: {
        palette: 'palette2'
        },
        xaxis: {
          categories: this.candidatenames
    }
      }
    },
    replaceKey(PrivateKey) {
      var Lines = this.removeLines(PrivateKey)
      var Prefix = Lines.replace('-----BEGIN RSA PRIVATE KEY-----', '')
      this.checkVoteForm.PrivateKey = Prefix.replace('-----END RSA PRIVATE KEY-----', '')
    },
    removeLines(str) {
        return str.replace(/(\r\n|\n|\r)/gm, "")
    },
    async checkVoteEvent() {
      this.replaceKey(this.checkVoteForm.PrivateKey)
      await this.checkResult({ ...this.checkVoteForm })
      // console.warn(this.allCandidate);
      this.candidatenames = await this.allCandidate.flatMap((user) => {
        return user.firstNameTha;
      });
      if(Object.keys(this.ResultList).length === 0){
        this.e1 = 1;
        return;
      }
      this.updateChart();
      this.e1 = 2;
    },
    resetInput() {
      this.checkVoteForm.PrivateKey = "";
      this.e1 = 1;
    },
    publishResult() {
      this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId);
      this.$swal('ประกาศผลคะแนนสำเร็จ', '', 'success');
    },
  },

}
</script>

<style>

</style>