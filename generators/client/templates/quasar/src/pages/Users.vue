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
          style="text-decoration: none; color: inherit;"
        >
          <q-btn
            color="primary"
            :label="$t('userManagement.home.createLabel')"
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
              v-bind:key="authority"
              v-for="authority in props.row.authorities"
            >
              <q-badge>
                {{ authority }}
              </q-badge>
            </div>
          </q-td>
          <q-td>
            <q-toggle
              v-bind:disable="isMyself(props.row)"
              v-model="props.row.activated"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              @click="handleActivation(props.row)"
            />
          </q-td>
          <q-td>
            <router-link
              :to="modifyPath(props.row)"
              style="text-decoration: none; color: inherit;"
            >
              <q-btn icon="edit" />
            </router-link>
            <q-btn
              v-bind:disable="isMyself(props.row)"
              icon="delete_forever"
              @click="deleteUser(props.row.login)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue'
import { api } from 'boot/axios'
import { parseISO } from 'date-fns'
import format from '../util/format'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

const toColumn = (name, label) => {
  return { name: name, align: 'left', label: label, field: name }
}

const toSortableColumn = (name, label) => {
  return { ...toColumn(name, label), sortable: true }
}

export default defineComponent({
  name: 'PageUsers',

  setup () {
    const $q = useQuasar()
    const { t } = useI18n()
    const store = useStore()
    const rows = ref([])
    const filter = ref('')
    const loading = ref(false)
    const pagination = ref({
      sortBy: 'login',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const loadingActivation = ref([])

    const columns = [
      toSortableColumn('login', t('userManagement.login')),
      toSortableColumn('firstName', t('userManagement.firstName')),
      toSortableColumn('lastName', t('userManagement.lastName')),
      toSortableColumn('email', t('userManagement.email')),
      toSortableColumn('langKey', t('userManagement.langKey')),
      toColumn('createdBy', t('userManagement.createdBy')),
      toColumn('createdDate', t('userManagement.createdDate')),
      toColumn('lastModifiedBy', t('userManagement.lastModifiedBy')),
      toColumn('lastModifiedDate', t('userManagement.lastModifiedDate')),
      toColumn('authorities', t('userManagement.profiles')),
      toSortableColumn('activated', t('userManagement.activated'))
    ]

    function onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination

      loading.value = true

      api.get('/api/users', {
        params: {
          page: page - 1,
          size: rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage,
          sort: `${sortBy},${descending ? 'desc' : 'asc'}`
        }
      }).then(response => {
        pagination.value.rowsNumber = response.headers['x-total-count']
        rows.value = response.data
        loading.value = false
      })

      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    }

    onMounted(() => {
      onRequest({ pagination: pagination.value })
    })

    return {
      store,
      filter,
      loading,
      pagination,
      columns,
      rows,
      parseISO,
      format,
      loadingActivation,
      onRequest,
      deleteUser: (login) => {
        $q.dialog({
          message: t('userManagement.delete.question', { login: login }),
          cancel: true
        }).onOk(() => {
          api.delete(`/api/users/${login}`).then(() => {
            onRequest({ pagination: pagination.value })
          })
        })
      },
      handleActivation: (row) => {
        if (row.login === 'admin') return
        loadingActivation.value[row.login] = true
        api.put('/api/users', row).then(() => {
          onRequest({ pagination: pagination.value })
        }).finally(() => {
          loadingActivation.value[row.login] = false
        })
      },
      modifyPath: (row) => `/users/${row.login}`,
      isMyself: (row) => store.state.auth.account.login === row.login
    }
  }
})
</script>
