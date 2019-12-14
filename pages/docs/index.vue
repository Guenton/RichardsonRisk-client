<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-btn block color="accent" to="/">Return to Main Page</v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-3">
        <v-col cols="12">
          <v-card>
            <v-card-title class="indigo--text">Getting Started</v-card-title>
            <v-card-text>
              RichardsonRisk is a Risk Assessment assistance tool specifically developed for the MCB
              Group. It was designed from the ground up with simplicity in mind. To get started all
              you have to do is:
              <ul class="pt-3">
                <li>Return to the main page</li>
                <li>Click on "Login"</li>
                <li>Sign it with Google</li>
                <li>Confirm your User Information</li>
                <li>That's it! You're now logged in and ready to work</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-3">
        <v-col cols="12">
          <v-card>
            <v-card-title class="indigo--text">Access Levels</v-card-title>
            <v-card-text>
              RichardsonRisk is designed to limit access to sensitive information by using the Auth0
              system. For information regarding this system please contact your system
              administrator. Current Clearance levels are:
              <ul class="pt-3">
                <li>Admin - Reserved for the owner of the RichardsonRisk Application</li>
                <li>Worker - Standard access grants the ability to submit Risk Assessments</li>
                <li>
                  Trusted Worker - Extended standard access grants the ability to view Buildings and
                  Reports
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-3">
        <v-col cols="12">
          <v-card>
            <v-card-title class="indigo--text">Creating Reports</v-card-title>
            <v-card-text>
              <!-- TODO Finish reporting documentation -->
              Documentation will be provided once reporting system has been implemented
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-btn block color="accent" to="/">Return to Main Page</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  auth: false,
  layout: "splash"
};
</script>

<style></style>
