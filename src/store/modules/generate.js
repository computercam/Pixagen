import router from '../../router/index'
import xhr from '../../xhr'
// TODO: Add translate keywords functionality to getQueryString method

const state = {
  wordlists: {},
  metadataAPI: 'https://gimgmetadata.limitunknown.com/', // Trailing slash is necessary
  dataSource: 'https://gist.githubusercontent.com/abstracted/6809515b3f374f43e6e6732b020fffed/raw'
}
const getters = {
  getWordlists (state) {
    return state.wordlists
  },
  getQueryString: (state, getters, rootState, rootGetters) => options => {
    let wordsBool = typeof options.words !== 'undefined'
    let catsBool = typeof options.categories !== 'undefined'
    let rimgBool = typeof options.rimg !== 'undefined'
    let sbiBool = typeof options.sbi !== 'undefined'
    let safeBool = rootGetters.getSettings.keywords.safeMode

    let query = state.metadataAPI + '?'

    if (wordsBool && !sbiBool) {
      query += '&keywords='
      options.words.forEach((word, i, arr) => {
        query += word
        if (i !== arr.length - 1) {
          query += '+'
        }
      })
      query += rootGetters.getBlacklistQuery
    }

    if (rimgBool && !sbiBool) {
      query += '&rimg=' + options.rimg
    }

    if (sbiBool) {
      query += '&sbi=' + options.sbi
    }

    if (safeBool) {
      query += '&safe=active'
    }

    if (wordsBool && catsBool) {
      let retain = {
        okeys: options.words,
        ocats: options.categories
      }
      retain = JSON.stringify(retain)
      retain = encodeURIComponent(retain)
      query += '&retain=' + retain
    }

    return query
  },
  getRandomCategories: (state, getters, rootState, rootGetters) => options => {
    let categories = []
    let entry
    // Set the amount of categories to get
    let amount = rootGetters.getSettings.keywords.amount
    let counter = 0
    // Get the amount of possible categories for calculating random
    let length = rootGetters.getSettings.categories.active.length
    // Override the amount to generate
    if (options.keep !== false) {
      options.keep.forEach(category => {
        categories.push(category)
        counter++
      })
    }
    for (let i = counter; i < amount; i++) {
      let skip = false
      // Get a random word from the category
      entry = rootGetters.getSettings.categories.active
      entry = entry[Math.floor(Math.random() * length)]
      // Check if we need to discard the current entry
      if (i > 0 || options.keep !== false) {
        // Discard if its a duplicate
        if (rootGetters.getSettings.categories.unique) {
          for (let category of categories) {
            if (entry.match(category)) {
              skip = true
              break
            }
          }
        }
      }
      if (skip) {
        i--
        continue
      }
      categories[i] = entry
    }
    return categories
  },
  getRandomWords: (state, getters, rootState, rootGetters) => options => {
    let words = []
    let categories = options.categories
    let entry
    // Set the amount of words to get
    let amount = categories.length
    let counter = 0
    // Override the amount to generate
    if (options.keep !== false) {
      options.keep.forEach(word => {
        words.push(word)
        counter++
      })
    }
    for (let i = counter; i < amount; i++) {
      let skip = false
      // Get the amount of possible words for calculating random
      let length = getters.getWordlists[categories[i]].length
      // Get a random word based off a category
      entry = getters.getWordlists[categories[i]]
      entry = entry[Math.floor(Math.random() * length)]
      // Split words with spaces if necessary
      if (rootGetters.getSettings.keywords.single) {
        if (entry.match(/(\s|-)+/gm)) {
          let temp = entry.split(/[\s-]+/)
          entry = temp[Math.floor(Math.random() * temp.length)]
        }
      } else {
        // Or just add "+" for query strings
        if (entry.match(/(\s|-)+/gm)) {
          entry = entry.replace(/[\s-]+/gm, '+')
        }
      }
      // Discard duplicate words
      if (i > 0 || options.keep !== false) {
        for (let word of words) {
          if (word === entry) {
            skip = true
            break
          }
        }
      }
      if (skip) {
        i--
        continue
      }
      words[i] = entry
    }
    return words
  }
}
const actions = {
  validateKeep ({ state, dispatch, rootState }, payload) {
    let settingsKeywords = rootState.settings.keywords
    if (payload.length !== 0) {
      if (payload.length >= settingsKeywords.amount) {
        dispatch('setSnackbar', {
          active: true,
          message: 'Try selecting less keywords to keep',
          color: 'error',
          mode: 'multi',
          timeout: 5000
        })
      } else {
        dispatch('generateNew', {option: 2, keep: payload})
      }
    } else {
      dispatch('setSnackbar', {
        active: true,
        message: 'You did not specify any keywords to keep',
        color: 'error',
        mode: 'multi',
        timeout: 5000
      })
    }
  },
  initializeWordlistsData ({ state, dispatch }) {
    dispatch('setOverlay', {
      active: true,
      loading: true,
      message: 'GETTING WORDLIST DATA'
    })
    xhr(state.dataSource, 'json', 10, 3)
      .then(response => {
        dispatch('setWordlists', response.data)
        let i = 0
        let categories = []
        for (let key in response.data) {
          categories[i] = key
          i++
        }
        dispatch('setActiveCategories', categories)
        dispatch('setOverlay', {
          active: false
        })
      })
      .catch(error => {
        console.log(error)
        dispatch('setLoadingFailed')
      })
  },
  quickGenerate ({ state, getters, dispatch, rootGetters }) {
    let last = rootGetters.historyLastGenerate
    if (last.option === 3 || last.option === 4) {
      last.option = 1
      last.rimg = ''
    }
    dispatch('generateNew', last)
  },
  generateNew ({ state, getters, dispatch, rootGetters }, payload) {
    let current = rootGetters.historyCurrent
    let categories
    let words
    let query
    let rimg = false
    let sbi = false
    dispatch('historyLastGenerate', payload)
    switch (payload.option) {
      case 0:
        // Random Generate
        categories = getters.getRandomCategories({
          keep: false
        })
        words = getters.getRandomWords({
          categories: categories,
          keep: false
        })
        query = getters.getQueryString({
          words: words,
          categories: categories
        })
        break
      case 1:
        // Same Categories
        categories = current.categories
        words = getters.getRandomWords({
          categories: categories,
          keep: false
        })
        query = getters.getQueryString({
          words: words,
          categories: categories
        })
        break
      case 2:
        // Keep Keyword(s)
        let keep = {
          words: [],
          categories: []
        }
        payload.keep.forEach(index => {
          keep.words.push(current.keywords[index])
          keep.categories.push(current.categories[index])
        })
        categories = getters.getRandomCategories({
          keep: keep.categories
        })
        words = getters.getRandomWords({
          categories: categories,
          keep: keep.words
        })
        query = getters.getQueryString({
          words: words,
          categories: categories
        })
        break
      case 3:
        // Explore by rimg
        categories = payload.categories
        words = payload.keywords
        rimg = payload.rimg
        query = getters.getQueryString({
          rimg: rimg,
          words: words,
          categories: categories
        })
        break
      case 4:
        // Explore by sbi
        categories = payload.categories
        words = payload.keywords
        sbi = payload.sbi
        query = getters.getQueryString({
          sbi: sbi,
          words: words,
          categories: categories
        })
        break
    }
    dispatch('getImages', {
      categories: categories,
      words: words,
      query: query,
      rimg: rimg,
      sbi: sbi
    })
  },
  getImages ({ state, getters, dispatch, rootGetters }, payload) {
    // Search by image can take longer to process
    // increase the timeout to prevent failure
    let timeout = 10
    if (payload.sbi !== false) {
      timeout = 20
    }
    // Checks if matching data already exists in history
    let exists = rootGetters.historyValidateExists({
      words: payload.words,
      rimg: payload.rimg,
      sbi: payload.sbi
    })
    // If nothing was found, get new images
    if (exists === false) {
      dispatch('setOverlay', {
        active: true,
        loading: true,
        message: 'LOADING IMAGES'
      })
      xhr(payload.query, 'json', timeout, 5)
        .then(response => {
          if (response.data.length > 0) {
            dispatch('historyAdd', {
              categories: payload.categories,
              keywords: payload.words,
              query: payload.query,
              rimg: payload.rimg,
              sbi: payload.sbi,
              metadata: response.data
            })
            dispatch('setOverlay', {
              active: false
            })
            router.push({
              name: 'b0'
            })
          } else {
            dispatch('quickGenerate')
          }
        })
        .catch(error => {
          console.log(error)
          dispatch('setLoadingFailed')
        })
      // Else we can just use the data we already have
    } else {
      dispatch('historyTimetravel', exists)
    }
  },
  setWordlists ({ state, commit }, payload) {
    commit('setWordlists', payload)
  }
}

const mutations = {
  setWordlists (state, payload) {
    state.wordlists = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
