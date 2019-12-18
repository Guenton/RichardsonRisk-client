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
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card height="110px" elevation="3" to="/location/sub/add">
          <v-row justify="center" align="center" class="fill-height">
            <v-icon x-large color="primary">mdi-plus</v-icon>
          </v-row>
        </v-card>
      </v-col>

      <template v-for="sub in subs">
        <v-col :key="sub._id" cols="12" sm="6" md="4">
          <v-card height="110px" elevation="3" :to="'/location/sub/' + sub.shorthand">
            <v-card-title>
              <v-icon color="primary">mdi-city</v-icon>
              <span class="mx-1">{{ sub.shorthand }} - {{ sub.location }}</span>
            </v-card-title>
            <v-card-text>{{ sub.name }}</v-card-text>
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
  },
  methods: {
    async getSubs() {
      const url = process.env.api + "/api/sub";
      try {
        const subs = await this.$axios.$get(url);
        this.subs = subs;
      } catch (err) {
        this.$store.commit("setErr", err);
      }
    },
    clearErr() {
      this.$store.commit("clearErr");
    }
  }
};
</script>
