<template>
  <div class="footer-music">
    <div class="footer-music-left" @click="store.commit('m_music/updateIsSongDetail')">
      <img :src="playlist[playingIndex].al.picUrl" alt="" />
    </div>
    <div class="footer-music-content" @click="store.commit('m_music/updateIsSongDetail')">
      <span class="song-name">{{
        playlist[playingIndex].name
      }}</span>
    </div>
    <div class="footer-music-right">
      <svg
        class="icon"
        aria-hidden="true"
        @click="play"
        v-show="!isPlaying"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        @click="play"
        v-show="isPlaying"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${
        playlist[playingIndex].id
      }.mp3`"
      ref="audio"
    ></audio>
    <!-- 歌曲详情播放页 -->
    <van-popup
      v-model:show="isSongDetail"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musiclist="playlist[playingIndex]"
        :play="play"
        :isPlaying="isPlaying"
        :getDuration="getDuration"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState, useStore } from "vuex";
import MusicDetail from "@/components/music/MusicDetail";
import { computed, onUpdated, ref, watch, onMounted, reactive } from "vue";
import {useState} from '@/utils/useState'
import {useActions} from '@/utils/useActions'
export default {
  setup() {
    const store = useStore();
    const audio = ref(null);
    const state = useState('m_music',['playlist','playingIndex','isPlaying','isSongDetail','currentTime','duration']);
    

    onMounted(() => {
      console.log(audio);
      console.log(state.playingIndex.value);
      console.log(state.playlist.value[state.playingIndex.value]);
      getCurrentTime();
    });
    // 播放方法
    function play() {
      if (audio.value.paused) {
        console.log('音乐开启');
        audio.value.play();
        store.commit("m_music/updateIsPlaying", true);
      } else {
        console.log('音乐暂停');
        audio.value.pause();
        store.commit("m_music/updateIsPlaying", false);
      }
    };

    function getCurrentTime() {
      audio.value.addEventListener(
        "timeupdate",
        (e) => {
          store.commit("m_music/updateCurrentTime", audio.value.currentTime);
          // console.log(this.currentTime);
        },
        false
      );
    };
    function getDuration() {
      // this.updateDuration(audio.duration);
      store.commit("m_music/updateDuration", audio.value.duration);
    }

    onUpdated(() => {
      store.dispatch("m_music/getLyric", state.playlist.value[state.playingIndex.value].id);
      getDuration(audio.value.duration);
    });

    watch(state.playlist, (newValue, oldValue) => {
      console.log('音乐在变化');
      if (!state.isPlaying) {
        audio.value.autoplay = true;
        store.commit("m_music/updateIsPlaying", true);
      }
    });

    watch(state.playingIndex, () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        // this.updateIsPlaying(true);
        store.commit("m_music/updateIsPlaying", true);
      }
    });

    return {
      ...state,
      store,
      audio,
      play,
      getDuration,
    };
  },

  methods: {
    // play() {
    //   if (this.$refs.audio.paused) {
    //     this.$refs.audio.play();
    //     this.updateIsPlaying(true);
    //   } else {
    //     this.$refs.audio.pause();
    //     this.updateIsPlaying(false);
    //   }
    // },
    // ...mapMutations(["updateIsPlaying", "updateIsSongDetail","updateCurrentTime","updateDuration"]),
    // getCurrentTime() {
    //   this.$refs.audio.addEventListener("timeupdate", (e) => {
    //       this.updateCurrentTime(this.$refs.audio.currentTime)
    //       // console.log(this.currentTime);
    //     },
    //     false
    //   );
    // },
    // getDuration() {
    //   this.updateDuration(this.$refs.audio.duration);
    // },
  },
  updated() {
    // this.$store.dispatch("getLyric", this.playlist[this.playingIndex].id);
    // this.getDuration(this.$refs.audio.duration);
  },
  watch: {
    // playlist() {
    //   if (!this.isPlaying) {
    //     this.$refs.audio.autoplay = true;
    //     this.updateIsPlaying(true);
    //   }
    // },
    // playingIndex() {
    //   this.$refs.audio.autoplay = true;
    //   if (this.$refs.audio.paused) {
    //     this.updateIsPlaying(true);
    //   }
    // },
  },
  components: {
    MusicDetail,
  },
};
</script>
<style lang="less" scoped>
.footer-music {
  width: 100%;
  height: 1.4rem;
  border-top: 1px solid #999;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
  .footer-music-left {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
    }
  }
  .footer-music-content {
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    width: 65%;
    .song-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .footer-music-right {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>