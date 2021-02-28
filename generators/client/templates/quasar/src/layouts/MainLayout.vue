<template>
  <q-ajax-bar
    ref="bar"
    :reverse="true"
    position="left"
    color="primary"
    size="10px"
  />
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isAuthenticated"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="data.leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="250"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
      v-if="store.state.auth.account"
    >
      <q-item
        to="/account"
        clickable
        v-ripple
        :active="link === 'account'"
        @click="link = 'account'"
        active-class="bg-blue-1 text-blue-10"
      >
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.account.main') }}
        </q-item-section>
      </q-item>
      <q-item
        to="/password"
        clickable
        v-ripple
        :active="link === 'password'"
        @click="link = 'password'"
        active-class="bg-blue-1 text-blue-10"
      >
        <q-item-section avatar>
          <q-icon name="password" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.account.password') }}
        </q-item-section>
      </q-item>
      <q-item
        to="/users"
        clickable
        v-ripple
        :active="link === 'users'"
        @click="link = 'users'"
        active-class="bg-blue-1 text-blue-10"
        v-if="store.getters['auth/hasRoleAdmin']"
      >
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.admin.userManagement') }}
        </q-item-section>
      </q-item>
      <q-item
        to="/configuration"
        clickable
        v-ripple
        :active="link === 'configuration'"
        @click="link = 'configuration'"
        active-class="bg-blue-1 text-blue-10"
        v-if="store.getters['auth/hasRoleAdmin']"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.admin.configuration') }}
        </q-item-section>
      </q-item>
      <q-item
        to="/metrics"
        clickable
        v-ripple
        :active="link === 'metrics'"
        @click="link = 'metrics'"
        active-class="bg-blue-1 text-blue-10"
        v-if="store.getters['auth/hasRoleAdmin']"
      >
        <q-item-section avatar>
          <q-icon name="analytics" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.admin.metrics') }}
        </q-item-section>
      </q-item>
      <q-item
        to="/"
        clickable
        v-ripple
        @click="logout"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          {{ $t('global.menu.account.logout') }}
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const store = useStore()

    const isAuthenticatedGetter = () => store.getters['auth/isAuthenticated']
    const leftDrawerOpen = isAuthenticatedGetter()
    const data = reactive({ leftDrawerOpen })
    const link = reactive({})

    store.watch(
      (state, getters) => isAuthenticatedGetter(),
      (newValue) => { data.leftDrawerOpen = newValue })

    return {
      data,
      link,
      store,
      miniState: ref(true),
      isAuthenticated: computed(() => isAuthenticatedGetter()),
      toggleLeftDrawer () {
        data.leftDrawerOpen = !data.leftDrawerOpen
      },
      logout () {
        data.leftDrawerOpen = false
        store.dispatch('auth/logout')
      }
    }
  }
})
</script>
