<template>
  <div id="top-swiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
import { getSwiper } from "@/axios/api/home";
import { reactive, onMounted } from "vue";
export default {
  name: "TopSwiper",
  setup() {
    const state = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(async () => {
      // 在实际开发中，如果项目正式上线，有可能需要修改域名，所以需要将域名提取出来
      // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //     console.log(res);
      //     state.images = res.data.banners
      // })
      let res = await getSwiper();
      state.images = res.data.banners;
      console.log(res);
    });
    return { state };
  },

};
</script>

<style lang="less">
#top-swiper {
  .van-swipe {
  width: 100%;
  height: 3rem;
  .van-swipe__track {
    .van-swipe-item {
      padding: 0 0 0.2rem;
      img {
        width: 100%;
        height: 3rem;
        border-radius: .2rem;
      }
    }
  }
  .van-swipe__indicator--active {
    background-color: rgb(191, 28, 28);
  }
}
}
</style>