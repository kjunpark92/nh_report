<template>
  <div id='units'>
    <ul class="uk-list uk-list-divider">
      <li
        v-for="(u, index) in units"
        :key="index"
        @click="calculateEstimate(u.floor_number, 
        { area: u.area, dongAddr: u.address_dong, 
        roadAddr: u.address_road, flrNm: u.floor_number_name })"
        class='unitsList'
      >
        {{ u.address_dong }} {{u.unit_name}}, Area: {{u.area}}m²
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { EventBus } from '@/vars'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      units: 'unitsModule/chosenUnits',
      bldgCode: 'formModule/bldgMngNum',
      year: 'formModule/constructionYear',
    })
  },
  methods: {
    async calculateEstimate(floor, details) {
      await EventBus.$emit('loadingShow', true)
      await this.$store.dispatch('formModule/getEstVal', {
        building_code: this.bldgCode,
        floor: floor,
        construction_year: this.year
      })
      await this.$store.dispatch('formModule/selectedDetails', details)
      await this.$router.push('/results')
    }
  },
  created() {

  }
}
</script>
<style scoped>
  #units{
    margin-top: 25px;

  }
  .uk-list-divider > li:nth-child(n+2){
    border-top: 1px solid #80D98A;
  }
  li{
    text-align: center;
  }
  .unitsList:hover {
    background-color: #F5F5F5;
  }
</style>

