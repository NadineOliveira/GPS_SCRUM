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
                  </v-list-tile-content>
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
                    <v-icon>add</v-icon>
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
      <v-dialog v-model="dialogTarefa" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Adicionar Sprint</v-card-title>
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
            <v-btn color="green darken-1" flat @click="novaTarefa(descricao)">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </v-container>
</template>

<script>
var axios = require('axios')
export default {
    props: ["idProjeto"],
    data: () => ({
      erro: false,
      erroMess: "",
      validation: true,
      dialogSprint: false,
      dialogTarefa: false,
      descricao: "",
      idSprint: -1,
      indexSprint: -1,
      grupo: [],
      listaSprints: [],
      novoSprint: {
        nome: "",
        data_limite: "",
        idProjeto: -1
      }
    }),
    mounted: async function () {
      this.loadSprints(this.idProjeto)
      this.loadGroup(this.idProjeto)
    },
    methods: {
      loadGroup: async function(id){
        var res = await axios.get("http://localhost:7001/grupo/"+id)
        this.grupo = JSON.parse(JSON.stringify(res.data))
      },
      loadSprints: async function(id){
        var res = await axios.get("http://localhost:7001/sprints/"+id)
        if(res.data.validation === false)
          this.validation = false
        else{
          this.listaSprints = JSON.parse(JSON.stringify(res.data.sprints))
        }
      },
      goProjetos: function() {
        this.$router.push('/projects')
      },
      adicionarSprint: async function() {
        this.novoSprint.idProjeto = this.idProjeto
        await axios.post("http://localhost:7001/sprint/",this.novoSprint)
                .then(res => {
                  this.listaSprints.push(res.data)
                  this.dialogSprint = false
                })
                .catch(() => {
                  this.erro = true
                  this.erroMess = "Erro a adicionar Sprint"
                })

      },
      addTarefa: function(idSprint,index) {
        this.idSprint = idSprint
        this.indexSprint = index
        this.dialogTarefa = true
      },
      novaTarefa: async function(desc) {
        var tar = {
          descricao: desc,
          idSprint: this.idSprint
        }
        await axios.post("http://localhost:7001/tarefa/"+this.idProjeto,tar)
          .then(res => {
                  this.listaSprints[this.indexSprint].tarefas.push(res.data)
                  this.dialogTarefa = false
                })
                .catch(() => {
                  this.erro = true
                  this.erroMess = "Erro a adicionar Tarefa"
                })
      }
    }
}
</script>

