<template>
  <div>
    <loader v-if='loadingShown' />
    <xaiheader />
    <search />
    <xaifooter />
  </div>
</template>
<script>
// components*****
import xaiheader from '~/components/Header'
import xaifooter from '~/components/Footer'
import search from '~/components/SearchArea'
import loader from '~/components/Loader'
// Vuex Mapping ***
import { mapGetters, mapMutations } from 'vuex'
// global vars imort
import { EventBus } from '@/vars'
export default {
  data() {
    return {
      reportForm: true,
      floorsShown: false,
      loadingShown: false,
    }
  },
  computed: {
    ...mapGetters({
      chosenLang: 'langModule/selectedLang',
    })
  },
  components: {
    search,
    xaiheader,
    xaifooter,
    loader
  },
  methods: {
    showDiffForms(bool) {
      bool ? this.reportForm = true : this.reportForm = false
    },
    ...mapMutations({
      translate: 'langModule/TRANSLATE_TXT',
      floorsData: 'formModule/floorsData',
      resetJuso: 'jusoModule/RESET_JUSO',
      resetForm: 'formModule/RESET_FORM'
    })
  },
  created() {
    this.resetJuso()
    this.resetForm()
    // this.$forceUpdate()
    // EventBus.$on('showFloors', bool => this.floorsShown = bool)
    EventBus.$on('loadingShow', bool => this.loadingShown = bool)
  }
}
</script>
<style>
</style>
