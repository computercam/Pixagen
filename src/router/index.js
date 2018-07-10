import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/environments/Landing'
import About from '@/components/environments/About'
import Help from '@/components/environments/Help'
import Browser from '@/components/environments/Browser'
import Settings from '@/components/environments/Settings'

import BrowserResults from '@/components/ecosystems/Browser/Results'
import BrowserLiked from '@/components/ecosystems/Browser/Liked'
import BrowserGenerate from '@/components/ecosystems/Browser/Generate'
import BrowserHistory from '@/components/ecosystems/Browser/History'

import SettingsGeneral from '@/components/ecosystems/Settings/General'
import SettingsBlacklist from '@/components/ecosystems/Settings/Blacklist'
import SettingsTranslate from '@/components/ecosystems/Settings/Translate'
import SettingsCategories from '@/components/ecosystems/Settings/Categories'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'l0',
      component: Landing
    },
    {
      path: '/about',
      name: 'a0',
      component: About
    },
    {
      path: '/browser',
      component: Browser,
      children: [
        { path: '', name: 'b0', component: BrowserResults },
        { path: 'generate', name: 'b1', component: BrowserGenerate },
        { path: 'liked', name: 'b2', component: BrowserLiked },
        { path: 'history', name: 'b3', component: BrowserHistory }
      ]
    },
    {
      path: '/settings',
      component: Settings,
      children: [
        { path: '', name: 's0', component: SettingsGeneral },
        { path: 'blacklist', name: 's1', component: SettingsBlacklist },
        { path: 'translate', name: 's2', component: SettingsTranslate },
        { path: 'categories', name: 's3', component: SettingsCategories }
      ]
    },
    {
      path: '/help',
      name: 'h0',
      component: Help
    }
  ]
})
