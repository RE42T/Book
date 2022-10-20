<script setup lang="ts">
import MessageApi from './components/messageApi.vue';
import { reactive, ref, onMounted, getCurrentInstance, defineComponent } from 'vue'
import { zhCN, dateZhCN } from 'naive-ui'
// import { storeToRefs } from 'pinia'
const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="store.themeNaive">
    <!-- <NavVue /> -->
    <n-message-provider>
      <MessageApi></MessageApi>
    </n-message-provider>
    <router-view></router-view>
  </n-config-provider>
</template>

<style lang="scss">
body {
  background-color: rgb(8 9 14);

  .clearfix::after {
    content: '';
    clear: both;
    display: block;
  }
}
</style>
