<template>
  <div class="music-list">
    <div class="music-list-top">
      <div class="music-list-title">推荐歌单</div>
      <div class="music-list-more">查看更多</div>
    </div>
    <!-- 歌单列表 -->
    <div class="music-list-content">
      <van-swipe
        :loop="false"
        :width="150"
        :show-indicators="false"
        class="music-list-swiper"
      >
        <van-swipe-item
          v-for="item in state.songList"
          :key="item.id"
          @click="toMusicListDetail(item.id)"
          class="music-list-swiper-item"
         
        >
          <div class="music-list-pic">
            <img :src="item.picUrl" alt="" srcset="" />
            <span class="play-count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang-copy"></use>
              </svg>
              {{ formatPlayCount(item.playCount) }}
            </span>
          </div>
          <span class="music-list-name">{{ item.name }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/axios/api/home";
import { reactive, onMounted} from "vue";
import {  useRouter, useRoute  } from "vue-router";
export default {
  //   name: "MusicList",
  //   data() {
  //     return {
  //       songList: [],
  //     };
  //   },
  //   methods: {
  //     async getSongList() {
  //       let res = await getMusicList();
  //       this.songList = res.data.result;
  //       console.log(res);
  //     },
  //     // 处理播放量
  //     formatPlayCount(num){
  //         if (num >= 100000000) {
  //             return (num/100000000).toFixed(1) + '亿'
  //         }else if (num >= 10000){
  //             return (num/10000).toFixed(1) + '万'
  //         }
  //     }
  //   },
  //   mounted() {
  //     this.getSongList();
  //   },
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const state = reactive({
      songList: [],
    });
    // 处理播放量
    function formatPlayCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + " 亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + " 万";
      }
    }
    // 跳转歌单
    function toMusicListDetail(id){
        $router.push({
            path: 'musiclist',
            query: {
                id: id
            }
        })
    }

    onMounted(async () => {
      let res = await getMusicList();
      console.log(res);
      state.songList = res.data.result;
    });
    return { state,formatPlayCount,toMusicListDetail };
  },
};
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  padding: 0.2rem;

  .music-list-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .music-list-title {
      font-size: 0.32rem;
      font-weight: 900;
    }

    .music-list-more {
      font-size: 0.28rem;
      border: solid 1px #ccc;
      border-radius: 0.2rem;
      padding: 0.1rem 0.2rem;
    }
  }
  .music-list-content {
    width: 100%;
    height: 4rem;
    .music-list-swiper {
      height: 100%;
      .music-list-swiper-item {
        display: flex;
        flex-direction: column;
        .music-list-pic {
          height: 80%;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
          }
          .play-count {
            display: flex;
            align-items: center;
            padding: 15px;
            color: rgb(255, 255, 255);
            position: absolute;
            right: 0;
            top: 0;
            font-size: 0.3rem;

            .icon {
              margin-right: 5px;
            }
          }
        }
        .music-list-name {
          height: 10%;
          padding: 0 10px;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>