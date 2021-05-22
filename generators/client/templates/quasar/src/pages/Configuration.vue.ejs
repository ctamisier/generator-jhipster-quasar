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
      <div class="q-py-md">
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
      </div>
      <div
        v-bind:key="props.name"
        v-for="props in env['propertySources']"
      >
        <h6 class="q-my-md q-ml-md">{{ props.name }}</h6>
        <q-markup-table>
          <tbody>
            <tr
              v-bind:key="prop"
              v-for="(prop, key) in props.properties"
            >
              <td style="width: 400px">
                {{ key }}
              </td>
              <td style="white-space: initial">
                {{ prop.value }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PageConfiguration',

  setup () {
    const { t } = useI18n();

    const configProps = ref([]);
    const env = ref({});
    const info = ref({});

    const configPropsColumns = [
      { name: 'prefix', label: t('configuration.table.prefix'), align: 'left' },
      { name: 'properties', label: t('configuration.table.properties'), align: 'left' },
    ];

    const envColumns = [
      { name: 'name', label: 'Name', align: 'left' },
      { name: 'properties', label: 'Properties', align: 'left' },
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
      env.value = response.data;
    });

    api.get('/management/info').then(response => {
      info.value = response.data;
    });

    return {
      configPropsColumns,
      configProps,
      envColumns,
      env,
      info,
    };
  },
});
</script>
