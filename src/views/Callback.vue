<template>
  <div class="section-loading">
    Loading...  
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="purple"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Callback",
  methods: {
    ...mapActions("account", ["login"]),
  },
  async mounted() {
    if (this.$route.query.code) {
      let payload = this.$route.query.code;
      await this.login({ payload });
    }
  },
};
</script>

<style>
  .section-loading {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
