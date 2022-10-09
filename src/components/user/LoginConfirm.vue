<template>
  <div class="login-pop">
    <div class="l-pop-header">
      <svg class="icon" aria-hidden="true" @click="close">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span class="l-pop-title">手机号登录</span>
    </div>
    <div class="l-pop-content">
      <div class="l-pop-content-top">
        <p class="l-pop-top-title">请输入密码</p>
        <!-- <p class="l-pop-top-title2">已发送至+86 {{ formatPhone(phone,3,'****') }}</p> -->
      </div>
      <!-- 
      <div class="l-pop-footer">
        <van-form @submit="onSubmit" class="form">
          <div class="l-pop-content-phone">
            <van-cell-group inset class="l-pop-input-box">
              <van-field
                v-model="state.captcha"
                placeholder="请输入密码"
                label-width=".8rem"
                class="l-pop-input"
                size="large"
                type="number"
                maxlength="4"
                name="phone"
                clearable
              >
                <template #button>
                  <van-button color="#c20c0c" type="primary"
                    >重新发送</van-button
                  >
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <van-button color="#c20c0c" round size="large" native-type="submit"
            >下一步</van-button
          >
        </van-form>
        <p class="l-pop-footer-desc">找回账号</p>
      </div> -->
      <div class="l-pop-footer">
        <van-form @submit="onSubmit" class="form">
          <div class="l-pop-content-phone">
            <van-cell-group inset class="l-pop-input-box">
              <van-field
                v-model="state.password"
                placeholder="请输入密码"
                class="l-pop-input"
                size="large"
                type="password"
                name="password"
                clearable
              />
            </van-cell-group>
          </div>
          <van-button color="#c20c0c" round size="large" native-type="submit"
            >登录</van-button
          >
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reactive } from "vue";
import { getUserDetail} from "@/axios/api/home";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  emits: ["isConfirm"],
  props: ["phone"],
  setup(props, { emit }) {
    const state = reactive({
      password: "",
    });
    const store = useStore();
    const router = useRouter();

    async function onSubmit(values) {
      console.log("submit", values);
      let formData = {
        phone: props.phone,
        password: state.password
      };
      // console.log(formData);
      // let res = await loginByPhone(formData)
      let res = await store.dispatch('getLoginByPhone',formData);
      console.log(res);
      if (res.data.code===200) {
        store.commit('updateIsLogin',true);
        store.commit('updateToken',res.data.token);
        let result = await getUserDetail(res.data.account.id);
        console.log(result);
        router.push('/userinfo')
      }else if (res.data.code===502){
        alert(res.data.message)
        state.password = ''
      }else {
        alert('系统出错')
        state.password = ''
      }
    }
    function close() {
      emit("isConfirm", false);
    }
    return { state, onSubmit, close };
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