<template>
  <v-container>
    <v-row justify="center" align="center" class="mx-0">
      <v-col cols="12" sm="7" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Create New Subsidiary</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-city</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" @submit="submit">
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                label="Subsidiary Name"
                prepend-icon="mdi-text"
                type="text"
                color="secondary"
                required
              />
              <v-text-field
                v-model="form.shorthand"
                :rules="rules.shorthand"
                label="Abbreviation"
                prepend-icon="mdi-text-short"
                type="text"
                color="secondary"
                required
              />
              <v-text-field
                v-model="form.location"
                :rules="rules.location"
                label="Island/Country"
                prepend-icon="mdi-map-marker"
                type="text"
                color="secondary"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn block color="acent" @click="cancel">Cancel</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="secondary" :disabled="!validForm" @click="submit">Submit</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      validForm: true,
      form: {
        name: "",
        shorthand: "",
        location: ""
      },
      rules: {
        name: [
          v => !!v || "Subsidiary Name is required",
          v => v.length >= 5 || "Subsidiary Name must be at least 5 characters"
        ],
        shorthand: [
          v => !!v || "Abbreviation is required",
          v => v.length >= 3 || "Abbreviation must be between 3 and 5 characters",
          v => v.length <= 5 || "Abbreviation must be between 3 and 5 characters"
        ],
        location: [
          v => !!v || "Location is required",
          v => v.length >= 3 || "Location must at least 3 characters"
        ]
      }
    };
  },
  methods: {
    async submit() {
      const url = process.env.api + "/api/sub";
      try {
        await this.$axios.$post(url, this.form);
        this.$router.push("/location/sub");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/sub");
      }
    },
    cancel() {
      this.$router.push("/location/sub");
    }
  }
};
</script>
