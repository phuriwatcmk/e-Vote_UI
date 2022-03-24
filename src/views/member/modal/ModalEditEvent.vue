<template>
  <span>
    <v-dialog v-model="dialogEditEvent" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
            >
            mdi-pencil 
            </v-icon>
        </template>
        <v-card>
            <v-card-title>
                <h1><span>แก้ไขโครงการเลือกตั้ง</span></h1>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <!-- ?begin::ชื่อโครงการเลือกตั้ง -->
                    <v-col cols="12" sm="6" md="12">
                        <v-text-field
                            v-model="editEventForm.eventTitle"
                            dense
                            label="ชื่อโครงการเลือกตั้ง"
                            required
                            @input="$v.editEventForm.eventTitle.$touch()"
                            @blur="$v.editEventForm.eventTitle.$touch()"
                            :error-messages="EventTitleError"
                        >
                        </v-text-field>
                    </v-col>
                    <!-- ?end::ชื่อโครงการเลือกตั้ง -->

                    <!-- ?begin::ประธานการเลือกตั้ง -->
                    <v-col cols="12" sm="6" md="12">
                        <v-textarea
                            filled
                            v-model="editEventForm.eventDetail"
                            label="รายละเอียด"
                            required
                            @input="$v.editEventForm.eventDetail.$touch()"
                            @blur="$v.editEventForm.eventDetail.$touch()"
                            :error-messages="EventDetailError"
                        >
                        </v-textarea>
                    </v-col>
                    <!-- *end::ประธานการเลือกตั้ง -->
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
                                    <h1>ช่วงเวลาการเลือกตั้ง</h1>
                                </v-col>
                                <v-col cols="5" class="ml-5">
                                    <v-row>
                                        <h3><span>เวลาเริ่มการเลือกตั้ง</span></h3>
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
                                                    label="วันที่เริ่มการเลือกตั้ง"
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
                                                    label="เวลาที่เริ่มการเลือกตั้ง"
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
                                        <h3><span>เวลาจบการเลือกตั้ง</span></h3>
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
                                                label="วันที่จบการเลือกตั้ง"
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
                                                label="เวลาที่จบการลงทะเบียน"
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
            <v-card-actions>
                <v-btn color="blue-grey" class="ma-2 white--text"
                    @click="closeModalAddEvent()"
                > Cancel </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success"
                    @click="updEvent()"
                > แก้ไข </v-btn>
                <!-- createEvent() -->
            </v-card-actions>
        </v-card>
        
    </v-dialog>
  </span>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from "vuex";

