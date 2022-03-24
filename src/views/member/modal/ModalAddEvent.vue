<template>
      <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                เพิ่มโครงการลงคะแนน
              </v-btn>
            </template>
            <template>
              <v-stepper v-model="step">
 
                <!-- # begin::header -->
                <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1">กรอกรายละเอียด</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="step > 2" step="2">กรอก public key</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">ผลลัพธ์</v-stepper-step>
                </v-stepper-header>
                <!-- # end::header -->

                <!-- # begin::form  -->
                <v-stepper-items>

                    <!-- ?begin::Step 1 -->
                    <v-stepper-content step="1">
                      <v-card>
                        <!-- ?begin::Title -->
                        <v-card-title>
                            <h1><span>เพิ่มโครงการลงคะแนน</span></h1>
                        </v-card-title>
                        <!-- *end::Title -->

                        <!-- ?begin::content -->
                        <v-card-text>
                          <v-container>
                            <v-row>

                                <!-- ?begin::ชื่อโครงการลงคะแนน -->
                                <v-col cols="12" sm="6" md="12">
                                    <v-text-field
                                        v-model="addEventForm.EventTitle"
                                        dense
                                        label="ชื่อโครงการลงคะแนน"
                                        required
                                        @input="$v.addEventForm.EventTitle.$touch()"
                                        @blur="$v.addEventForm.EventTitle.$touch()"
                                        :error-messages="EventTitleError"
                                    >
                                    </v-text-field>
                                </v-col>
                                <!-- ?end::ชื่อโครงการลงคะแนน -->

                                <!-- ?begin::ประธานการลงคะแนน -->
                                <v-col cols="12" sm="6" md="12">
                                    <v-textarea
                                        filled
                                        v-model="addEventForm.EventDetail"
                                        label="รายละเอียด"
                                        required
                                        @input="$v.addEventForm.EventDetail.$touch()"
                                        @blur="$v.addEventForm.EventDetail.$touch()"
                                        :error-messages="EventDetailError"
                                    >
                                    </v-textarea>
                                </v-col>
                                <!-- *end::ประธานการลงคะแนน -->
                                <!-- ?begin::Register -->
                                <v-col cols="12">
                                    <h1>ช่วงเวลาการลงทะเบียน</h1>
                                </v-col>
                                <v-col cols="5" class="ml-5">
                                    <v-row>
                                        <h3><span>เวลาเริ่มการลงทะเบียน</span></h3>
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input Start Date register -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalStartDateReg"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                                <v-text-field
                                                    @click="click"
                                                    v-model="textDateStartReg"
                                                    label="วันที่เริ่มการลงทะเบียน"
                                                    required
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    @input="$v.dateRegisterText.$touch()"
                                                    :error-messages="errorStartDateReg"
                                                ></v-text-field>
                                            </template>
                                            <!-- <span class="text-title">ช่วงเวลาลงทะเบียน</span> -->
                                            <v-date-picker
                                                locale="th"
                                                v-model="rangeDateStartReg"
                                                scrollable
                                                actions
                                                
                                            >
                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn
                                                    color="primary"
                                                    @click="modalDateRegister = false"
                                                    >Cancel</v-btn
                                                > -->
                                                <v-btn
                                                    color="primary"
                                                    @click="modalStartDateReg = false"
                                                    >OK</v-btn
                                                >
                                                </v-card-actions>
                                            </v-date-picker>
                                        </v-dialog>
                <!-- *end::input Start Date register -->
                                    </v-row>
                                        <!-- <v-spacer></v-spacer> -->
                                        <!--  sm="6" md="12" -->
                                    <v-row>
                <!-- ?begin::input Start Time register  -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalStartTimeReg"
                                        >
                                        <template v-slot:activator="{ on: { click } }">
                                            <v-text-field
                                            @click="click"
                                            v-model="textTimeStartReg"
                                            label="เวลาที่เริ่มการลงทะเบียน"
                                            required
                                            prepend-icon="mdi-clock-outline"
                                            readonly
                                            @input="$v.dateRegisterText.$touch()"
                                            :error-messages="errorStartTimeReg"
                                            ></v-text-field>
                                        </template>
                                        <!-- <span class="text-title">ช่วงเวลาลงทะเบียน</span> -->
                                        <v-time-picker
                                            format="ampm"
                                            v-model="rangeTimeStartReg"
                                        >
                                            <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <!-- <v-btn
                                                color="primary"
                                                @click="modalDateRegister = false"
                                                >Cancel</v-btn
                                            > -->
                                            <v-btn
                                                color="primary"
                                                @click="modalStartTimeReg = false"
                                                >OK</v-btn
                                            >
                                            </v-card-actions>
                                        </v-time-picker>
                                        </v-dialog>
                <!-- *end::input Start Time register -->
                                    </v-row>
                                </v-col>
                                <!-- *end::date ลงทะเบียน -->

                                <!-- ?begin::time ลงทะเบียน -->
                                <v-spacer></v-spacer>
                                <v-col cols="5" class="mr-5">
                                    <v-row>
                                        <h3><span>เวลาจบการลงทะเบียน</span></h3>
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input End Date register -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalEndDateReg"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                                <v-text-field
                                                    @click="click"
                                                    v-model="textDateEndReg"
                                                    label="วันที่จบการลงทะเบียน"
                                                    required
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    @input="$v.dateRegisterText.$touch()"
                                                    :error-messages="errorEndDateReg"
                                                ></v-text-field>
                                            </template>
                                            <!-- <span class="text-title">ช่วงเวลาลงทะเบียน</span> -->
                                            <v-date-picker
                                                locale="th"
                                                v-model="rangeDateEndReg"
                                                scrollable
                                                actions
                                                
                                            >
                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn
                                                    color="primary"
                                                    @click="modalDateRegister = false"
                                                    >Cancel</v-btn
                                                > -->
                                                <v-btn
                                                    color="primary"
                                                    @click="modalEndDateReg = false"
                                                    >OK</v-btn
                                                >
                                                </v-card-actions>
                                            </v-date-picker>
                                        </v-dialog>
                <!-- *end::input End Date register  -->
                                    </v-row>
                                        <!-- <v-spacer></v-spacer> -->
                                    <v-row>
                <!-- ?begin::input End Time register -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalEndTimeReg"
                                        >
                                        <template v-slot:activator="{ on: { click } }">
                                            <v-text-field
                                                @click="click"
                                                v-model="textTimeEndReg"
                                                label="เวลาที่จบการลงทะเบียน"
                                                required
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                @input="$v.dateRegisterText.$touch()"
                                                :error-messages="errorEndTimeReg"
                                            ></v-text-field>
                                        </template>
                                        <!-- <span class="text-title">ช่วงเวลาลงทะเบียน</span> -->
                                        <v-time-picker
                                            format="ampm"
                                            v-model="rangeTimeEndReg"
                                            
                                        >
                                            <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <!-- <v-btn
                                                color="primary"
                                                @click="modalDateRegister = false"
                                                >Cancel</v-btn
                                            > -->
                                            <v-btn
                                                color="primary"
                                                @click="modalEndTimeReg = false"
                                                >OK</v-btn
                                            >
                                            </v-card-actions>
                                        </v-time-picker>
                                        </v-dialog>
                <!-- *end::input End Time register -->
                                    </v-row>
                                </v-col>
