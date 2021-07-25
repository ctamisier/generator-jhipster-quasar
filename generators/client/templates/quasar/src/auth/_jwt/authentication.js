import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { LocalStorage, SessionStorage } from 'quasar';

export const beforeEachAuth = async (to, from, next, store) => {
  try {
    const idToken = LocalStorage.getItem('jhi-authenticationToken') || SessionStorage.getItem('jhi-authenticationToken');
    if (idToken && !store.getters['auth/isAuthenticated']) {
      api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
      const accountResponse = await api.get('/api/account');
      store.dispatch('auth/login', accountResponse.data);
      loadTranslation(accountResponse.data.langKey);
      next();
    } else if (!idToken && !to.meta.public) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } catch (e) {
    store.dispatch('auth/logout');
    next('/');
  }
};

export const authLogin = async (store, router, route, credentials) => {
  try {
    const authenticateResponse = await api.post('/api/authenticate', credentials);
    const storage = credentials.rememberMe ? localStorage : sessionStorage;
    storage.setItem('jhi-authenticationToken', authenticateResponse.data.id_token);
    api.defaults.headers.common.Authorization = `Bearer ${authenticateResponse.data.id_token}`;

    const accountResponse = await api.get('/api/account');
    store.dispatch('auth/login', accountResponse.data);
    const langKey = accountResponse.data.langKey;
    loadTranslation(langKey);
    if (route.query.redirect) {
      router.push(route.query.redirect);
    }
  } catch (e) {
    store.dispatch('auth/logout');
  }
};

export const authLogout = (store, router) => {
  store.dispatch('auth/logout');
  router.push('/');
};
