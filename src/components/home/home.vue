<template>
  <div class="main">
    <div class="info-detail">
      <img :src="userImage" alt="头像" class="avatar">
      <p class="tc name">{{username}}</p>
      <p class="tc jianjie">{{signature}}</p>
    </div>
    <div class="mainpublish">
      <div class="tab">
        <ul class="clearfix">
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); articlesCheck=true; currentComponent = 'home-article'"
                  :class="articlesCheck ? 'check' : ''">文章</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); commentsCheck=true; currentComponent = 'home-comment'"
                  :class="commentsCheck ? 'check' : ''">评论</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); thumbsCheck=true; currentComponent = 'home-thumb'"
                  :class="thumbsCheck ? 'check' : ''">点赞</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); amassCheck=true; currentComponent = 'home-amass'"
                  :class="amassCheck ? 'check' : ''">收藏</span>
          </li>
        </ul>
      </div>
      <keep-alive>
        <component :is="currentComponent" :userID="Number(this.id)"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { userDetail, userLevel } from '@/service/user';
  import HomeArticle from '@/components/home/home-article';
  import HomeComment from '@/components/home/home-comment';
  import HomeThumb from '@/components/home/home-thumb';
  import HomeAmass from '@/components/home/home-amass';

  export default {
    name: 'home',
    components: {
      HomeArticle,
      HomeComment,
      HomeThumb,
      HomeAmass
    },
    props: ['id'],
    data() {
      return {
        detail: {
          id: 0,
          img: '',
          nickname: '',
          mark: ''
        },
        currentComponent: 'home-article',
        articlesCheck: true,
        commentsCheck: false,
        thumbsCheck: false,
        amassCheck: false,
        userType: 0
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('headerSlideUp');
        vm.checkUserLevel(vm.id);
      });
    },
    methods: {
      /**
       * 判断用户类型
       * @param userID 用户ID
       */
      checkUserLevel(userID) {
        userLevel(userID).then(result => {
          if (result.status) {
            if (result.level === 3) {
              // 跳转到名人堂
              this.$router.replace('/vip/' + userID);
            } else {
              this.getUserDetail(userID);
            }
          }
        });
      },
      getUserDetail(id) {
        userDetail(id).then(result => {
          if (result.status) {
            this.detail.id = result.detail.id;
            this.detail.img = result.detail.img;
            this.detail.nickname = result.detail.nickname;
            this.detail.mark = result.detail.mark;
          }
        });
      },
      clearCheck() {
        this.articlesCheck = false;
        this.commentsCheck = false;
        this.thumbsCheck = false;
        this.amassCheck = false;
      }
    },
    computed: {
      userImage() {
        return this.detail.img;
      },
      username() {
        return this.detail.nickname;
      },
      signature() {
        return this.detail.mark;
      },
    }
  };
</script>

<style scoped>
  .info-detail {
    position: relative;
    background-color: #fff;
    padding-top: 2rem;
    height: 11.4375rem;
  }

  .info-detail .avatar {
    width: 3.75rem;
    height: 3.75rem;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
  }

  .info-detail .name {
    font-size: 1rem;
    color: #464646;
    letter-spacing: 0.2px;
    margin: 0.75rem 0 0.3125rem 0;
  }

  .info-detail .jianjie {
    font-size: 0.75rem;
    color: #a6a6a6;
    letter-spacing: 0.2px;
    line-height: 1.25rem;
  }

  .tab {
    margin-bottom: 1.5rem;
    position: relative;
  }

  .tab li {
    width: 25%;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #fff;
    font-size: 0.875rem;
    color: #464646;
    letter-spacing: 0;
    list-style-type: none;
  }

  .tab .check {
    color: #00e676;
    padding-bottom: 0.4375rem;
    border-bottom: 0.25rem solid #00e676;
  }
</style>