<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="[v => !!v || 'Username is required']"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              :rules="[v => !!v || 'Username is required']"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              flat
              color="green"
              @click="login"
            >Login</v-btn>
            <v-btn
              flat
              color="orange"
              @click="register"
            >Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data: () => ({
    showPass: false,
    username: '',
    password: ''
  }),
  methods: {
    login: async function() {
        let username = this.username
        let password = this.password
        this.$store.dispatch('login',{ username, password })
          .then(()=> this.$router.push('/'))
          .catch(err => console.log(err))
    },
    register: () => {

    }
  }
}
</script>

<style>

</style>
