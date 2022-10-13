<template>
  <div class="glo-header" ref="header">
    <div class="header-left">
        <slot name="left">
            <svg class="icon" aria-hidden="true" @click="goBack">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
        </slot>
    </div>

    <div class="header-content">
        <slot name="content"></slot>
    </div>

    <div class="header-right">
        <slot name="right">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-dian"></use>
            </svg>
        </slot>
    </div>
    
  </div>

</template>
<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    props:['bgColor','iconColor'],
    setup({bgColor,iconColor},{slots}) {
        const router = useRouter();
        const route = useRoute();

        if (iconColor===null) {
            iconColor = '#1c1b1b'
        }
        if (bgColor===null) {
            bgColor = '#fff'
        }

        const goBack = ()=>{
            console.log(route);
            router.go('-1');
        }

        

        return {
            goBack
        }
    }
})
</script>
<style lang="less" scoped>

    .glo-header {
        display: flex;
        width: 100%;
        height: 1rem;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        background-color: v-bind(bgColor);
        
        .header-left,.header-right {
            display: flex;
            align-items: center;
            width: 1rem;
            .icon {
                fill: v-bind(iconColor) 
            }
        }
        .header-right {
           width: .6rem; 
        }
        .header-content {
            flex: 1;
            display: flex;           
            align-items: center;
        }
    }

</style>
