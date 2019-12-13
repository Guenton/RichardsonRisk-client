<template>
  <v-row class="mt-5">
    <v-col cols="12" sm="8" md="4">
      <v-card height="110px" elevation="3" to="/location/sub">
        <v-row justify="center" align="center" class="fill-height">
          <v-icon x-large color="primary">mdi-plus</v-icon>
        </v-row>
      </v-card>
    </v-col>

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
</template>

<script>
export default {};
</script>
