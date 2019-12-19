<template>
  <v-content class="py-4 px-0">
    <v-row justify="center" align="center" class="mx-0">
      <v-col cols="12" sm="7" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Edit Subsidiary</v-toolbar-title>
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
              <v-col cols="5" class="pr-1">
                <v-btn block @click="cancel">Cancel</v-btn>
              </v-col>
              <v-col cols="5" class="pl-1">
                <v-btn block color="secondary" :disabled="!validForm" @click="submit">Submit</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn block color="error" @click="confirmOverlay = true">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-overlay absolute opacity="0.8" :value="confirmOverlay">
        <v-btn class="mr-5" @click="confirmOverlay = false">Cancel</v-btn>
        <v-btn color="error" @click="deleteSub">
          <v-icon>mdi-delete</v-icon>
          Confirm
        </v-btn>
      </v-overlay>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      validForm: true,
      confirmOverlay: false,
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
  mounted() {
    this.populateForm();
  },
  methods: {
    async populateForm() {
      const sub = this.$route.params.sub;
      const url = process.env.api + `/api/sub?sub=${sub}`;
      try {
        this.form = await this.$axios.$get(url);
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/sub");
      }
    },
    async submit() {
      const url = process.env.api + "/api/sub";
      try {
        await this.$axios.$put(url, this.form);
        this.$router.push("/location/sub");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/sub");
      }
    },
    async deleteSub() {
      const id = this.form._id;
      const url = process.env.api + `/api/sub?id=${id}`;
      try {
        await this.$axios.$delete(url, this.form);
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
