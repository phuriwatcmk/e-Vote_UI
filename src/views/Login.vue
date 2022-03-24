<template>
    <v-app id="login" class="secondary">
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4 lg4>
                    <v-card class="elevation-1 pa-3">
                        <v-card-text>
                            <div class="layout column align-center">
                                <img src="../assets/key-title-logo.png" alt="Vue Material Admin" width="180" height="180">
                                <h1 class="flex my-4 accent--text">CMU e-Vote</h1>
                                <h2 class="flex my-4 primary--text text-center">ต้นแบบระบบ e-Vote </h2>
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn class= "white--text" color="#C490E4" :href="apiUrl +'/api/login'" >Login with CMU account</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import env from '../_config/env'

export default {
    name: "Login",
    data() {
        return {
            apiUrl: env.apiUrl
        }
    },
    methods: {
    },
    mounted() {
        console.log(process.env.VUE_APP_ROOT_API)
    }
}
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>