<template>
  <v-content>
    <v-container>
      <v-row v-if="error.statusCode === 404">
        <v-col cols="12">
          <v-alert type="error">
            {{ pageNotFound }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-alert type="error">
            {{ otherError }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="3">
          <v-btn block large color="primary" @click="goBack">Go Back</v-btn>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-btn block large color="accent" @click="logout">Restart System</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: "splash",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "Error 404 - The Requested Item Not Found",
      otherError: "An Error Has Occured - Please contact your system administrator"
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/");
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>
