<template>
  <Card>
    <ButtonGroup style='width: 100%;'>
      <Button style='width: 50%;'>{{  chosenLang.apt }}</Button>
      <Button style='width: 50%;' type="primary">{{ chosenLang.loft }}</Button>
    </ButtonGroup>
    <Select>
      <Option
        v-for='(i, index) in propertyNames' 
        :key='index'
        :value='i.value'
      />
    </Select>
  </Card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      propertyNames: [
        {
          text: 'choose',
          value: 'choose'
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      chosenLang: 'langModule/selectedLang'
    })
  }
}
</script>
<style scoped>

</style>