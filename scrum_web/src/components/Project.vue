<template>
  <v-container>
    <v-layout v-if="!validation">
      <v-flex xs9 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Sprints</h3>
          </v-card-title>

          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon dark fab small color="blue darken-1">
                    <v-icon>add</v-icon>
                  </v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
      <v-flex xs3 ma-1>
        <v-card>
          <v-card-title primary-title>
            <h3>Grupo</h3>
          </v-card-title>
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
      Ficheiro indesponivel tente mais tarde...
       <v-btn dark flat @click="goProjetos">Fechar</v-btn>
      </v-alert>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    props: ["idProjeto"],
    data: () => ({
      erro: false,
      validation: true,
      listaSprints: [],
      novoSprint: {
        idSprint: -1,
        data_limite: "",
        idProjeto: this.idProjeto,
        listaTarefas: []
      }
    }),
    methods: {
      loadSprints: async function(id){
        var res = await axios.get("http://localhost:7001/sprints/"+id)
        if(res.data.validation === false)
          this.validation = false
        else{
          this.listaSprints(JSON.parse(JSON.stringify(res.data.sprints)))
        }
      },
      goProjetos: function() {
        this.$router.push('/projects')
      }
    }
}
</script>

