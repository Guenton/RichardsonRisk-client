<template>
  <v-row class="mt-5">
    <v-col cols="12" sm="8" md="4">
      <v-card height="110px" elevation="3" to="/location/sub">
        <v-card-title>
          <v-icon color="primary">mdi-city</v-icon>
          <span class="mx-1">Subsidiaries</span>
        </v-card-title>
        <v-card-text>View or Edit Subsidiaries</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="4">
      <v-card height="110px" elevation="3" to="/location/building">
        <v-card-title>
          <v-icon color="primary">mdi-bank</v-icon>
          <span class="mx-1">Buildings</span>
        </v-card-title>
        <v-card-text>View or Edit Buildings</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="4">
      <v-card height="110px" elevation="3" disabled>
        <v-card-title>
          <v-icon color="primary">mdi-atm</v-icon>
          <span class="mx-1">ATMs</span>
        </v-card-title>
        <v-card-text>**Not Implemented**</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>
