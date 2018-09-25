<template>
  <header v-if="!hidden" id="global-header">
    <div class="clearfix top">
      <router-link to="/" class="fl">
        <img src="http://www.zaeke.com/css/images/m_zaeke_logo.png" alt="logo" class="logo">
      </router-link>
      <span style="padding: 1rem; padding-right: 0;" class="fr" @click.prevent="toggleSlide"><span
          class="bread-nav fr" :class="{close: isShownNav}"></span></span>
    </div>
    <transition name="slide-show">
      <div class="slidebox" v-show="slideShow" @click.self="toggleSlide">
        <div style="background-color: #263238;">
          <div class="search clearfix">
            <input type="text" placeholder="想要找点什么东西" class="searchbox fl" v-model="searchText">
            <span class="ico fr" @click.stop="toSearch"></span>
          </div>
        </div>
        <div class="fenlei">
          <ul class="clearfix">
            <li class="flitem tc fl">
              <router-link to="/evaluation">深度评测</router-link>
            </li>
            <li class="flitem tc fl">
              <router-link to="/lifestyle">人与生活</router-link>
            </li>
            <li class="flitem tc fl">
              <router-link to="/industry-news">行业看点</router-link>
            </li>
            <li class="flitem tc fl">
              <router-link to="/">名人堂</router-link>
            </li>
            <li class="flitem tc fl">
              <router-link to="/">知客专题</router-link>
            </li>

            <li class="flitem tc fl">
              <router-link to="/activity">知客活动</router-link>
            </li>
          </ul>
        </div>
        <div class="m_loginbtn tc clearfix">
          <template v-if="logined">
            <router-link :to="userHomePage" class="m_haslogin m_haslogincenter fl"
                         style="margin-left: 1.25rem; display: inline;">
              <img :src="userImage" alt="头像" class="avatar pointer"><span class="username pointer">{{username}}</span>
            </router-link>
            <router-link to="/" class="m_haslogin"
                         style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: inline;">
              账户设置
            </router-link>
            <a class="m_haslogin fr m_logout pointer" style="margin-right: 1.25rem; display: inline;"
               @click.self.prevent="logout">退出</a>
          </template>
          <template v-else>
            <router-link to="/login">登录</router-link>
            <i>/</i>
            <router-link to="/register">注册</router-link>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
  import { userInfo } from '@/service/user';

  export default {
    name: 'global-header',
    data() {
      return {
        searchText: ''
      };
    },
    methods: {
      toggleSlide() {
        this.$store.commit('toggleHeaderSlide');
        // log("hi");
      },
      logout() {
        this.$store.commit('logout');
      },
      /**
       * 导航至搜索页面
       */
      toSearch() {
        let keyword = this.searchText;
        this.searchText = '';
        this.$router.push({
          path: `/search/${keyword}`
        });
      }
    },
    created() {
      let bz = localStorage.getItem('bz');
      if (bz && !this.logined) {
        bz = JSON.parse(bz);
        this.$store.commit('updateAccountInfo', bz);
        userInfo(bz.account, bz.token).then(result => {
          if (result.status) {
            this.$store.commit('updateUserInfo', result.info);
          }
        });
      }
    },
    computed: {
      username() {
        return this.$store.state.userInfo.account;
      },
      authorImage() {
        return this.$store.state.userInfo.img;
      },
      hidden() {
        return this.$store.state.headerHidden;
      },
      slideShow() {
        return this.$store.state.headerSlideShow;
      },
      logined() {
        return this.$store.getters.logined;
      },
      /**
       * 导航栏是否处于下拉状态
       * @returns {boolean} 导航栏状态
       */
      isShownNav() {
        return this.$store.getters.navShown;
      },
      /**
       * 已登录用户的头像
       */
      userImage() {
        return this.$store.state.userInfo.img;
      },
      /**
       * 用户个人主页链接
       */
      userHomePage() {
        return '/home/' + this.$store.state.userInfo.id;
      }
    }
  };
</script>

<style scoped>
  header {
    font-size: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 99;
  }

  @media screen and (min-width: 769px) {
    header {
      width: 750px;
      margin: 0 auto;
    }
  }

  .top {
    height: 2.75rem;
    padding: 0 1.25rem;
    background-color: #263238;
  }

  .bread-nav {
    width: 1.125rem;
    height: 0.75rem;
    background-size: cover;
    background-image: url(http://www.zaeke.com/css/images/menu.png);
    /*margin: 1rem 0;*/
  }

  .bread-nav.close {
    width: 0.75rem;
    height: 0.75rem;
    background-size: cover;
    background-image: url("http://www.zaeke.com/css/images/close.png");
    position: relative;
    left: -0.1875rem;
    top: 0;
  }

  .logo {
    margin: 0.6875rem 0;
    width: 5.125rem;
    height: 1.25rem;
  }

  .slidebox {
    height: calc(100vh - 2.75rem);
    width: 100%;
    overflow: hidden;
    background-color: rgba(38, 50, 56, 0.6);
  }

  .slide-show-enter-active,
  .slide-show-leave-active {
    transition: all 0.5s;
  }

  .slide-show-enter,
  .slide-show-leave-to {
    height: 0;
  }

  .slide-show-enter-to,
  .slide-show-leave {
    height: 100vh;
  }

  .search {
    background-color: #fff;
    height: 2.5rem;
    margin: 0 2.5rem;
    padding-right: 0.625rem;
    font-size: 0;
  }

  .search .searchbox {
    width: calc(100% - 2.5rem);
    border: none;
    outline: none;
    font-size: 0.875rem;
    line-height: 0.875rem;
    padding: 0.625rem 1.25rem;
  }

  .search .ico {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0.625rem 0;
    background-image: url(http://www.zaeke.com/css/images/m_search.png);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .fenlei {
    border-bottom: 0.125rem solid #fff;
    background-color: #263238;
  }

  .fenlei ul {
    padding: 0.75rem 0;
  }

  .fenlei ul .flitem {
    width: 50%;
    height: 2.875rem;
    line-height: 2.875rem;
    list-style-type: none;
  }

  .fenlei ul .flitem a {
    color: #fff;
    font-size: 1rem;
    text-decoration: none;
  }

  .m_loginbtn {
    height: 3.75rem;
    line-height: 3.75rem;
    position: relative;
    background-color: #263238;
  }

  .m_loginbtn a {
    color: #fff;
    font-size: 1rem;
    display: inline;
    text-decoration: none;
  }

  .m_loginbtn i {
    color: #00e676;
    font-size: 1rem;
    margin: 0 0.625rem;
  }

  .m_loginbtn .m_haslogin .avatar {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    margin: 0.75rem 0.5rem 0.875rem 0;
    vertical-align: middle;
  }

  .m_loginbtn .m_haslogin .username {
    font-size: 0.875rem;
    color: #fff;
    letter-spacing: 0;
    max-width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
</style>
