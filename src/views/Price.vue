<template>
  <div class="price-container">
    <FullscreenToggle style="position: absolute; right: 0; top: 0; z-index: 999;" />
    <!-- 轮播图 -->
    <div class="left">
      <div class="logo" @click="$router.push('/dashboard')">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 解除注释就可以使用 -->
      <!-- <video class="swiper" v-if="false" src="../../public/宣传视频.mp4" controls autoplay muted loop
        controlsList="nodownload nofullscreen" disablePictureInPicture playsinline preload="auto" crossorigin="anonymous">
        <source src="../../public/宣传视频.mp4" type="video/mp4">
        您的浏览器不支持HTML5视频
      </video> -->
      <!-- <img v-if="true" class="swiper" src="../assets/images/2.jpg" alt="swiper image" /> -->
       <!-- 如果想使用淡入淡出可以加上effect="fade"，但是如果是这样文字显示会出问题 -->
      <swiper v-if="true" class="swiper" :spaceBetween="30" effect="fade" :speed="2000" :pagination="{
        clickable: true,
      }" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }" :loop="true" :modules="modules">
        <swiper-slide v-for="slide in slides" :key="slide.id">
          <!-- 下往上渐变 -->
          <div class="swiper-mask">
            <span>{{slide.name}}</span>
          </div>
          <img :src="slide.src" class="swiper-img">
        </swiper-slide>
      </swiper>
    </div>

    <!-- 菜品表格 -->
    <div class="table-container" :style="tableData4.length == 0 ? `justify-content: space-evenly;` : ``">
      <div class="table table1" ref="table1ContainerRef">
        <el-table :data="tableData1" ref="table1Ref" header-row-class-name="table-header"
          header-cell-class-name="table-header-cell" :row-class-name="getRowClass" :cell-class-name="getCellClass">
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
              <div v-for="(i, index) in scope.row.specifications" :key="index">
                <span class="price">{{ `${i.price}元` }}</span>/<span class="unit">{{ i.unit }}</span><span
                  v-if="index + 1 != scope.row.specifications.length">、</span>
              </div>
              <!-- {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}} -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 0" class="table table2" ref="table2ContainerRef">
        <el-table :data="tableData2" ref="table2Ref" header-row-class-name="table-header"
          header-cell-class-name="table-header-cell" :row-class-name="getRowClass" :cell-class-name="getCellClass">
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
              <div v-for="(i, index) in scope.row.specifications" :key="index">
                <span class="price">{{ `${i.price}元` }}</span>/<span class="unit">{{ i.unit }}</span><span
                  v-if="index + 1 != scope.row.specifications.length">、</span>
              </div>
              <!-- {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}} -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 1" class="table table3" ref="table3ContainerRef">
        <el-table :data="tableData3" ref="table3Ref" header-row-class-name="table-header"
          header-cell-class-name="table-header-cell" :row-class-name="getRowClass" :cell-class-name="getCellClass">
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
              <div v-for="(i, index) in scope.row.specifications" :key="index">
                <span class="price">{{ `${i.price}元` }}</span>/<span class="unit">{{ i.unit }}</span><span
                  v-if="index + 1 != scope.row.specifications.length">、</span>
              </div>
              <!-- {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}} -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="overflowIndexArr.length > 2" class="table table4" ref="table4ContainerRef">
        <el-table :data="tableData4" ref="table4Ref" header-row-class-name="table-header"
          header-cell-class-name="table-header-cell" :row-class-name="getRowClass" :cell-class-name="getCellClass">
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
              <div v-for="(i, index) in scope.row.specifications" :key="index">
                <span class="price">{{ `${i.price}元` }}</span>/<span class="unit">{{ i.unit }}</span><span
                  v-if="index + 1 != scope.row.specifications.length">、</span>
              </div>
              <!-- {{scope.row.specifications.map(i => `${i.price}元/${i.unit}`).join('、')}} -->
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
import FullscreenToggle from '@/components/FullscreenToggle.vue';
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const localData = JSON.parse(localStorage.getItem('foodData') || '[]')
localData.forEach(item => {
  if (item && item.data && Array.isArray(item.data)) {
    item.data = item.data.filter(dish => {
      return !dish.isTakenDown
    })
  }
});


