<template>
  <div class="dashborad">
    dashborad
    <p>
      <router-link to="/login">
        <span class="text">Red -- sass has working </span>
      </router-link>
    </p>
    <p>
      <el-button type="primary"
        >Button element has working---------------</el-button
      >
    </p>
    <p>
      <span>
        <svg-icon :icon-class="'eye'" :class-name="'abc'" /> svgIcon has working---------------
      </span>
    </p>

    <p>
      <el-icon :size="20"><alarm-clock /></el-icon>
      el-icon has working---------------
    </p>
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
