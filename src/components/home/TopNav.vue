<template>
  <div class="top-nav">
    <div class="top-nav-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>

    <div class="top-nav-menu">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="top-nav-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
    
  </div>

</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
    .top-nav {
        display: flex;
        width: 100%;
        height: 1rem;
        padding: 10px;
        justify-content: space-between;
        align-items: center;

        .top-nav-menu {
            display: flex;
            width: 65%;
            height: 100%;
            justify-content: space-around;
            font-size: .36rem;
            .active{
                font-weight: 900;
            }
        }
    }

</style>