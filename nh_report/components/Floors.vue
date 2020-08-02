<template>
    <div id="floors">
        <loader v-if='loadingShown' />
        <ul class="uk-list uk-list-divider" >
          <li v-for="(f, index) in floorsData" 
          :key="index"
          @click="calculateEstimate(f.flrNo, String(f.crtnDay).slice(0,4))">
            <div>{{ f.flrNoNm }}, Area(m2): {{ f.area }}</div>
          </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { EventBus } from '@/vars'
import Loader from '~/components/Loader'
export default {
  data() {
    return {
      loadingShown: true
    }
  },
  computed: {
    ...mapGetters({
      chosenLang: "langModule/selectedLang",
      floorsData: 'formModule/floorsData',
      bldgMngNum: 'formModule/bldgMngNum'
    })
  },
  components: {
    Loader
  },
  methods: {
    ...mapMutations({
      translate: "langModule/TRANSLATE_TXT",
    }),
    async calculateEstimate(floorNum, constructionYear){
      await console.log(floorNum, constructionYear)
      await this.$store.dispatch('formModule/getEstVal', { floorNum, constructionYear, bldgMngNum: this.bldgMngNum })
      await this.$router.push('/results')
    }
  },
  created() {
    EventBus.$on('loadingShow', bool => this.loadingShown = bool)
  }
};
</script>

<style scoped>
#floors{
  margin-top: 25px;

  }
  .uk-list-divider > li:nth-child(n+2){
    border-top: 1px solid #80D98A;
  }
  li{
    text-align: center;
  }
</style>