<!-- *end::Register -->

<!-- ?begin::Voting -->
                                <v-col cols="12">
                                    <h1>ช่วงเวลาการลงคะแนน</h1>
                                </v-col>
                                <v-col cols="5" class="ml-5">
                                    <v-row>
                                        <h3><span>เวลาเริ่มการลงคะแนน</span></h3>
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input Start Date  Voting -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalStartDateVote"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                                <v-text-field
                                                    @click="click"
                                                    v-model="textDateStartVote"
                                                    label="วันที่เริ่มการลงคะแนน"
                                                    required
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    @input="$v.dateVotingText.$touch()"
                                                    :error-messages="errorStartDateVote"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                locale="th"
                                                v-model="rangeDateStartVote"
                                                scrollable
                                                actions
                                                
                                            >
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                    color="primary"
                                                    @click="modalStartDateVote = false"
                                                    >OK</v-btn
                                                    >
                                                </v-card-actions>
                                            </v-date-picker>
                                        </v-dialog>
                <!-- *end::input Start Date  Voting -->
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input Start Time  Voting -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalStartTimeVote"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                                <v-text-field
                                                    @click="click"
                                                    v-model="textTimeStartVote"
                                                    label="เวลาที่เริ่มการลงคะแนน"
                                                    required
                                                    prepend-icon="mdi-clock-outline"
                                                    readonly
                                                    @input="$v.dateVotingText.$touch()"
                                                    :error-messages="errorStartTimeVote"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="ampm"
                                                v-model="rangeTimeStartVote"
                                            >
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        color="primary"
                                                        @click="modalStartTimeVote = false"
                                                    >OK</v-btn
                                                    >
                                                </v-card-actions>
                                            </v-time-picker>
                                        </v-dialog>
                <!-- *end::input Start Time  Voting -->
                                    </v-row>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="5" class="mr-5">
                                    <v-row>
                                        <h3><span>เวลาจบการลงคะแนน</span></h3>
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input End Date Voting -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalEndDateVote"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                            <v-text-field
                                                @click="click"
                                                v-model="textDateEndVote"
                                                label="วันที่จบการลงคะแนน"
                                                required
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                @input="$v.dateVotingText.$touch()"
                                                :error-messages="errorEndDateVote"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                locale="th"
                                                v-model="rangeDateEndVote"
                                                scrollable
                                                actions
                                                
                                            >
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn
                                                color="primary"
                                                @click="modalDateVoting = false"
                                                >Cancel</v-btn
                                                > -->
                                                <v-btn
                                                color="primary"
                                                @click="modalEndDateVote = false"
                                                >OK</v-btn
                                                >
                                            </v-card-actions>
                                            </v-date-picker>
                                        </v-dialog>
                <!-- *end::input End Date Voting -->
                                    </v-row>
                                    <v-row>
                <!-- ?begin::input End Time Voting -->
                                        <v-dialog
                                            max-width="300px"
                                            persistent
                                            v-model="modalEndTimeVote"
                                        >
                                            <template v-slot:activator="{ on: { click } }">
                                            <v-text-field
                                                @click="click"
                                                v-model="textTimeEndVote"
                                                label="เวลาที่จบการลงคะแนน"
                                                required
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                @input="$v.dateVotingText.$touch()"
                                                :error-messages="errorEndTimeVote"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="ampm"
                                                v-model="rangeTimeEndVote"
                                            >
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <!-- <v-btn
                                                color="primary"
                                                @click="modalDateVoting = false"
                                                >Cancel</v-btn
                                                > -->
                                                <v-btn
                                                color="primary"
                                                @click="modalEndTimeVote = false"
                                                >OK</v-btn
                                                >
                                            </v-card-actions>
                                            </v-time-picker>
                                        </v-dialog>
                <!-- *end::input End Time Voting -->
                                    </v-row>
                                </v-col>
