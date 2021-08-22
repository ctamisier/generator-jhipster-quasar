<template>
  <q-page v-if="health">
    <div class="q-pa-md">
      <div class="row items-start q-gutter-md">
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
            <q-field
              v-for="item in ['total', 'free', 'threshold']"
              :key="item"
              :label="item"
              readonly
              borderless
              stack-label
              style="width: 100px"
            >
              <template v-slot:control>
                {{ humanStorageSize(health.components.diskSpace.details[item]) }}
              </template>
            </q-field>
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
            <q-field
              v-for="item in ['database', 'validationQuery']"
              :key="item"
              :label="item"
              readonly
              borderless
              stack-label
              style="width: 100px"
            >
              <template v-slot:control>
                {{ health.components.db.details[item] }}
              </template>
            </q-field>
          </q-card-section>
        </q-card>
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

    const fetchHealth = async () => {
      health.value = (await api.get('/management/health')).data;
    };

    fetchHealth();

    return {
      health,
      humanStorageSize,
      badgeColor: value => (value === 'UP' ? 'green' : 'red'),
    };
  },
});
</script>
