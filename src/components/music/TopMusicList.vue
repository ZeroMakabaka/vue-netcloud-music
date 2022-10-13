<template>
  <div class="music-list-header">
    <div class="music-list-top">
      <!-- 背景模糊 -->
      <img :src="playlist.coverImgUrl" alt="" class="music-top-bg" />
      <div class="music-top-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="music-top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>
    </div>
    <!-- 歌单详情栏 -->
    <div class="music-list-content">
      <div class="list-content-left">
        <img :src="playlist.coverImgUrl" alt="" />
        <span class="play-count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang-copy"></use>
          </svg>
          {{ formatPlayCount(playlist.playCount) }}
        </span>
      </div>
      <div class="list-content-right">
        <div class="list-name">{{ playlist.name }}</div>
        <div class="author">
          <van-image
            round
            width=".5rem"
            height=".5rem"
            :src="playlist.creator.avatarUrl"
          />&nbsp;&nbsp;{{ playlist.creator.nickname }}&nbsp;>
        </div>
        <div class="description">{{ playlist.description }}</div>
      </div>
    </div>
    <!-- 歌单菜单栏 -->
    <div class="music-list-bottom">
      <div class="list-bottom-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span>{{playlist.trackCount}}</span>
      </div>
      <div class="list-bottom-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="list-bottom-nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    console.log(props);
    if ((props.playlist.creator = "")) {
      props.playlist = JSON.parse(
        sessionStorage.getItem("playlistDeatil").playlist
      );
    }

        // 处理播放量
    function formatPlayCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + " 亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + " 万";
      }
    }
    return {formatPlayCount}
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.music-list-header {
  padding: 0.2rem;
  position: relative;
  .music-list-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;

    .music-top-left,
    .music-top-right {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.4rem;
        color: white;
      }
      .icon {
        fill: white; // fill填充svg颜色
      }
    }
    .music-top-bg {
      width: 100%;
      height: 8rem;
      position: fixed;
      z-index: -1;
      filter: blur(30px);
    }
  }
  .music-list-content {
    width: 100%;
    height: 4rem;
    padding: 0.2rem;
    display: flex;
    align-items: flex-start;
    .list-content-left {
      position: relative;
      img {
        width: 3rem;
        border-radius: 0.2rem;
      }
      .play-count {
        display: flex;
        align-items: center;
        padding: .1rem;
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
    .list-content-right {
      height: 2.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 0.4rem;
      .list-name {
        color: white;
        font-size: 0.32rem;
        margin-bottom: 0.3rem;
      }
      .author {
        color: white;
        display: flex;
        margin-bottom: 0.3rem;
      }
      .description {
        color: white;
        height: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .music-list-bottom {
    position: absolute;
    left: 50%;
    bottom: -15%;
    transform: translateX(-50%);
   
    width: 75%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color: gray;
    .list-bottom-nav {
      // width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 0.32rem;
      flex: 1;
      border-right: solid 1px rgb(203, 200, 200);
      &:last-child {
        border-right: none;
      }
      .icon {
        fill: white;
      }
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>