<!--
 * @Date: 2025-10-08 16:48:01
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-10 18:41:38
 * @FilePath: /price-displayer/src/components/ScreenAdapter.vue
-->
<!-- components/ScreenAdapter.vue -->
<template>
  <div 
    class="screen-adapter"
    :style="{
      transform: `scale(${scaleX}, ${scaleY})`,
      transformOrigin: 'left top',
      width: `${DESIGN_WIDTH}px`,
      height: `${DESIGN_HEIGHT}px`
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 屏幕分辨率设置
const DESIGN_WIDTH = 2880  // 屏幕宽度
const DESIGN_HEIGHT = 720  // 屏幕高度

const scaleX = ref(1)
const scaleY = ref(1)

const updateScale = () => {
  const { clientWidth, clientHeight } = document.documentElement
  scaleX.value = clientWidth / DESIGN_WIDTH
  scaleY.value = clientHeight / DESIGN_HEIGHT
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
.screen-adapter {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>