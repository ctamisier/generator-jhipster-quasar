<template>
  <q-page class="q-pa-md flex flex-center">
    <div style="min-width: 300px">
      <div class="q-pa-md q-gutter-md">
        <q-badge
          v-bind:key="authority"
          v-for="authority in account.data.authorities"
          color="primary"
        >
          {{ authority }}
        </q-badge>
      </div>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          v-model="account.data.firstName"
          :label="$t('userManagement.firstName')"
          :rules="[val => !!val]"
        />
        <q-input
          v-model="account.data.lastName"
          :label="$t('userManagement.lastName')"
          :rules="[val => !!val]"
        />
        <q-input
          v-model="account.data.email"
          type="email"
          :label="$t('userManagement.email')"
          :rules="[val => !!val]"
        />
        <q-select
          v-model="account.data.langKey"
          :options="langKeys"
          :label="$t('userManagement.langKey')"
          :rules="[val => !!val]"
        />
        <div class="flex justify-between">
          <q-btn
            to="/"
            flat
            color="primary"
            :label="$t('entity.action.back')"
          />
          <q-btn
            type="submit"
            color="primary"
            :label="$t('entity.action.save')"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { loadLanguage } from 'boot/i18n'
import { langKeys } from '../constants/langKeys'

export default defineComponent({
  name: 'PageAccount',

  setup () {
    const router = useRouter()
    const account = reactive({
      data: {
        firstName: null,
        lastName: null,
        email: null,
        langKey: null,
        authorities: []
      }
    })

    api.get('/api/account').then(accountResponse => {
      account.data = accountResponse.data
    })

    return {
      account,
      langKeys,
      onSubmit () {
        api.post('/api/account', account.data)
          .then(() => {
            loadLanguage(account.data.langKey)
            router.push('/')
          })
      }
    }
  }
})
</script>
