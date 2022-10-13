<template>
    <div class="list-card">
        <div class="list-card-header" v-if="list.title">
            <sapn class="list-title">
                {{list.title || ''}}
            </sapn>
        </div>
        <div class="list-card-content">
            <div class="list-item" v-for="(item,i) in list.menus" :key="i">
                <div class="list-item-left">
                    <svg class="icon" aria-hidden="true">
                        <use v-bind:xlink:href=item.icon></use>
                    </svg>
                </div>
                <div class="list-item-content">
                    <div class="content-title">{{item.title}}</div>
                </div>
                <div class="list-item-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { defineComponent,reactive } from "@vue/runtime-core";

export default defineComponent({
    props:['list'],
    setup(props){

    }
})
</script>

<style lang="less" scoped>
.list-card {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: .1rem .1rem;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    .list-card-header {
        height: .6rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        .list-title {
            padding: .1rem;
            font-size: 12px;
            color: #9c9c9c;
        }
    }

    .list-card-content {
        display: flex;
        padding: 5px;
        flex-direction: column;
        .list-item {
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .list-item-left,.list-item-right {
                width: 10%;
                display: flex;
                align-items: center;
            }
            .list-item-content {
                display: flex;
                flex: 1;
                justify-content: flex-start;
                padding-left: 6px;
                align-items: center;
                .content-title {
                    font-size: .3rem;
                    letter-spacing: 1px;
                }
            }
            
        }
    }
}
</style>