<!-- *end::Voting -->
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <!-- *end::content -->

                        <!-- ?begin::actions -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                          <v-btn color="accent" class="ma-2 white--text"
                            @click="closeModalAddEvent"
                          >
                            ยกเลิก
                          </v-btn>
                          <!-- <v-spacer></v-spacer> -->
                          <v-btn color="primary"
                            @click="checkFormStep1()"
                          >
                          <!-- step = 2 ไปที่ step 2 -->
                            ต่อไป
                          </v-btn>
                        </v-card-actions>
                        <!-- *end::actions -->

                      </v-card>
                    </v-stepper-content>
                    <!-- *end::Step 1 -->


                    <!-- ?begin::Step 2 -->
                    <v-stepper-content step="2">
                      <v-card class="justify-center">
                        <!-- ?begin::Title -->
                        <v-card-title class="justify-center">
                          <p class="mb-0">ลงทะเบียนโครงการ</p>
                        </v-card-title>
                        <div class="text-center grey--text ms-4 mt-n3">
                          กรอก Public Key ของท่าน :
                        </div>
                        <!-- *end::Title -->

                        <!-- ?begin::form -->
                        <v-card-text>
                          <v-container>
                            <v-row class="justify-center">
                              <v-col cols="12" sm="6" md="6">
                                <v-textarea
                                  outlined
                                  v-model="addEventForm.publicKey"
                                  name="input-7-4"
                                  label="กรอก Public Key"
                                  required
                                  @input="$v.addEventForm.publicKey.$touch()"
                                  @blur="$v.addEventForm.publicKey.$touch()"
                                  :error-messages="publicKeyError"
                                >
                                </v-textarea>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <!-- *end::form -->

                        <!-- ?begin::actions -->
                        <v-card-actions>
                          <v-btn color="blue-grey" class="ma-2 white--text" @click="step = 1">
                            Back
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" @click="checkFormStep2()">
                            Next
                          </v-btn>
                        </v-card-actions>
                        <!-- *end::actions -->

                      </v-card>
                    </v-stepper-content>
                    <!-- *end::Step 2 -->


                    <!-- ?begin::Step 3 -->
                    <v-stepper-content step="3">
                      <v-card class="card-trans mb-12" color="" height="200px" elevation="0">
                        <v-list-item >
                          <v-list-item-content>
                            <div class="text-h5 mb-1">
                              {{ addEventForm.EventTitle }}
                            </div>
                            <v-list-item-title class="text-overline mb-4">
                                <p>รายละเอียด : {{ addEventForm.EventDetail }}</p>
                                <p>เวลาเริ่มการลงทะเบียน : {{ addEventForm.EventRegisterStart }}</p>
                                <p>เวลาจบการลงทะเบียน : {{ addEventForm.EventRegisterEnd }}</p>
                                <p>เวลาเริ่มการโหวด : {{ addEventForm.EventVotingStart }}</p>
                                <p>เวลาจบการโหวด : {{ addEventForm.EventVotingEnd }}</p>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                      <v-card-actions>
                        <v-btn color="blue-grey" class="ma-2 white--text"
                          @click="step = 2"
                        > Cancel </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success"
                          @click="createEvent()"
                        > Save </v-btn>
                      <!-- createEvent() -->
                      </v-card-actions>
                      

                    </v-stepper-content>
                    <!-- *end::Step 3 -->



                </v-stepper-items>
                <!-- # end::form -->

              </v-stepper>
            </template>
          </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from "vuex";
