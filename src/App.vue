<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from '@/components/global/FooterMusic'
export default {
  comments:{
    FooterMusic,
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
