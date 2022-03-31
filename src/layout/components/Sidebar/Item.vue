<template>
  <svg-icon icon-class="{icon}" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore, ISidebarState } from "@/store/app";

export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
