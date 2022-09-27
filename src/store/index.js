import { createStore } from 'vuex'
import { getMusicLyric } from '@/axios/api/music';

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
    isSongDetail: false,
    lyrics:{},
    // 当前时间
    currentTime: 0,
    duration: 0,
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
    },
    updateLyrics(state,value){
      state.lyrics = value
    },
    updateCurrentTime(state,value){
      state.currentTime = value
    },
    updateDuration(state,value){
      state.duration = value
    }
  },
  actions: {
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      context.commit('updateLyrics',res.data.lrc)
    }
  },
  modules: {
  }
})
