<template>
  <v-content class="py-4">
    <v-row v-if="hasErr">
      <v-col cols="12">
        <v-alert type="error" prominent dense>
          <v-row align="center">
            <v-col class="grow">{{ errMsg }}</v-col>
            <v-col class="shrink">
              <v-btn @click="clearErr">OK</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <v-row align="center" justify="end">
      <v-col cols="12" sm="6" md="4">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn block color="secondary" dark v-on="on">Sort by Subsidiary</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(sub, i) in subs" :key="i" @click="getAssessments(sub)">
              <v-list-item-title>{{ sub }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card height="110px" elevation="3" to="/assessment/add">
          <v-row justify="center" align="center" class="fill-height">
            <v-icon x-large color="primary">mdi-plus</v-icon>
          </v-row>
        </v-card>
      </v-col>

      <template v-for="(assessment, i) in assessments">
        <v-col :key="assessment._id" cols="12" sm="6" md="4">
          <v-card height="110px" elevation="3" :to="'/assessment/' + assessment._id">
            <v-card-title>
              <v-icon color="primary">mdi-file-document-box</v-icon>
              <span class="mx-1">{{ assessment.building.name }} - {{ assessment.totalScore }}</span>
            </v-card-title>
            <v-card-text>{{ assessment.subsidiary }} - {{ dateCreated(i) }}</v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      assessments: [],
      subs: []
    };
  },
  computed: {
    hasErr() {
      return this.$store.getters.hasErr;
    },
    errMsg() {
      return this.$store.state.err;
    }
  },
  mounted() {
    this.getSubs();
    this.getAssessments();
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
    async getAssessments(sub) {
      const url = sub
        ? process.env.api + `/api/assessment?sub=${sub}`
        : process.env.api + "/api/assessment";
      try {
        const assessments = await this.$axios.$get(url);
        this.assessments = assessments;
      } catch (err) {
        this.$store.commit("setErr", err);
      }
    },
    dateCreated(i) {
      return new Date(this.assessments[i].dateCreated);
    },
    clearErr() {
      this.$store.commit("clearErr");
    }
  }
};
</script>
