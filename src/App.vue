<template>
    
  <router-view/>
  <FooterMusic v-show="$store.state.m_music.isShowFooter"/>
</template>

<script>
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import Loading from '@/components/global/Loading'
import FooterMusic from '@/components/global/FooterMusic'
import {useState} from '@/utils/useState'
export default {
  comments:{
    FooterMusic,
    Loading
  },
  setup(props) {
    const appStore = useState('m_app',['isLoading']);
    return {
      ...appStore
    }
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;//这个属性设置内边距不会撑开盒子
  
}

.icon{
  width: .5rem;
  height: .5rem;
}
</style>