import { ref, onMounted, nextTick, watch } from 'vue'

// 动态获取文件夹内图片的名称
const imgFiles =  import.meta.glob('../assets/images/*.jpg', { eager: true })
console.log('import.meta.glob', imgFiles)
console.log('import.meta.glob ket', Object.keys(imgFiles))

const tempImgFilesArr = []
for (const path in imgFiles) {
  const resolvedPath = imgFiles[path].default
  console.log('图片路径path：', path, '解析后的路径：', resolvedPath)
  let matchResult = path.match(/(\d+[^.]*)\.jpg$/)
  if (!matchResult) console.log('无法匹配图片名称：', path)
  let imgName = matchResult[1]  // 数字开头，.jpg 结尾
  let id = parseInt(imgName.split('-')[0])  // 取数字部分作为id
  let name = imgName.split('-')[1]  // 取数字部分作为id
  console.log('图片名称：', imgName, 'id:', id, 'name:', name)
  tempImgFilesArr.push({
    id,
    name,
    src: resolvedPath
  })
}

console.log('生成后的数据对象', tempImgFilesArr)

// 动态生成图片路径数组
let slides = ref([])
slides.value = tempImgFilesArr
  // Array.from({ length: 10 }, (_, i) => ({
  //   id: i + 1,
  //   src: new URL(`../assets/images/${i + 1}.jpg`, import.meta.url).href
  // }))
  // [
  //   { id: 1, src: new URL(`../assets/images/2.jpg`, import.meta.url).href, name: "牛仔骨" },
  //   { id: 2, src: new URL(`../assets/images/4.jpg`, import.meta.url).href, name: "大闸蟹" },
  //   { id: 3, src: new URL(`../assets/images/6.jpg`, import.meta.url).href, name: "波士顿龙虾" },
  //   { id: 4, src: new URL(`../assets/images/8.jpg`, import.meta.url).href, name: "芝士常在" },
  //   { id: 5, src: new URL(`../assets/images/10.jpg`, import.meta.url).href, name: "就该死的" },
  // ]

// const modules = [EffectFade, Autoplay, Pagination]
// const modules = [EffectFade, Navigation, Pagination]
const modules = [EffectFade, Autoplay]
// 菜品表格数据
let tableData = ref([])
if (localData.length > 0) {
  tableData.value = localData
  console.log('使用本地存储的数据', tableData.value)
} else {
  tableData.value = foodData
  console.log('使用默认的测试数据', tableData.value)
  localStorage.setItem('foodData', JSON.stringify(foodData))  // 初始化时存储到本地
}



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

function getRowClass(data) {
  let classNameStr = 'table-row'
  // console.log('getRowClass', data)
  if (data.row.title) {
    classNameStr += ' table-row-title title-size'
  }
  return classNameStr
}

function getCellClass(data) {
  let classNameStr = 'table-cell'
  // console.log('getCellClass', data)
  if (data.column.property === 'name') {
    classNameStr += ' food-name-size'
  }
  if (!data.row.title && data.column.property === "ingredients") {
    classNameStr += ' method-size'
  }
  if (data.column.property === "price") {
    classNameStr += ' prize-size'
  }
  return classNameStr
}


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
    const headerHeight = table.querySelectorAll('.table1 .el-table__header thead tr')[0].clientHeight
    console.log('标题高度', headerHeight)
    // 获取所有行元素
    const rows = table.querySelectorAll('.table1 .el-table__header thead tr, .table1 .el-table__body tbody tr')
    const rowArr = Array.from(rows)
    // console.log('第一列的元素：', rowArr)
    const rowHeightArr = rowArr.map(row => row.clientHeight)
    // console.log('第一列的元素所有高度数组：', rowHeightArr)
    // let overflowIndexArr = []  // 记录超过容器高度的行索引
    // 循环计算，记录超过容器高度的行索引，最多记录4个
    let sumHeight = 0 // 每轮累计高度
    let circleCount = 0 // 计算循环次数，防止死循环
    for (let i = 0; i < rowHeightArr.length && overflowIndexArr.value.length <= 4; i++) {
      circleCount++
      sumHeight += rowHeightArr[i]
      // console.log(`第 ${i + 1} 行高度:`, rowHeightArr[i], '累计高度:', sumHeight, '容器高度：', containerHeight)
      if (sumHeight > containerHeight) {
        // 如果最后一行是标题，回退一行
        if (i > 0 && data[i - 2].title) {
          // console.log('来了老弟', data[i-2])
          i = i - 1 // 如果是标题行，回退一行
        }
        i = i - 1
        overflowIndexArr.value.push(i)
        sumHeight = 0 // 重置累计高度，开始新一轮计算
        sumHeight += headerHeight // 新一轮计算，先加上标题高度
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
    generateTableData()  // 放到下一个宏任务中执行，确保table-row的样式渲染完成，才能获取样式
  }, 0)
})



