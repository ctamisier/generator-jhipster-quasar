<template>
  <q-page v-if="health">
    <div class="q-pa-md">
      <div class="row items-start q-gutter-md">
        <q-card
          :key="item"
          v-for="item in ['ping', 'livenessState', 'readinessState']"
        >
          <q-card-section class="text-center">
            {{ $t(`health.indicator.${item}`) }}
          </q-card-section>
          <q-card-section class="text-center">
            <q-badge :color="badgeColor(health.components[item].status)">
              {{ health.components[item].status }}
            </q-badge>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="text-center">
            {{ $t('health.indicator.diskSpace') }}
          </q-card-section>
          <q-card-section class="text-center">
            <q-badge :color="badgeColor(health.components.diskSpace.status)">
              {{ health.components.diskSpace.status }}
            </q-badge>
          </q-card-section>
          <q-card-section>
            <div
              :key="item"
              v-for="item in ['total', 'free', 'threshold']"
            >
              {{ item }}
              <q-badge
                outline
                color="primary"
                :label="humanStorageSize(health.components.diskSpace.details[item])"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="text-center">
            {{ $t('health.indicator.db') }}
          </q-card-section>
          <q-card-section class="text-center">
            <q-badge :color="badgeColor(health.components.db.status)">
              {{ health.components.db.status }}
            </q-badge>
          </q-card-section>
          <q-card-section>
            <div
              :key="item"
              v-for="item in ['database', 'validationQuery']"
            >{{ item }}
              <q-badge
                outline
                color="primary"
                :label=" health.components.db.details[item]"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { format } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageHealth',

  setup() {
    const { humanStorageSize } = format;
    const health = ref();

    api.get('/management/health').then(response => {
      health.value = response.data;
    });
    return {
      health,
      humanStorageSize,
      badgeColor: value => (value === 'UP' ? 'green' : 'red'),
    };
  },
});
</script>
