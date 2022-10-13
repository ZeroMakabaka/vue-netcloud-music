<template>
  <div class="music-detail">
    <!-- <img class="music-detail-bg" :src="musiclist.al.picUrl" alt="" srcset="" /> -->
    <div class="music-detail-bg"></div>
    <div class="detail-header">
      <div class="detail-header-left" @click="updateIsSongDetail">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div class="detail-header-content">
        <p class="song-name" ref="content" v-if="!isShowMarquee">
          {{ musiclist.name }}
        </p>
        <Vue3Marquee class="song-name" v-if="isShowMarquee">{{
          musiclist.name
        }}</Vue3Marquee>
        <div>
          <span v-for="author in musiclist.ar" :key="author" class="author">{{
            author.name
          }}</span>
        </div>
      </div>
      <div class="detail-header-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中间 -->
    <div
      class="music-detail-content"
      v-show="!isShowLyric"
      @click="isShowLyric = true"
    >
      <div class="m-song-disc">
        <img
          src="@/assets/needle-ab.png"
          alt=""
          class="m-song-needle"
          :class="{ 'm-song-needle-active': isPlaying }"
        />
        <img src="@/assets/cover.png" alt="" class="m-song-cover-bg" />
        <img
          :src="musiclist.al.picUrl"
          alt=""
          class="m-song-cover"
          :class="[isPlaying ? 'cover-active' : 'cover-pause']"
        />
        <!-- <img :src="musiclist.al.picUrl" alt="" class="m-song-cover" :class="{'cover-active':isPlaying,'cover-pause':!isPlaying}"/> -->
      </div>
    </div>
    <div
      class="music-detail-content-lyric"
      ref="lyricScroll"
      v-show="isShowLyric"
      @click="isShowLyric = false"
    >
      <p
        v-for="item in lyric"
        :key="item"
        class="m-content-lyric-lrc"
        :class="{
          'lrc-active': currentTime >= item.time && currentTime < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="music-detail-footer">
      <div class="m-footer-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changge"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-dian"></use>
        </svg>
      </div>
      <div class="m-footer-content">
        <van-progress
          :show-pivot="false"
          :percentage="position"
          class="m-footer-progress"
        />
      </div>
      <div class="m-footer-bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-if="!isPlaying">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState, useStore } from "vuex";
