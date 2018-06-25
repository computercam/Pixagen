// TODO: Add a feature for keeping track of downloaded files as well as liked, Currently only tracks likes
// TODO: Ability to favorite categories & keyword pairs, currently not supported
// TODO: Better implementation of favorites feature. As the app grows, looping through every favorited item to determine if it was liked is sub optimal at best
const state = {
  favs: {
    data: []
  }
}
const getters = {
  isFav: state => url => {
    return state.favs.data.findIndex(key => {
      return key.ou === url
    })
  },
  favExists (state) {
    return typeof state.favs.data[0] !== 'undefined'
  },
  favs (state) {
    return state.favs
  }
}
const actions = {
  toggleFav ({ commit, state, getters }, payload) {
    let fav = getters.isFav(payload.ou)
    if (fav !== -1) {
      commit('delFav', fav)
    } else {
      commit('addFav', payload)
    }
  }
}
const mutations = {
  // Payload should be, cateogires, words, rimg, query & full image url (ou)
  addFav (state, payload) {
    state.favs.data.unshift(payload)
  },
  // Payload is index of favorited item in data
  delFav (state, payload) {
    state.favs.data.splice(payload, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
