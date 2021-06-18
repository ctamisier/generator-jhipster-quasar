import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { LocalStorage, SessionStorage } from 'quasar';

export const beforeEachAuth = (to, from, next, store) => {
  const idToken = LocalStorage.getItem('jhi-authenticationToken') || SessionStorage.getItem('jhi-authenticationToken');
  if (idToken && !store.getters['auth/isAuthenticated']) {
    api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
    api.get('/api/account').then(accountResponse => {
      store.dispatch('auth/login', accountResponse.data);
      loadTranslation(accountResponse.data.langKey);
      next();
    });
  } else if (!idToken && !to.meta.public) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

export const authLogin = (store, router, route, credentials) => {
  api
    .post('/api/authenticate', credentials)
    .then(authenticateResponse => {
      const storage = credentials.rememberMe ? localStorage : sessionStorage;
      storage.setItem('jhi-authenticationToken', authenticateResponse.data.id_token);
      api.defaults.headers.common.Authorization = `Bearer ${authenticateResponse.data.id_token}`;
      return api.get('/api/account');
    })
    .then(accountResponse => {
      store.dispatch('auth/login', accountResponse.data);
      const langKey = accountResponse.data.langKey;
      loadTranslation(langKey);
      if (route.query.redirect) {
        router.push(route.query.redirect);
      }
    })
    .catch(() => {
      store.dispatch('auth/logout');
    });
};

export const authLogout = (store, router) => {
  store.dispatch('auth/logout');
  router.push('/');
};
