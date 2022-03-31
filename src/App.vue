<script lang="ts"> 
import HelloWorld from "./components/HelloWorld.vue"; 
import { defineComponent, ref } from "vue";
export default defineComponent({
  // 已启用类型推断
  props: {
    // testA : String, 
  },
  components: {
    HelloWorld,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
