<template>
  <div class="main">
    <div class="famous-info">
      <div class="blur" :style="coverImage"></div>
      <div class="info-detail">
        <img :src="userImage" alt="头像" class="avatar">
        <p class="tc name">{{username}}</p>
        <p class="tc jianjie">{{signature}}</p>
        <p class="tc nums">{{total}}</p>
      </div>
    </div>
    <div class="mainpublish">
      <div class="tab">
        <ul class="clearfix">
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); articlesCheck=true; currentComponent = 'vip-article'"
                  :class="articlesCheck ? 'check' : ''">文章</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); commentsCheck=true; currentComponent = 'vip-comment'"
                  :class="commentsCheck ? 'check' : ''">评论</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); thumbsCheck=true; currentComponent = 'vip-thumb'"
                  :class="thumbsCheck ? 'check' : ''">点赞</span>
          </li>
          <li class="fl tc">
            <span class="pointer" @click.stop="clearCheck(); amassCheck=true; currentComponent = 'vip-amass'"
                  :class="amassCheck ? 'check' : ''">收藏</span>
          </li>
        </ul>
      </div>
    </div>
    <keep-alive>
      <component :is="currentComponent" :vipID="Number(this.id)"></component>
    </keep-alive>
  </div>
</template>

<script>
  import { vipDetail } from '@/service/user'
  import VipArticle    from '@/components/vip/vip-article'
  import VipComment    from '@/components/vip/vip-comment'
  import VipThumb      from '@/components/vip/vip-thumb'
  import VipAmass      from '@/components/vip/vip-amass'

  export default {
    name: 'vip',
    props: ['id'],
    components: {VipArticle, VipComment, VipThumb, VipAmass},
    data() {
      return {
        /**
         * VIP用户的信息
         */
        detail: {
          id: 0,
          img: '',
          cover: '',
          nickname: '',
          mark: '',
          total: 0
        },
        currentComponent: 'vip-article',
        articlesCheck: true,
        commentsCheck: false,
        thumbsCheck: false,
        amassCheck: false,
      }
    },
    methods: {
      getVipDetail(vipID) {
        vipDetail(vipID).then(result => {
          if (result.success) {
            this.detail = result.detail
          }
        })
      },
      clearCheck() {
        this.articlesCheck = false
        this.commentsCheck = false
        this.thumbsCheck = false
        this.amassCheck = false
      }
    },
    computed: {
      /**
       * 用户头像
       * @returns {string}
       */
      userImage() {
        return this.detail.img
      },
      /**
       * 用户名
       * @returns {string}
       */
      username() {
        return this.detail.nickname
      },
      /**
       * 用户签名
       * @returns {string}
       */
      signature() {
        return this.detail.mark
      },
      /**
       * 发表了多少篇文章
       * @returns {string}
       */
      total() {
        return this.detail.total > 0 ? `发表${this.detail.total}篇文章` : '还没有发表文章～'
      },
      coverImage() {
        return this.detail.cover ? {
          'background-image': `url(http://www.zaeke.com/${this.detail.cover})`
        } : {
          'background-image': 'url(http://www.zaeke.com/css/images/new-background-image.jpg)'
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getVipDetail(vm.id)
      })
    }
  }
</script>

<style scoped>
  .famous-info {
    margin: 0 auto;
    height: 22.5rem;
    position: relative;
  }

  .famous-info .blur {
    width: 100%;
    height: 22.5rem;
    background-position: center center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .info-detail {
    position: relative;
    padding-top: 2rem;
    height: 11.4375rem;
  }

  .info-detail .avatar {
    width: 6.25rem;
    height: 6.25rem;
    display: block;
    border-radius: 50%;
    margin: 0 auto 1rem;
  }

  .info-detail .name {
    font-size: 1.125rem;
    color: #fff;
    text-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5);
    letter-spacing: 0.2px;
    margin: 0.75rem 0 0.3125rem 0;
  }

  .info-detail .jianjie {
    font-size: 0.875rem;
    color: #fff;
    text-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5);
    letter-spacing: 0.2px;
    line-height: 1.25rem;
  }

  .info-detail .nums {
    font-size: 0.75rem;
    color: #fff;
    letter-spacing: 0.53px;
    margin: 4.375rem 0 0.5rem 0;
    text-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5);
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