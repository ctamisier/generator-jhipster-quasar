import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { LocalStorage, SessionStorage } from 'quasar';

export const beforeEachAuth = async (to, from, next, authStore) => {
  try {
    const idToken = LocalStorage.getItem('jhi-authenticationToken') || SessionStorage.getItem('jhi-authenticationToken');
    if (idToken && !authStore.isAuthenticated) {
      api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
      const accountResponse = await api.get('/api/account');
      authStore.login(accountResponse.data);
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
    authStore.logout();
    next('/');
  }
};

export const authLogin = async (authStore, router, route, credentials) => {
  const authenticateResponse = await api.post('/api/authenticate', credentials);
  const storage = credentials.rememberMe ? localStorage : sessionStorage;
  storage.setItem('jhi-authenticationToken', authenticateResponse.data.id_token);
  api.defaults.headers.common.Authorization = `Bearer ${authenticateResponse.data.id_token}`;
  const accountResponse = await api.get('/api/account');
  authStore.login(accountResponse.data);
  const langKey = accountResponse.data.langKey;
  loadTranslation(langKey);
  if (route.query.redirect) {
    router.push(route.query.redirect);
  }
};

export const authLogout = (authStore, router) => {
  authStore.logout();
  router.push('/');
};
