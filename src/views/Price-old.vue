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
      <div class="table table1" style="background-color: #fff;" ref="table1ContainerRef">
        <el-table :data="tableData.specialty" ref="table1Ref">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="主料" align="center">
            <template #default="scope">
              {{scope.row.ingredients.map(i => `${i.name}元/${i.weight}`).join('、')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="table table2" style="background-color: #fff;" ref="table2ContainerRef">
        <el-table :data="tableData.fish" ref="table2Ref">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="做法" align="center">
            <template #default="scope">
              {{ scope.row.method.join('/') }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="table table3" style="background-color: #fff;" ref="table3ContainerRef">
        <el-table :data="[...tableData.shrimp, ...tableData.crab]" ref="table3Ref">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="做法" align="center">
            <template #default="scope">
              {{ scope.row.method.join('/') }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="table table4" style="background-color: #fff;" ref="table4ContainerRef">
        <el-table :data="tableData.shellfish" ref="table4Ref">
          <el-table-column prop="name" label="菜品" align="center" />
          <el-table-column prop="price" label="价格" align="center">
            <template #default="scope">
              {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}}
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="做法" align="center">
            <template #default="scope">
              {{ scope.row.method.join('/') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import foodData from '../testdata-old-change.js'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'



import { ref, onMounted, nextTick } from 'vue'
// 动态生成图片路径数组
const slides = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: new URL(`../assets/images/${i + 1}.jpg`, import.meta.url).href
  }))
)

// const modules = [EffectFade, Navigation, Pagination, Autoplay]
const modules = [EffectFade, Autoplay]
// 菜品表格数据
const tableData = ref(foodData)


console.log(slides.value)

let table1ContainerRef = ref(null)
let table1Ref = ref(null)
let table2ContainerRef = ref(null)
let table2Ref = ref(null)
let table3ContainerRef = ref(null)
let table3Ref = ref(null)
let table4ContainerRef = ref(null)
let table4Ref = ref(null)
// 标记溢出行的函数
const checkOverflow = () => {
  
  nextTick(() => {
    const container = table3ContainerRef.value
    const table = table3Ref.value.$el
    const containerHeight = container.clientHeight
    console.log('container', container)
    console.log('table', table)
    console.log('containerHeight', containerHeight)
    console.log('tableHeight', table.clientHeight)
    let accumulatedHeight = 0
    let overflowIndex = -1

    // 获取所有行元素
    const rows = table.querySelectorAll('.table3 .el-table__body tr')
    console.log('第一列的元素', rows)

    rows.forEach((row, index) => {
      if (overflowIndex === -1) {
        accumulatedHeight += row.clientHeight
        console.log(`第 ${index + 1} 行高度:`, row.clientHeight, '累计高度:', accumulatedHeight)
        if (accumulatedHeight > containerHeight) {
          overflowIndex = index
          console.log(`第 ${index + 1} 行开始溢出`)
        }
      }
    })

    if (overflowIndex === -1) {
      console.log('表格内容未溢出容器')
    }
  })
}

// 初始化时检查
onMounted(() => {
  setTimeout(() => {
    checkOverflow()
  }, 0)
})



</script>
<style scoped lang="scss">
.price-container {
  width: 100%;
  height: 100%;
  // background-color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url("../assets/bg/(1).jpg");

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
      border: 1px solid #000;
      overflow: hidden;
    }
    

  }

}
</style>