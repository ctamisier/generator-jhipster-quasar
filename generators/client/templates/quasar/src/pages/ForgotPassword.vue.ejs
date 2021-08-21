<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      @submit="onSubmit"
      class="responsive-width q-gutter-md"
      greedy
    >
      <q-input
        v-model="forgot.email"
        type="email"
        :label="$t('userManagement.email')"
        lazy-rules
        :rules="[$rules.required(), $rules.minLength(5), $rules.maxLength(254)]"
        @keydown.enter.prevent
      />
      <div class="flex justify-between">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('reset.request.form.button')"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageRegister',

  setup() {
    const router = useRouter();

    const forgot = reactive({
      email: null,
    });

    const onSubmit = async () => {
      await api.post('/api/account/reset-password/init', forgot.email, {
        headers: { 'content-type': 'text/plain' },
      });
      router.push('/');
    };

    return {
      forgot,
      onSubmit,
    };
  },
});
</script>
