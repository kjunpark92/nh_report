import { cors_juso } from './epURLs'
import { EventBus } from '@/vars'

const state = () => {
  return {
    jusoResults: [],
    selectedAddressDetails: {
      dong: '',
      road: '',
      eng: ''
    }
  }
}

const actions =  {
  getAddrsFromJuso({ commit }, val) {
    let jusoParams = {
      confmKey: 'U01TX0FVVEgyMDE5MDMyNTE1MDM0NDEwODYwMTI=',
      currentPage: 1,
      countPerPage: 10,
      keyword: val.addr,
      resultType: 'json'
    }
    this.$axios.get(cors_juso, {
      params: jusoParams
    }).then(res => {
      if(res.data.results.juso != null) {
        commit('STORE_JUSO_ADDRS', res.data.results.juso)
        return false
      } else {
        commit('STORE_JUSO_ADDRS', [{ jibunAddr: 'Not Found', roadAddr: 'Search Again' }])
        return false
      }
    }).then(bool => EventBus.$emit('loadingShow', bool)).catch(err => console.log(err))
  }
}

const mutations =  {
  STORE_SELECTED(state, payload) {
    state.selectedAddressDetails = payload
  },
  STORE_JUSO_ADDRS(state, payload) {
    state.jusoResults = payload
  },
  RESET_JUSO(state) {
    state.jusoResults = []
  }
}

const getters = {
  jusoRes: state => state.jusoResults,
  jusoResLength: state => state.jusoResults.length,
  selected: state => state.selectedAddressDetails
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}