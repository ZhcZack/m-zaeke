<template>
  <div class="register">
    <template v-if="successMessage === ''">
      <span class="close" @click.stop="goBack"></span>
      <img src="http://www.zaeke.com/css/images/R_icon/zaeke-logo.png" alt="logo" class="l_login">
      <div class="clearfix">
        <span class="fl l_btn">注册</span>
        <span class="fr tips">
        已有账户？去<router-link to="/login" class="g_register pointer">登录</router-link>
      </span>
      </div>
      <ul>
        <li>
          <input type="text" placeholder="用户名（3-15个字符，设置后不可更改）" class="count" v-model="username">
        </li>
        <li>
          <input type="password" placeholder="密码（6-20个字符）" class="password" v-model="password">
        </li>
        <li>
          <input type="tel" placeholder="手机号码" class="phone" v-model="phoneNumber">
        </li>
        <li class="clearfix">
          <input type="text" class="verify fl" placeholder="验证码" v-model="code">
          <button class="fr getcode pointer" v-if="!getCodeLock" @click.stop="getIdentifierCode">获取验证码</button>
          <button class="fr pointer getcode countdown" v-if="getCodeLock">{{countDown}}s</button>
        </li>
      </ul>
      <p class="wrong-tip" v-html="errorMessage">{{errorMessage}}</p>
      <button class="login-button register-button pointer" @click.stop="register">注册</button>
      <p class="agree tc">
        注册视即为同意
        <router-link to="/" class="xieyi">《<span>用户协议</span>》</router-link>
      </p>
    </template>
    <template v-else>
      <div class="register-success">{{successMessage}}</div>
    </template>
  </div>
</template>

<script>
  import { checkValidPhoneNumber } from '@/lib/lib';
  import { getIdentifierCode, registerNewUser } from '@/service/register';

  export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
        phoneNumber: '',
        code: '',
        errorMessage: '&nbsp;',
        successMessage: '',
        confirmCode: '',
        getCodeLock: false,
        countDown: 60,
        countDownTimer: 0
      };
    },
    methods: {
      /**
       * 返回上一页面
       */
      goBack() {
        this.$router.history.go(-1);
      },
      /**
       * 获取验证码
       */
      getIdentifierCode() {
        if (!checkValidPhoneNumber(this.phoneNumber.trim())) {
          this.errorMessage = '手机号码格式不正确';
          return;
        }
        if (this.getCodeLock) {
          return;
        }
        this.getCodeLock = true;
        getIdentifierCode(this.phoneNumber.trim()).then(result => {
          if (result.success) {
            this.countDownTimer = setInterval(() => {
              this.countDown -= 1;
              if (this.countDown === -1) {
                this.resetCountDown();
              }
            }, 1000);
          } else {
            alert(result.message);
            this.getCodeLock = false;
          }
        });
      },
      /**
       * 用户注册
       */
      register() {
        let isValidInput = this.checkValidInput();
        if (!isValidInput) {
          return;
        }
        registerNewUser(this.username, this.password, this.phoneNumber, this.code).then(result => {
          if (result.success) {
            this.successMessage = '注册成功，即将跳转至登录页面……';
            setTimeout(() => {
              this.$router.replace('/login');
            }, 1500);
          } else {
            this.errorMessage = result.message;
          }
        });
      },
      /**
       * 检测用户输入是否符合规范
       */
      checkValidInput() {
        if (this.username.trim().length < 3 || this.username.trim().length > 15) {
          this.errorMessage = '用户名（3-15个字符）';
          return false;
        }
        if (this.password.trim().length < 6 || this.password.trim().length > 20) {
          this.errorMessage = '密码（6-20个字符）';
          return false;
        }
        if (!checkValidPhoneNumber(this.phoneNumber)) {
          this.errorMessage = '手机号码格式不正确';
          return false;
        }
        if (this.code.trim() === '' || this.code.trim() !== this.confirmCode.trim()) {
          this.errorMessage = '验证码不正确';
          return false;
        }
        return true;
      },
      resetCountDown() {
        this.countDown = 60;
        clearInterval(this.countDownTimer);
        this.getCodeLock = false;
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
      this.resetCountDown();
      next();
    }
  };
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .register {
    padding: 0 2rem;
    position: relative;
    background-color: #fff;
    margin-bottom: 2.75rem;
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
  .password,
  .phone,
  .verify,
  .getcode {
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

  .verify {
    width: 63%;
    margin-bottom: 0;
  }

  .getcode {
    width: 30%;
    color: #00e676;
    border: 1px solid #00e676;
    background-color: #fff;
    padding: 0;
  }

  .getcode.countdown {
    color: #aeaeae;
    border: none;
    background-color: #f6f6f6;
  }

  .wrong-tip {
    font-size: 0.875rem;
    color: #ff2b2b;
    letter-spacing: 0.2px;
    margin: 1rem 0;
    visibility: visible;
  }

  .register-button {
    width: 100%;
    background-color: #263238;
    height: 3.375rem;
    border: none;
    font-size: 1.125rem;
    color: #fff;
    letter-spacing: 0.26px;
  }

  .agree {
    font-size: 1rem;
    color: #464646;
    letter-spacing: 0.23px;
    margin-top: 1.5rem;
  }

  .xieyi {
    font-size: 1rem;
    color: #000;
    letter-spacing: 0.23px;
    line-height: 1.375rem;
  }

  .xieyi span {
    border-bottom: 1px solid #000;
  }

  .register-success {
    height: calc(100vh - 2.75rem - 2.75rem);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
</style>