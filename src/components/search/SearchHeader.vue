<template>
  <div class="search-header">
    <div class="s-header-left">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="s-header-content">
      <van-search
        v-model="state.searchVal"
        shape="round"
        background="#707070"
        :placeholder="state.placeholder"
        class="search-box"
        @search="goSearch"
        @update:model-value="goSuggest"
      />
    </div>
    <div class="s-header-right">
      <span @click="goSearch">搜索</span>
    </div>
  </div>
</template>
<script>
import { getSearchResult, getDefaultSearch } from "@/axios/api/home";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {

  setup(props, { emit }) {
    const state = reactive({
      searchVal: "",
      searchList: [],
      placeholder: "请输入关键字",
    });
    const store = useStore();
    let historyList = computed(() => {
      return store.state.m_music.historyList;
    });

    onMounted(async () => {
      let res = await getDefaultSearch();
      state.placeholder = res.data.data.showKeyword;
    });

    // 搜索方法
    async function goSearch(val) {
      console.log("输入的value", state.searchVal);

      if (state.searchVal.trim()) {
        console.log("history", historyList);
        let res = await getSearchResult(state.searchVal);
        console.log(res);
        state.searchList = res.data.result.songs;
        store.commit("m_music/updateHistoryList", state.searchVal);
        search(state.searchVal);
        // this.$emit('searchVal',this.searchVal);
        emit("searchVal", state.searchVal);
      }
    }

    async function search(word) {
      let res = await getSearchResult(word);
      console.log(res);
      state.searchList = res.data.result.songs;
    }

    // 搜索建议
    function goSuggest() {
      console.log("searchVal", state.searchVal);
      emit("suggestVal", state.searchVal);
      // store.commit('updateSuggestVal',state.searchVal)
    }

    return {
      state,
      historyList,
      search,
      goSearch,
      goSuggest,
    };
  },
  // computed: {
  //   ...mapState(["historyList"]),
  // },
  methods: {
    // ...mapMutations(["updateHistoryList"]),
    // async goSearch(val) {
    //   console.log("输入的value", this.searchVal);
    //   if (this.searchVal.trim()) {
    //     console.log("history", this.historyList);
    //     let res = await getSearchResult(this.searchVal);
    //     console.log(res);
    //     this.searchList = res.data.result.songs;
    //     this.updateHistoryList(this.searchVal);
    //     this.search(this.searchVal);
    //     // this.$emit('searchVal',this.searchVal);
    //     this.$emit("searchVal", this.searchVal);
    //   }
    // },
    // async search(word) {
    //   let res = await getSearchResult(word);
    //   console.log(res);
    //   this.searchList = res.data.result.songs;
    // },
  },
};
</script>
<style lang="less" scoped>
.search-header {
  width: 100%;
  height: 1rem;
  display: flex;
  background-color: #707070;
  padding: 0.2rem;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  .s-header-left,
  .s-header-right {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      fill: white;
    }
    span {
      color: white;
      font-size: 0.32rem;
    }
  }
  .s-header-content {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-box {
      width: 100%;
    }
  }
}
</style>