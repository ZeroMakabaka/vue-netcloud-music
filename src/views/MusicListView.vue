<template>
    <div>
        <TopMusicList :playlist="state.playlist"/>
        <PlayList :songs="state.songs"/>
    </div>
</template>

<script>
import {useRoute,} from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicListDetail,getMusicList } from "@/axios/api/music";
import TopMusicList from '@/components/music/TopMusicList'
import PlayList from '@/components/music/PlayList'
export default {
    setup() {
        const $router = useRoute();
        const state = reactive({
            playlist: {},
            songs: []
        })
        onMounted(async() => {
            let id = $router.query.id;
            console.log(id)
            // 获取歌单信息
            let res = await getMusicListDetail(id);
            console.log('playlist',res);
            state.playlist = res.data.playlist;

            // 获取歌单列表
            let result = await getMusicList(id);
            console.log(result);
            state.songs = result.data.songs
            // 页面渲染时，子组件数据还没有拿到
            sessionStorage.setItem('playlistDetail',JSON.stringify(state))
            
            

        })
        return {state}
    },
    components: {
        TopMusicList,
        PlayList,
    }
}
</script>