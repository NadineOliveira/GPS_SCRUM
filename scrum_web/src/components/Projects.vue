<template>
  <v-container>
    <v-layout>
        <v-flex xs5>
          <v-text-field
            label="Tema"
            v-model="novo.tema"
            :rules="[v => !!v || 'Tema é obrigatório']"
            required
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs3>
            <v-text-field
                label="UC"
                v-model="novo.uc"
                :rules="[v => !!v || 'UC é obrigatória']"
                required
                solo
            ></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-text-field
            label="Linguagem"
            v-model="novo.linguagem"
            :rules="[v => !!v || 'Linguagem é obrigatória']"
            required
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs1>
            <v-btn fab dark small color="indigo" @click="adicionaItem">
              <v-icon dark>add</v-icon>
            </v-btn>

        </v-flex>
    </v-layout>

    <v-layout row wrap >
        <v-flex xs12>
        <v-data-table
            :headers="cabecalhos"
            :items="lista"
            class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.tema }}</td>
                <td>{{ props.item.uc }}</td>
                <td>{{ props.item.linguagem }}</td>
            </template>
        </v-data-table>
        </v-flex>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn dark round color="blue darken-1" @click="loadTable" ><span class="white--text">Reload</span></v-btn>
    </v-layout>

  </v-container>
</template>

<script>
var axios = require('axios')
export default {
  data: () => ({
    erro: false,
    lista: [],
    novo: {
      tema: '',
      uc: '',
      linguagem: ''
    },
    cabecalhos: [
      { text: 'Tema', sortable: true, value: 'tema' },
      { text: 'UC', sortable: true, value: 'uc' },
      { text: 'Linguagem', value: 'linguagem' }
    ]
  }),
  mounted: async function () {
      loadTable()
  },
  methods: {
    adicionaItem: function () {
      axios.post('http://localhost:7001/projeto', this.novo)
        .then(() => {
          this.lista.push(JSON.parse(JSON.stringify(this.novo)))
        })
        .catch(() => {
          this.erro = true
        })
    },
    loadTable: async function () {
      this.lista = [];
      var response = await axios.get('http://localhost:7001/projetos')
      console.log(response.data)
      var res = response.data
      var proj = {
        tema: "",
        uc: "",
        linguagem: ""
      }
      for (var i in res) {
        proj.tema = res[i].projeto.Tema
        proj.uc = res[i].projeto.UC
        proj.linguagem = res[i].projeto.Linguagem
        this.lista.push(JSON.parse(JSON.stringify(proj)))
      }
    }
  }
}
</script>
