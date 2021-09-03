<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('userManagement.home.title')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <router-link
          to="/users/new"
          v-slot="{ navigate }"
          custom
        >
          <q-btn
            color="primary"
            :label="$t('userManagement.home.createLabel')"
            @click="navigate"
            data-cy="new"
          />
        </router-link>
      </template>
      <template v-slot:body="props">
        <q-tr>
          <q-td>
            {{ props.row.login }}
          </q-td>
          <q-td>
            {{ props.row.firstName }}
          </q-td>
          <q-td>
            {{ props.row.lastName }}
          </q-td>
          <q-td>
            {{ props.row.email }}
          </q-td>
          <q-td>
            {{ props.row.langKey }}
          </q-td>
          <q-td>
            {{ props.row.createdBy }}
          </q-td>
          <q-td>
            {{ props.row.createdDate && format(parseISO(props.row.createdDate)) }}
          </q-td>
          <q-td>
            {{ props.row.lastModifiedBy }}
          </q-td>
          <q-td>
            {{ props.row.lastModifiedDate && format(parseISO(props.row.lastModifiedDate)) }}
          </q-td>
          <q-td>
            <div
              :key="authority"
              v-for="authority in props.row.authorities"
            >
              <q-badge>
                {{ authority }}
              </q-badge>
            </div>
          </q-td>
          <q-td>
            <q-toggle
              v-bind:disable="currentLogin === props.row.login"
              v-model="props.row.activated"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              @click="handleActivation(props.row)"
            />
          </q-td>
          <q-td>
            <router-link
              :to="`/users/${props.row.login}/view`"
              v-slot="{ navigate }"
              custom
            >
              <q-btn
                icon="visibility"
                @click="navigate"
                data-cy="view"
              />
            </router-link>
            <router-link
              :to="`/users/${props.row.login}/edit`"
              v-slot="{ navigate }"
              custom
            >
              <q-btn
                icon="edit"
                @click="navigate"
                data-cy="edit"
              />
            </router-link>
            <q-btn
              v-bind:disable="currentLogin === props.row.login"
              icon="delete_forever"
              @click="deleteUser(props.row.login)"
              data-cy="delete"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from 'boot/axios';
import { parseISO } from 'date-fns';
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { format } from '../util/format';

export default defineComponent({
  name: 'PageUsers',

  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const rows = ref([]);
    const loading = ref(false);

    const pagination = ref({
      sortBy: route.query.sortBy || 'login',
      descending: route.query.descending === 'true',
      page: Number.parseInt(route.query.page || 1),
      rowsPerPage: Number.parseInt(route.query.rowsPerPage) || 10,
      rowsNumber: 10,
    });

    const loadingActivation = ref([]);

    const currentLogin = store.state.auth.account.login;

    const columns = [
      { name: 'login', align: 'left', label: t('userManagement.login'), field: 'login', sortable: true },
      { name: 'firstName', align: 'left', label: t('userManagement.firstName'), field: 'firstName', sortable: true },
      { name: 'lastName', align: 'left', label: t('userManagement.lastName'), field: 'lastName', sortable: true },
      { name: 'email', align: 'left', label: t('userManagement.email'), field: 'email', sortable: true },
      { name: 'langKey', align: 'left', label: t('userManagement.langKey'), field: 'langKey', sortable: true },
      { name: 'createdBy', align: 'left', label: t('userManagement.createdBy'), field: 'createdBy', sortable: true },
      { name: 'createdDate', align: 'left', label: t('userManagement.createdDate'), field: 'createdDate', sortable: true },
      { name: 'lastModifiedBy', align: 'left', label: t('userManagement.lastModifiedBy'), field: 'lastModifiedBy', sortable: true },
      { name: 'lastModifiedDate', align: 'left', label: t('userManagement.lastModifiedDate'), field: 'lastModifiedDate', sortable: true },
      { name: 'authorities', align: 'left', label: t('userManagement.profiles'), field: 'authorities', sortable: false },
      { name: 'activated', align: 'left', label: t('userManagement.activated'), field: 'activated', sortable: true },
    ];

    const onRequest = async props => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;

      loading.value = true;

      try {
        const response = await api.get('/api/admin/users', {
          params: {
            page: page - 1,
            size: rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage,
            sort: `${sortBy},${descending ? 'desc' : 'asc'}`,
          },
        });
        pagination.value.rowsNumber = response.headers['x-total-count'];
        rows.value = response.data;
      } finally {
        loading.value = false;
      }

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;

      router.replace({ query: { page, sortBy, descending, rowsPerPage } });
    };

    onMounted(() => onRequest({ pagination: pagination.value }));

    const deleteUser = async login => {
      $q.dialog({
        message: t('userManagement.delete.question', { login: login }),
        cancel: true,
      }).onOk(async () => {
        await api.delete(`/api/admin/users/${login}`);
        onRequest({ pagination: pagination.value });
      });
    };

    const handleActivation = async row => {
      if (row.login !== currentLogin) {
        loadingActivation.value[row.login] = true;
        try {
          await api.put('/api/admin/users', row);
          onRequest({ pagination: pagination.value });
        } finally {
          loadingActivation.value[row.login] = false;
        }
      }
    };

    return {
      store,
      loading,
      pagination,
      columns,
      rows,
      currentLogin,
      parseISO,
      format,
      loadingActivation,
      onRequest,
      deleteUser,
      handleActivation,
    };
  },
});
</script>
