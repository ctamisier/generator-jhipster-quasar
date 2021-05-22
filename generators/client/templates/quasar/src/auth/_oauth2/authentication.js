import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { getCookie } from '../util/cookies';

export const beforeEachAuth = (to, from, next, store) => {
  const xsrfToken = getCookie('XSRF-TOKEN');

  if (xsrfToken && !store.getters['auth/isAuthenticated']) {
    api
      .get('/api/account')
      .then(accountResponse => {
        store.dispatch('auth/login', accountResponse.data);
        loadTranslation(accountResponse.data.langKey);
        next();
      })
      .catch(() => {
        authLogin();
      });
  } else if (!xsrfToken && !to.meta.public) {
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

export const authLogout = (store, router) => {
  api
    .post('/api/logout')
    .then(() => {
      store.dispatch('auth/logout');
    })
    .finally(() => {
      router.push('/');
    });
};
