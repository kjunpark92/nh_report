<template>
  <div>
    <xaiheader />
    <results />
  </div>
</template>

<script>
import Results from '~/components/Results'
import xaiheader from '~/components/Header'

export default {
  middleware: 'backToStart',
  components: {
    xaiheader,
    Results
  }
}
</script>

<style>

</style>