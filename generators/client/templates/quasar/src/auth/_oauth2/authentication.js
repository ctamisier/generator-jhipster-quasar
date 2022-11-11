import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { Cookies } from 'quasar';

export const beforeEachAuth = async (to, from, next, authStore) => {
  const hasXsrfToken = Cookies.has('XSRF-TOKEN');

  if (hasXsrfToken && !authStore.isAuthenticated) {
    try {
      const accountResponse = await api.get('/api/account');
      authStore.login(accountResponse.data);
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

export const authLogout = async (authStore, router) => {
  try {
    await api.post('/api/logout');
    authStore.logout();
  } finally {
    router.push('/');
  }
};
