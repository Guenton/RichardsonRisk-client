<template>
  <v-content> </v-content>
</template>

<script>
export default {
  layout: "splash",
  async mounted() {
    if (!this.$auth.loggedIn) this.$auth.loginWith("auth0");
    else {
      const url = process.env.api + "/auth/login";
      const user = await this.$axios.$get(url);
      if (user && user.isConfirmed) {
        this.$store.commit("changeFirstname", user.firstname);
        this.$store.commit("changeLastname", user.lastname);
        this.$router.push("/home");
      } else this.$router.push("/login/confirm");
    }
  }
};
</script>
