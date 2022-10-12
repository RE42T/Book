<template>
    <div id="login">
        <n-space>
            <n-spin class="loading loginFixed" size="large"
                :style="{ opacity: store.loadingOpacity, zIndex: store.loadingOpacity }">
                <div class="loginFixed loadingBG"></div>
                <template #description>
                    Loading...
                </template>
            </n-spin>
        </n-space>
        <div class="loginForm">
            <n-icon size="60" class="logo">
                <Leaf color="#fff" />
            </n-icon>
            <n-form ref="formRef" :model="modelRef" :rules="rules">
                <n-form-item path="name" label="姓名">
                    <n-input v-model:value="modelRef.name" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="user" label="账号">
                    <n-input v-model:value="modelRef.user" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="modelRef.password" type="password" @input="handlePasswordInput"
                        @keydown.enter.prevent />
                </n-form-item>
                <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
                    <n-input v-model:value="modelRef.reenteredPassword" :disabled="!modelRef.password" type="password"
                        @keydown.enter.prevent />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button :disabled="modelRef.user === null" round type="primary"
                                @click="handleValidateButtonClick">
                                注册并登录
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import {
    FormInst,
    FormItemInst,
    FormItemRule,
    FormRules
} from 'naive-ui'
import { GameControllerOutline, Leaf } from '@vicons/ionicons5'
// import { storeToRefs } from 'pinia'
const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
let message = proxy.$message;
interface ModelType {
    user: string | null
    name: string | null
    password: string | null
    reenteredPassword: string | null
}
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const modelRef = ref<ModelType>({
    user: null,
    name: null,
    password: null,
    reenteredPassword: null
})
function handlePasswordInput() {
    if (modelRef.value.reenteredPassword) {
        rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
    }
}
function handleValidateButtonClick(e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            message.success('验证成功')
            loginCookies();
        } else {
            // console.log(errors)
            message.error('验证失败')
        }
    })
}
function validatePasswordStartWith(
    rule: FormItemRule,
    value: string
): boolean {
    return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
    )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === modelRef.value.password
}
const rules: FormRules = {
    name: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('需要姓名')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    user: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('需要账号')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('需要密码')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    reenteredPassword: [
        {
            // required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
        },
        {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
        },
        {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
        }
    ]
}
function loginCookies() {
    store.loadingShowChange();
    const cookies = proxy.$cookies;
    console.log(cookies)
    // if (cookies.get('xxxxx')) {
    //     cookies.remove('xxxxx')
    // }
    // 设置cookies的日期为一个月
    cookies.config("1m")
    // 设置cookies
    cookies.set("userKey",{
        user: modelRef.value.user,
        paw: modelRef.value.password
    }); // 前面的为设置cookies的名字，后面为内容
}
</script>

<style lang="scss" scoped>

</style>