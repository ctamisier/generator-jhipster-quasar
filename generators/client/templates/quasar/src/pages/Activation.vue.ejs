<template>
  <q-page> </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageActivation',

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();

    router.push('/');

    const activate = async () => {
      try {
        await api.get('/api/activate', { params: { key: route.query.key } });
        $q.notify({
          html: true,
          message: t('activate.messages.success'),
        });
      } catch (e) {
        $q.notify({
          html: true,
          type: 'negative',
          message: t('activate.messages.error'),
        });
      }
    };

    activate();
  },
});
</script>
