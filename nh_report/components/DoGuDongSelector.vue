<template>
  <Row>
    <Card>
      <Select v-model='selectedDo' @selected='testFunc(val)'>
        <Option value="11">서울특별시</Option>
        <Option value="26">부산광역시</Option>
        <Option value="27">대구광역시</Option>
        <Option value="28">인천광역시</Option>
        <Option value="29">광주광역시</Option>
        <Option value="30">대전광역시</Option>
        <Option value="31">울산광역시</Option>
        <Option value="36">세종특별자치시</Option>
        <Option value="41">경기도</Option>
        <Option value="42">강원도</Option>
        <Option value="43">충청북도</Option>
        <Option value="44">충청남도</Option>
        <Option value="45">전라북도</Option>
        <Option value="46">전라남도</Option>
        <Option value="47">경상북도</Option>
        <Option value="48">경상남도</Option>
        <Option value="50">제주특별자치도</Option>
      </Select>
      <Select v-model='selectedSi'>
        <Option value='choose'>choose</Option>
        <Option v-for='(si, index) in returnedSi' :key='index'>
        </Option>
      </Select>
      <Select v-model='selectedDong'>
        <Option value="choose">choose</Option>
        <Option v-for='(si, index) in returnedSi' :key='index'>
        </Option>
      </Select>
    </Card>
  </Row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DoGuDongSelector',
  data() {
    return {
      selectedDo: '11',
      selectedSi: 'choose',
      selectedDong: 'choose',
      returnedSi: [],
      returnedDong: []
    }
  },
  methods: {
    ...mapActions({
      getGu: 'doGuDongModule/getGu'
    })
  },
  mounted() {
    this.getGu()
  },
  created() {
    // console.log(this.$store)
  }
}
</script>
<style>
</style>
