<template>
  <div>
    <loader v-if="loadingShown" />
    <xaiheader />
    <units />
    <!-- <xaifooter /> -->
  </div>
</template>
<script>
import xaiheader from '~/components/Header'
import xaifooter from '~/components/Footer'
import Units from '~/components/Units'
import { EventBus } from '@/vars'
import Loader from '~/components/Loader'


export default {
  middleware: 'backToStart',
  data() {
    return {
      loadingShown: false
    }
  },
  components: {
    xaiheader,
    xaifooter,
    Units,
    Loader
  },
  created() {
    EventBus.$on('loadingShow', bool => this.loadingShown = bool)
  }
}
</script>
<style scoped>

</style>