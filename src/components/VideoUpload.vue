<!--
 * @Date: 2025-10-19 22:07:56
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-20 20:56:32
 * @FilePath: /price-displayer/src/components/VideoUpload.vue
-->
<template>
  <div style="margin-bottom: 10px;">
    <el-upload action="#" :auto-upload="false" :on-change="handleFileChange" :show-file-list="false" accept="video/*"
    style="display: inline-block;">
    <el-button type="primary">选择视频文件</el-button>
  </el-upload>
  <el-button v-if="isLocalVideoExisted" type="danger" @click="handleDeleteVideo"
    style="margin-left: 30px;">删除视频缓存</el-button>
  </div>

  <div v-if="videoFile">
    <video :src="videoPreviewUrl" controls width="946" height="532" class="mt-4"></video>
    <el-button type="success" @click="saveToLocal" class="mt-2">
      保存到本地
    </el-button>
  </div>
  <div v-else-if="isLocalVideoExisted">
    <div>本地视频：</div>
    <video :src="'file://' + localVideoUrl" controls width="946" height="532"></video>
  </div>
  <div v-else="">
    本地暂无视频，请添加
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { isNW } from '@/utils/nwUtils';

let fs = {}
let path = {}
const localVideoUrl = ref('')

// NW.js 文件系统模块
if (isNW()) {
  fs = window.require('fs');
  path = window.require('path');
}

const isLocalVideoExisted = computed(() => {
  if (isNW()) {
    localVideoUrl.value = path.join(nw.App.dataPath, 'videos/video.mp4')
    console.log('视频路径：', localVideoUrl.value)
    let bool = fs.existsSync(localVideoUrl.value)
    console.log('视频存在吗？', bool)
    return bool
  }
})



const videoFile = ref(null);
const videoPreviewUrl = ref('');

const handleFileChange = (file) => {
  videoFile.value = file.raw;
  videoPreviewUrl.value = URL.createObjectURL(file.raw);
};


const saveToLocal = async () => {
  try {
    //  1.  nw.App.dataPath 是系统缓存目录，用于存放该应用资源
    const userDataDir = nw.App?.dataPath || process.cwd();  // 兼容处理
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
        localVideoUrl.value = ''
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