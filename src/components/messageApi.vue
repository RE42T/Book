<template>
  <div></div>
</template>

<script setup lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { useMessage } from "naive-ui";

const ctx = getCurrentInstance();
if (ctx) {
  const message = useMessage();
  ctx.appContext.config.globalProperties.$message = message;
}
</script>
