<template>
  <div>
    <v-container
      fluid
      class="white lighten-5 d-block pl-9 elevation-2"
      rounded="lg"
    >
      <h1 class="mb-1">ผลการลงคะแนนเสียง</h1>
        <div>
            <v-row>
              <v-col col="12" md="6">
                <div id="chart">
                  <apexchart
                    width="100%"
                    height="350"
                    type="bar"
                    :options="chartOptions"
                    :series="series"
                  ></apexchart>
                  </div>
              </v-col>
            </v-row>
        </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ["tbEventId"],
  name: "Result",
  data() {
    return {
      series: [
        {
          data: [],
        },
      ],
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
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "South Korea",
          ],
        },
      },
    };
  },
  mounted(){
    this.checkResult();
    this.getAllcandidateByEvent(this.tbEventId)
    this.updateChart();
  },
  computed: {
    ...mapGetters("candidate",["allCandidate"]),
    ...mapGetters("event",["event"]),
    ...mapGetters("result",["ResultList","checkExist"]),

  },
  methods: {
    ...mapActions("candidate",["getAllcandidateByEvent"]),
    async updateChart() {
      this.candidatenames = await this.allCandidate.flatMap((user) => {
        return user.firstNameTha+' '+user.lastNameTha;
      });
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
    async checkResult() {
      if(!this.checkExist) { 
        this.$router.push(this.$route.query.redirect || '/event-detail/'+ this.tbEventId).then(this.$swal('ยังไม่ถึงช่วงประกาศผลคะแนน', '', 'error'));
        } else {
          this.$swal('การประกาศผลการลงคะแนนเสียง', 'หัวข้อ: '+ this.event.eventTitle, 'success');
          }
    }
  },

};
</script>

<style></style>
