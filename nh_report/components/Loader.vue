<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div 
        class="dot" 
        v-for='(i, index) in 10'
        :key='index'
      />
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
html,
body{
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 16px;
  overflow: hidden;
}
.loader-wrapper {
  box-sizing: border-box;
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 2000;
}
.loader-wrapper .loader {
  box-sizing: border-box;
  display: block;
  position: absolute;
  margin: 0;
  padding: 0;
  top: 50%;
  left:50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 3em;
  height: 3em;
  animation: loader 2000ms linear infinite;
}
.loader-wrapper .dot {
  box-sizing: border-box;
  display: block;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 0.4em;
  height: 0.4em;
  background-color: #80D98A;
  border-radius: 50%;
  top: 0;
  left: 0;
  -webkit-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  opacity: 0.0;
}
.loader-wrapper .dot:nth-of-type(1) {
  top: 44%;
  left: 0;
  animation: fadein 2000ms ease-out 200ms infinite;
}
.loader-wrapper .dot:nth-of-type(2) {
  top: 68%;
  left: 15%;
  animation: fadein 2000ms ease-out 400ms infinite;
}
.loader-wrapper .dot:nth-of-type(3) {
  top: 88%;
  left: 33.333%;
  animation: fadein 2000ms ease-out 600ms infinite;
}
.loader-wrapper .dot:nth-of-type(4) {
  top: 88%;
  left: 66.666%;
  animation: fadein 2000ms ease-out 800ms infinite;
}
.loader-wrapper .dot:nth-of-type(5) {
  top: 68%;
  left: 86%;
  animation: fadein 2000ms ease-out 1000ms infinite;
}
.loader-wrapper .dot:nth-of-type(6) {
  top: 44%;
  left: 100%;
  animation: fadein 2000ms ease-out 1200ms infinite;
}
.loader-wrapper .dot:nth-of-type(7) {
  top: 15%;
  left: 86%;
  animation: fadein 2000ms ease-out 1400ms infinite;
}
.loader-wrapper .dot:nth-of-type(8) {
  top: 0;
  left: 66.666%;
  animation: fadein 2000ms ease-out 1600ms infinite;
}
.loader-wrapper .dot:nth-of-type(9) {
  top: 0;
  left: 33.333%;
  animation: fadein 2000ms ease-out 1800ms infinite;
}
.loader-wrapper .dot:nth-of-type(10) {
  top: 15%;
  left: 15%;
  animation: fadein 2000ms ease-out 2000ms infinite;
}
@keyframes loader {
  0%{
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes fadein {
  0%, 100% {
    opacity: 0.0;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
  }
  50% {
    opacity: 1.0;
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }
}
</style>