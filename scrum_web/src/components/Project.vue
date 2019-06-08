<template>
  <v-container>
    <v-layout v-if="validation">
      <v-flex xs9 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Sprints</h3>
          </v-card-title>

          <v-card-text>
            <v-list>
              <v-list-group
                v-for="(item,index) in listaSprints"
                :key="item.idSprint"
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ 'Data Limite: '+item.data_limite }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                       <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="addTarefa(item.idSprint,index)">add</v-icon>
                        </template>
                        <span>Adicionar nova tarefa ao Sprint</span>
                      </v-tooltip>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>

                <v-list-tile
                  v-for="subItem in item.tarefas"
                  :key="subItem.idTarefa"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.descricao }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if='subItem.data !== "NAO"'>{{ "Concluido a "+ subItem.data }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else>
                        {{getUsers(subItem.idTarefa)}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                       <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="dialogUserTarefa=true; idTarefa = subItem.idTarefa">add</v-icon>
                        </template>
                        <span>Adicionar novo Utilizador à tarefa</span>
                      </v-tooltip>
                    </v-list-tile-action>

                </v-list-tile>

              </v-list-group>
            </v-list>
          </v-card-text>

          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon dark fab small color="blue darken-1">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="dialogSprint=true">add</v-icon>
                        </template>
                        <span>Adicionar novo Sprint</span>
                      </v-tooltip>
                  </v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
      <v-flex xs3 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Grupo</h3>
          </v-card-title>
          <v-card-text>
            <v-list two-line>
              <template v-for="item in grupo">
                <v-list-tile
                  :key="item.username"
                  avatar
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.nome"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.username"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon dark fab small color="blue darken-1">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="dialogGroup=true">add</v-icon>
                        </template>
                        <span>Adicionar novo Membro</span>
                      </v-tooltip>
                  </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-alert
        :value="true"
        type="error"
      >
      Ficheiro indesponivel, tente mais tarde...
       <v-btn dark flat @click="goProjetos">Fechar</v-btn>
      </v-alert>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogSprint" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar Sprint</v-card-title>
          <v-card-text>
            <v-text-field
                    prepend-icon="assignment"
                    v-model="novoSprint.nome"
                    :rules="[v => !!v || 'Nome Obrigatório']"
                    label="Nome"
                    type="text"
                    required
                  ></v-text-field>
            <v-text-field
                    prepend-icon="calendar_today"
                    v-model="novoSprint.data_limite"
                    :rules="[v => !!v || 'Data Obrigatório']"
                    label="Data Limite"
                    type="date"
                    required
                  ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogSprint = false">Fechar</v-btn>
            <v-btn color="green darken-1" flat @click="adicionarSprint">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialogTarefa" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar Tarefa</v-card-title>
          <v-card-text>
            <v-text-field
                    prepend-icon="assignment"
                    v-model="descricao"
                    :rules="[v => !!v || 'Descrição Obrigatório']"
                    label="Descrição"
                    type="text"
                    required
                  ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogTarefa = false">Fechar</v-btn>
            <v-btn color="green darken-1" flat @click="novaTarefa">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialogGroup" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar Membro</v-card-title>
          <v-card-text>
            <v-text-field
                    prepend-icon="person_add"
                    v-model="novoUsername"
                    :rules="[v => !!v || 'Username Obrigatório']"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogGroup = false">Fechar</v-btn>
            <v-btn color="green darken-1" flat @click="novoMembro">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogMilestone" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar Milestone</v-card-title>
          <v-card-text>
            <v-text-field
                    prepend-icon="assignment"
                    v-model="novoMilestone.nome"
                    :rules="[v => !!v || 'Nome Obrigatório']"
                    label="Nome"
                    type="text"
                    required
                  ></v-text-field>
            <v-text-field
                    prepend-icon="calendar_today"
                    v-model="novoMilestone.data_limite"
                    :rules="[v => !!v || 'Data Obrigatório']"
                    label="Data Limite"
                    type="date"
                    required
                  ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogMilestone = false">Fechar</v-btn>
            <v-btn color="green darken-1" flat @click="adicionarMilestone">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogUserTarefa" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar membro a Tarefa</v-card-title>
          <v-select :items="grupo2" label="Selecione um utilizador" item-value="key" item-text="value" prepend-icon="person_add" v-model="novoUserTarefa" required/>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogUserTarefa = false">Fechar</v-btn>
            <v-btn color="green darken-1" flat @click="addUserTarefa">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


    <v-flex xs12 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Milestones</h3>
          </v-card-title>

          <v-card-text>
            <v-list>
              <v-list-group
                v-for="(item) in listaMilestones"
                :key="item.idMilestone"
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ 'Data Limite: '+item.data_limite }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

              </v-list-group>
            </v-list>
          </v-card-text>

          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon dark fab small color="blue darken-1">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="dialogMilestone=true">add</v-icon>
                        </template>
                        <span>Adicionar novo Milestone</span>
                      </v-tooltip>
                  </v-btn>
          </v-card-actions>

          <v-calendar
            :now="today"
            ref="calendar"
            :value="today"
            v-model="start"
            :type="type"
            :end="end"
            color="primary"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.nome"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.nome"
                    ></div>
                  </template>
                </v-menu>
              </template>
            </template>
            
          </v-calendar>
                <v-flex
        sm4
        xs12
        class="text-sm-left text-xs-center"
      >
        <v-btn @click="$refs.calendar.prev()">
          <v-icon
            dark
            left
          >
            keyboard_arrow_left
          </v-icon>
          Prev
        </v-btn>
        <v-btn @click="$refs.calendar.next()">
          Next
          <v-icon
            right
            dark
          >
            keyboard_arrow_right
          </v-icon>
        </v-btn>
      </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs6 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Tarefas</h3>
          </v-card-title>
          <template>
            <div id="app">
            <pie-chart :data="this.chartData"></pie-chart>
            </div>
          </template>
        </v-card>
      </v-flex>

  <v-snackbar
      v-model="erro"
      color="red"
    >
      {{ erroMess }}
      <v-btn
        dark
        flat
        @click="erro = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>

var axios = require('axios')
import PieChart from "./PieChart";

export default {
  props: ['idProjeto'],
  components: {
      PieChart
    },
  data: () => ({
    erro: false,
    erroMess: '',
    validation: true,
    dialogSprint: false,
    dialogTarefa: false,
    dialogGroup: false,
    dialogMilestone: false,
    dialogUserTarefa: false,
    descricao: '',
    novoUsername: '',
    novoUserTarefa: '',
    idSprint: -1,
    idTarefa: -1,
    indexSprint: -1,
    grupo: [],
    grupo2: [],
    listaSprints: [],
    listaUtilizadores:[],
    listaMilestones: [],
    type: 'month',
    start: '2019-06-01',
    end: '2023-01-06',
    novoSprint: {
      nome: '',
      data_limite: '',
      idProjeto: -1
    },
    novaTarefa: {
      idTarefa: '',
      username: ' '
    },
    novoMilestone: {
      nome: '',
      data_limite: '',
      idProjeto: -1
    },
    attributes: [
      {
        highlight: true,
        dates: []
      }
    ],
    events: {},
    
    chartData: {
        labels: [],
        datasets:[ 
          {
            label: "",
            backgroundColor: ["#41B883", "#E46651"],
            data: []
          }
        ]
        
      }
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.listaMilestones.forEach(e => (map[e.data_limite] = map[e.data_limite] || []).push(e))
      return map
    }
  },
  mounted: async function () {
    this.loadSprints(this.idProjeto)
    this.loadGroup(this.idProjeto)
    this.loadMilestones(this.idProjeto)
  },
  methods: {
    loadGroup: async function (id) {
      var res = await axios.get('http://localhost:7001/grupo/' + id)
      this.grupo = JSON.parse(JSON.stringify(res.data))
      this.grupo2 = res.data.map(user => {
        this.chartData.labels.push(user.nome)
        this.chartData.datasets[0].data.push(user.nr)
        return {
          value: user.nome,
          key: user.username
        };
      });
      alert(JSON.stringify(this.chartData))
    },
    loadSprints: async function (id) {
      var res = await axios.get('http://localhost:7001/sprints/' + id)
        this.listaSprints = JSON.parse(JSON.stringify(res.data.sprints))
    },
    loadMilestones: async function (id) {
      var res = await axios.get('http://localhost:7001/milestones/' + id)
      this.listaMilestones = JSON.parse(JSON.stringify(res.data))

    },
    goProjetos: function () {
      this.$router.push('/projects')
    },
    adicionarSprint: async function () {
      this.novoSprint.idProjeto = this.idProjeto
      await axios.post('http://localhost:7001/sprint/', this.novoSprint)
        .then(res => {
          this.listaSprints.push(res.data)
          this.novoSprint = { nome: '', data_limite: '', idProjeto: -1 }
          this.dialogSprint = false
        })
        .catch(() => {
          this.novoSprint = { nome: '', data_limite: '', idProjeto: -1 }
          this.dialogSprint = false
          this.erro = true
          this.erroMess = 'Erro a adicionar Sprint'
        })
    },
    adicionarMilestone: async function () {
      this.novoMilestone.idProjeto = this.idProjeto
      console.log(JSON.stringify(this.novoMilestone))
      await axios.post('http://localhost:7001/milestone/', this.novoMilestone)
        .then(res => {
          this.listaMilestones.push(res.data)
          this.novoMilestone = { nome: '', data_limite: '', idProjeto: -1 }
          this.dialogMilestone = false
        })
        .catch(() => {
          this.novoMilestone = { nome: '', data_limite: '', idProjeto: -1 }
          this.dialogMilestone = false
          this.erro = true
          this.erroMess = 'Erro a adicionar Milestone'
        })
    },
    addTarefa: function (idSprint, index) {
      this.idSprint = idSprint
      this.indexSprint = index
      this.dialogTarefa = true
    },
    addUserTarefa: async function () {
      await axios.post('http://localhost:7001/userT/', {username: this.novoUserTarefa, idTarefa: this.idTarefa})
        .then(res => {
          this.listaUtilizadores.push(res.data)
          this.dialogUserTarefa = false
        })
        .catch(() => {
          this.dialogUserTarefa = false
          this.erro = true
          this.erroMess = 'Erro a adicionar Utilizador a Tarefa'
        })
    },
    getUsers: async function (id) {
       await axios.get('http://localhost:7001/'+this.idProjeto+'/users/'+id).then(res => {
        string = ""
        for( i in res.data)
          string += res.data[i].username + " | "
        
        return string
      })
      .catch(() => {return "Erro"}) 
    },
    novaTarefa: async function () {
      var tar = {
        descricao: this.descricao,
        idSprint: this.idSprint
      }
      await axios.post('http://localhost:7001/tarefa/' + this.idProjeto, tar)
        .then(res => {
          this.listaSprints[this.indexSprint].tarefas.push(res.data)
          this.descricao = ''
          this.dialogTarefa = false
        })
        .catch(() => {
          this.descricao = ''
          this.dialogTarefa = false
          this.erro = true
          this.erroMess = 'Erro a adicionar Tarefa'
        })
    },
    novoMembro: async function () {
      await axios.post('http://localhost:7001/grupo/' + this.idProjeto, { username: this.novoUsername })
        .then(res => {
          this.novoUsername = ''
          this.dialogGroup = false
        })
        .catch(() => {
          this.novoUsername = ''
          this.dialogGroup = false
          this.erro = true
          this.erroMess = 'Erro na adição de Membro'
        })
    },
    open (event) {
      alert(event.title)
    },
    
  }
}

</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
</style>