<template>
  <div class="glo-header" ref="header">
    <div class="header-left">
        <slot name="left">
            <svg class="icon" aria-hidden="true">
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

export default defineComponent({
    props:['bgColor','iconColor'],
    setup(props,{slots}) {
        // if (bgColor) {
            
        // }   
    }
})
</script>
<style lang="less" scoped>
    @header-bg-color: #828282;
    @icon-color: #fff;

    .glo-header {
        display: flex;
        width: 100%;
        height: 1rem;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        background-color: @header-bg-color;
        .header-left,.header-right {
            width: .6rem;
            .icon {
                fill: @icon-color
            }
        }
        .header-content {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }

</style>
