<template>
  <v-content>
    <v-container class="fill-height">
      <v-container class="text-center">
        <v-row>
          <v-col cols="12">
            <KLogo />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="text--secondary font-italic display-4 hidden-sm-and-down">RichardsonRisk</h1>
            <h1 class="text--secondary font-italic display-1 hidden-md-and-up">RichardsonRisk</h1>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h2 class="indigo--text display-1 d-none d-sm-block">MCB Building Risk Assesment</h2>
            <h2 class="indigo--text hidden-sm-and-up">MCB Building Risk Assesment</h2>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="ma-8">
          <v-col cols="12" sm="4" md="3">
            <v-btn large block color="primary" class="mx-2" @click="loginHandler()">Login</v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn large block color="accent" class="mx-2" to="/docs">Documentation</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
import KLogo from "~/components/KLogo.vue";

export default {
  auth: false,
  layout: "splash",
  components: {
    KLogo
  },
  methods: {
    loginHandler() {
      this.$auth.loginWith("auth0");
    }
  }
};
</script>
