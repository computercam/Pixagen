import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/environments/Landing'
import Help from '@/components/environments/Help'

const About = resolve => {
  require.ensure(['../components/environments/About'], () => {
    resolve(require('../components/environments/About'))
  })
}
const Browser = resolve => {
  require.ensure(['../components/environments/Browser'], () => {
    resolve(require('../components/environments/Browser'))
  })
}
const Settings = resolve => {
  require.ensure(['../components/environments/Settings'], () => {
    resolve(require('../components/environments/Settings'))
  })
}
const BrowserResults = resolve => {
  require.ensure(['../components/ecosystems/Browser/Results'], () => {
    resolve(require('../components/ecosystems/Browser/Results'))
  })
}
const BrowserLiked = resolve => {
  require.ensure(['../components/ecosystems/Browser/Liked'], () => {
    resolve(require('../components/ecosystems/Browser/Liked'))
  })
}
const BrowserGenerate = resolve => {
  require.ensure(['../components/ecosystems/Browser/Generate'], () => {
    resolve(require('../components/ecosystems/Browser/Generate'))
  })
}
const BrowserHistory = resolve => {
  require.ensure(['../components/ecosystems/Browser/History'], () => {
    resolve(require('../components/ecosystems/Browser/History'))
  })
}

const SettingsGeneral = resolve => {
  require.ensure(['../components/ecosystems/Settings/General'], () => {
    resolve(require('../components/ecosystems/Settings/General'))
  })
}
const SettingsBlacklist = resolve => {
  require.ensure(['../components/ecosystems/Settings/Blacklist'], () => {
    resolve(require('../components/ecosystems/Settings/Blacklist'))
  })
}
const SettingsTranslate = resolve => {
  require.ensure(['../components/ecosystems/Settings/Translate'], () => {
    resolve(require('../components/ecosystems/Settings/Translate'))
  })
}
const SettingsCategories = resolve => {
  require.ensure(['../components/ecosystems/Settings/Categories'], () => {
    resolve(require('../components/ecosystems/Settings/Categories'))
  })
}

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
    },
    {
      path: '*',
      component: Landing
    }
  ]
})
