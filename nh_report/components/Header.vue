<template>
    <div class="mainHeader">
        <img 
            class="xailogo" 
            src="/xailogo2.png"
            @click='$router.push("/")'
        />
        <!-- where i left off 3/18 -->
        <div class="languageToggle">
            <button :class="{active: isActive}"
            class="uk-button uk-button-small"
            @click='translate("en")'>EN</button> | 
            <button :class="{active: !isActive}"
            class="uk-button uk-button-small" 
            @click='translate("ko")'>KR</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isActive:true
        }
    },
    methods: {
        translate(lang) {
            this.$store.dispatch('langModule/switchLang', lang)
            this.isActive = !this.isActive;
        }
    }
}
</script>

<style scoped>
button{
    border-radius: 5px;
}
.active{
    background: #72BAFC;
    /* background: #80DBBF; */
    color: white;
}
.mainHeader {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
.xailogo {
    max-width: 200px;
}
.xailogo:hover {
    cursor: pointer;
    background-color: #F5F5F5;
    /* opacity: 0.1; */
}
</style>