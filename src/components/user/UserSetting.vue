<template>
  <div class="user-setting">
    <GloHeader class="header">
      <template #left>
        <img
          :src="
            userInfo.avatarUrl || require('@/assets/' + state.defaultAvatar)
          "
          alt=""
          srcset=""
          class="avatar"
        />
      </template>
      <template #content>
        <div class="content-username" @click="goUserInfo">
          {{ userInfo.nickname || "未登录" }}&nbsp;&nbsp;>
        </div>
      </template>
      <template #right>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-saomiao"></use>
        </svg>
      </template>
    </GloHeader>
    <div class="user-content">
      <ListCard :list="item" v-for="(item, index) in menuList" :key="index" />
      <van-button
        size="large"
        plain
        round
        color="#9c9c9c"
        @click="logOut"
        v-show="state.token !== null"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import ListCard from "@/components/global/ListCard.vue";
import GloHeader from "@/components/global/GloHeader";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useState } from "@/utils/useState";
import { loginOut } from "@/axios/api/home";
import { useRouter } from "vue-router";
import { Dialog } from "vant";
export default {
  components: {
    ListCard,
    GloHeader,
  },
  setup() {
    const state = reactive({
      token: localStorage.getItem("token"),
      defaultAvatar: "defaultAvatar.jpg",
    });

    const store = useStore();
    const user = useState("m_user", ["userInfo", "isLogin"]);
    const router = useRouter();

    store.dispatch("m_app/getMenuList");
    const appStore = useState("m_app", ["menuList"]);

    onMounted(() => {
      console.log(store.state.m_user.userInfo);
      console.log("menu", store.state.m_app.menuList);
    });

     function logOut() {
      Dialog.confirm({
        title: "退出登录",
        message: "是否退出当前账号？",
      })
        .then(async() => {
          let res = await loginOut();
          localStorage.removeItem("userInfo");
          localStorage.removeItem("token");
          router.go("/");
        })
        .catch(() => {
          // on cancel
        });
    }

    function goUserInfo() {
      if (state.token) {
        router.push("/userInfo");
      } else {
        router.push("/login");
      }
    }

    return {
      state,
      ...user,
      ...appStore,
      logOut,
      goUserInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.user-setting {
  width: 100%;
  height: 100%;

  .header {
    background-color: #ba1212;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }

    .content-username {
      display: flex;
      justify-content: flex-start;
      color: #fff;
      font-size: 0.32rem;
    }

    .icon {
      fill: #fff;
    }
  }
  .user-content {
    margin-top: 0.4rem;
    padding: 0 0.2rem;
  }
}
</style>