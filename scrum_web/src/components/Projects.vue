<template>
  <v-container>
    <v-layout>
        <v-flex xs5 mr-1>
          <v-text-field
            label="Tema"
            v-model="novo.tema"
            :rules="[v => !!v || 'Tema é obrigatório']"
            required
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs3 ml-1 mr-1>
            <v-text-field
                label="UC"
                v-model="novo.uc"
                :rules="[v => !!v || 'UC é obrigatória']"
                required
                solo
            ></v-text-field>
        </v-flex>
        <v-flex xs3 ml-1>
          <v-text-field
            label="Linguagem"
            v-model="novo.linguagem"
            :rules="[v => !!v || 'Linguagem é obrigatória']"
            required
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs1 class="text-xs-right">
            <v-btn fab dark small color="blue darken-1" @click="adicionaProjeto">
              <v-icon dark>add</v-icon>
            </v-btn>

        </v-flex>
    </v-layout>
     <v-divider></v-divider>
    <v-layout row wrap >
      <v-flex xs12>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            Projetos
          </v-toolbar-title>
            <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-toolbar>
        <v-data-table
            :headers="cabecalhos"
            :items="lista"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:items="props">
              <tr>
                <td >{{ props.item.tema }}</td>
                <td >{{ props.item.uc }}</td>
                <td >{{ props.item.linguagem }}</td>
                <td class="text-xs-right" >
                  <v-btn fab dark small color="green darken-4" @click="rowClicked(props.item)">
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="red darken-4" @click="removerProjeto(props.item)">
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="warning" icon="warning">
                Ainda não têm projetos...
              </v-alert>
            </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-snackbar v-model="erro" color="red darken-4">
        Erro a remover tema...
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
    search: '',
    lista: [],
    novo: {
      id: -1,
      tema: '',
      uc: '',
      linguagem: ''
    },
    cabecalhos: [
      { text: 'Tema', sortable: true, value: 'tema' },
      { text: 'UC', sortable: true, value: 'uc' },
      { text: 'Linguagem', value: 'linguagem' },
      { text: 'Ações', value: 'actions', sortable: false }
    ]
  }),
  mounted: async function () {
    this.loadTable()
  },
  methods: {
    adicionaProjeto: function () {
      axios.post('http://localhost:7001/projeto', this.novo)
        .then(res => {
          this.lista.push(JSON.parse(JSON.stringify({
            id: res.data.idProjeto,
            tema: res.data.Tema,
            uc: res.data.UC,
            linguagem: res.data.Linguagem
          })))
        })
        .catch(() => {
          this.erro = true
        })
    },
    loadTable: async function () {
      this.lista = []
      var response = await axios.get('http://localhost:7001/projetos')
      console.log(response.data)
      var res = response.data
      var proj = {
        id: -1,
        tema: '',
        uc: '',
        linguagem: ''
      }
      for (var i in res) {
        proj.id = res[i].idProjeto
        proj.tema = res[i].projeto.Tema
        proj.uc = res[i].projeto.UC
        proj.linguagem = res[i].projeto.Linguagem
        this.lista.push(JSON.parse(JSON.stringify(proj)))
      }
    },
    removerProjeto: async function (item) {
      var index = this.lista.findIndex(elem => elem.id === item.id)
      if (index !== -1) {
        var response = await axios.get('http://localhost:7001/projetos/remover/' + this.lista[index].id)
        if (response.data.validation === true) { this.lista.splice(index, 1) } else { this.erro = false }
      } else { this.erro = true }
    },
    rowClicked: function (item) {
      this.$router.push('/project/' + item.id)
    }
  }
}
</script>
