<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/scrum-logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Academic Scrum
        </h1>
        <p class="subheading font-weight-regular">
          Scrum is a framework within which people can address complex adaptive problems,
          while productively and creatively delivering products of the highest possible value.
        </p>

        <p class="subheading font-weight-regular">
          Scrum itself is a simple framework for effective team collaboration on complex products.  Scrum co-creators Ken Schwaber and Jeff Sutherland have written The Scrum Guide to explain Scrum clearly and succinctly.  This Guide contains the definition of Scrum. This definition consists of Scrum’s roles, events, artifacts, and the rules that bind them together.
        </p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({})

}
</script>

<style>

</style>