</script>
<style scoped lang="scss">
.price-container {
  width: 100%;
  height: 100%;
  // background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  // background-image: url("../assets/bg/\(1\).jpg");
  background-image: url("../assets/bg/\(2\).jpg"); // 浅色背景
  // background-image: linear-gradient(rgba(7, 0, 49, 0.7), rgba(7, 0, 49, 0.7)),  url("../assets/bg/\(2\).jpg");  // 浅色背景
  // background-image: linear-gradient(rgba(7, 0, 49, 0.5), rgba(7, 0, 49, 0.5)),  url("../assets/bg/黑白页岩\ \(54\).jpg");  // 深色背景

  // background-image: url("../assets/bg/\(3\).jpg");
  // background-image: url("../assets/bg/黑白页岩\ \(54\).jpg");   // 深色背景
  // background-image: url("../assets/bg/黑白页岩\ \(68\).jpg");
  // background-image: url("../assets/bg/黑白页岩\ \(89\).jpg");

  .left {
    width: 1200px;
    height: 675px;
    margin-right: 20px;
    margin-left: 20px;
    position: relative;

    .logo {
      position: absolute;
      top: 20px;
      left: 0px;
      z-index: 999;
    }

    .swiper {
      width: 1200px;
      height: 675px;
      // border: 2px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      position: relative;
    }

    .swiper-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
      display: flex;
      align-items: center;
      justify-content: end;
      z-index: 10;
      font-family: 'STKaiti';

      span {
        color: #d4d4d4;
        font-size: 50px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        margin-right: 100px;
        margin-bottom: 25px;
      }
    }

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

    & .table {
      width: 400px;
      height: 675px;
      background-color: transparent;
      font-family: STKaiti !important;
      // font-family: "Noto Serif SC", serif;  // 思源宋体
      // font-family: "Noto Sans SC", sans-serif;  // 思源黑

      & .el-table {
        background-color: transparent;
        // color: #fff; //深色背景
        color: #212121; //浅色背景

        & :deep(.el-table__inner-wrapper)::before {
          height: 0.5px;
          background-color: #616161 !important; //浅色主题
        }
      }

      & :deep(.table-header) {
        background-color: transparent;
        // color: #fff; //深色背景
        color: #212121; //浅色背景
        font-size: 23px;
      }

      & :deep(.table-header-cell) {
        background-color: transparent;
        border-bottom-color: #616161 !important; //浅色背景
      }

      & :deep(.table-row) {
        background-color: transparent;
      }

      & :deep(.table-row-title) {
        background-color: transparent;

        & td {
          font-weight: bold;
          // border: 0px solid black !important; 
        }
      }

      & :deep(.table-cell) {
        background-color: transparent;
        border-bottom-color: #616161 !important; //浅色背景
      }
    }

    :deep(.title-size) {
      font-size: 23px;
      font-weight: bold;
    }

    :deep(.food-name-size) {
      font-size: 21px;
      // font-weight: bold;
    }

    :deep(.prize-size) {
      font-size: 18px;
      // font-weight: bold;

      & .price {
        font-size: 21px;
      }
    }

    :deep(.method-size) {
      font-size: 16px;
      // font-weight: bold;
    }
  }
}
</style>