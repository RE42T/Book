<template>
    <div id="editHeadPortrait">
        <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle"
            :title="showCropper ? '更换头像' : '头像'" size="huge" :bordered="false" :segmented="segmented"
            :on-after-leave="cancelESC">
            <template #header-extra>
            </template>
            <div id="vueCropper" v-show="showCropper">
                <VueCropper ref="cropper" :img="option.img" :outputSize="option.outputSize"
                    :outputType="option.outputType" :info="option.info" :full="option.full" :canScale="option.canScale"
                    :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
                    :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original"
                    :autoCrop="option.autoCrop" :fixed="option.fixed" :fixedNumber="option.fixedNumber"
                    :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox"
                    :high="option.high" :mode="option.mode">
                </VueCropper>
            </div>
            <div id="showHeadPortrait" v-show="showHeadPortrait">
                <!-- <img :src="headPortraitUrl" alt=""> -->
                <n-image-group show-toolbar-tooltip>
                    <!-- <n-space> -->
                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-image :width="300" :src="headPortraitUrl" />
                        </template>
                        <span style="cursor: pointer;" @click="showCropperClick">更换头像</span>
                    </n-popover>
                    <!-- </n-space> -->
                </n-image-group>
            </div>
            <template #footer>
                <div class="btns" v-show="showCropper">
                    <n-button size="small" @click="okClick">更换</n-button>
                    <n-button size="small" @click="cancelClick" strong secondary type="error">
                        取消
                    </n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">

    import { computed, watch, reactive, ref, onMounted, getCurrentInstance } from 'vue'
    import {
        FormInst,
    } from 'naive-ui'
    import { EllipsisVertical } from '@vicons/ionicons5'
    import { VueCropper } from 'vue-cropper';
    import { getImageFileFromUrl, testPromise } from '@/lib/file'
    import 'vue-cropper/dist/index.css'

    // 引入全局
    const { proxy } = getCurrentInstance() as any

    // 引入全局的 vuex （pinia）
    const store = proxy.$userStore();

    // 引入全局的信息弹出
    let message = proxy.$message;

    // 调整拟态内部框样式
    const bodyStyle = {
        width: '500px'
    }

    // 拟态框内卡片的分段区域设置
    const segmented = {
        // 调整内容区域分割线（上边框）
        content: 'soft',
        // 调整尾部区域分割线（上边框）
        footer: 'soft'
    } as const

    // 更换头像拟态框显示/隐藏变量
    let showModal = ref(false)

    // 展示头像模块显示/隐藏变量
    let showHeadPortrait = ref(true)

    // 展示头像地址
    let headPortraitUrl = ref('img/headPortrait.jpg')

    // VueCropper 配置项
    const option = ref({//裁剪參數
        img: headPortraitUrl,
        outputSize: 1,
        info: false, // 裁剪框的大小信息
        outputType: 'jpg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMove: true, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: 'contain' // 图片默认渲染方式
    })

    const showCropper = ref(false)
    const fileList = ref([])
    const cropper = ref()//截取的dom元素
    const file = ref()

    // 切换为头像修改模式
    const showCropperClick = () => {
        showHeadPortrait.value = false
        showCropper.value = true
    }

    /**
     * 選取圖片後
     * @param file
     * @returns {boolean}
     */
    //  function beforeRead(file) {
    //   option.value.img = URL.createObjectURL(file)
    //   showCropper.value = true
    //   return true
    // }

    // /**
    //  * 取消截圖
    //  */
    // function delCropper() {
    //   fileList.value = []
    //   showCropper.value = false
    // }

    // /**
    //  * 確認截圖
    //  */
    // function getCropBlob() {
    //   cropper.value.getCropData(e => {
    //     file.value = e
    //     showCropper.value = false
    //   })
    // }

    // 显示拟态框事件
    const showModalFun = () => {
        showModal.value = true
    }

    // 确认更换头像事件
    const okClick = () => {
        showModal.value = false
    }

    // 取消更换头像事件
    const cancelClick = () => {
        showModal.value = false
    }

    // 关闭拟态框的回调事件，还原初始状态
    const cancelESC = () => {
        showHeadPortrait.value = true
        showCropper.value = false
    }

    // 暴露子组件的方法
    defineExpose({ showModalFun });

    // 试验区

    testPromise()

    // getImageFileFromUrl(headPortraitUrl.value).then(file => {
    //     // console.log(file)
    //     console.log(1)
    // })

    // 试验区

</script>

<!-- 修改样式 -->

<style lang="scss" scoped>
    .custom-card {

        // 设置 vueCropper 外部容器大小及样式
        #vueCropper {
            width: 400px;
            height: 300px;
            margin: 0 auto;
        }

        // 设置头像展示区大小及样式
        #showHeadPortrait {
            width: 300px;
            height: 300px;
            margin: 0 auto;
        }

        /* 设置 div.btns 整体靠右 */
        .btns {
            float: right;

            /* 修改 div.btns 内所有按钮的字体大小 */
            button {
                font-size: 10px;

                /* 修改确定更换头像按钮的外间距 */
                &:first-child {
                    margin: 0 10px;
                }
            }
        }
    }

</style>
<!-- 修改 naive UI 默认样式 -->
<style>

    /** 
        *  注意: naive UI 内的 n-modal 组件的 html 部分不在 div#editHeadPortrait 内
        *  所以不可以用 div#editHeadPortrait 作为父级
        */

    /* 修改拟态框头部内间距和字体大小 */
    .n-card>.n-card-header {
        padding: 20px 22px 16px 27px;
        font-size: 14px;
    }

    /* 修改拟态框尾部内间距 */
    .n-card.n-card--footer-soft-segmented>.n-card__footer {
        padding: 16px 0;
    }

</style>