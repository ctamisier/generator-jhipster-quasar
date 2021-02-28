<template>
  <q-page>
    <pre>{{ configuration }}</pre>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageConfiguration',

  setup () {
    const configuration = ref()

    api.get('/management/configprops').then(response => {
      configuration.value = response.data
    })

    return {
      configuration
    }
  }
})
</script>
