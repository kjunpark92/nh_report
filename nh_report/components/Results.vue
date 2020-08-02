<template>
  <div>
    <!-- <loader v-if='loadingShown' /> -->
    <div id="estimate">
      <ul class="uk-list uk-list-divider">
        <!-- <li>
        {{roadAddress}}</li>-->
        <li>{{ chosenLang.address }}: {{ dongAddress }}</li>
        <li>{{ chosenLang.area }}: {{ area }}m²</li>
        <li>{{ chosenLang.floors }}: {{ floorNm }}</li>
        <li>{{ chosenLang.estimate }}: ₩{{estimate}}</li>
        <li>{{ chosenLang.dataSearched }}: {{(new Date().getMonth()+1) + "." + new Date().getFullYear()}}</li>
      </ul>
      <!-- <div class="disclaimer">
        "- 본 서비스는 자이랜드가 공간계량 머신러닝 알고리즘을 기반으로 산정한 데이터를 NH은행에 제공한 내용입니다.
        - 각종 정보는 건축물대장 등 공공관리데이터를 기준으로 작성되었으며, 미신고된 변경사항 및 신고오류 등에 기안하여 실제 사용과는 상이할 수 있습니다.
        - 자이랜드 시세정보는 NH부동산시세와는 별개로 제공되는 서비스이므로 NH부동산 홈페이지에서 대출 가능금액 및 예상금리를 조회하실 수 없으며 또한 『감정평가 및 감정평가사의 법률』 상의 감정평가가 아닙니다. 따라서 본 시세정보의 활용에 따른 책임은 전적으로 이용자에게 있으며, 당행은 이에 대하여 아무런 책임을 부담하지 않습니다."

      </div> -->
      <div class="estimateArea">
        <div id="estimateSeal">
          <img src="/xaiseal.png" />
        </div>
        <div id="estimatedValue">
          <h5>XAI {{ chosenLang.estimatedPrice }}</h5>
          <h2>₩{{ Math.floor(Number(estimate.split(',').join("")) * area).toLocaleString() }}</h2>
        </div>
      </div>
    </div>
    <nuxt-link class="restart" to="/">{{ chosenLang.searchAgain }}</nuxt-link>
  </div>
</template>
<script>
// import Loader from '~/components/Loader'
import { EventBus } from "@/vars";
import { mapGetters } from "vuex";

export default {
  middleware: "backToStart",
  data() {
    return {
      loadingShown: true
    };
  },
  computed: {
    ...mapGetters({
      estimate: "formModule/estVal",
      roadAddress: "formModule/selectedAddressRoad",
      dongAddress: "formModule/selectedAddressDong",
      area: "formModule/area",
      floorNm: "formModule/floorNm",
      chosenLang: 'langModule/selectedLang'
    })
  },
  created() {
    EventBus.$on("loadingShow", bool => (this.loadingShown = bool));
    console.log(this.$store.state);
  }
};
</script>
<style scoped>
#estimate{
  margin-top: 46px;
}
ul li {
  cursor: text;
}

.uk-list {
  width: 60%;
  margin: 0 auto;
  font-size: 20px;
}

.estimateArea{
  margin-top: 54px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
img{
  width: 115px;
}

h5{
  margin-bottom: -31px;
}

.restart{
  float:right;
  margin-right: 20%;
}

.disclaimer{    
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
}

</style>