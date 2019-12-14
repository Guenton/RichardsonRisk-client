<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card v-if="hasFormData" class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Verify Information</v-toolbar-title>
              <v-spacer />
              <v-img max-height="42px" max-width="42px" contain src="../KLPure-W.png"></v-img>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="form.firstname"
                  label="First name"
                  prepend-icon="mdi-account"
                  type="text"
                />
                <v-text-field
                  v-model="form.lastname"
                  label="Last name"
                  prepend-icon="mdi-account"
                  type="text"
                />
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" @click="confirm">Confirm</v-btn>
            </v-card-actions>
            <v-alert v-show="err.length > 1" type="error">{{ err }}</v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  auth: true,
  layout: "splash",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: ""
      },
      err: ""
    };
  },
  computed: {
    hasFormData() {
      return this.form.email.length > 0 || this.form.firstname.length > 0;
    }
  },
  async mounted() {
    const user = await this.userExists();
    this.$nextTick().then(() => {
      if (!user) {
        this.form.firstname = this.$store.state.auth.user.given_name;
        this.form.lastname = this.$store.state.auth.user.family_name;
        this.form.email = this.$store.state.auth.user.email;
      } else {
        this.form.firstname = user.firstname;
        this.form.lastname = user.lastname;
        this.form.email = user.email;
      }
    });
  },
  methods: {
    async userExists() {
      const url = process.env.api + "/auth/login";
      try {
        const response = await this.$axios.$get(url);
        return response;
      } catch (err) {
        this.err = err;
      }
    },
    async confirm() {
      const url = process.env.api + "/auth/login";
      try {
        await this.$axios.$post(url, this.form);
        this.$router.push("/home");
      } catch (err) {
        this.err = err;
      }
    }
  }
};
</script>
