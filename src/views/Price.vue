<template>
  <div class="price-container">
    <!-- 轮播图 -->
    <swiper class="swiper" :spaceBetween="30" :effect="'fade'" :speed="2000" :pagination="{
      clickable: true,
    }" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" :loop="true" :modules="modules">
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <img :src="slide.src" class="swiper-img">
      </swiper-slide>
    </swiper>

    <!-- 菜品表格 -->
    <div class="table-container">
      <div class="table table1" style="background-color: red;" ref="table1ContainerRef">
        <el-table :data="tableData1" ref="table1Ref">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="ingredients" label="主料/做法" align="center">
            <template #default="scope">
              <div v-if="scope.row.title" style="background-color: yellow;">{{ scope.row.title}}</div>
              <span v-else>{{scope.row.ingredients.length > 0 ? scope.row.ingredients.map(i =>
                `${i.name}元/${i.weight}`).join('、') : scope.row.method.join('/')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 0" class="table table2" style="background-color: skyblue;" ref="table2ContainerRef">
        <el-table :data="tableData2" ref="table2Ref" :show-header="false">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="ingredients" label="主料/做法" align="center">
            <template #default="scope">
              <div v-if="scope.row.title" style="background-color: yellow;">{{ scope.row.title }}</div>
              <span v-else>{{scope.row.ingredients.length > 0 ? scope.row.ingredients.map(i =>
                `${i.name}元/${i.weight}`).join('、') : scope.row.method.join('/')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 1" class="table table3" style="background-color: green;" ref="table3ContainerRef">
        <el-table :data="tableData3" ref="table3Ref" :show-header="false">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="ingredients" label="主料/做法" align="center">
            <template #default="scope">
              <div v-if="scope.row.title" style="background-color: yellow;">{{ scope.row.title }}</div>
              <span v-else>{{scope.row.ingredients.length > 0 ? scope.row.ingredients.map(i =>
                `${i.name}元/${i.weight}`).join('、') : scope.row.method.join('/')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 2" class="table table4" style="background-color: yellow;" ref="table4ContainerRef">
        <el-table :data="tableData4" ref="table4Ref" :show-header="false">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="ingredients" label="主料/做法" align="center">
            <template #default="scope">
              <div v-if="scope.row.title" style="background-color: yellow;">{{ scope.row.title }}</div>
              <span v-else>{{scope.row.ingredients.length > 0 ? scope.row.ingredients.map(i =>
                `${i.name}元/${i.weight}`).join('、') : scope.row.method.join('/')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import foodData from '../testdata.js'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'



import { ref, onMounted, nextTick, watch } from 'vue'
// 动态生成图片路径数组
const slides = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: new URL(`../assets/images/${i + 1}.jpg`, import.meta.url).href
  }))
)

// const modules = [EffectFade, Autoplay, Pagination]
// const modules = [EffectFade, Navigation, Pagination]
const modules = [EffectFade, Autoplay]
// 菜品表格数据
const tableData = ref(foodData)


let table1ContainerRef = ref(null)
let table1Ref = ref(null)

let tableData1 = ref([])
let tableData2 = ref([])
let tableData3 = ref([])
let tableData4 = ref([])

// watch(tableData1, () => {
//   nextTick(() => {
//     generateTableData();
//   });
// }, { deep: true, immediate: true });


console.log(slides.value)


const existedCategory = tableData.value.map(item => item.category)
console.log('existedCategory', existedCategory)
// 全部数据铺开
let cateSort = ['招牌', '鱼类', '虾类', '蟹类', '贝类'].filter((cate) => existedCategory.includes(cate))  // 实际存在的菜品类别顺序
console.log('cateSort', cateSort)
tableData1.value = cateSort.map(cate => {
  let arr = [{ title: cate, name: "", specifications: [], ingredients: [], method: [] }]
  // let arr = [{ title: cate, name: "", specifications: [], ingredients: [{ name: cate, weight: '' }], method: [] }]
  // console.log('试一试：', tableData.value.find(item => item.category === cate).data)
  let newArr = arr.concat(tableData.value.find(item => item.category === cate).data)
  return newArr
}).flat()
console.log('tableData1', tableData1.value.length, tableData1.value)


const overflowIndexArr = ref([])  // 记录超过容器高度的行索引
// 根据容器高度，分割数据到四个表格
const generateTableData = () => {
  let data = tableData1.value
  console.log('generateTableData', data)
  // 获取元素高度
  nextTick(() => {
    const container = table1ContainerRef.value
    const table = table1Ref.value.$el
    const containerHeight = container.clientHeight  // 容器高度
    console.log('container', container)
    console.log('table', table)
    console.log('containerHeight', containerHeight)
    console.log('tableHeight', table.clientHeight)

    // 获取所有行元素
    const rows = table.querySelectorAll('.table1 .el-table__header thead tr, .table1 .el-table__body tbody tr')
    const rowArr = Array.from(rows)
    console.log('第一列的元素：', rowArr)
    const rowHeightArr = rowArr.map(row => row.clientHeight)
    console.log('第一列的元素所有高度数组：', rowHeightArr)
    // let overflowIndexArr = []  // 记录超过容器高度的行索引
    // 循环计算，记录超过容器高度的行索引，最多记录4个
    let sumHeight = 0 // 每轮累计高度
    let circleCount = 0 // 计算循环次数，防止死循环
    for (let i = 0; i < rowHeightArr.length && overflowIndexArr.value.length <= 4; i++) {
      circleCount++
      sumHeight += rowHeightArr[i]
      console.log(`第 ${i + 1} 行高度:`, rowHeightArr[i], '累计高度:', sumHeight, '容器高度：', containerHeight)
      if (sumHeight > containerHeight) {
        // 如果最后一行是标题，回退一行
        if (i > 0 && data[i - 2].title) {
          // console.log('来了老弟', data[i-2])
          i = i - 1 // 如果是标题行，回退一行
        }
        i = i - 1
        overflowIndexArr.value.push(i)
        sumHeight = 0 // 重置累计高度，开始新一轮计算
      }
    }
    console.log('overflowIndexArr', overflowIndexArr.value)
    console.log('circleCount', circleCount)


    if (overflowIndexArr.value.length > 2) {
      tableData1.value = data.slice(0, overflowIndexArr.value[0])
      tableData2.value = data.slice(overflowIndexArr.value[0], overflowIndexArr.value[1])
      tableData3.value = data.slice(overflowIndexArr.value[1], overflowIndexArr.value[2])
      tableData4.value = data.slice(overflowIndexArr.value[2])
    } else if (overflowIndexArr.value.length > 1) {
      tableData1.value = data.slice(0, overflowIndexArr.value[0])
      tableData2.value = data.slice(overflowIndexArr.value[0], overflowIndexArr.value[1])
      tableData3.value = data.slice(overflowIndexArr.value[1])
    } else if (overflowIndexArr.value.length > 0) {
      tableData1.value = data.slice(0, overflowIndexArr.value[0])
      tableData2.value = data.slice(overflowIndexArr.value[0])
    }
  })
}


onMounted(() => {
  setTimeout(() => {
    generateTableData()
  }, 0)
})



</script>
<style scoped lang="scss">
.price-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url("../assets/bg/黑白页岩\ \(54\).jpg");

  .swiper {
    width: 1200px;
    height: 675px;
    margin-right: 20px;
    margin-left: 20px;

    .swiper-img {
      width: 1200px;
      height: 675px;
      object-fit: cover;
    }
  }

  .table-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-right: 20px;
    opacity: .8;

    .table {
      width: 400px;
      height: 675px;
      background-color: #fff;
    }

    .title-size {
      font-size: 13.5px;
    }

    .food-name-size {
      font-size: 12px;
    }

    .prize-size {
      font-size: 10px;
    }

    .method-size {
      font-size: 5.5px;
    }
  }
}
</style>