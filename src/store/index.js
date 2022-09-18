import { createStore } from 'vuex'

export default createStore({
  state: {
    playlist: [{
      // 专辑信息
      al: {
        "id": 195454,
        "name": "All For You",
        "picUrl": "https://p2.music.126.net/QRvYAvEcmLCX1Bup4yXWyg==/881808325521842.jpg",
        "tns": [],
        "pic": 881808325521842
      },
      name: "Before You Break My Heart",
      // 歌曲id
      id: 1940312,
    }],
    // 播放下标
    playingIndex: 0,
    // 播放标识
    isPlaying: false,
    isSongDetail: false
  },
  getters: {
  },
  mutations: {
    updateIsPlaying(state,value){
      state.isPlaying = value;
    },
    updatePlaylist(state,value){
      state.playlist = value
    },
    updatePlayingIndex(state,value){
      state.playingIndex = value
    },
    updateIsSongDetail(state){
      state.isSongDetail = !state.isSongDetail
    }
  },
  actions: {
  },
  modules: {
  }
})
