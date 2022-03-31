<template>
  <section class="app-main">
    sss
    <Suspense>
      <template #default>
        <div>
          <router-view  /> 
          
        </div>
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </section>
</template>

<script lang="ts">
 
    

import { defineComponent, ref } from "vue";
export default defineComponent({
  // 已启用类型推断
  name: "AppMain",
  props: {
    // testA : String,
  },
  components: {
    
  },
  setup() {

   
 

    return {
   
    };
  },
  methods: {
     

  },
});
</script>


<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
