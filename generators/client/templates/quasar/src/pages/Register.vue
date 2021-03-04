<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      style="min-width: 300px"
    >
      <q-input
        v-model="account.data.login"
        :label="$t('global.form[\'username.label\']')"
        :rules="[val => !!val && val.length >= 4]"
      />
      <q-input
        v-model="account.data.email"
        type="email"
        :label="$t('global.form[\'email.label\']')"
        :rules="[val => !!val && val.length >= 5]"
      />
      <q-input
        v-model="account.data.password"
        :label="$t('global.form[\'newpassword.label\']')"
        :rules="[val => !!val && val.length >= 4]"
      />
      <q-input
        autocomplete="new-password"
        v-model="account.data.password2"
        type="password"
        :label="$t('global.form[\'confirmpassword.label\']')"
        lazy-rules="ondemand"
        :rules="[val => !!val && val.length >= 4 && val === account.data.password]"
      />
      <div class="flex justify-between">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('register.form.button')"
        />
        <q-btn
          to="/"
          flat
          color="primary"
          :label="$t('entity.action.back')"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const account = reactive({
      data: {
        login: null,
        email: null,
        password: null,
        password2: null,
        langKey: 'en'
      }
    })

    return {
      account,
      onSubmit () {
        api.post('/api/register', account.data)
          .then(() => {
            router.push('/')
          })
      }
    }
  }
})
</script>
