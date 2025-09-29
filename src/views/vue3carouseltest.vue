<template>
  <div class="price-container">
    <!-- 轮播图 -->
    <Carousel class="carousel" :autoplay="1000" breakpointMode="viewport" :wrap-around="true">
      <Slide v-for="slide in slides" :key="slide.id">
        <img :src="slide.src" class="carousel-img">
      </Slide>
    </Carousel>

  </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

import { ref } from 'vue'
// 动态生成图片路径数组
const slides = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: new URL(`../assets/images/${i + 1}.jpg`, import.meta.url).href
  }))
)

// 菜品表格数据
// const tableData = ref(foodData)


console.log(slides.value)



</script>
<style scoped lang="scss">
.price-container {
  width: 100%;
  height: 100%;
  background-color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .swiper {
    width: 1200px;
    height: 675px;
    .swiper-img {
      width: 1200px;
      height: 675px;
      object-fit: cover;
    }
  }

  .carousel {
    width: 1200px;
    height: 675px;

    .carousel-img {
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
  }

  .col {
    width: 400px;
    height: 675px;
    background-color: #fff;
  }

}
</style>