import { useState } from "@/utils/useState";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { formatLyric } from "@/utils";
import { useActions } from "@/utils/useActions";
import { useMutations } from "@/utils/useMutations";
import store from "@/store";
export default {
  props: ["musiclist", "isPlaying", "play", "getDuration"],
  setup({ musiclist, isPlaying, play, getDuration }) {
    const store = useStore();
    const state = reactive({
      isShowMarquee: false,
      isShowLyric: false,
      position: 0,
      currentTime: computed(()=>{
        return store.state.m_music.currentTime
      }),
    });

    const storeSate = useState("m_music", [
      "lyrics",
      "currentTime",
      "playingIndex",
      "duration",
    ]);
    console.log("storeSate", storeSate);

    const storeAction = useMutations("m_music", [
      "updateIsSongDetail",
      "updateIsPlaying",
      "updatePlayingIndex",
    ]);

    const lyricScroll = ref(null);
    const content = ref(null);

    let lyric = computed(() => {
      return formatLyric(store.state.m_music.lyrics);
    });

    let position = computed(() => {
      return (store.state.m_music.currentTime / store.state.m_music.duration) * 100
      
    });

    function goPlay(num) {
      let index = store.state.m_music.playingIndex + num;
      if (index < 0) {
        index = musiclist.length - 1;
      } else if (index == musiclist.length) {
        index = 0;
      }
      store.commit("m_music/updatePlayingIndex", index);
      store.commit('m_music/updateCurrentTime',0)
      // store.state.m_music.currentTime = 0;
    }

    onMounted(() => {
      getDuration();
      console.log("总时长", store.state.m_music.duration);
      console.log(musiclist);

      // 判断p是否溢出
      let p = content.value;
      console.log(content);
      console.log(p);
      if (p.clientWidth > 200) {
        state.isShowMarquee = true;
      }
    });

    watch(
      () => state.currentTime,
      (newVal) => {
        let p = document.querySelector("p.lrc-active");
        // console.log([p]);
        // console.log([this.$refs.lyricScroll]);
        if (p && p.offsetTop > 250) {
          lyricScroll.value.scrollTop = p.offsetTop - 250;
        }
        if (newVal == store.state.m_music.duration) {
          // this.updatePlayingIndex(this.playingIndex+1)
          // if (this.playingIndex===this.musiclist.length-1) {

          // }
          goPlay(1);
        }
      }
    );

    return {
      ...state,
      ...storeSate,
      ...storeAction,
      lyric,
      position,
      lyricScroll,
      content,
      goPlay,
    };
  },
  data() {
    // return {
    //   isShowMarquee: false,
    //   isShowLyric: false,
    //   position: 0,
    // };
  },

  mounted() {
    // this.getDuration();
    // console.log(this.duration);
    // console.log(this.musiclist);
    // // 判断p是否溢出
    // let p = this.$refs.content;
    // console.log([p]);
    // console.log(p.offsetWidth);
    // if (p.clientWidth > 200) {
    //   this.isShowMarquee = true;
    // }
  },
  components: {
    Vue3Marquee,
  },
  methods: {
    // ...mapMutations([
    //   "updateIsSongDetail",
    //   "updateIsPlaying",
    //   "updatePlayingIndex",
    // ]),
    // goPlay(num) {
    //   let index = this.playingIndex + num;
    //   if (index < 0) {
    //     index = this.musiclist.length - 1;
    //   } else if (index == this.musiclist.length) {
    //     index = 0;
    //   }
    //   this.updatePlayingIndex(index);
    //   this.currentTime = 0;
    // },
  },
  watch: {
    // currentTime(newVal) {
    //   let p = document.querySelector("p.lrc-active");
    //   // console.log([p]);
    //   // console.log([this.$refs.lyricScroll]);
    //   if (p && p.offsetTop > 250) {
    //     this.$refs.lyricScroll.scrollTop = p.offsetTop - 250;
    //   }
    //   if (newVal == this.duration) {
    //     // this.updatePlayingIndex(this.playingIndex+1)
    //     // if (this.playingIndex===this.musiclist.length-1) {
    //     // }
    //     this.goPlay(1);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.music-detail {
  .music-detail-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #6e6d6d;
    z-index: -1;
    filter: blur(70px);
  }
  .detail-header {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
    .detail-header-left,
    .detail-header-right {
      width: 0.5rem;
      .icon {
        fill: #fff;
      }
    }
    .detail-header-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 5.5rem;
      .song-name {
        color: #fff;
        font-size: 0.32rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      div {
        display: flex;
        justify-content: center;
        .author {
          color: rgb(209, 206, 206);
          font-size: 0.24rem;
        }
      }
    }
  }
  .music-detail-content {
    .m-song-disc {
      width: 100%;
      height: 9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .m-song-needle {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-10deg);
        transition: all 2s;
      }
      .m-song-needle-active {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(5deg);
        transition: all 2s;
      }
      .m-song-cover-bg {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
      }
      .m-song-cover {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: coverBg_rotate 10s linear infinite;
      }
      .cover-active {
        animation-play-state: running;
      }
      .cover-pause {
        animation-play-state: paused;
      }
      @keyframes coverBg_rotate {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
  }
  .music-detail-content-lyric {
    position: absolute;

    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    overflow: auto;
    // overflow-y: scroll;
    top: 1rem;

    .m-content-lyric-lrc {
      color: rgb(198, 194, 194);
      margin-bottom: 0.4rem;
    }
    .lrc-active {
      color: rgb(255, 255, 255);
      font-size: .4rem;
    }
  }
  .music-detail-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0.2rem;
    padding: 0.4rem;
    .m-footer-top {
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        fill: #e9e7e7df;
        width: 25px;
        height: 25px;
      }
    }
    .m-footer-content {
      height: 0.4rem;
      display: flex;
      align-items: center;
      .m-footer-progress {
        width: 100%;
      }
    }
    .m-footer-bottom {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        fill: rgba(233, 231, 231, 0.873);
        width: 40px;
        height: 40px;
      }
      & > .icon:nth-child(3) {
        width: 50px;
        height: 50px;
        fill: rgba(233, 231, 231, 0.873);
      }
    }
  }
}
</style>