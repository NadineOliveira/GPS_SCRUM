<template>
  <v-container>
    <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 ma-2>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue darken-1">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    :rules="[v => !!v || 'Utilizador Obrigatório']"
                    label="Utilizador"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    :append-icon="showPass ? 'visibility' : 'visibility_off'"
                    :rules="[v => !!v || 'Password Obrigatória']"
                    :type="showPass ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn dark round color="orange darken-4" @click="register" ><span class="white--text">Registar</span></v-btn>
                <v-spacer></v-spacer>
                <v-btn dark round color="blue darken-1" @click="login" ><span class="white--text">Login</span></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

      <v-layout>
        <v-snackbar v-model="erro" color="red darken-4">
          Erro no Login do Utilizador
          <v-btn dark flat @click="erro = false">Fechar</v-btn>
        </v-snackbar>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    erro: false,
    showPass: false,
    username: '',
    password: ''
  }),
  methods: {
    login: async function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/projects'))
        .catch(() => {
          this.erro = true
        })
    },
    register: () => {

    }
  }
}
</script>

<style>

</style>
