import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/about/About'
import Walkthrough from '@/components/walkthrough/Walkthrough'
import Browser from '@/components/browser/Browser'
import BrowserResults from '@/components/browser/Results'
import BrowserLiked from '@/components/browser/Liked'
import BrowserGenerate from '@/components/browser/Generate'
import BrowserHistory from '@/components/browser/History'
import Settings from '@/components/settings/Settings'
import SettingsBlacklist from '@/components/settings/Blacklist'
import SettingsTranslate from '@/components/settings/Translate'
import SettingsCategories from '@/components/settings/Categories'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
        { path: 'regenerate', name: 'b1', component: BrowserGenerate },
        { path: 'liked', name: 'b2', component: BrowserLiked },
        { path: 'history', name: 'b3', component: BrowserHistory }
      ]
    },
    {
      path: '/settings',
      component: Settings,
      children: [
        { path: 'blacklist', name: 's1', component: SettingsBlacklist },
        { path: 'translate', name: 's2', component: SettingsTranslate },
        { path: 'categories', name: 's3', component: SettingsCategories }
      ]
    },
    {
      path: '/walkthrough',
      name: 'w0',
      component: Walkthrough
    }
  ]
})
