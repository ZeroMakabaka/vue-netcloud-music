<template>
  <div class="playlist">
    <!-- 头部 -->
    <div class="playlist-top">
      <div class="plist-top-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部</span>
      </div>
      <div class="plist-top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quanxuan"></use>
        </svg>
      </div>
    </div>
    <!-- 列表 -->
    <div class="playlist-content">
      <div class="plist-item" v-for="(song, index) in songs" :key="index">
        <div class="plist-item-left" @click="playInList(index)">
          <span class="plist-xuhao">{{ index + 1 }}</span>
          <div class="plist-item-name">
            <p class="song-name">{{ song.name }}</p>
            <!-- 此处要注意作者可能有多个 -->
            <p>
              <span class="author" v-for="(item, i) in song.ar" :key="i">{{
                item.name
              }}</span>
            </p>
          </div>
        </div>
        <div class="plist-item-right">
          <svg class="icon" aria-hidden="true" v-show="song.mv">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-dian"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, useStore } from 'vuex';
export default {
  setup(props) {
    const store = useStore();

    function playInList(index){
      store.commit('m_music/updatePlaylist',props.songs);
      store.commit('m_music/updatePlayingIndex',index);
    }

    return {
      playInList
    }
  },
  props: ["songs"],
  // methods:{
  //   ...mapMutations(['updatePlaylist','updatePlayingIndex']),
  //   playInList(index){
  //     this.updatePlaylist(this.songs)
  //     this.updatePlayingIndex(index)
  //   }
  // }
};
</script>
<style lang="less" scoped>
.playlist {
  width: 100%;
  // height: 10rem;
  background-color: #fff;
  padding: 0.4rem 0.2rem 0;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  margin-top: 0.4rem;
  .playlist-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    .plist-top-left {
      width: 2rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .plist-top-right {
      width: 1.2rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .playlist-content {
    padding-bottom: 1.4rem;
    .plist-item {
      width: 100%;
      height: 1rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .plist-item-left {
        width: 5rem;
        display: flex;
        align-items: center;
        .plist-xuhao {
          flex: 1;
          font-size: 0.36rem;
          display: flex;
          justify-content: center;
        }
        .plist-item-name {
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

      //   .plist-item-right {
      //   }
    }
  }
}
</style>