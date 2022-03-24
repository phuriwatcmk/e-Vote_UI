<template>
    <div>
        <v-container fluid class="white lighten-5 elevation-2" rounded="lg">
        <v-row class="mb-0 mt-2 ml-2">
            <v-col><h2>ข้อมูลส่วนตัว</h2></v-col>
        </v-row>
        <v-divider></v-divider>
        <v-col>
            <p><span class="text-title">รหัสนักศึกษา :</span> {{ account.user.studentID }} </p>
            <p><span class="text-title">Email :</span> {{ account.user.emailCMU }}</p>
            <p><span class="text-title">ชื่อภาษาอังกฤษ :</span> {{ account.user.preNameEng }} {{ account.user.firstNameEng }} {{ account.user.lastNameEng }}</p>
            <p><span class="text-title">ชื่อภาษาไทย :</span> {{ account.user.preNameTha }} {{ account.user.firstNameTha }} {{ account.user.lastNameTha }}</p>
            <p><span class="text-title">คณะ :</span> {{ account.user.organizationNameTha }} ( {{ account.user.organizationNameEng }} )</p>
        </v-col>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Profile',
    computed: {
        ...mapState({
            account: state => state.account
        })
    }
}
</script>

<style>

</style>