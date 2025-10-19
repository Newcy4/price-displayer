<!--
 * @Date: 2025-10-19 22:07:56
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-19 23:29:35
 * @FilePath: /price-displayer/src/components/VideoUpload.vue
-->
<template>
  <el-upload
    action="#"
    :auto-upload="false"
    :on-change="handleFileChange"
    :show-file-list="false"
    accept="video/*"
  >
    <el-button type="primary">选择视频文件</el-button>
  </el-upload>

  <div v-if="videoFile">
    <video 
      :src="videoPreviewUrl" 
      controls 
      width="300"
      class="mt-4"
    ></video>
    <el-button 
      type="success" 
      @click="saveToLocal"
      class="mt-2"
    >
      保存到本地
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

  // NW.js 文件系统模块
const fs = window.require('fs');
const path = window.require('path');

const videoFile = ref(null);
const videoPreviewUrl = ref('');

const handleFileChange = (file) => {
  videoFile.value = file.raw;
  videoPreviewUrl.value = URL.createObjectURL(file.raw);
};

// const saveToLocal = async () => {
//   try {
//     // 1. 创建保存目录（如果不存在）
//     const saveDir = path.join(nw.App.dataPath, 'videos');
//     if (!fs.existsSync(saveDir)) {
//       fs.mkdirSync(saveDir, { recursive: true });
//     }

//     // 2. 读取文件内容
//     const arrayBuffer = await videoFile.value.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // 3. 生成唯一文件名
//     const ext = path.extname(videoFile.value.name);
//     const filename = `video_${Date.now()}${ext}`;
//     const savePath = path.join(saveDir, filename);

//     // 4. 写入文件
//     fs.writeFileSync(savePath, buffer);

//     ElMessage.success(`视频已保存到: ${savePath}`);
//     console.log('文件保存路径:', savePath);
    
//     // 5. 可选：在数据库中记录路径
//     // await saveToDatabase(savePath);
//   } catch (err) {
//     ElMessage.error(`保存失败: ${err.message}`);
//     console.error(err);
//   }
// };

const saveToLocal = async () => {
  try {
    // ⚠️ 1. 获取 NW 可写路径时不要直接用 nw.App.dataPath
    const userDataDir = nw.App?.dataPath || process.cwd();
    const saveDir = path.resolve(userDataDir, 'videos');

    // 2. 创建目录
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    // 3. 写文件
    const arrayBuffer = await videoFile.value.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(videoFile.value.name);
    const filename = `video.mp4`;  // 固定文件名覆盖旧文件
    const savePath = path.join(saveDir, filename);

    console.log('即将保存路径:', savePath);
    fs.writeFileSync(savePath, buffer);

    ElMessage.success(`视频已保存到: ${savePath}`);
  } catch (err) {
    console.error('保存失败', err);
    ElMessage.error(`保存失败: ${err.message}`);
  }
};

</script>