<template>
  <div class="userinfo">
    <GloHeader class="header" :iconColor="state.iconColor" :bgColor="state.bgColor">
      <template #left>
        <div>
          <svg class="icon" aria-hidden="true" @click="router.push('/')">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        </div>
      </template>
    </GloHeader>
    <Card :title="state.userCardTitle">
      <div class="userinfo-box">
        <p>村龄：<span>{{state.createTime.age}}年（{{state.createTime.create}}注册）</span></p>
        <p>性别：<span>{{state.gender}}</span></p>
        <p>地区：</p>
        <p>个人简介：<span>{{state.signature}}</span></p>
      </div>
    </Card>
    <Card :title="state.title">
      <MusicCard :songlist="item" v-for="(item,i) in state.playlist" :key="i" />
    </Card>

    
  </div>
</template>

<script>
import GloHeader from "@/components/global/GloHeader.vue";
import MusicCard from '@/components/global/MusicCard';
import Card from '@/components/global/Card'
import { useRouter } from 'vue-router';
import { getUserMusicList } from "@/axios/api/music";
import { computed, onMounted, reactive } from '@vue/runtime-core';
import { formatTime,formatGender } from "@/utils/index";
export default {
  components: {
    GloHeader,
    MusicCard,
    Card
  },
  setup(){
    const router = useRouter();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const state = reactive({
      playlist: [],
      title: '我的歌单',
      userCardTitle: '基本信息',
      createTime: formatTime(userInfo.createTime),
      gender: formatGender(userInfo.gender),
      signature: userInfo.signature,
      iconColor: '#fff',
      bgColor: '#ba1212'

    })
  
    onMounted(async()=>{
      let res = await getUserMusicList(userInfo.userId);
      console.log(res);
      state.playlist = res.data.playlist
    })

    return {
        router,
        state,
    }
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  .header {
    // background: #ba1212;
    .icon {
      fill: #fff;
    }

  }
  .userinfo-content{
  margin: 10px;
  border: 1px solid #6d6d6d;
  border-radius: .2rem;

}
}
</style>