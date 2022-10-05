<template>
  <!-- 歌曲列表 -->
  <div class="songlist">
    <div class="slist-item" v-for="(song, index) in songs" :key="index">
      <div class="slist-item-left" @click="play(song)">
        <span class="slist-xuhao">{{ index + 1 }}</span>
        <div class="slist-item-name">
          <p class="song-name">{{ song.name }}</p>
          <!-- 此处要注意作者可能有多个 -->
          <p>
            <span class="author" v-for="(item, i) in song.ar" :key="i">{{
              item.name
            }}</span>
          </p>
        </div>
      </div>
      <div class="slist-item-right">
        <svg class="icon" aria-hidden="true" v-show="song.mv">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-dian"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["songs"],
  emits: ["playing"],
  setup(props, context) {
    // const songs =
    console.log(props);

    const play = (song) => {

      // debugger
      // if (!song.al) {
      //         console.log("执行子组件", song);
      //   song.al = song.album;
      //   song.al.picUrl = song.album.artist.img1v1Url;
      // }
      context.emit("playing", song);
      // playInList(song);
    };

    return {
      play,
    };
  },
});
</script>
<style lang="less" scoped>
.songlist {
  padding-bottom: 1.4rem;
  .slist-item {
    width: 100%;
    height: 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .slist-item-left {
      width: 5rem;
      display: flex;
      align-items: center;
      .slist-xuhao {
        flex: 1;
        font-size: 0.36rem;
        display: flex;
        justify-content: center;
      }
      .slist-item-name {
        width: 4.2rem;

        .song-name {
          font-size: 0.36rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .author {
            color: rgb(126, 125, 125);
          }
        }
      }
    }
  }
}
</style>