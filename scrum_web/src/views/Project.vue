<template>
    <Projeto :idProjeto="$route.params.idProjeto" />
</template>

<script>
import Projeto from '@/components/Project.vue'

export default {
  components: {
    Projeto
  }
}
</script>
