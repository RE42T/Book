<template>
    <div id="editorMD">
        <md-editor v-model="text" :theme="store.theme" />
    </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
// import { storeToRefs } from 'pinia'
// const store = getCurrentInstance()?.appContext.config.globalProperties.$userStore();
const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
// 声明字符串或数值的地方
const text = ref('');
// 声明对象的地方，相当于 vue2 中的 data
const dtate = reactive({
    // chosenAddressId: '1',
    // list: []
})
onMounted(async () => {
    console.log('mdEditor初始化')
})
</script>

<style lang="scss" scoped>
    #editorMD {
        width: 100%;
    }
</style>