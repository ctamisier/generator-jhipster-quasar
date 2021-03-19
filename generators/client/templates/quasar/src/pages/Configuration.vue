<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="flex row inline">
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Active Profile</q-item-label>
                <q-item-label caption>{{ info['activeProfiles'] }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-expansion-item :label="$t('configuration.title')">
        <q-table
          :title="$t('configuration.title')"
          :rows="configProps"
          :columns="configPropsColumns"
          row-key="prefix"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr>
              <q-td>
                {{ props.row.prefix }}
              </q-td>
              <q-td>
                <pre>{{ props.row.properties }}</pre>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-expansion-item>
      <q-expansion-item label="System Environment">
        <q-table
          title="env"
          :rows="env['propertySources']"
          :columns="envColumns"
          row-key="name"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr>
              <q-td style="width: 400px; white-space: initial">
                {{ props.row.name }}
              </q-td>
              <q-td style="max-width: 200px;">
                <q-markup-table>
                  <tr
                    v-bind:key="prop"
                    v-for="(prop, key) in props.row.properties"
                  >
                    <td style="width: 400px;">
                      {{ key }}
                    </td>
                    <td style="white-space: initial">
                      {{ prop.value }}
                    </td>
                  </tr>
                </q-markup-table>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { api } from 'boot/axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageConfiguration',

  setup () {
    const { t } = useI18n();

    const configProps = ref([])
    const env = ref({});
    const info = ref({});

    const configPropsColumns = [
      { name: 'prefix', label: t('configuration.table.prefix'), align: 'left' },
      { name: 'properties', label: t('configuration.table.properties'), align: 'left' }
    ];

    const envColumns = [
      { name: 'name', label: 'Name', align: 'left' },
      { name: 'properties', label: 'Properties', align: 'left' }
    ];

    const transform = tree => {
      for (const key in tree) {
        const item = tree[key];
        if (item && !item.properties) {
          transform(item);
        } else {
          if (item) {
            configProps.value.push({
              prefix: item.prefix,
              properties: item.properties,
            });
          }
        }
      }
    };

    api.get('/management/configprops').then(response => {
      transform(response.data);
    });

    api.get('/management/env').then(response => {
      env.value = response.data
    });

    api.get('/management/info').then(response => {
      info.value = response.data
    });

    return {
      configPropsColumns,
      configProps,
      envColumns,
      env,
      info
    };
  },
});
</script>
