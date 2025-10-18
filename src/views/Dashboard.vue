<!--
 * @Date: 2025-10-08 16:48:01
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-17 20:28:27
 * @FilePath: /price-displayer/src/views/Dashboard.vue
-->
<template>
  <div class="dashboard-container">
    <el-header
      style="display: flex; flex-direction: row; align-items: center; background-color: #ecf5ff; color: #409eff;">
      <img src="../../public/icon.ico" alt="" style="margin-left: 30px; height: 40px;">
      <h1 style="font-weight: bold; font-size: 30px; margin-left: 10px;">杭越菜品数据管理后台</h1>
      <el-button type="primary" @click="$router.push('/')" style="margin-left: 30px;">回到首页</el-button>
      <el-button type="danger" plain style="margin-left: auto;" @click="deleteAllData">恢复出厂数据</el-button>
    </el-header>
    <el-main>
      <el-row :gutter="0" justify="space-around">
        <el-col v-for="itemData in tableData" :span="4">
          <div
            style="height: 30px;width: 100%; background-color: #ecf5ff; font-size:20px; line-height: 30px; text-align: center; color: #409eff;">
            <span style="padding-left: 60px;">{{ itemData.category }}</span>
            <el-button type="primary" size="small" style="float: right; height: 30px;"
              @click="addData(itemData.category)">添加菜品</el-button>
          </div>
          <el-table :data="itemData.data" style="width: 100%" max-height="600" highlight-current-row
            scrollbar-always-on>
            <el-table-column prop="name" label="菜品" align="center" />
            <el-table-column prop="ingredients" label="主料/做法" align="center">
              <template #default="scope">
                <div v-if="scope.row.title">{{ scope.row.title }}</div>
                <span v-else>{{scope.row.ingredients.length > 0 ? scope.row.ingredients.map(i =>
                  `${i.name}元/${i.weight}`).join('、') : scope.row.method.join('/')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
              <template #default="scope">
                {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
              </template>
            </el-table-column>
            <el-table-column prop="isTakeDown" label="状态" align="center">
              <template #default="scope">
                <!-- {{scope.row.isTakenDown ? '已下架' : ''}} -->
                <el-tag v-if="!scope.row.isTakenDown" type="success">上架中</el-tag>
                <el-tag v-else type="danger">已下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template #default="scope">
                <el-button type="primary" plain round size="small" @click="changeData(scope.row)">修改</el-button>
                <el-button :type="scope.row.isTakenDown ? 'success' : 'warning'" plain round size="small"
                  @click="switchTakeDownState(scope)">{{ scope.row.isTakenDown ? '上架' : '下架' }}</el-button>
                <el-button type="danger" plain round size="small" @click="deleteMeal(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>

    <el-dialog v-model="isDialogVisible" title="修改菜品信息" width="500" draggable>
      <el-form :model="formData">
        <el-form-item label="菜名修改：" label-width="100px">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-divider border-style="dashed" />
        <el-form-item v-if="isSpecialtyDish" label="主料编辑：" label-width="100px">
          <el-table :data="formData.ingredients" style="width: 100%">
            <el-table-column prop="name" label="主料" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.name" autocomplete="off" />
              </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.weight" autocomplete="off" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" plain round
                  @click="formData.ingredients.splice(scope.$index, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%" @click="formData.ingredients.push({ name: '', weight: '' })">
            添加主料
          </el-button>
        </el-form-item>
        <el-form-item v-else label="做法编辑" label-width="100px">
          <el-input-tag v-model="formData.method" placeholder="请输入做法，然后 Enter 回车保存" aria-label="请输入做法，然后 Enter 回车保存" />
        </el-form-item>
        <el-divider border-style="dashed" />
        <el-form-item label="价格编辑：" label-width="100px">
          <el-table :data="formData.specifications" style="width: 100%">
            <el-table-column prop="name" label="金额" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.price" autocomplete="off" />
              </template>
            </el-table-column>
            <el-table-column prop="weight" label="单位" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.unit" autocomplete="off" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" plain round
                  @click="formData.specifications.splice(scope.$index, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%" @click="formData.specifications.push({ name: '', weight: '' })">
            添加价钱规格
          </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button style="float: left;" type="warning" @click="resetData(formData)">重置数据</el-button>
          <el-button @click="isDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveData">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import localData from '../testdata.js'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'


const cateSort = ['招牌', '鱼类', '虾类', '蟹类', '贝类']
const isDialogVisible = ref(false)

// const specData = ref(...foodData.filter(item => item.category === '招牌'))
// console.log('specData',foodData, specData.value)
// const fishData = ref(...foodData.filter(item => item.category === '鱼类'))
// const shrimpData = ref(...foodData.filter(item => item.category === '虾类'))
// const crabData = ref(...foodData.filter(item => item.category === '蟹类'))
// const shellData = ref(...foodData.filter(item => item.category === '贝类'))

let foodData = JSON.parse(localStorage.getItem('foodData') || '[]')
if (foodData.length === 0) {
  foodData = localData
  localStorage.setItem('foodData', JSON.stringify(localData))  // 初始化时保存到本地存储
}

const tableData = ref(cateSort.map(cate => {
  // console.log('测试', foodData.filter(item => item.category === cate)[0].data)
  return {
    category: cate,
    data: foodData.length > 0 ? foodData.filter(item => item.category === cate)[0].data.map((d, i) => ({ ...d, category: cate, index: i })) : []  // 深拷贝，避免修改原数据
  }
}))
// console.log('tableData', tableData.value)

const formData = ref({})
const isSpecialtyDish = ref(false)   // 是不是招牌菜

const isAdding = ref(false)  // 是否是添加菜品

const tempFormData = ref({}) // 临时存储修改前的数据，取消时恢复

function changeData(row) {
  tempFormData.value = row  // 备份当前数据
  console.log('师范数据', tempFormData.value)
  const data = JSON.parse(JSON.stringify(row)) // 深拷贝，避免修改原数据
  formData.value = data
  console.log('formData', formData.value)
  if (row.category == '招牌') { // 如果是招牌菜显示主料，否则显示做法
    isSpecialtyDish.value = true
  } else {
    isSpecialtyDish.value = false
  }
  isDialogVisible.value = true
}

// 添加菜品
function addData(category) {
  isAdding.value = true
  const tempData = {
    category: category,
    name: '',
    ingredients: [],
    method: [],
    specifications: []
  }
  tempFormData.value = tempData
  formData.value = JSON.parse(JSON.stringify(tempData)) // 深拷贝，避免修改原数据
  if (category == '招牌') { // 如果是招牌菜显示主料，否则显示做法
    isSpecialtyDish.value = true
  } else {
    isSpecialtyDish.value = false
  }
  isDialogVisible.value = true
}


function resetData(data) {
  formData.value = JSON.parse(JSON.stringify(tempFormData.value))  // 恢复到修改前的数据
}

function saveData() {
  if (isAdding.value) {
    // 如果是添加新菜品
    const cate = formData.value.category
    const cateData = tableData.value.find(item => item.category === cate)
    if (cateData) {
      cateData.data.push({ ...formData.value, index: cateData.data.length })  // 添加到对应分类数据中
    }
    isAdding.value = false
  } else {
    // 保存数据到 tableData
    const cate = formData.value.category
    const index = formData.value.index
    const cateData = tableData.value.find(item => item.category === cate)
    if (cateData) {
      cateData.data[index] = formData.value
    }
  }
  // 保存数据
  localStorage.setItem('foodData', JSON.stringify(tableData.value))  // 保存到本地存储
  isDialogVisible.value = false
}

function deleteAllData() {
  ElMessageBox.confirm(
    '此操作将导致所有自定义数据被清除，重新恢复至出厂数据，确认吗?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'warning',
      title: '请确认是否恢复出厂数据',
    }
  )
    .then(() => {
      localStorage.removeItem('foodData')
      setTimeout(() => {
        location.reload()  // 刷新页面
      }, 3000)
      ElMessage({
        type: 'warning',
        message: '已恢复出厂数据，3秒后将刷新页面',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      })
    })
}

function switchTakeDownState(scope) {
  const cate = scope.row.category
  const index = scope.row.index
  let nowStatus = scope.row.isTakenDown
  console.log('cate, index', cate, index)
  const cateData = tableData.value.find(item => item.category === cate)
  if (cateData) {
    cateData.data[index].isTakenDown = nowStatus ? false : true  // 标记为已下架
  }
  localStorage.setItem('foodData', JSON.stringify(tableData.value))  // 保存到本地存储
  ElMessage({
    type: scope.row.isTakenDown ? 'warning' : 'success',
    message: `菜品【${scope.row.name}】${scope.row.isTakenDown ? '已下架' : '已上架'}`,
  })
}

function deleteMeal(scope) {
  ElMessageBox.confirm(
    `此操作将永久删除菜品【${scope.row.name}】，确认吗?`,
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'warning',
      title: '请确认是否删除该菜品',
    }
  )
    .then(() => {
      const cate = scope.row.category
      const index = scope.row.index
      console.log('cate, index', cate, index)
      const cateData = tableData.value.find(item => item.category === cate)
      if (cateData) {
        cateData.data.splice(index, 1)  // 从数据中删除该菜品
      }
      localStorage.setItem('foodData', JSON.stringify(tableData.value))  // 保存到本地存储
      ElMessage({
        type: 'success',
        message: `菜品【${scope.row.name}】已删除`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      })
    })
}

</script>

<style scoped lang="scss">
:deep(.el-divider) {
  margin-top: 0;
  margin-bottom: 15px;
}

:deep(.el-col-4) {
  flex: 0 0 19.5% !important;
  max-width: 19.5% !important;
}
</style>