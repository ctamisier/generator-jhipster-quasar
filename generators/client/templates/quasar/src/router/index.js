import { api } from 'boot/axios';
import { loadTranslation } from 'boot/i18n';
import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store /*, ssrContext */ }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const routes = [
    {
      path: '/',
      meta: { public: true },
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', meta: { public: true }, component: () => import('pages/Index.vue') },
        { path: '/register', meta: { public: true }, component: () => import('pages/Register.vue') },
        { path: '/account', meta: { public: false }, component: () => import('pages/Account.vue') },
        { path: '/account/activate', meta: { public: true }, component: () => import('pages/Activation.vue') },
        { path: '/account/reset/init', meta: { public: true }, component: () => import('pages/ForgotPassword.vue') },
        { path: '/account/reset/finish', meta: { public: true }, component: () => import('pages/ResetPassword.vue') },
        { path: '/password', meta: { public: false }, component: () => import('pages/ChangePassword.vue') },
        {
          path: '/users',
          meta: { public: false },
          component: () => import('pages/Users.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/users/new',
          meta: { public: false },
          component: () => import('pages/User.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/users/:login',
          meta: { public: false },
          component: () => import('pages/User.vue'),
        },
        {
          path: '/configuration',
          meta: { public: false },
          component: () => import('pages/Configuration.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/health',
          meta: { public: false },
          component: () => import('pages/Health.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/metrics',
          meta: { public: false },
          component: () => import('pages/Metrics.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/logs',
          meta: { public: false },
          component: () => import('pages/Logs.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/docs',
          meta: { public: false },
          component: () => import('pages/Docs.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
      ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue'),
    },
  ];

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const idToken = sessionStorage.getItem('jhi-authenticationToken');
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
  });

  return Router;
});
