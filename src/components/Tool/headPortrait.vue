<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="卡片预设"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header-extra>
      噢!
    </template>
      <div id="editHeadPortrait" style="width: 500px;height: 500px;">
        <!-- <img :src="option.img" alt=""> -->
        <VueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :full="option.full"
          :canScale="option.canScale"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          :high="option.high"
          :mode="option.mode"
        >
        </VueCropper>
      </div>
    <template #footer>
      尾部
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref, onMounted, getCurrentInstance } from 'vue'
import {
  FormInst,
} from 'naive-ui'
import { EllipsisVertical } from '@vicons/ionicons5'
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css'
const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
let message = proxy.$message;
const bodyStyle = {
  width: '600px'
}
const segmented = {
  content: 'soft',
  footer: 'soft'
} as const
const showModal = ref(true)

const option = ref({//裁剪參數
  img: 'img/userMainBG-B-B.jpg',
  outputSize: 1,
  info: false, // 裁剪框的大小信息
  outputType: 'jpg', // 裁剪生成图片的格式
  canScale: false, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth:  '100px', // 默认生成截图框宽度
  autoCropHeight: '100px', // 默认生成截图框高度
  high: true, // 是否按照设备的dpr 输出等比例图片
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例
  fixedNumber: [1, 1], // 截图框的宽高比例
  full: true, // 是否输出原图比例的截图
  canMove: true, // 上传图片是否可以移动
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  mode: '100% auto' // 图片默认渲染方式
})
const showCropper = ref(false)
const fileList = ref([])
const cropper = ref()//截取的dom元素
console.log(VueCropper)
const file = ref()
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
</script>

<style lang="scss" scoped>
</style>