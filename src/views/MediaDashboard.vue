<!--
 * @Date: 2025-10-19 22:13:22
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-19 23:41:33
 * @FilePath: /price-displayer/src/views/MediaDashboard.vue
-->
<template>
  <div class="media-dashboard">
    <el-header
      style="display: flex; flex-direction: row; align-items: center; background-color: #ecf5ff; color: #409eff;">
      <img src="../../public/icon.ico" alt="" style="margin-left: 30px; height: 40px;">
      <h1 style="font-weight: bold; font-size: 30px; margin-left: 10px;">杭越菜品多媒体控制后台</h1>
      <el-button type="primary" @click="$router.push('/dashboard')" style="margin-left: 30px;">返回上级</el-button>
      <el-button type="primary" @click="$router.push('/')" style="margin-left: 30px;">回到首页</el-button>
    </el-header>
    
    <el-main>
      <VideoUpload />
    </el-main>
  </div>
</template>

<script setup>
import VideoUpload from '@/components/VideoUpload.vue';
</script>