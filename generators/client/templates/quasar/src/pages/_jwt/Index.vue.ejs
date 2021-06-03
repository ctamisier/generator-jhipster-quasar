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
        :rules="[val => val && val.length >= 4]"
      />
      <q-input
        autocomplete="current-password"
        v-model="credentials.password"
        type="password"
        :label="$t('login.form.password')"
        lazy-rules
        :rules="[val => val && val.length >= 4]"
      />
      <q-checkbox
        v-model="credentials.rememberMe"
        :label="$t('login.form.rememberme')"
      />
      <div class="flex column">
        <q-btn
          type="submit"
          color="primary"
          :label="$t('login.form.button')"
        />
        <q-btn
          to="/account/reset/init"
          flat
          color="primary"
          :label="$t('login.password.forgot')"
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
      <transition
        appear
        enter-active-class="animated rubberBand"
      >
        <img
          alt="Quasar logo"
          src="~assets/jhipster.svg"
          style="width: 200px; height: 100px; animation-duration: 1s"
        />
      </transition>
      <br />
      <img
        v-if="!$q.dark.isActive"
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
      <img
        v-if="$q.dark.isActive"
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical-dark.svg"
        style="width: 200px; height: 200px"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { authLogin } from '../auth/authentication';

export default defineComponent({
  name: 'PageIndex',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const credentials = reactive({
      username: '',
      password: '',
      rememberMe: false,
    });

    return {
      credentials,
      isAuthenticated: computed(() => store.getters['auth/isAuthenticated']),
      onSubmit() {
        authLogin(store, router, route, credentials);
      },
    };
  },
});
</script>
