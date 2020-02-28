<template>
  <v-app id="app">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Commuter Rail Schedule</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
</style>