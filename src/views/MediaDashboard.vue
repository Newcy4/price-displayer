<!--
 * @Date: 2025-10-19 22:13:22
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-20 00:21:02
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
      <el-button type="danger" @click="handleDeleteVideo" style="margin-left: 30px;">删除视频缓存</el-button>
    </el-header>

    <el-main>
      <VideoUpload />
    </el-main>
  </div>
</template>

<script setup>
import VideoUpload from '@/components/VideoUpload.vue';
import { isNW } from '@/utils/nwUtils';


let fs = {}, path = {};
if (isNW()) {
  // NW.js 文件系统模块
  fs = window.require('fs');
  path = window.require('path');
}

const handleDeleteVideo = () => {
  if (isNW()) {
    console.log('尝试删除视频文件');
    try {
      const saveDir = path.join(nw.App.dataPath, 'videos');
      const videoPath = path.join(saveDir, 'video.mp4');
      console.log('待删除视频路径:', videoPath);
      console.log('文件存在吗？', fs.existsSync(videoPath))
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
        console.log('视频文件已删除');
        ElMessage.success('视频文件已删除');
      } else {
        ElMessage.info('没有找到视频文件');
      }
    } catch (err) {
      ElMessage.error(`删除失败: ${err.message}`);
    }
  } else {
    ElMessage.warning('浏览器环境不支持删除视频文件');
  }
}
</script>