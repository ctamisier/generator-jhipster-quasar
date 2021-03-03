import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { Notify } from 'quasar';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:8080' : '/',
});

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
      Notify.create({
        type: 'negative',
        message: 'Operation failed',
        timeout: 1000,
      });
      return Promise.reject(error);
    }
  );
});

export { axios, api };
