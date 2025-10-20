<!--
 * @Date: 2025-10-20 13:00:00
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-20 21:18:15
 * @FilePath: /price-displayer/src/components/ImgUpload.vue
 * @Description: 多图片上传 + 本地保存 + 删除功能 (NW.js 环境) 
-->
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <!-- 图片上传按钮 -->
      <el-upload action="#" v-model:file-list="fileList" :auto-upload="false" accept="image/*" :on-change="handleFileChange" :multiple="true"
        style="display: inline-block;" :show-file-list="false">
        <el-button type="primary">选择图片文件</el-button>
      </el-upload>
      <!-- 一键加载本地已保存的图片 -->
      <el-button type="warning" class="mt-4" @click="loadLocalImages">加载已保存图片</el-button>
    </div>

    <!-- 待保存图片列表 -->
     <div v-if="imageList.length">待保存图片列表：</div>
    <div v-if="imageList.length" class="image-list mt-4">
      <div v-for="(img, index) in imageList" :key="index" class="image-item">
        <img :src="img.preview" alt="preview" class="preview-img" />
        <div class="btn-group">
          <el-button type="success" size="small" @click="saveToLocal(img)">保存</el-button>
          <el-button type="danger" size="small" @click="deleteTempImg(img)">删除</el-button>
        </div>
        <p class="path">{{ img.savedPath || '未保存' }}</p>
      </div>
    </div>

    <!-- 本地图片列表 -->
    <!-- 本地已保存图片 -->
    <div style="color: black;">本地图片列表：</div>
    <el-table :data="localImgData" highlight-current-row>
      <el-table-column prop="img" label="预览" align="center">
        <template #default="scope">
          <img :src="scope.row.preview" alt="preview" class="preview-img" />
        </template>
      </el-table-column>
      <el-table-column prop="alias" label="别名" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="序号" align="center"></el-table-column>
      <el-table-column prop="savedPath" label="状态" align="center">
        <template #default="scope">
          {{ scope.row.savedPath ? '已保存' : '未保存' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editImgData(scope.row, scope.$index)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteLocal(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="isDialogVisible" title="修改图片信息" width="500" draggable>
      <el-form :model="formData">
        <el-form-item prop="name" label="原始名称：" label-width="100px">
          <el-input v-model="formData.name" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item prop="alias" label="显示名称：" label-width="100px">
          <el-input v-model="formData.alias" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="alias" label="序号：" label-width="100px">
          <el-input type="number" v-model="formData.orderNo" autocomplete="off" placeholder="请输入序号，序号越小越靠前" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFormData">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { isNW } from '@/utils/nwUtils'
import { createWebHistory } from 'vue-router'

const localImgData = ref([])
localImgData.value = JSON.parse(localStorage.getItem('localImgData') || '[]')


const imageList = ref([])
const fileList = ref([])
const formData = ref({})
const isDialogVisible = ref(false)

const editImgData = (img) => {
  formData.value = img
  console.log(formData.value)
  isDialogVisible.value = true
}

const saveFormData = () => {
  // 排序一下
  localImgData.value = localImgData.value.sort((a, b) => {
        if (a.orderNo == undefined) return 1;  // undefined 永远排最后
        if (b.orderNo == undefined) return -1;
        return a.orderNo - b.orderNo
      })   // 升序排序
  localStorage.setItem('localImgData', JSON.stringify(localImgData.value))
  isDialogVisible.value = false
}

// const imageTableData = computed(()=> {

// })

let fs = {}
let path = {}
let userDataDir = ''
let saveDir = ''

if (isNW()) {
  fs = window.require('fs')
  path = window.require('path')
  userDataDir = nw.App?.dataPath || process.cwd()
  saveDir = path.resolve(userDataDir, 'images')
}




/** 选择文件回调 */
const handleFileChange = (uploadFile, uploadFiles) => {
  try {
    console.log('uploadFile', uploadFile)
    console.log('uploadFiles', uploadFiles)
    const files = uploadFiles.map(f => f.raw)
    console.log('图片文件：', files)
    files.forEach(file => {
      const preview = URL.createObjectURL(file)
      imageList.value.push({
        name: file.name,
        file,
        preview,
        savedPath: null
      })
    })
  } catch (e) {
    console.log('出错了', e)
  }
}

/** 保存单张图片到本地 */
const saveToLocal = async (img, index) => {
  console.log('图片对象', img, '索引', index)
  try {
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true })
    }

    const arrayBuffer = await img.file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const savePath = path.join(saveDir, img.name)

    fs.writeFileSync(savePath, buffer)
    img.savedPath = savePath
    img.preview = `file://${savePath}`

    ElMessage.success(`图片已保存: ${savePath}`)
    // 从imageList删除
    imageList.value.splice(index, 1)
    fileList.value.splice(index, 1)
    console.log('从imageList删除成功', imageList)
    // 添加到 localImg 列表
    localImgData.value.push({
      name: img.name,
      savedPath: img.savedPath,
      preview: img.preview
    })
    console.log(img, '已经添加到localImg 列表')
  } catch (err) {
    console.error('保存失败', err)
    ElMessage.error(`保存失败: ${err.message}`)
  }
}

const deleteTempImg = (img, index) => {
  // 从imageList删除
    imageList.value.splice(index, 1)
    fileList.value.splice(index, 1)
    console.log('从imageList删除成功')
}

/** 删除本地图片 */
const deleteLocal = (img, index) => {
  try {
    if (img.savedPath && fs.existsSync(img.savedPath)) {
      fs.unlinkSync(img.savedPath)
      img.savedPath = null
      ElMessage.success('图片文件已删除')
    } else {
      ElMessage.info('本地未找到图片文件')
    }
    // 从列表移除
    localImgData.value.splice(index,1)
    localStorage.setItem('localImgData', JSON.stringify(localImgData.value))
  } catch (err) {
    ElMessage.error(`删除失败: ${err.message}`)
  }
}

/** 加载已保存的图片列表 */
const loadLocalImages = () => {
  try {
    if (!fs.existsSync(saveDir)) {
      ElMessage.info('暂无已保存图片')
      return
    }

    const files = fs.readdirSync(saveDir)
    const tempLocalData = files.map(filename => {
      const filePath = path.join(saveDir, filename)
      const fileUrl = `file://${filePath}`
      return {
        name: filename,
        preview: fileUrl,
        savedPath: filePath
      }
    })
    // 如果 localstorage 存的图片数据存在，则根据以本地图片数据为主重构数据结构
    if(localImgData.value.length > 0) {
      console.log('开始重建图片数据')
      localImgData.value = tempLocalData.map(item => {
        let temp = localImgData.value.find(o => o.name == item.name)
        return temp ? {...item, ...temp} : item
      }).sort((a, b) => {
        if (a.orderNo == undefined) return 1;  // undefined 永远排最后
        if (b.orderNo == undefined) return -1;
        return a.orderNo - b.orderNo
      })   // 升序排序
    } else {
      localImgData.value = tempLocalData
    }
    localStorage.setItem('localImgData', JSON.stringify(localImgData.value))
    console.log('localImgData', localImgData.value)
    ElMessage.success(`已加载 ${files.length} 张图片`)
  } catch (err) {
    console.error('加载图片失败', err)
    ElMessage.error(`加载失败: ${err.message}`)
  }
}

onMounted(() => {
  loadLocalImages()
  console.log('onMounted localImgData', 'localImgData')
})
</script>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.image-item {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.btn-group {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.path {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
  text-align: center;
  word-break: break-all;
}
</style>
