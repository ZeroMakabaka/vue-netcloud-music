<template>
  <div class="home">
    <TopNav/>
    <TopSwiper/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
import TopSwiper from '@/components/home/TopSwiper.vue'
import IconList from '@/components/home/IconList'
import MusicList from '@/components/home/MusicList'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    TopSwiper,
    IconList,
    MusicList,

  }
}
</script>
