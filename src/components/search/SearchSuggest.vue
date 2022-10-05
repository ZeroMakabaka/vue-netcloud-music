<template>
  <div class="search-suggest-list">
    <div class="s-sug-l-item" v-for="(song, index) in suggList" :key="index">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
      <span class="item-name">{{ song.keyword }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["suggList"],
  setup(props) {
    console.log(props);
  },
};
</script>

<style lang="less" scoped>
.search-suggest-list {
  padding: 0.2rem;
  .s-sug-l-item {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    border-bottom: 1px solid #ccc;
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 0.1rem;
    }
    .item-name {
      font-size: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>