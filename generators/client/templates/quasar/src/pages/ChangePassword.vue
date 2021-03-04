<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      style="min-width: 300px"
    >
      <q-input
        v-model="passwords.currentPassword"
        type="password"
        :label="$t('global.form[\'currentpassword.label\']')"
        lazy-rules
        :rules="[val => !!val && val.length >= 4]"
      />
      <q-input
        autocomplete="new-password"
        v-model="passwords.newPassword"
        type="password"
        :label="$t('global.form[\'newpassword.label\']')"
        lazy-rules="ondemand"
        :rules="[val => !!val]"
      />
      <q-input
        autocomplete="new-password"
        v-model="passwords.newPassword2"
        type="password"
        :label="$t('global.form[\'confirmpassword.label\']')"
        lazy-rules="ondemand"
        :rules="[val => !!val && val.length >= 4 && val === passwords.newPassword]"
      />
      <div class="flex justify-between">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('entity.action.save')"
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
  name: 'PageChangePassword',

  setup () {
    const router = useRouter()
    const passwords = reactive({
      currentPassword: null,
      newPassword: null,
      newPassword2: null
    })

    return {
      passwords,
      onSubmit () {
        api.post('/api/account/change-password', passwords)
          .then(() => {
            router.push('/')
          })
      }
    }
  }

})
</script>
