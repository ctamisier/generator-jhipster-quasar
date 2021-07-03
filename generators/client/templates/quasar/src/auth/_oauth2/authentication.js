import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { Cookies } from 'quasar';

export const beforeEachAuth = async (to, from, next, store) => {
  const hasXsrfToken = Cookies.has('XSRF-TOKEN');

  if (hasXsrfToken && !store.getters['auth/isAuthenticated']) {
    try {
      const accountResponse = await api.get('/api/account');
      store.dispatch('auth/login', accountResponse.data);
      loadTranslation(accountResponse.data.langKey);
      next();
    } catch (e) {
      authLogin();
    }
  } else if (!hasXsrfToken && !to.meta.public) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

export const authLogin = () => {
  window.location.href = '/oauth2/authorization/oidc';
};

export const authLogout = async (store, router) => {
  try {
    await api.post('/api/logout');
    store.dispatch('auth/logout');
  } finally {
    router.push('/');
  }
};
