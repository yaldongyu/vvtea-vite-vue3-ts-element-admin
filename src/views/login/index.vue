<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
 <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual 
        >
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
       
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
          />
      
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
  </el-tooltip>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >Login</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any{{ capsTooltip }}</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { validUsername } from "@/utils/validate";
import { useUserStore } from "@/store/user";
import { ILoginParams } from "@/service/api/types";
export default defineComponent({
  // 已启用类型推断
  data() {
    const validateUsername = (rule: any, value: string, callback: Function) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule: any, value: string, callback: Function) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      // 设置初始值，方便登录，实际需要置为空
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,

      capsTooltip: false,
      showDialog: false,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    // 进来就让username，获取焦点，
    if (this.loginForm.username === "") {
      (this.$refs.username as HTMLInputElement).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as HTMLInputElement).focus();
    }
  },
  methods: {
    checkCapslock(e: KeyboardEvent) {
      const { key } = e;
      this.capsTooltip =
        key && key.length === 1 && key >= "A" && key <= "Z" ? true : false;
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        (this.$refs.password as HTMLInputElement).focus();
      });
    },

    handleLogin() {
      (this.$refs.loginForm as HTMLFormElement).validate(
        async (valid: boolean) => {
          if (valid) {
            this.loading = true;
            const userStore = useUserStore();
            userStore.Login(this.loginForm as ILoginParams).then((res) => {
              // console.log("2");
              // 登录成功后 this.$router.push({ path: '/' }); //登录成功之后重定向到首页
              // redirect可能是点广告连接进来的。但没权限需要先登录然后去广告处。
                console.log(userStore.getUserState);
              this.$router
                .push({
                  path: this.redirect || "/",
                  query: this.otherQuery,
                })
                .catch((err) => {
                  console.warn(err);
                });
            }).catch(err =>{
              console.log(err);
              
            });
            // Just to simulate the time of the request
            setTimeout(() => {
              this.loading = false;
            }, 0.5 * 1000);
          } else {
            return false;
          }
        }
      );
    },
  },
});
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
