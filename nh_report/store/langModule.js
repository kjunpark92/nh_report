
const state = () => {
  return {
    lang: {
      activeLang: 'en',
      en: {
        apt: 'Apartment',
        loft: 'Officetel',
        search: 'Input Address',
        results: 'Results',
        select: 'Select',
        floors: 'Floor',
        area: 'Area(m²)',
        etcPurpose: 'Etc. Purposes',
        mainPurpose: 'Type',
        search: 'Search Please',
        buildingNum: 'Building Number',
        searchAgain: 'Search Again?',
        searchButton: 'Search',
        address: 'Address',
        area: 'Area',
        estimate: 'Estimate per sqm',
        dataSearched: 'Searched on',
        estimatedPrice: 'Estimated Price'
      },
      ko: {
        apt: '아파트',
        loft: '오피스텔',
        search: '주수 검색',
        results: '결과',
        select: '선택',
        floors: '층',
        area: '면적(m²)',
        etcPurpose: '주변 시설',
        mainPurpose: '유형',
        search: '검색해주세요',
        buildingNum: '동호번호',
        searchAgain: '다시 검색?',
        searchButton: '검색',
        address: '주소',
        area: '연면적',
        estimate: '미터졔곡당 추정가격',
        dataSearched: '검색 한 날짜',
        estimatedPrice: '추정가격'

      },
      chosen: {
        apt: 'Apartment',
        loft: 'Officetel',
        search: 'Input Address',
        results: 'Results',
        select: 'Select',
        floors: 'Floors',
        area: 'Area(m²)',
        etcPurpose: 'Etc. Purposes',
        mainPurpose: 'Type',
        search: 'Search Please',
        buildingNum: 'Building Number',
        searchAgain: 'Search Again?',
        searchButton: 'Search',
        address: 'Address',
        area: 'Area',
        estimate: 'Estimate per sqm',
        dataSearched: 'Searched on',
        estimatedPrice: 'Estimated Price'
      }
    },
  }
}

const actions =  {
  switchLang({ commit }, val) {
    commit('TRANSLATE_TXT', val)
  }
}

const mutations =  {
  TRANSLATE_TXT(state, payload) {
    state.lang.chosen = state.lang[payload]
    state.lang.activeLang = payload
  }
}

const getters = {
  selectedLang: state => state.lang.chosen,
  activeLang: state => state.lang.activeLang
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}