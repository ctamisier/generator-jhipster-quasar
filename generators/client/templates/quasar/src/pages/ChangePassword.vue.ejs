<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      @submit="onSubmit"
      class="responsive-width q-gutter-md"
      greedy
    >
      <input
        autocomplete="username"
        v-model="currentLogin"
        class="hidden"
      />
      <q-input
        autocomplete="current-password"
        v-model="passwords.currentPassword"
        type="password"
        :label="$t('global.form[\'currentpassword.label\']')"
        :rules="[$rules.required()]"
        @keydown.enter.prevent
      />
      <q-input
        autocomplete="new-password"
        v-model="passwords.newPassword"
        type="password"
        :label="$t('global.form[\'newpassword.label\']')"
        lazy-rules
        :rules="[$rules.required(), $rules.minLength(4), $rules.maxLength(100)]"
        @keydown.enter.prevent
      />
      <q-input
        autocomplete="new-password"
        v-model="passwords.newPassword2"
        type="password"
        :label="$t('global.form[\'confirmpassword.label\']')"
        lazy-rules
        :rules="[$rules.sameAs(passwords.newPassword)]"
        @keydown.enter.prevent
      />
      <div class="flex justify-between">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('entity.action.save')"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PageChangePassword',

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    const currentLogin = store.state.auth.account.login;

    const passwords = reactive({
      currentPassword: null,
      newPassword: null,
      newPassword2: null,
    });

    const onSubmit = async () => {
      try {
        await api.post('/api/account/change-password', passwords);
        router.push('/');
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: e.response.data.title,
        });
      }
    };

    return {
      currentLogin,
      passwords,
      onSubmit,
    };
  },
});
</script>
