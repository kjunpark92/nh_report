<template>
  <div>
    <xaiheader />
    <!-- <div>
      results found: {{ numOfJusoFound }}
    </div> -->
    <div v-if='validAddress'>
      <buildings />
    </div>
    <div class="error" v-else>
      This address isn't listed as a pure Yeonlip building.
    </div>
  </div>
</template>
<script>
import Buildings from '~/components/Buildings'
import xaiheader from '~/components/Header'
import { mapGetters } from 'vuex'
import { EventBus } from '@/vars'
export default {
  middleware: 'backToStart',
  data() {
    return {
      validAddress: true
    }
  },
  components: {
    Buildings,
    xaiheader
  },
  computed: {
    ...mapGetters({
      addrDetails: 'jusoModule/selected',
      // numOfJusoFound: 'jusoModule/jusoResLength'
    })
  },
  created() {
    // EventBus.$on('loadingShow', bool => this.loadingShown = bool)

  }
}
</script>

<style scoped>
.error{
  display: flex;
  justify-content: center;
}
</style>