import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import { api } from 'boot/axios';
import { loadLanguage } from 'boot/i18n';

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
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') },
        { path: '/register', component: () => import('pages/Register.vue') },
        { path: '/account', component: () => import('pages/Account.vue') },
        { path: '/password', component: () => import('pages/ChangePassword.vue') },
        {
          path: '/users',
          component: () => import('pages/Users.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/users/new',
          component: () => import('pages/User.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/users/:login',
          component: () => import('pages/User.vue'),
        },
        {
          path: '/configuration',
          component: () => import('pages/Configuration.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/metrics',
          component: () => import('pages/Metrics.vue'),
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
    const idToken = sessionStorage.getItem('id_token');
    if (idToken && !store.getters['auth/isAuthenticated']) {
      api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
      api.get('/api/account').then(accountResponse => {
        store.dispatch('auth/login', accountResponse.data);
        loadLanguage(accountResponse.data.langKey);
        next();
      });
    } else if (!idToken && !['/', '/register'].includes(to.path)) {
      next('/');
    } else {
      next();
    }
  });

  return Router;
});
