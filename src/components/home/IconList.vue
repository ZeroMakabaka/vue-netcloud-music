<template>
  <div class="icon-list">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日体检</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai"></use>
      </svg>
      <span>私人电台</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-daochu1024-02"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "IconList",
}
</script>

<style lang="less" scoped>
    .icon-list {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon-item {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon {
                width: 1rem;
                height: 1rem;
                margin: 10px 0 0 0;
            }
        }
    }
</style>