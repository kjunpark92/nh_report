import { cors_getGu } from './epURLs'

const state = () => {
  return {

  }
}

const actions =  {
  getGu() {
    // let guParams = new FormData()
    // guParams.set('menuGubun', 'H')
    // guParams.set('srhType', 'LOC')
    // guParams.set('houseType', '1')
    // guParams.set('srhYear', '2020')
    // guParams.set('srhPeriod', '1')
    // guParams.set('gubunCode', 'LAND')
    // guParams.set('menuGubun', '11')
    let guParams = { "menuGubun": "H", "srhType": "LOC", "houseType": "1", "srhYear": "2020", "srhPeriod": "1", "gubunCode": "LAND", "sidoCode": "11" }
    this.$axios.post(cors_getGu, guParams)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
}

const mutations =  {

}

const getters = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}