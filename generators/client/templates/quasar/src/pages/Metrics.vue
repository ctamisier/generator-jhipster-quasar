<template>
  <q-page>
    <h6 class="q-my-md q-ml-md">
      {{ $t('metrics.jvm.title') }}
    </h6>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-bind:key="metric"
        v-for="(metric, name) in metrics['jvm']"
      >
        <q-card-section>
          <div>{{ name }}</div>
          <q-circular-progress
            show-value
            class="text-light-blue q-ma-md"
            :value="metric['max'] / metric['committed']"
            size="50px"
            color="light-blue"
          >
            {{ Math.floor(metric['max'] / metric['committed']) }}%
          </q-circular-progress>
          <div
            v-bind:key="detail"
            v-for="detail in Object.entries(metric)"
          >
            {{ detail[0] }} {{ kbToMb(detail[1]) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <pre>{{ metrics }}</pre>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageConfiguration',

  setup () {
    const metrics = ref({})

    const kbToMb = (kb) => `${Math.floor(kb / 1_000_000)} Mb`

    api.get('/management/jhimetrics').then(response => {
      metrics.value = response.data
    })

    return {
      metrics,
      kbToMb
    }
  }
})
</script>
