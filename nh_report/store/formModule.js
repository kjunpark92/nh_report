import { cors_floorsEP, floorsKey, cors_yeonlipModelEP } from './epURLs'
import { EventBus } from '@/vars'
const state = () => {
  return {
    floorsData: [],
    bldgMngNum: '',
    constructionYear: '',
    estVal: 0,
    selectedDetails: {
      dongAddr: '',
      roadAddr: '',
      flrNm: '',
      area: ''
    }
  }
}
import _ from 'lodash'


const actions =  {
  getFloors({ commit }, val) {
    let mngNum = val.bdMgtSn
    commit('STORE_MNG_NUM', mngNum)
    let floorParams = {
      ServiceKey: floorsKey,
      bjdongCd: mngNum.slice(5,10),
      platGbCd: mngNum[11],
      bun: mngNum.slice(11,15),
      ji: mngNum.slice(15,19),
      numOfRows: '50',
      pageNo: '1',
      sigunguCd: mngNum.slice(0,5)
    }
    this.$axios.get(cors_floorsEP,{
      params: floorParams
    }).then(data => {
      let floorsArr = data.data.response.body.items.item
      console.log("floors arr looks like: ", floorsArr)
      console.log('does floors arr undfined', floorsArr == "undefined")
      let aboveFl = []
      let underFl = []
      let etcFl = []
      if(floorsArr == undefined){
        EventBus.$emit("validAddress", false)
        return;
      } else {
        floorsArr.forEach(f => {
          if(f.flrGbCdNm == '지상') aboveFl.push(f)
          else if(f.flrGbCdNm == '지하') underFl.push(f)
          else etcFl.push(f)
        })
        let orderedAbove = _.sortBy(aboveFl, ['flrNo'], ['asc'])
        let orderedUnder = _.sortBy(underFl, ['flrNo'], ['desc'])
        let orderedEtc = _.sortBy(etcFl, ['flrNo'], ['asc'])
        
        let orderedFloors = orderedUnder.concat(orderedAbove).concat(orderedEtc)
        // console.log('orderedFloors', orderedFloors, String(orderedFloors[0].crtnDay).slice(0,4))
        commit('STORE_CONSTRUCT_YEAR', String(orderedFloors[0].crtnDay).slice(0,4))
        commit('CHANGE_FLOORS', orderedFloors)
        return false
      }
    }).then(bool => EventBus.$emit('loadingShow', bool)).catch(err => console.log(err))
  },
  async getEstVal({ commit }, val) {
    // let estReqObj = {
    //   building_code: val.bldgMngNum,
    //   floor: val.floorNum,
    //   construction_year: val.constructionYear
    // }

    // await this.$axios.post(cors_yeonlipModelEP, estReqObj)
    await this.$axios.post(cors_yeonlipModelEP, val)
      .then(data => {
        commit('STORE_EST_VAL', { estVal: data.data.estimate })
        return false
      })
      .then(bool => EventBus.$emit('loadingShow', bool))
      .catch(err => console.log(err))
  },
  selectedDetails({ commit }, val) {
    console.log(val)
    commit('STORE_SELECTED_DETAILS', val)
  }
}

const mutations =  {
  CHANGE_FLOORS(state, payload) {
    state.floorsData = payload
  },
  STORE_MNG_NUM(state, payload) {
    console.log(payload)
    state.bldgMngNum = payload.slice(0,19)
  },
  STORE_CONSTRUCT_YEAR(state, payload) {
    state.constructionYear = payload
  },
  STORE_EST_VAL(state, payload) {
    state.estVal = payload.estVal
  },
  STORE_SELECTED_DETAILS(state, payload) {
    state.selectedDetails = payload
  },
  RESET_FORM(state) {
    state.floorsData = [];
    state.bldgMngNum = '';
    state.estVal = 0;
    state.selectedDetails = {        
      dongAddr: '',
      roadAddr: '',
      flrNm: ''
    }
  }
}

