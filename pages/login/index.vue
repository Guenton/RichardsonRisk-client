<template>
  <v-content> </v-content>
</template>

<script>
export default {
  auth: true,
  layout: "splash",
  async mounted() {
    const url = process.env.api + "/auth/login";
    const user = await this.$axios.$get(url);
    if (user && user.isConfirmed) {
      this.$store.commit("changeFirstname", user.firstname);
      this.$store.commit("changeLastname", user.lastname);
      this.$router.push("/home");
    } else this.$router.push("/login/confirm");
  }
};
</script>
