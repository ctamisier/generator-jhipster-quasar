<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      v-if="!isAuthenticated"
      @submit="onSubmit"
      class="q-gutter-md"
      style="min-width: 300px"
    >
      <q-input
        autocomplete="on"
        v-model="credentials.username"
        :label="$t('global.form[\'username.label\']')"
        lazy-rules
        :rules="[ val => val && val.length >= 4 ]"
      />
      <q-input
        autocomplete="current-password"
        v-model="credentials.password"
        type="password"
        :label="$t('login.form.password')"
        lazy-rules
        :rules="[ val => val && val.length >= 4 ]"
      />
      <div class="flex justify-center">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('login.form.button')"
        />
      </div>
      <div class="q-pt-xl column items-center">
        <div class="col">
          {{ $t('global.messages.info.register.noaccount') }}
        </div>
        <div class="col">
          <q-btn
            to="/register"
            flat
            color="primary"
            :label="$t('global.menu.account.register')"
          />
        </div>
      </div>
    </q-form>
    <div v-if="isAuthenticated">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-full.svg"
      >
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue'
import { api } from 'boot/axios'
import { useStore } from 'vuex'
import { loadLanguage } from 'boot/i18n'

export default defineComponent({
  name: 'PageIndex',

  setup () {
    const store = useStore()

    const credentials = reactive({
      username: '',
      password: ''
    })

    return {
      credentials,
      isAuthenticated: computed(() => store.getters['auth/isAuthenticated']),
      onSubmit () {
        api.post('/api/authenticate', credentials)
          .then(authenticateResponse => {
            sessionStorage.setItem('id_token', authenticateResponse.data.id_token)
            api.defaults.headers.common.Authorization = `Bearer ${authenticateResponse.data.id_token}`
            return api.get('/api/account')
          }).then(accountResponse => {
            store.dispatch('auth/login', accountResponse.data)
            const langKey = accountResponse.data.langKey
            loadLanguage(langKey)
          }).catch(() => {
            store.dispatch('auth/logout')
          })
      }
    }
  }
})
</script>
