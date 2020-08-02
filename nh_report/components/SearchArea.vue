<template>
  <div id="searchContainer">
    <div class="searchArea">
      <input @keyup.enter='jusoReq' id="search" class="uk-input uk-form-width-medium" type="text" v-model="jusoSearch" />
      <button id="searchBtn" @click="jusoReq" class="uk-button uk-button-medium">{{ chosenLang.searchButton }}</button>
    </div>
    <div>
      found addresses: {{ jusoLength }}
    </div>
    <!-- below is a misnomer( had to look this wored up. helpin my vocab! ) and should probably be a seperate component ("address results")-->
    <div class="addressList">
      <ul class="uk-list uk-list-divider">
        <!-- <li v-for="(j, index) in jusoRes" :key="index" @click='addressSelected(j)'> -->
        <li 
          v-for="(j, index) in jusoRes" 
          :key="index"
          @click='unitsReq(j)'
          class='addrListItem'
        >
          {{ j.jibunAddr }}
        </li>
        <!-- <li class="uk-list uk-list-divider" v-if='startSearch'>
          {{ chosenLang.search }}
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { EventBus } from '@/vars'
export default {
  data() {
    return {
      jusoSearch: '서울특별시 성북구 종암동 125-27번지',
      startSearch: true
    }
  },
  methods: {
    jusoReq() {
      EventBus.$emit('loadingShow', true)
      this.startSearch = false
      this.jusoSearch != ''?this.$store.dispatch('jusoModule/getAddrsFromJuso', {addr: this.jusoSearch}):alert("Please Input an Address")
    },
    async unitsReq(addrObj) {
      await EventBus.$emit('loadingShow', true)
      await this.$store.dispatch('formModule/getFloors', { bdMgtSn: addrObj.bdMgtSn })
      let adm_code = addrObj.bdMgtSn.substr(0,10)
      let bunji = addrObj.bdMgtSn.substr(11,8)
      // console.log('params', adm_code, bunji)
      await this.storeAddrDetails({ dong: addrObj.jibunAddr, road: addrObj.roadAddr, eng: addrObj.engAddr })
      let unitSuccess = await this.$store.dispatch('unitsModule/getUnits', { adm_code, bunji })
      await console.log(unitSuccess)
      await (() => {
        console.log('should push')
        if(unitSuccess == 'pushToBuildings') this.$router.push('/buildings')
        else if(unitSuccess == 'pushToUnits') this.$router.push("/units")
        else alert('not found')
      })()
      await console.log(this.$store)
    },
    async addressSelected(selected) {
      await this.$store.dispatch('formModule/getFloors', selected.bdMgtSn)
      await this.storeAddrDetails({ dong: selected.jibunAddr, road: selected.roadAddr, eng: selected.engAddr })
      await this.$router.push('/floors')
    },
    ...mapMutations({
      resetJuso: 'jusoModule/RESET_JUSO',
      storeAddrDetails: 'jusoModule/STORE_SELECTED'
    })
  },
  computed: {
    ...mapGetters({
      chosenLang: 'langModule/selectedLang',
      jusoRes: 'jusoModule/jusoRes',
      jusoLength: 'jusoModule/jusoResLength'
    })
  }
}
</script>

<style scoped>
.uk-list-divider > li:nth-child(n+2){
  border-top: 1px solid #80D98A;
}
#searchContainer{
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
}
#searchBtn{
  background: #80D98A;
  color: white;
  border-radius: 25px;

}
#search{
  border-radius: 25px;
  border: 1px solid #80D98A;
}
.searchArea{
  margin: 0 25px;
}
.addressList{
  margin-top: 25px;
  width: 75%;
}
.addrListItem:hover {
  background-color: #F5F5F5;
}
</style>