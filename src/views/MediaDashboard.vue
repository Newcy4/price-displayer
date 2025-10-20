<!--
 * @Date: 2025-10-19 22:13:22
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-20 20:26:24
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
      <span style="margin-left: 30px;">当前模式：</span>
      <el-radio-group v-model="playMode" @change="handleModeChange">
      <el-radio :label="1" border>播放视频</el-radio>
      <el-radio :label="2" border>默认轮播图</el-radio>
      <el-radio :label="3" border>自定义轮播图</el-radio>
    </el-radio-group>
    </el-header>

    <el-main style="height: 660px;">
      <el-row :gutter="0" justify="space-around" style="height: 100%;">
        <!-- <el-col :span="8" style="background-color: skyblue;"> -->
        <el-col v-if="playMode == 1" :span="8">
          <div
            style="height: 30px;width: 100%; background-color: #ecf5ff; font-size:20px; line-height: 30px; text-align: center; color: #409eff;">
            上传视频文件
          </div>
          <VideoUpload />
        </el-col>
        <!-- <el-col :span="8" style="background-color: lightgreen;"> -->
        <el-col v-else-if="playMode == 3" :span="8">
          <div
            style="height: 30px;width: 100%; background-color: #ecf5ff; font-size:20px; line-height: 30px; text-align: center; color: #409eff;">
            上传图片
          </div>
          <ImgUpload />
        </el-col>
        <el-col v-else :span="8">
          <div style="height: 100%; display: flex; justify-content: center; align-items: center;">
            使用默认轮播图播放，无需配置
          </div>
        </el-col>
        </el-row>
    </el-main>
  </div>
</template>

<script setup>
import VideoUpload from '@/components/VideoUpload.vue';
import ImgUpload from '@/components/ImgUpload.vue';
import { ref } from 'vue'

const savedMode = localStorage.getItem('play-mode');
const playMode = ref(2)
if(savedMode) playMode.value = parseInt(savedMode)

const handleModeChange = (newMode) => {
  localStorage.setItem('play-mode', newMode);
  console.log(`播放模式已切换为: ${newMode}`);
};
</script>