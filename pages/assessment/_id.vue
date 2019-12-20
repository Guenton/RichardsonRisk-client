<template>
  <v-container>
    <v-row justify="center" align="start" class="mx-0">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Create New Assessment</v-toolbar-title>
            <v-spacer />
            <v-icon class="hidden-xs-only">mdi-file-document-box</v-icon>
            <v-badge v-show="showScore" :color="riskColor" class="hidden-sm-and-up">
              <template v-slot:badge>{{ form.totalScore }}</template>
              <v-icon>mdi-file-document-box-check</v-icon>
            </v-badge>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" @submit="submit">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="form.subsidiary"
                    :items="subs"
                    :rules="rules.subsidiary"
                    item-text="name"
                    item-value="shorthand"
                    label="Subsidiary"
                    prepend-icon="mdi-city"
                    color="secondary"
                    solo
                    required
                    @change="getBuildings"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-select
                    v-model="form.building"
                    :items="buildings"
                    :rules="rules.building"
                    :disabled="!subSelected"
                    item-text="name"
                    label="Building"
                    prepend-icon="mdi-bank"
                    color="secondary"
                    return-object
                    solo
                    required
                    @change="setTypeScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">What is the environment around the Building?</v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.environmentScore"
                    :items="environments"
                    :rules="rules.questions"
                    label="Environment"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">In which area is the building located?</v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.areaScore"
                    :items="areas"
                    :rules="rules.questions"
                    label="Area"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">Relative amount of liquid assets (cash) on site?</v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.assetScore"
                    :items="assets"
                    :rules="rules.questions"
                    label="Liquid Assets"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  What is the visibility into the branch from the outside (glasswindows/doors)
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.visibilityScore"
                    :items="visibilities"
                    :rules="rules.questions"
                    label="Visibility"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  Amount of physical barriers between the access point and the Teller station
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.barrierScore"
                    :items="barriers"
                    :rules="rules.questions"
                    label="Barriers"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  Amount of robberies in the area over the past 24 months
                </v-col>
                <v-col class="py-0">
                  <v-select
                    v-model="form.robberyScore"
                    :items="robberies"
                    :rules="rules.questions"
                    label="Area Roberies"
                    color="secondary"
                    solo
                    required
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="py-0">
                  Have there been more than 4 reported incidents (burglary, assault, vandalism)
                  during the past 24 months in this area?
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="form.incidentScore"
                    label="Area Incidents"
                    :true-value="5"
                    :false-value="0"
                    color="secondary"
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="py-0">
                  Have any injuries occurred at this location as result of a crime, or incident,
                  during the past 24 months in this area?
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="form.injuryScore"
                    label="Area Injuries"
                    :true-value="5"
                    :false-value="0"
                    color="secondary"
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="py-0">
                  Is there any obvious illegality (narcotics, prostitution, and gang) within 500M
                  from this location?
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="form.illegalityScore"
                    label="Area Illegalities"
                    :true-value="5"
                    :false-value="0"
                    color="secondary"
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="py-0">
                  Is there any obvious vandalism/graffiti within 500M from this location
                </v-col>
                <v-col cols="4" class="py-0">
                  <v-checkbox
                    v-model="form.vandalismScore"
                    label="Area Vandalism"
                    :true-value="5"
                    :false-value="0"
                    color="secondary"
                    @change="setCurrentScore"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="5">
                <v-btn block color="acent" @click="cancel">Cancel</v-btn>
              </v-col>
              <v-col cols="5">
                <v-btn block color="secondary" :disabled="!validForm" @click="submit">Adjust</v-btn>
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
      <v-col v-show="showScore" cols="12" sm="2" md="4" class="hidden-xs-only">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title class="hidden-sm-and-down">Current Score</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-file-document-box-check</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-btn class="mx-2" fab dark large :color="riskColor">{{ form.totalScore }}</v-btn>
            </v-row>
            <v-row class="mt-2 hidden-sm-and-down">
              <v-col cols="12">
                <p>
                  <b>{{ form.building.name }}</b> is a <b>{{ riskCategory }}</b> building according
                  to this assessment
                </p>
              </v-col>
            </v-row>
            <v-row class="hidden-sm-and-down">
              <v-col cols="12">
                Assessment Created on:
                <p>
                  <b>{{ dateCreated }}</b>
                </p>
              </v-col>
              <v-col cols="12">
                Assessment Last Modified on:
                <p>
                  <b>{{ dateUpdated }}</b>
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-overlay absolute opacity="0.8" :value="confirmOverlay">
        <v-btn class="mr-5" @click="confirmOverlay = false">Cancel</v-btn>
        <v-btn color="error" @click="deleteAssessment">
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
      subSelected: false,
      form: {
        subsidiary: "",
        building: {},
        typeScore: null,
        environmentScore: null,
        areaScore: null,
        assetScore: null,
        visibilityScore: null,
        barrierScore: null,
        robberyScore: null,
        incidentScore: null,
        injuryScore: null,
        illegalityScore: null,
        vandalismScore: null,
        totalScore: null
      },
      rules: {
        subsidiary: [v => !!v || "Subsidiary is required"],
        buildingId: [v => !!v || "Building is required"],
        questions: [v => !!v || "All items must be answered"]
      },
      subs: [],
      buildings: [],
      environments: [
        { text: "Not Applicable", value: 0 },
        { text: "Building Complex", value: 1 },
        { text: "Shopping Mall", value: 2 },
        { text: "Standalone Building", value: 3 }
      ],
      areas: [
        { text: "Not Applicable", value: 0 },
        { text: "Restricted Access Area", value: 1 },
        { text: "Industrial District", value: 2 },
        { text: "Business/Commercial District", value: 3 }
      ],
      assets: [
        { text: "Low", value: 1 },
        { text: "Moderate", value: 2 },
        { text: "High", value: 3 }
      ],
      visibilities: [
        { text: "Not Applicable", value: 0 },
        { text: "Good", value: 1 },
        { text: "Fair", value: 2 },
        { text: "Poor", value: 3 }
      ],
      barriers: [
        { text: "Not Applicable", value: 0 },
        { text: "None", value: 1 },
        { text: "2 or Less", value: 2 },
        { text: "3 or More", value: 3 }
      ],
      robberies: [
        { text: "None", value: 0 },
        { text: "1", value: 5 },
        { text: "2", value: 10 },
        { text: "3 or More", value: 15 }
      ]
    };
  },
  computed: {
    showScore() {
      if (this.form.totalScore && this.form.building.name) return true;
      else return false;
    },
    riskCategory() {
      if (this.form.totalScore < 30) return "Risk Category 1";
      else if (this.form.totalScore < 45) return "Risk Category 2";
      else return "Risk Category 3";
    },
    riskColor() {
      if (this.form.totalScore < 30) return "info";
      else if (this.form.totalScore < 45) return "warning";
      else return "error";
    },
    dateCreated() {
      return new Date(this.form.dateCreated);
    },
    dateUpdated() {
      return new Date(this.form.dateUpdated);
    }
  },
  mounted() {
    this.getSubs();
    this.populateForm();
  },
  methods: {
    async getSubs() {
      const url = process.env.api + "/api/sub";
      try {
        this.subs = await this.$axios.$get(url);
      } catch (err) {
        this.$store.commit("setErr", err);
      }
    },
    async populateForm() {
      const id = this.$route.params.id;
      const url = process.env.api + `/api/assessment?id=${id}`;
      try {
        this.form = await this.$axios.$get(url);
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/assessment");
      }
    },
    async getBuildings() {
      this.form.building = {};
      const sub = this.form.subsidiary;
      const url = process.env.api + `/api/building?sub=${sub}`;
      try {
        this.buildings = await this.$axios.$get(url);
        this.subSelected = true;
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/assessment");
      }
    },
    setCurrentScore() {
      this.form.totalScore =
        this.form.typeScore +
        this.form.environmentScore +
        this.form.areaScore +
        this.form.assetScore +
        this.form.visibilityScore +
        this.form.barrierScore +
        this.form.robberyScore +
        this.form.incidentScore +
        this.form.injuryScore +
        this.form.illegalityScore +
        this.form.vandalismScore;
    },
    setTypeScore() {
      const type = this.form.building.type;
      if (type === "Cash") {
        this.form.typeScore = 3;
      } else if (type === "Office") {
        this.form.typeScore = 2;
      } else {
        this.form.typeScore = 1;
      }
      this.setCurrentScore();
    },
    async submit() {
      const url = process.env.api + "/api/assessment";
      try {
        await this.$axios.$put(url, this.form);
        this.$router.push("/assessment");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/assessment");
      }
    },
    async deleteAssessment() {
      const id = this.form._id;
      const url = process.env.api + `/api/assessment?id=${id}`;
      try {
        await this.$axios.$delete(url, this.form);
        this.$router.push("/assessment");
      } catch (err) {
        this.$store.commit("setErr", err);
        this.$router.push("/assessment");
      }
    },
    cancel() {
      this.$router.push("/assessment");
    }
  }
};
</script>
