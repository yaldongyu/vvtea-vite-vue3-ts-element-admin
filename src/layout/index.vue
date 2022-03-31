<template>
  <el-container>
    <el-aside class="sidebar" v-bind:class="{ 'sidebar-collapse': isCollapse }">
      <el-header class="logo">
        <img src="@/assets/logo.png" />
        <h1>Element Admin</h1>
      </el-header>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <i
          @click="isCollapse = !isCollapse"
          class="el-icon-menu sidebarToggle"
        ></i>
        <div class="float-right">two drowdown</div>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          mianbaoxue
        </el-breadcrumb>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

import { AppMain } from "./components";
// import ResizeMixin from "./mixin/ResizeHandler";
import { defineComponent, ref } from "vue";
export default defineComponent({
  // 已启用类型推断
  name: "Layout",
  props: {
    // testA : String,
  },
  components: {
    AppMain,IconMenu
  },
  setup() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleClickOutside: () => {
      return false;
    },
    handleOpen: (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    },
    handleClose: (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
