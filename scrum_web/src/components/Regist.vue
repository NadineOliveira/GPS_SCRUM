<template>
  <v-container>
    <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 ma-2>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue darken-1">
                <v-toolbar-title>Register</v-toolbar-title>
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
                    prepend-icon="person"
                    v-model="name"
                    :rules="[v => !!v || 'Nome Obrigatório']"
                    label="Nome do Utilizador"
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
                <v-spacer></v-spacer>
                <v-btn dark round color="blue darken-1" @click="register" ><span class="white--text">Registar</span></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

      <v-layout>
        <v-snackbar v-model="erro" color="red darken-4">
          Erro no Registo do Utilizador
          <v-btn dark flat @click="erro = false">Fechar</v-btn>
        </v-snackbar>
      </v-layout>
    </v-container>
</template>

<script>
var axios = require('axios')
export default {
  data: () => ({
    erro: false,
    showPass: false,
    username: '',
    name: '',
    password: ''
  }),
  methods: {
    register: async function () {
      let username = this.username
      let password = this.password
      let name = this.name

      await axios.post('http://localhost:7001/register', { username: username, nome: name, password: password })
        .then(res => {
          if (res.data.validation === false) { this.erro = true } else { this.$router.push('/login') }
        })
        .catch(this.erro = true)
    }
  }
}
</script>

<style>

</style>
