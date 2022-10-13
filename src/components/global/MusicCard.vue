<template>
    <div class="music-list-card">

        <div class="m-card-content">
            <div class="m-card-content-left">
                <img :src="songlist.coverImgUrl" alt="" srcset="">
            </div>
            <div class="m-card-content-right">
                <div class="m-content-top">
                    {{songlist.name}}
                </div>
                <div class="m-content-bottom">
                    播放{{songlist.playCount}}次
                </div>
            </div>
        </div>     
    </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props:['songlist'],
    setup(props){

    }
})
</script>

<style lang="less" scoped>
.music-list-card {
    // padding: .2rem;
    height: 1rem;
    .m-card-content {
        display: flex;
        align-items: center;
        width: 100%;
             
        .m-card-content-left {
            display: flex;
            align-items: center;
            width: 1rem;
            height: 1rem;
            img {
                width: .9rem;
                height: .9rem;
                border-radius: 5px;
            }
        }
        .m-card-content-right {
            display: flex;
            flex-direction: column;
            width: 70%;
            padding-left: 5px;
            
            .m-content-top {
                font-size: .32rem;
                height: .4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                
            }
            .m-content-bottom {
                font-size: .24rem;
                height: .3rem;
                color: #6e6d6d;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>