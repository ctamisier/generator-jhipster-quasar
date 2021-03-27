<script>
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageActivation',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();

    router.push('/');

    api
      .get('/api/activate', { params: { key: route.query.key } })
      .then(() => {
        Notify.create({
          html: true,
          message: t('activate.messages.success'),
        });
      })
      .catch(() => {
        Notify.create({
          html: true,
          type: 'negative',
          message: t('activate.messages.error'),
        });
      });
  },
});
</script>
