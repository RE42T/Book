<template>
    <div>
        <topMenuVue />
        <leftMenuVue />
        <HeadPortrait></HeadPortrait>
    </div>
</template>

<script setup lang="ts">
import topMenuVue from './topMenu.vue';
import leftMenuVue from './leftMenu.vue';
import HeadPortrait from '../Tool/headPortrait.vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { defineComponent, h, ref, Component, getCurrentInstance } from 'vue'
// import { storeToRefs } from 'pinia'

const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
onBeforeRouteUpdate((to, from) => {//当前组件路由改变后，进行触发
    console.log('从' + from.path);
    console.log('到' + to.path);
})
onBeforeRouteLeave((to, from) => {//离开当前的组件，触发
    console.log('我从' + from.path + '离开啦，到' + to.path + '啦');
})
</script>

<style lang="scss" scoped>
</style>