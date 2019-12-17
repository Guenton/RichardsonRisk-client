<template>
  <v-content class="py-4">
    <v-row v-if="hasErr">
      <v-col cols="12">
        <v-alert type="error">
          {{ errMsg }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- TODO - Create "Add Location" on api -->
    <v-row>
      <v-col cols="12" sm="8" md="4">
        <v-card height="110px" elevation="3" to="/location/sub/add">
          <v-row justify="center" align="center" class="fill-height">
            <v-icon x-large color="primary">mdi-plus</v-icon>
          </v-row>
        </v-card>
      </v-col>

      <!-- TODO - Dynamic list of cards pull from api -->
      <v-col cols="12" sm="8" md="4">
        <v-card height="110px" elevation="3" to="/location/building">
          <v-card-title>
            <v-icon color="primary">mdi-city</v-icon>
            <span class="mx-1">Placeholder</span>
          </v-card-title>
          <v-card-text>View or Edit Placeholder</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  computed: {
    hasErr() {
      return this.$store.getters.hasErr;
    },
    errMsg() {
      return this.$store.state.err;
    }
  }
};
</script>