const getters = {
  selectedAddressDong: state => state.selectedDetails.dongAddr,
  selectedAddressRoad: state => state.selectedDetails.roadAddr,
  selectedLang: state => state.lang,
  floorsData: state => state.floorsData,
  estVal: state => state.estVal.toLocaleString('ko-KR'),
  details: state => state.selectedDetails,
  bldgMngNum: state => state.bldgMngNum,
  constructionYear: state => state.constructionYear,
  area: state => state.selectedDetails.area,
  floorNm: state => state.selectedDetails.flrNm
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

// {
//   "area": 182.08,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "주차장",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 10,
//   "flrGbCdNm": "지하",
//   "flrNo": 1,
//   "flrNoNm": "지하1층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04999",
//   "mainPurpsCdNm": "기타제2종근린생활시설",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 1,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 12.9,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "계단실",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 10,
//   "flrGbCdNm": "지하",
//   "flrNo": 1,
//   "flrNoNm": "지하1층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04999",
//   "mainPurpsCdNm": "기타제2종근린생활시설",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 2,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 19.76,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "창고",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 10,
//   "flrGbCdNm": "지하",
//   "flrNo": 1,
//   "flrNoNm": "지하1층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04999",
//   "mainPurpsCdNm": "기타제2종근린생활시설",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 3,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 169.4,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "일반음식점",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 1,
//   "flrNoNm": "1층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04001",
//   "mainPurpsCdNm": "일반음식점",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 4,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "의원",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 2,
//   "flrNoNm": "2층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "03005",
//   "mainPurpsCdNm": "의원",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 5,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "학원",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 3,
//   "flrNoNm": "3층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04010",
//   "mainPurpsCdNm": "학원",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 6,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "의원",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 4,
//   "flrNoNm": "4층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "03005",
//   "mainPurpsCdNm": "의원",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 7,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "의원",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 5,
//   "flrNoNm": "5층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "03005",
//   "mainPurpsCdNm": "의원",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 8,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "기타사무소",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 6,
//   "flrNoNm": "6층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04499",
//   "mainPurpsCdNm": "기타사무소",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 9,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 177.83,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "기타사무소",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 20,
//   "flrGbCdNm": "지상",
//   "flrNo": 7,
//   "flrNoNm": "7층",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04499",
//   "mainPurpsCdNm": "기타사무소",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 10,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 22.26,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "계단실 (연면적제외)",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 30,
//   "flrGbCdNm": "옥탑",
//   "flrNo": 1,
//   "flrNoNm": "옥탑1",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04999",
//   "mainPurpsCdNm": "기타제2종근린생활시설",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 11,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }
          
//             {
//   "area": 22.26,
//   "areaExctYn": " ",
//   "bjdongCd": 10100,
//   "bldNm": "연우빌딩",
//   "block": " ",
//   "bun": "0601",
//   "crtnDay": 20190530,
//   "dongNm": "연우빌딩",
//   "etcPurps": "물탱크실 (연면적제외)",
//   "etcStrct": "철근콘크리트구조",
//   "flrGbCd": 30,
//   "flrGbCdNm": "옥탑",
//   "flrNo": 2,
//   "flrNoNm": "옥탑2",
//   "ji": "0001",
//   "lot": " ",
//   "mainAtchGbCd": 0,
//   "mainAtchGbCdNm": "주건축물",
//   "mainPurpsCd": "04999",
//   "mainPurpsCdNm": "기타제2종근린생활시설",
//   "mgmBldrgstPk": "11680-24201",
//   "naBjdongCd": 10101,
//   "naMainBun": 110,
//   "naRoadCd": 116803122004,
//   "naSubBun": 0,
//   "naUgrndCd": 0,
//   "newPlatPlc": " 서울특별시 강남구 봉은사로 110",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 강남구 역삼동 601-1번지",
//   "rnum": 12,
//   "sigunguCd": 11680,
//   "splotNm": " ",
//   "strctCd": 21,
//   "strctCdNm": "철근콘크리트구조"
// }

