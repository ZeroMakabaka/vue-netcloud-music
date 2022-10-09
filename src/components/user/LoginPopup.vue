<template>
  <div class="login-pop">
    <div class="l-pop-header">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span class="l-pop-title">手机号登录</span>
    </div>
    <div class="l-pop-content">
      <div class="l-pop-content-top">
        <p class="l-pop-top-title">登录体验更多精彩</p>
        <p class="l-pop-top-title2">未注册手机号登录后将自动创建账号</p>
      </div>

      <div class="l-pop-footer">
        <van-form @submit="onSubmit" class="form">
          <div class="l-pop-content-phone">
            <van-cell-group inset class="l-pop-input-box">
              <van-field
                v-model="state.phone"
                label="+86"
                label-align="left"
                placeholder="请输入手机号"
                label-width=".8rem"
                class="l-pop-input"
                size="large"
                type="number"
                maxlength="11"
                name="phone"
                :rules="phoneRule"
                clearable
              />
            </van-cell-group>
          </div>
          <van-button color="#c20c0c" round size="large" native-type="submit"
            >下一步</van-button
          >
        </van-form>
        <p class="l-pop-footer-desc">找回账号</p>
      </div>
    </div>
  </div>
    <van-popup
      v-model:show="state.isConfirm"
      position="right"
      :style="{ height: '100%', width: '100%' }">
      <LoginConfirm @isConfirm="close" :phone="state.phone"/>
    </van-popup>
</template>

<script>
import { Toast } from "vant"
import { reactive } from "vue";
import LoginConfirm from '@/components/user/LoginConfirm'
import {sendCaptcha} from '@/axios/api/home'
export default {
  components:{
    LoginConfirm
  },
  setup() {
    const state = reactive({
      phone: "",
      isConfirm:false
    });
    const phoneRule = [
      {
        validator: (value) => {
          if (!/^1[3-9]\d{9}$/.test(value)) {
            Toast("请输入正确的手机格式!");
            return false;
          }
          return true;
        },
      },
    ];
    const onSubmit = (values) => {
      console.log("submit", values);
      state.isConfirm = true;
      // let res = sendCaptcha(state.phone)
      // console.log(res);
    };

    function close(val){
      state.isConfirm=val
    }
    return { state, phoneRule, onSubmit,close };
  },
};
</script>

<style lang="less" scoped>
.login-pop {
  display: flex;
  flex-direction: column;
  width: 100%;
  .l-pop-header {
    width: 100%;
    height: 1rem;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: #c20c0c;
    .icon {
      width: 25px;
      height: 25px;
      margin-right: 20px;
      fill: #fff;
    }
    .l-pop-title {
      color: #fff;
      font-size: 0.32rem;
      letter-spacing: 0.04rem;
    }
  }
  .l-pop-content {
    margin: 10px 0 20px 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .l-pop-content-top {
      .l-pop-top-title {
        font-size: 0.32rem;
        font-weight: bold;
      }
      .l-pop-top-title2 {
        font-size: 0.28rem;
        color: #9a9a9a;
      }
    }
    .l-pop-content-phone {
      margin-top: 20px;
    }
  }
  .l-pop-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 10px;
    .form {
      width: 100%;
      .l-pop-content-phone {
        width: 100%;
        margin: 30px 0;
        border-bottom: 1px solid #b4b4b4;
        display: flex;
        justify-content: flex-start;
        .l-pop-input-box {
          width: 100%;
          // height: 30px;
          display: flex;
          justify-content: flex-start;
          // align-items: center;
          border-bottom: 1px solid #b4b4b4;
          .l-pop-input {
            width: 100%;

            height: 100%;
          }
        }
      }
    }
    .l-pop-footer-desc {
      margin: 10px 0;
      color: #1477da;
      font-size: 0.24rem;
    }
  }
}
</style>