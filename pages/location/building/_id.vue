<template>
  <v-container>
    <v-row justify="center" align="center" class="mx-0">
      <v-col cols="12" sm="7" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Edit Building</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-bank</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" @submit="submit">
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                label="Building Name"
                prepend-icon="mdi-text"
                type="text"
                color="secondary"
                required
              />
              <v-text-field
                v-model="form.address"
                label="Address"
                prepend-icon="mdi-map-marker"
                type="text"
                color="secondary"
              />
              <v-select
                v-model="form.type"
                :items="types"
                :rules="rules.type"
                label="Type"
                prepend-icon="mdi-bank"
                color="secondary"
                solo
                required
              />
              <v-select
                v-model="form.subsidiary"
                :items="subs"
                :rules="rules.subsidiary"
                label="Subsidiary"
                prepend-icon="mdi-city"
                color="secondary"
                solo
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="5" class="pr-1">
                <v-btn block color="acent" @click="cancel">Cancel</v-btn>
              </v-col>
              <v-col cols="5" class="pr-1">
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
        <v-btn color="error" @click="deleteBuilding">
          <v-icon>mdi-delete</v-icon>
          Confirm
        </v-btn>
      </v-overlay>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      validForm: true,
      confirmOverlay: false,
      form: {
        name: "",
        address: "",
        type: "",
        subsidiary: ""
      },
      rules: {
        name: [
          v => !!v || "Building Name is required",
          v => v.length >= 3 || "Building Name must be at least 3 characters"
        ],
        address: [v => v.length >= 5 || "Address must be at least 5 characters"],
        type: [v => !!v || "Type is required"],
        subsidiary: [v => !!v || "Subsidiary is required"]
      },
      types: ["Cash", "Office", "Miscellaneous"],
      subs: []
    };
  },
  mounted() {
    this.getSubs();
    this.populateForm();
  },
  methods: {
    async getSubs() {
      const url = process.env.api + "/api/sub";
      try {
        const subs = await this.$axios.$get(url);
        subs.forEach(sub => {
          this.subs.push(sub.shorthand);
        });
      } catch (err) {
        this.$store.commit("setErr", err);
      }
    },
    async populateForm() {
      const id = this.$route.params.id;
      const url = process.env.api + `/api/building?id=${id}`;
      try {
        this.form = await this.$axios.$get(url);
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/building");
      }
    },
    async submit() {
      const url = process.env.api + "/api/building";
      try {
        await this.$axios.$put(url, this.form);
        this.$router.push("/location/building");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/building");
      }
    },
    async deleteBuilding() {
      const id = this.form._id;
      const url = process.env.api + `/api/building?id=${id}`;
      try {
        await this.$axios.$delete(url, this.form);
        this.$router.push("/location/building");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/location/buildinvg");
      }
    },
    cancel() {
      this.$router.push("/location/building");
    }
  }
};
</script>
