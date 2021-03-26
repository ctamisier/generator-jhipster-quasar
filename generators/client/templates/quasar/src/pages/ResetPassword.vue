<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      style="min-width: 300px"
    >
      <q-input
        autocomplete="new-password"
        v-model="reset.newPassword"
        type="password"
        :label="$t('global.form[\'newpassword.label\']')"
        lazy-rules="ondemand"
        :rules="[val => !!val]"
      />
      <q-input
        autocomplete="new-password"
        v-model="reset.newPassword2"
        type="password"
        :label="$t('global.form[\'confirmpassword.label\']')"
        lazy-rules="ondemand"
        :rules="[val => !!val && val.length >= 4 && val === reset.newPassword]"
      />
      <div class="flex justify-between">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('reset.finish.form.button')"
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
import { defineComponent, reactive } from 'vue';
import { api } from 'boot/axios';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'ResetPassword',

  setup () {
    const router = useRouter();
    const route = useRoute();

    const reset = reactive({
      key: route.query.key,
      newPassword: null,
      newPassword2: null,
    });

    return {
      reset,
      onSubmit () {
        api.post('/api/account/reset-password/finish', reset).then(() => {
          router.push('/');
        });
      },
    };
  },
});
</script>
