<template>
  <div class="search-history">
    <div class="s-his-header">
      <span>历史</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="s-his-content">
      <span class="s-his-item" v-for="(item, index) in keywords" :key="index">{{
        keywords[index]
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: [],
    };
  },
  mounted() {
    this.keywords = JSON.parse(sessionStorage.getItem("searchWords")) || "";
  },
};
</script>

<style lang="less" scoped>
.search-history {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;

  .s-his-header {
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .s-his-content {
    margin-top: 0.1rem;
    .s-his-item {
      border: 1px solid #707070;
      border-radius: 10px;
      padding: 2px;
      margin: 5px;
    }
  }
}
</style>