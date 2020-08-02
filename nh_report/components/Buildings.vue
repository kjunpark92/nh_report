<template>
  <div id="buildings">
    <div v-if="validAddress">
      <ul class="uk-list uk-list-divider">
        <li 
          v-for="(d, index) in dongs" 
          :key="index" 
          @click="chosenDong(d)"
          class='buildingAddresses'
        >
          <div v-if="activeLang == 'en'">
            {{ addrDetails.eng }}
            {{ chosenLang.buildingNum }}
            {{ d }}
          </div>
          <div v-else>
            {{ addrDetails.dong }}
            {{ addrDetails.road }}
            {{d}}
          </div>
        </li>
      </ul>
    </div>
    <div class="friendlyError" v-else>
      <div class="message">
      The address searched for was not a valid Yeonlip address.
      </div>
      <br/>
      <nuxt-link class="restart" to="/">{{ chosenLang.searchAgain }}</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { EventBus } from "@/vars";

export default {
  data() {
    return {
      validAddress: true
    };
  },
  computed: {
    ...mapGetters({
      dongs: "unitsModule/buildingDongs",
      units: "unitsModule/allUnits",
      addressDetails: "jusoModule/selectedAddressDetails",
      addrDetails: "jusoModule/selected",
      activeLang: "langModule/activeLang",
      chosenLang: "langModule/selectedLang"
    })
  },

  methods: {
    ...mapMutations({
      storingUnits: "unitsModule/STORE_CHOSEN_UNITS"
    }),
    async chosenDong(dongName) {
      await console.log(dongName);
      await console.log(this.units[dongName]);
      await this.storingUnits(this.units[dongName]);
      await console.log(this.$store);
      // function to route
      await (() => {
        if (this.units.length != 0) this.$router.push("/units");
        else alert("uh oh something wrong");
      })();
    }
  },
  created() {
    EventBus.$on("validAddress", bool =>{
      console.log("address is not valid", bool)
      this.validAddress = bool;
    });
  }
};
</script>
<style scoped>
#buildings {
  margin-top: 25px;
}
.uk-list-divider > li:nth-child(n + 2) {
  border-top: 1px solid #80d98a;
}
li {
  text-align: center;
}

.friendlyError{
  margin-top: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-size: 30px;
}
.buildingAddresses:hover {
  background-color: #F5F5F5;
}
</style>