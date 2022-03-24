<template>
  <div class="section">
    <router-view />
  </div>
</template>

<script>
// import env from './_config/env';

export default {
  name: "App",
  mounted() {
    console.log(`Working on '${process.env.VUE_APP_MODE}' mode`);
    // console.log(`apiUrl is '${env.apiUrl}' `);
    // console.log(`AccessToken is '${env.accessToken}' `);
  }
};
</script>
<style scoped lang="css">
  .section {
    width: 100vw;
    height: 100vh;
  }
</style>