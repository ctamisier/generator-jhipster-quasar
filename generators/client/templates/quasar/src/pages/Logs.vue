<template>
  <div class="q-pa-md">
    <q-virtual-scroll
      type="table"
      style="max-height: 90vh"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32"
      :items="loggers"
    >
      <template v-slot:before>
        <thead class="text-left">
          <tr>
            <th scope="col">
              {{ $t('logs.table.name') }}
            </th>
            <th scope="col">
              {{ $t('logs.table.level') }}
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot="{ item: row, index }">
        <tr :key="index">
          <td>
            {{ row.logger }}
          </td>
          <td>
            <q-btn-toggle
              v-model="model[row.logger]"
              toggle-color="primary"
              :options="levels"
              @click="toggle(row, model[row.logger])"
            />
          </td>
        </tr>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LogsPage',

  setup () {
    const loggers = ref([]);
    const levels = ref([]);
    const model = ref([]);

    const fetchLoggers = () => {
      api.get('/management/loggers').then(response => {
        const data = response.data;

        for (const [key, value] of Object.entries(data.loggers)) {
          model.value[key] = value.effectiveLevel;
          loggers.value.push({ logger: key, level: value.effectiveLevel });
        }

        levels.value = data.levels.map(level => {
          return { label: level, value: level };
        });
      });
    };

    fetchLoggers();

    return {
      loggers,
      levels,
      model,
      toggle: (row, level) => {
        api.post(`/management/loggers/${row.logger}`, { configuredLevel: level }).then(() => {
          fetchLoggers();
        });
      },
    };
  },
});
</script>
