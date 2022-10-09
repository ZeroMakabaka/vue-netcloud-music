<template>
  <div class="login">
    <div class="login-header">
      <img src="@/assets/login.png" alt="" srcset="" class="login-bg" />
    </div>
    <div class="login-content">
      <van-button
        round
        size="large"
        color="#C20C0C"
        class="lg-btn"
        @click="loginByPhone"
        >手机号登录</van-button
      >
      <van-button round size="large" color="#C20C0C" class="lg-btn" plain
        >微信登录</van-button
      >
      <p class="lg-desc">
        <van-checkbox v-model="state.isAgree" shape="square" ><span class="lg-span">服务条款、隐私政策</span></van-checkbox>
      </p>
    </div>
    <!-- 登录弹出框 -->
    <van-popup
      v-model:show="state.isShowLogin"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <LoginPopup />
    </van-popup>


    <div class="login-footer">
      <div class="lg-footer-top"></div>
      <div class="lg-footer-bottom">
        <span>登录遇到问题?</span>
      </div>
    </div>
        <!-- 服务条款 -->
    <van-popup v-model:show="state.isShowAgree" position="bottom" :style="{ height: '25%' }">
      <div class="bottom-popup">
        <div class="btm-popup-header">
          服务协议和隐私政策等指引
        </div>
        <div class="btm-popup-content">
          进入下一步前，请阅读并同意网友云音乐的《服务条款》、《隐私政策》
        </div>
        <div class="btm-popup-footer">
          <van-button color="#C20C0C" plain round type="large" class="btm-popup-btn" @click="state.isShowAgree=false">不同意</van-button>
          <van-button color="#C20C0C"  round type="large" class="btm-popup-btn" @click="login">同意并继续</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive } from "vue";
import LoginPopup from "@/components/user/LoginPopup";

export default {
  components: {
    LoginPopup,
  },
  setup() {
    const state = reactive({
      isShowLogin: false,
      isAgree : false,
      isShowAgree:false,
    });

    function loginByPhone(){
      if (state.isAgree) {
        state.isShowLogin = true;
      }else{
        state.isShowAgree = true;
      }
      
    }

    function login(){
      state.isAgree = true;
      state.isShowAgree = false;
      state.isShowLogin = true;
    }
    return {
      state,loginByPhone,login
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-header {
    height: 6rem;
    width: 100%;
    border-radius: 0 0 200px 200px/0 0 50px 50px;
    border-top: none;
    overflow: hidden;
    .login-bg {
      width: 100%;
      height: 7rem;
    }
  }
  .login-content {
    margin-top: 60px;
    width: 100%;
    // height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.9rem;
    display: flex;
    flex-direction: column;
    .lg-btn {
      margin: 5px 0;
    }
    .lg-desc {
      display: flex;
      align-items: center;
      .lg-span {
        margin-left: 10px;
        color: #b8b5b1;
        font-size: .24rem;
      }
    }
  }
  .login-footer {
    height: 1rem;
    margin-top: 50px;
    color: #b8b5b1;
  }
  .bottom-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .btm-popup-header,.btm-popup-content,.btm-popup-footer {
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .36rem;
      font-weight: bold;
    }
    .btm-popup-content {
      height: 30%;
      font-weight: 400;
      font-size: .2rem;
      padding: 0 .4rem;
    }
    .btm-popup-footer {
      height: 40%;
      justify-content: space-around;
      padding: .2rem 1rem;
      .btm-popup-btn {
        margin: 0 .2rem;
        letter-spacing: 1px;
      }
    }
  }
}
</style>