import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { beforeEachAuth } from '../auth/authentication';
import { entityRoutes } from './entityRoutes';

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
          component: () => import('pages/UserEdit.vue'),
          beforeEnter: () => store.getters['auth/hasRoleAdmin'],
        },
        {
          path: '/users/:login/edit',
          meta: { public: false },
          component: () => import('pages/UserEdit.vue'),
        },
        {
          path: '/users/:login/view',
          meta: { public: false },
          component: () => import('pages/UserView.vue'),
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
        ...entityRoutes,
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

  Router.beforeEach((to, from, next) => beforeEachAuth(to, from, next, store));

  return Router;
});
