<template>
    <div class="card">
        <div class="card-header" v-show="title">
            {{title}}
        </div>
        <div class="card-content">
            <slot>
                
            </slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props:['title'],
    setup(){

    }
})
</script>
<style lang="less" scoped>
.card {
    margin: .2rem;
    border: 1px solid #d2d0d0;
    background-color: #c4c0c035;
    border-radius: .2rem;
    padding: 10px;
    .card-header {
        height: .6rem;
        display: flex;
        align-items: center;
        font-size: .32rem;
        font-weight: bold;
        
    }
}
</style>