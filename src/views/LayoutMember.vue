<template>
  <v-app>
    <!-- <Header /> -->
    <!-- ?begin::header -->
    <v-app-bar app dense color="white" flat elevation="1">
      <v-app-bar-nav-icon
        v-if="isMobile()"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-img
        alt="CMU e-Vote Logo"
        class="shrink mr-2"
        contain
        src="../assets/key-title-logo.png"
        transition="scale-transition"
        width="40"
      />
      <router-link style="text-decoration: none; color: inherit" to="/">
        <h1 class="primary--text">CMU e-Vote</h1>
      </router-link>

      <v-spacer></v-spacer>
      <p class="mr-1 mt-5">ยินดีต้อนรับ, {{ account.user.firstNameTha }} </p>

      <v-btn color="primary" elevation="2" @click="handleLogout()"
        >Logout</v-btn
      >
    </v-app-bar>
    <!-- *end::header -->

    <!-- ?begin::navigation mobile -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <!-- ?begin::item1 -->
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- *end::item1 -->

          <!-- ?begin::item2 -->
          <v-list-item link to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- ?end::item2 -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- ?end::navigation mobile -->

    <!-- ?begin::Main -->
    <v-main class="grey lighten-3 mt-5">
      <v-container v-if="!isMobile()" fluid>
        <v-row>
          <!-- ?begin::navigation -->
          <v-col cols="3">
            <v-sheet
              v-if="!isMobile()"
              class="elevation-2 mr-5 ml-10"
              rounded="lg"
            >
              <v-list color="transparent">
                <v-list-item link to="/">
                  <v-list-item-icon>
                    <v-icon>mdi-home-city</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- <router-link to="/profile"> -->
                <v-list-item link to="/profile">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>My Account</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- </router-link> -->

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                  @click="handleLogout()"
                >
                  <v-list-item-content>
                    <v-list-item-title> LOGOUT </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <!-- *end::navigation -->

          <!-- ?begin::content -->
          <v-col class="mr-5">
            <router-view />
          </v-col>
          <!-- *end::content -->
        </v-row>
      </v-container>

      <!-- ?begin::content v-mobile -->
      <v-container v-if="isMobile()" fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
      <!-- *end::content v-mobile -->
    </v-main>
    <!-- *end::Main -->
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LayoutMember",
  data() {
    return {
      drawer: false, // toggle navigation mobile
      // drawer1: false,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  mounted() {

  },
  methods: {
    ...mapActions("account", ["logout"]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    handleLogout() {
      this.logout();
    },
  },
};
</script>

<style>
.title {
  display: block;
}

</style>