export default {
    props: ['tbEventId'],
    name: 'ModalEditEvent',
    mixins: [validationMixin],
    validations: {
        editEventForm: {
            eventTitle: { required },
            eventDetail: { required }
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
            dialogEditEvent: false,

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
        }
    },
    watch: {
        dialogEditEvent: function() {
            if(this.dialogEditEvent == true) { 
                this.getEventByIdLocal(this.tbEventId); 

                console.log("123")
                console.log(this.editEventForm);
                this.rangeDateStartReg = this.editEventForm.eventRegisterStart.split("T")[0];
                this.rangeTimeStartReg = this.editEventForm.eventRegisterStart.split("T")[1];
                this.rangeDateEndReg = this.editEventForm.eventRegisterEnd.split("T")[0];
                this.rangeTimeEndReg = this.editEventForm.eventRegisterEnd.split("T")[1];

                this.rangeDateStartVote = this.editEventForm.eventVotingStart.split("T")[0];
                this.rangeTimeStartVote = this.editEventForm.eventVotingStart.split("T")[1];
                this.rangeDateEndVote = this.editEventForm.eventVotingEnd.split("T")[0];
                this.rangeTimeEndVote = this.editEventForm.eventVotingEnd.split("T")[1];

            }
        }
    },
    mounted() { // do when load "/" page

    },
    created() {

    },
    computed: {
        ...mapGetters('event',['event']),
        editEventForm() {
            return this.event;
        },
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
        // editEvent: { 
        //     set() { return null; }
        // },
        EventTitleError() {
            const errors = []
            if (!this.$v.editEventForm.eventTitle.$dirty) return errors
            !this.$v.editEventForm.eventTitle.required && errors.push('จำเป็นต้องใส่ "ชื่อโครงการเลือกตั้ง"')
            return errors
        },

        EventDetailError() {
            const errors = []
            if (!this.$v.editEventForm.eventDetail.$dirty) return errors
            !this.$v.editEventForm.eventDetail.required && errors.push('จำเป็นต้องใส่ "รายละเอียด"')
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
            !this.$v.textDateStartVote.required && errors.push('จำเป็นต้องใส่ "วันที่เริ่มการเลือกตั้ง"')
            return errors
        },

        errorStartTimeVote() {
            const errors = []
            if (!this.$v.textTimeStartVote.$dirty) return errors
            !this.$v.textTimeStartVote.required && errors.push('จำเป็นต้องใส่ "เวลาที่เริ่มการเลือกตั้ง"')
            return errors
        },

        errorEndDateVote() {
            const errors = []
            if (!this.$v.textDateEndVote.$dirty) return errors
            !this.$v.textDateEndVote.required && errors.push('จำเป็นต้องใส่ "วันที่จบการเลือกตั้ง"')
            return errors
        },

        errorEndTimeVote() {
            const errors = []
            if (!this.$v.textTimeEndVote.$dirty) return errors
            !this.$v.textTimeEndVote.required && errors.push('จำเป็นต้องใส่ "เวลาที่จบการเลือกตั้ง"')
            return errors
        },
    },
    // watch: {
    //     step: function() {
    //         if(this.step === 2) {
    //             console.log("step is changing ...");
    //             this.setDateEvent()
    //         }
    //     }
    // },
    methods: {
        ...mapActions("event", ["updateEvent","getEventByIdLocal"]), // แทนการใช้ dispatch
        // submit
        // async handleValueForm() {
        //     return await this.allEvents.filter(event => event.tbEventId == this.tbEventId);
        // },
        updEvent() {
            if(this.checkForm()) {
                this.$v.$touch();
                return;
            }
            this.setDateEvent()
            this.closeModalAddEvent()
            this.updateEvent({ ...this.editEventForm });

        },
        closeModalAddEvent() {
            this.changingTodefault();
            this.dialogEditEvent = false;
        },
        setDateEvent() {
            // console.log(this.dateRegisterRange[0])
            this.editEventForm.EventRegisterStart = this.rangeDateStartReg + "T" + this.rangeTimeStartReg;
            this.editEventForm.EventRegisterEnd = this.rangeDateEndReg + "T" + this.rangeTimeEndReg;
            this.editEventForm.EventVotingStart = this.rangeDateStartVote + "T" + this.rangeTimeStartVote;
            this.editEventForm.EventVotingEnd = this.rangeDateEndVote + "T" + this.rangeTimeEndVote;

            // this.editEventForm.EventRegisterStart = this.dateRegisterRange[0];
            // this.editEventForm.EventRegisterEnd = this.dateRegisterRange[1];
            // this.editEventForm.EventVotingStart = this.dateVotingRange[0];
            // this.editEventForm.EventVotingEnd = this.dateVotingRange[1];
        },
        checkForm() {
            if(
                this.$v.editEventForm.eventTitle.$invalid || 
                this.$v.editEventForm.eventDetail.$invalid || 
                this.$v.textDateStartReg.$invalid || 
                this.$v.textTimeStartReg.$invalid ||
                this.$v.textDateEndReg.$invalid ||
                this.$v.textTimeEndReg.$invalid ||
                this.$v.textDateStartVote.$invalid ||
                this.$v.textTimeStartVote.$invalid ||
                this.$v.textDateEndVote.$invalid ||
                this.$v.textTimeEndVote.$invalid
            ) {
                return true;
            }
            return false;
        },
        changingTodefault() {
            // change to default ค่า date
            this.dateRegisterRange = [];
            this.dateVotingRange = [];
        }
    }
}
</script>

<style>

</style>