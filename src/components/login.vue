<template>
  <div class="login">
    <span class="close pointer" @click.stop="goBack"></span>
    <img src="http://www.zaeke.com/css/images/R_icon/zaeke-logo.png" alt="logo" class="l_login">
    <div class="clearfix">
      <span class="fl l_btn">登录</span>
      <span class="fr tips">
        新用户？去<router-link to="/register" class="g_register pointer">注册</router-link>
      </span>
    </div>
    <ul>
      <li>
        <input type="text" placeholder="用户名/手机号/邮箱" class="zscount count" v-model="account">
      </li>
      <li>
        <input type="password" placeholder="密码" class="zspassword password" v-model="password">
      </li>
    </ul>
    <p class="wrong-tip" v-html="errorMessage">{{errorMessage}}</p>
    <button class="login-button zslogin pointer" @click="login">登录</button>
  </div>
</template>

<script>
  import { userLogin } from '@/service/login';
  import { log } from '@/lib/lib';

  export default {
    name: 'login',
    data() {
      return {
        account: '',
        password: '',
        errorMessage: '&nbsp;'
      };
    },
    methods: {
      login() {
        if (this.account === '') {
          this.errorMessage = '请填写用户名！';
          return;
        }
        if (this.password === '') {
          this.errorMessage = '请填写密码！';
          return;
        }
        userLogin(this.account, this.password).then(result => {
          if (result.status) {
            log('hi');
            this.$router.history.go(-1);
          } else {
            this.errorMessage = result.message;
          }
        });
      },
      goBack() {
        this.$router.history.go(-1);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('hideHeader');
        vm.$store.commit('hideFooter');
        vm.$store.commit('headerSlideUp');
      });
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('showHeader');
      this.$store.commit('showFooter');
      next();
    }
  };
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .login {
    padding: 0 2rem;
    position: relative;
    background-color: #fff;
    /*top: -2.75rem;*/
    /*padding-bottom: 2.75rem;*/
  }

  .close {
    width: 1.25rem;
    height: 1.25rem;
    background-image: url("http://www.zaeke.com/css/images/R_icon/close.png");
    background-size: cover;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
  }

  .l_login {
    padding: 3rem;
    display: block;
    margin: 0 auto;
  }

  .l_btn {
    font-size: 1.25rem;
    color: #464646;
    letter-spacing: 0.4px;
    line-height: 2.25rem;
  }

  .tips {
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.3px;
    margin-top: 0.4375rem;
  }

  .tips .g_register {
    font-size: 1rem;
    color: #10cc70;
    letter-spacing: 0.2px;
    border-bottom: 1px solid #10cc70;
  }

  li {
    list-style-type: none;
    margin: 1rem 0;
  }

  .count,
  .password {
    width: 100%;
    height: 3.375rem;
    font-size: 1rem;
    color: #464646;
    letter-spacing: 0.23px;
    padding-left: 1rem;
    outline: none;
    background-color: #f6f6f6;
    border: none;
  }

  .password {
    margin: 0;
  }

  .wrong-tip {
    font-size: 0.875rem;
    color: #ff2b2b;
    letter-spacing: 0.2px;
    margin: 1rem 0;
    visibility: visible;
  }

  .login-button {
    width: 100%;
    background-color: #263238;
    height: 3.375rem;
    border: none;
    font-size: 1.125rem;
    color: #fff;
    letter-spacing: 0.26px;
  }
</style>