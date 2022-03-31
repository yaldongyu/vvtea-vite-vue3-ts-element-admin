<template>
  <div class="dashborad">
    testpage
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; 
import { useUserStore } from "@/store/user";

export default defineComponent({
  data() {
    console.log(
      "------router has working---------------" + this.helloWorld + this.count
    );

    return {};
  },
  watch: {},
  mounted() {
     
    const userStore = useUserStore();
    console.log("userStore.getUserState");
    const  token  = userStore.getUserState.token || "" 
    console.log(token.length);
    console.log(this.$route.path);
    
    
     ;
  },
  methods: {},
});
</script>

<style lang="scss">
.dashborad {
  font-size: 20px;
  .text {
    color: red;
  }
}
</style>
