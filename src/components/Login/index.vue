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
                <n-form-item path="user" label="账号">
                    <n-input v-model:value="modelRef.user" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="modelRef.password" type="password" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item ref="verification" path="verification" label="验证码">
                    <div id="verification" autosize style="min-width: 30%"></div>
                    <n-input v-model:value="modelRef.verification" @keydown.enter.prevent autosize style="min-width: 70%"/>
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="12">
                        <div style="display: flex; justify-content: flex-start">
                            <n-button round type="primary"
                                @click="ToRouter('/register')">
                                注册
                            </n-button>
                        </div>
                    </n-col>
                    <n-col :span="12">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button :disabled="modelRef.user === null" round type="primary"
                                @click="handleValidateButtonClick">
                                登录
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
let router = proxy.$router;
interface ModelType {
    user: string | null
    password: string | null
    verification: string | null
}
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const modelRef = ref<ModelType>({
    user: null,
    password: null,
    verification: null
})
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
const rules: FormRules = {
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
    verification: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('需要验证码')
                }
                return true
            },
            trigger: ['input', 'blur']
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
    ToRouter('/')
}
function ToRouter(urlName: string) {
    router.push(urlName)
}
</script>

<style lang="scss" scoped>
#login {
    #verification {
        height: 30px;
        background-color: #eee;
    }
    .loginFixed {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .loading {
        transition: 0.5s;
        // opacity: 0;
        color: #5acea7;
        // z-index: 0;
    }

    .loadingBG {
        background-color: #5acea765; // 5acea765
    }

    .loginForm {
        width: 500px;
        height: 600px;
        padding: 20px;
        margin: 0 auto;
        margin-top: 100px;
        // text-align: center;
        z-index: 0;

        .logo {
            width: 100%;
            margin: 50px 0;
        }
    }
}
</style>