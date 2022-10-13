<template>
  <div class="top-nav">
    <div class="top-nav-left">
      <svg class="icon" aria-hidden="true" @click="state.isShowSetting=true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>

    <div class="top-nav-menu">
      <span @click="$router.push('/userinfo')">我的</span>
      <span >发现</span>
      <span >云村</span>
      <span  @click="$router.push('/vedio')">视频</span>
    </div>

    <div class="top-nav-right">
      <svg class="icon" aria-hidden="true" @click="$router.push({name:'Search'})">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
    </div>

    <van-popup v-model:show="state.isShowSetting" position="left" :style="{ height:'100%',width: '80%' }" >
        <UserSetting/>
    </van-popup>

    
  </div>

</template>

<script>
import { reactive } from 'vue'
import UserSetting from '@/components/user/UserSetting'
export default {
  name: "TopNav",
  components:{
    UserSetting
  },
  setup(props) {
    const state = reactive({
      isShowSetting: false
    })

    return {
      state
    }
  }
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