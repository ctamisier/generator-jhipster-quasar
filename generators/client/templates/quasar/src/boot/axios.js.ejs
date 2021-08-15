import axios from 'axios';
import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';
import { i18n } from './i18n';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create();

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status >= 500) {
        Notify.create({
          type: 'negative',
          message: i18n.global.t('error.internalServerError'),
        });
      }
      return Promise.reject(error);
    }
  );
});

export { axios, api };
