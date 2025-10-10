<!--
 * @Date: 2025-10-10 19:08:38
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-10 19:46:07
 * @FilePath: /price-displayer/src/components/FullscreenToggle.vue
-->
<template>
  <!-- 点击切换的div元素 -->
  <div 
    class="fullscreen-toggle"
    @click="handleToggle"
    :class="{ 'fullscreen-active': isFullscreen }"
  >
    {{ isFullscreen ? '□ 窗口化' : '□ 全屏' }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isNW, toggleFullscreen } from '@/utils/nwUtils';

const isFullscreen = ref(false);

// 处理点击事件
const handleToggle = () => {
  if (isNW()) {
    const success = toggleFullscreen();
    if (success) isFullscreen.value = !isFullscreen.value;
  } else {
    // Web环境降级处理
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullscreen.value = true;
    } else {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  }
};

// 监听全屏状态变化
onMounted(() => {
  if (isNW()) {
    const win = nw.Window.get();
    win.on('fullscreen', () => isFullscreen.value = true);
    win.on('restore', () => isFullscreen.value = false);
  } else {
    document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement;
    });
  }
});
</script>

<style scoped>
.fullscreen-toggle {
  padding: 8px 12px;
  background: rgb(203, 196, 182);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
}

.fullscreen-toggle:hover {
  background: rgb(94, 91, 84);
}

.fullscreen-active {
  background: rgb(203, 196, 182);
}
</style>