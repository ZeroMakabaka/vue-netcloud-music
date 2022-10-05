<template>
  <div class="search-view">
    <SearchHeader @searchVal="getSearchList" @suggestVal="getSuggList" />
    <!-- 搜索建议 -->
    <SearchSuggest :suggList="state.suggList" v-show="state.isShowSuggest"/>
    <!-- 搜索历史 -->
    <div class="search-history" v-show="state.isShowHistory">
      <div class="s-his-header">
        <span>历史</span>
        <svg class="icon" aria-hidden="true" @click="clearHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <div class="s-his-content">
        <span
          class="s-his-item"
          v-for="(item, index) in historyList"
          :key="index"
          @click="search(item)"
          >{{ historyList[index] }}
        </span>
      </div>
    </div>
    <!-- 搜索内容 -->
    <!-- 列表 -->
    <!-- <div class="playlist-content" v-show="state.searchList.length>0">
      <div class="plist-item" v-for="(song, index) in state.searchList" :key="index">
        <div class="plist-item-left" @click="addSearchSong(song)">
          <span class="plist-xuhao">{{ index + 1 }}</span>
          <div class="plist-item-name">
            <p class="song-name">{{ song.name }}</p>
            此处要注意作者可能有多个
            <p>
              <span class="author" v-for="(item, i) in song.artists" :key="i">{{
                item.name
              }}</span>
            </p>
          </div>
        </div>
        <div class="plist-item-right">
          <svg class="icon" aria-hidden="true" v-show="song.mvid">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-dian"></use>
          </svg>
        </div>
      </div>
    </div> -->
    <SongList
      :songs="state.searchList"
      @playing="addSearchSong"
      v-show="!state.isShowSuggest"
    />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getSearchResult, getSearchSuggest } from "@/axios/api/home";
import SearchHeader from "@/components/search/SearchHeader";
import SongList from "@/components/music/SongList";
import SearchSuggest from "@/components/search/SearchSuggest";
import { onMounted, reactive, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    SearchHeader,
    SongList,
    SearchSuggest,
  },
  setup() {
    const state = reactive({
      searchVal: "", //搜索关键字
      historyList: [],
      searchList: [],
      suggList: [],
      isShowSuggest: false,
      isShowHistory: true,
    });

    const $router = useRoute();
    const store = useStore();
    onMounted(() => {
      async () => {
        // 获取搜索历史
        state.historyList = store.state.historyList;
        // state.historyList = sessionStorage.getItem("historyList", JSON.stringify(state.historyList));
        console.log(state.historyList);
      };
    });

    let historyList = computed(() => {
      return store.state.historyList;
    });
    // 获取搜索建议
    async function getSuggList(val) {
      // 搜索建议
      console.log("val", val);
      if (val == undefined || val == null || val == '') {
        state.isShowSuggest = false
        state.isShowHistory = true
        state.searchList = []
        return
      }
      state.isShowSuggest = true
      state.isShowHistory = false
      let res = await getSearchSuggest(val);
      state.suggList = res.data.result.allMatch;
      console.log("suggList", state.suggList);
    }

    //清空方法
    function clearHistory() {
      state.historyList = [];
      store.commit("clearHistoryList", store);
      //
      state.searchList = [];
    }

    async function search(word) {
      let res = await getSearchResult(word);
      console.log(res);
      state.searchList = res.data.result.songs;
    }
    function getSearchList(val) {
      // state.searchList = val;
      console.log("结果：", val);
state.isShowSuggest = false
state.isShowHistory = false
      search(val);
    }

    function addSearchSong(song) {
      store.commit("addASong", song);
      store.commit("updatePlayingIndex", store.state.playlist.length - 1);
    }

    return {
      state,
      clearHistory,
      search,
      getSearchList,
      addSearchSong,
      getSuggList,
      historyList,
    };
  },
  computed: {
    // ...mapState(["historyList"]),
  },

  methods: {},
};
</script>

<style lang="less" scoped>
// .search-view {
//     width: 100%;
//     height: 100%;
//     background-color: #707070;
// }
.search-view {
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
        display: inline-block;
      }
    }
  }
}
</style>