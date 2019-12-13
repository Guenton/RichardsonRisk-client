<template>
  <v-content>
    <v-container class="fill-height">
      <v-container class="text-center">
        <v-row>
          <KLogo />
        </v-row>
        <v-row align="center" justify="center">
          <h1 class="text--secondary font-italic display-4">RichardsonRisk</h1>
        </v-row>
        <v-row align="center" justify="center">
          <h2 class="indigo--text display-1">MCB Building Risk Assesment</h2>
        </v-row>
        <v-row align="center" justify="center" class="ma-8">
          <v-btn large color="primary" class="mx-2" @click="loginHandler()">Login</v-btn>
          <v-btn large color="accent" class="mx-2" to="/docs">Documentation</v-btn>
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