// import Datetimepicker from '../form/datetimepicker.vue';

export default {
    props: ['form'],
    components: {  },
    name: 'ModalAddEvent',
    mixins: [validationMixin],
    validations: {
        addEventForm: {
            EventTitle: { required },
            EventDetail: { required },
            publicKey: { required }
        },
        textDateStartReg: { required },
        textTimeStartReg: { required },
        textDateEndReg: { required },
        textTimeEndReg: { required },
        textDateStartVote: { required },
        textTimeStartVote: { required },
        textDateEndVote: { required },
        textTimeEndVote: { required }
    },
    data() {
        return {
        // dialog
            step: 1,
            dialog: false,

            // register modal
            modalStartDateReg: false,
            modalStartTimeReg: false,
            modalEndDateReg: false,
            modalEndTimeReg: false,
            // voting modal
            modalStartDateVote: false,
            modalStartTimeVote: false,
            modalEndDateVote: false,
            modalEndTimeVote: false,
            
            // v-date-picker
            rangeDateStartReg: null,
            rangeTimeStartReg: null,
            rangeDateEndReg: null,
            rangeTimeEndReg: null,
            rangeDateStartVote: null,
            rangeTimeStartVote: null,
            rangeDateEndVote: null,
            rangeTimeEndVote: null,
            

        // Form
            addEventForm: {
                EventTitle: '',
                EventDetail: '',
                EventRegisterStart: '',
                EventRegisterEnd: '',
                EventVotingStart: '',
                EventVotingEnd: '',
                publicKey: '',
            },
        }
    },
    computed: {

        // v-text-field
        textDateStartReg: {
            get() { return this.rangeDateStartReg; },
            set() { return null; }
        },
        textTimeStartReg: {
            get() { return this.rangeTimeStartReg; },
            set() { return null; }
        },
        textDateEndReg: {
            get() { return this.rangeDateEndReg; },
            set() { return null; }
        },
        textTimeEndReg: {
            get() { return this.rangeTimeEndReg; },
            set() { return null; }
        },
        textDateStartVote: {
            get() { return this.rangeDateStartVote; },
            set() { return null; }
        },
        textTimeStartVote: {
            get() { return this.rangeTimeStartVote; },
            set() { return null; }
        },
        textDateEndVote: {
            get() { return this.rangeDateEndVote; },
            set() { return null; }
        },
        textTimeEndVote: {
            get() { return this.rangeTimeEndVote; },
            set() { return null; }
        },

        // Error
        EventTitleError() {
            const errors = []
            if (!this.$v.addEventForm.EventTitle.$dirty) return errors
            !this.$v.addEventForm.EventTitle.required && errors.push('จำเป็นต้องใส่ "ชื่อโครงการลงคะแนน"')
            return errors
        },

        EventDetailError() {
            const errors = []
            if (!this.$v.addEventForm.EventDetail.$dirty) return errors
            !this.$v.addEventForm.EventDetail.required && errors.push('จำเป็นต้องใส่ "รายละเอียด"')
            return errors
        },
// error date
        errorStartDateReg() {
            const errors = []
            if (!this.$v.textDateStartReg.$dirty) return errors
            !this.$v.textDateStartReg.required && errors.push('จำเป็นต้องใส่ "วันที่เริ่มการลงทะเบียน"')
            return errors
        },

        errorStartTimeReg() {
            const errors = []
            if (!this.$v.textTimeStartReg.$dirty) return errors
            !this.$v.textTimeStartReg.required && errors.push('จำเป็นต้องใส่ "เวลาที่เริ่มการลงทะเบียน"')
            return errors
        },

        errorEndDateReg() {
            const errors = []
            if (!this.$v.textDateEndReg.$dirty) return errors
            !this.$v.textDateEndReg.required && errors.push('จำเป็นต้องใส่ "วันที่จบการลงทะเบียน"')
            return errors
        },

        errorEndTimeReg() {
            const errors = []
            if (!this.$v.textTimeEndReg.$dirty) return errors
            !this.$v.textTimeEndReg.required && errors.push('จำเป็นต้องใส่ "เวลาที่จบการลงทะเบียน"')
            return errors
        },

        errorStartDateVote() {
            const errors = []
            if (!this.$v.textDateStartVote.$dirty) return errors
            !this.$v.textDateStartVote.required && errors.push('จำเป็นต้องใส่ "วันที่เริ่มการลงคะแนน"')
            return errors
        },

        errorStartTimeVote() {
            const errors = []
            if (!this.$v.textTimeStartVote.$dirty) return errors
            !this.$v.textTimeStartVote.required && errors.push('จำเป็นต้องใส่ "เวลาที่เริ่มการลงคะแนน"')
            return errors
        },

        errorEndDateVote() {
            const errors = []
            if (!this.$v.textDateEndVote.$dirty) return errors
            !this.$v.textDateEndVote.required && errors.push('จำเป็นต้องใส่ "วันที่จบการลงคะแนน"')
            return errors
        },

        errorEndTimeVote() {
            const errors = []
            if (!this.$v.textTimeEndVote.$dirty) return errors
            !this.$v.textTimeEndVote.required && errors.push('จำเป็นต้องใส่ "เวลาที่จบการลงคะแนน"')
            return errors
        },

        //
        publicKeyError() {
            const errors = []
            if (!this.$v.addEventForm.publicKey.$dirty) return errors
            !this.$v.addEventForm.publicKey.required && errors.push('จำเป็นต้องใส่ "PublicKey"')
            return errors
        }

    },
    watch: {
        step: function() {
            if(this.step === 2) {
                console.log("step is changing ...");
                console.log(this.dateRegisterRange);
                this.setDateEvent()
            }
        }
    },
    methods: {
        ...mapActions("event", ["addEvent"]),
        // submit
        async createEvent() {
            this.replaceKey(this.addEventForm.publicKey)
            await this.addEvent({ ...this.addEventForm })
            this.closeModalAddEvent()
        },
        replaceKey(PublicKey) {
            var Lines = this.removeLines(PublicKey)
            var Prefix = Lines.replace('-----BEGIN PUBLIC KEY-----', '')
            this.addEventForm.publicKey = Prefix.replace('-----END PUBLIC KEY-----', '')
        },
        removeLines(str) {
            return str.replace(/(\r\n|\n|\r)/gm, "")
        },
        closeModalAddEvent() {
            this.dialog = false;
            this.addEventForm.EventTitle = '';
            this.addEventForm.EventDetail = '';
            this.addEventForm.publicKey = '';
            this.addEventForm.EventRegisterStart = '';
            this.addEventForm.EventRegisterEnd = '';
            this.addEventForm.EventVotingStart = '';
            this.addEventForm.EventVotingEnd = '';
            this.rangeDateStartReg= null,
            this.rangeTimeStartReg= null,
            this.rangeDateEndReg= null,
            this.rangeTimeEndReg= null,
            this.rangeDateStartVote= null,
            this.rangeTimeStartVote= null,
            this.rangeDateEndVote= null,
            this.rangeTimeEndVote= null,
            this.step = 1;

        },
        setDateEvent() {

            this.addEventForm.EventRegisterStart = this.rangeDateStartReg + "T" + this.rangeTimeStartReg;
            this.addEventForm.EventRegisterEnd = this.rangeDateEndReg + "T" + this.rangeTimeEndReg;
            this.addEventForm.EventVotingStart = this.rangeDateStartVote + "T" + this.rangeTimeStartVote;
            this.addEventForm.EventVotingEnd = this.rangeDateEndVote + "T" + this.rangeTimeEndVote;

        },
        checkFormStep1() {
            if(
                this.$v.addEventForm.EventTitle.$invalid || 
                this.$v.addEventForm.EventDetail.$invalid || 
                this.$v.textDateStartReg.$invalid || 
                this.$v.textTimeStartReg.$invalid ||
                this.$v.textDateEndReg.$invalid ||
                this.$v.textTimeEndReg.$invalid ||
                this.$v.textDateStartVote.$invalid ||
                this.$v.textTimeStartVote.$invalid ||
                this.$v.textDateEndVote.$invalid ||
                this.$v.textTimeEndVote.$invalid
            ) {
                this.step = 1;
                this.$v.$touch();
                return;
            }
            this.step = 2;
        },
        checkFormStep2() {
            if(this.$v.addEventForm.publicKey.$invalid) {
                this.step = 2;
                return;
            }
            this.step = 3;
        }
    }
}
</script>

<style scoped>



</style>