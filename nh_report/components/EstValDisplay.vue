<template>
  <Row>
    <Card>
      <p slot='title'>
        {{ estimate }}
      </p>
      <p>
        {{ details.dongAddr }}
      </p>
      <p>
        {{ details.roadAddr }}
      </p>
      <p>
        {{ details.flrNm }}
      </p>
    </Card>
  </Row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      estimate: 'formModule/estVal',
      details: 'formModule/details'
    })
  }
}
</script>
<style scoped>

</style>