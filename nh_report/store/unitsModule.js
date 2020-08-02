import { cors_yeonlipUnitsEP } from './epURLs'
import { EventBus } from '@/vars'

export const state = () => {
  return {
    units: [],
    buildingDongs: [],
    dongUnits: [],
    chosenUnits: []
  }
}

export const actions = {
  async getUnits({ commit }, val) {
    let reqSuccess
    await this.$axios.post(cors_yeonlipUnitsEP, val)
    .then(data => {
      reqSuccess = true
      let parsedUnits = JSON.parse(data.data)
      console.log('parsedUnits', parsedUnits)
      if(parsedUnits[0].building_name != null) {
        let separatedDongs = {}
        parsedUnits.forEach(u => {
          if(!(u.block_name in separatedDongs)) {
            separatedDongs[u.block_name] = []
            separatedDongs[u.block_name].push(u)
          } else {
            separatedDongs[u.block_name].push(u)
          }
        })
        let buildingDongs = Object.keys(separatedDongs)
        let orderedDongs = buildingDongs.sort((a, b) => Number(a.split('동')[0]) - Number(b.split('동')[0]))
        commit('STORE_BUILDING_DONGS', orderedDongs)
        commit('STORE_UNITS', separatedDongs)
        reqSuccess = 'pushToBuildings'
      } else {
        console.log('going into the else in units',typeof parsedUnits, parsedUnits)
        commit('STORE_CHOSEN_UNITS', parsedUnits)
        reqSuccess = 'pushToUnits'
        console.log('after units', state)
      }
      EventBus.$emit('loadingShow', false)
    }).catch(err => {
      reqSuccess = false
      console.log(err)
      EventBus.$emit('loadingShow', false)
    })
    return reqSuccess
  }
}

export const mutations = {
  STORE_BUILDING_DONGS(state, payload) {
    state.buildingDongs = payload
  },
  STORE_UNITS(state, payload) {
    state.dongUnits = payload
  },
  STORE_CHOSEN_UNITS(state, payload) {
    
    state.chosenUnits = payload.sort((a, b) => Number(a.unit_name.split('호')[0]) - Number(b.unit_name.split('호')[0]))
  }

  }


export const getters = {
  allUnits: state => state.dongUnits,
  allUnitsLength: state => state.units.length,
  buildingDongs: state => state.buildingDongs,
  chosenUnits: state => state.chosenUnits
}