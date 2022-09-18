<template>
  <div class="footer-music">
    <div class="footer-music-left" @click="updateIsSongDetail">
      <img :src="playlist[playingIndex].al.picUrl" alt="" />
      <span class="song-name">{{ playlist[playingIndex].name }}</span>
    </div>
    <div class="footer-music-right">
      <svg class="icon" aria-hidden="true" @click="play" v-show="!isPlaying">
        <use xlink:href="#icon-bofang" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-show="isPlaying">
        <use xlink:href="#icon-zanting" ></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playingIndex].id}.mp3`"
      ref="audio"
    ></audio>
    <van-popup v-model:show="isSongDetail" position="bottom" :style="{ height: '100%',width:'100%' }">

    </van-popup>

  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["playlist", "playingIndex","isPlaying","isSongDetail"]),
  },
  mounted() {
    console.log(this.$refs);
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsPlaying(true);
      }else {
        this.$refs.audio.pause()
        this.updateIsPlaying(false);
      }
    },
    ...mapMutations(['updateIsPlaying','updateIsSongDetail'])
  },
  watch:{
    playlist(){
      if (!this.isPlaying) {
        this.$refs.audio.autoplay = true
        this.updateIsPlaying(true)
      }
    },
    playingIndex(){
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsPlaying(true)
        
      }
    }
  }
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
    width: 70%;
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