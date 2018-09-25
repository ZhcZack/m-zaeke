<template>
  <div class="main">
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-else>
      <div class="articlemain">
        <img :src="bannerImage" alt="" class="banner" v-if="isImageArticle">
        <div class="detail">
          <div class="detail-top">
            <div class="tc bigtitle">{{title}}</div>
            <div class="author">
              <div class="containerbox clearfix">
                <router-link to="/">
                  <span class="avatar fl" :style="authorImage"></span>
                  <span class="name fl">{{authorName}}</span>
                </router-link>
                <span class="fr viewer">{{views}}</span>
                <span class="fr pub-time">{{time}}</span>
              </div>
            </div>
          </div>
          <div id="doc-content" class="detail-content" v-html="content"></div>
          <div class="detail-bottom">
            <user-tags :tags="tags"></user-tags>
            <p class="tc shengming">
              <i>文章仅代表作者：{{authorName}} 个人观点，与本站立场无关</i>
            </p>
            <thumb-amass :share-obj="shareObj"></thumb-amass>
          </div>
        </div>
      </div>
    </template>
    <template v-if="this.article['q&a'] && this.article['q&a'].length > 0">
      <qa-part :qas="this.article['q&a']"></qa-part>
    </template>
  </div>
</template>

<script>
  import { articleContent } from '@/service/article/article-content';
  import { formatTime } from '@/lib/lib';
  import UserTags from '@/components/article/user-tags';
  import QaPart from '@/components/article/qa-part';
  import ThumbAmass from '@/components/article/thumb-amass';
  import Loading from '@/components/global/loading';

  export default {
    name: 'article-content',
    components: {Loading, ThumbAmass, QaPart, UserTags},
    props: ['id'],
    data() {
      return {
        article: {
          member_info: {},
          tags: [],
          user_tags: []
        }
      };
    },
    methods: {
      getArticleContent(id) {
        articleContent(id).then(result => {
          if (result) {
            this.article = result;
          }
        });
      },
      test() {

      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // vm.test();
        vm.getArticleContent(vm.id);
      });
    },
    computed: {
      /**
       * 是否在加载中
       */
      loading() {
        return this.article.tags.length === 0;
      },
      bannerImage() {
        return this.article.img;
      },
      title() {
        return this.article.title;
      },
      authorImage() {
        return `background-image: url(${this.article.member_info.img})`;
      },
      authorName() {
        return this.article.author;
      },
      views() {
        return this.article.pv;
      },
      time() {
        return formatTime(this.article.created * 1000);
      },
      content() {
        return this.article.htmlcontent;
      },
      /**
       * 文章标签
       */
      tags() {
        return this.article.tags.concat(this.article.user_tags);
      },
      /**
       * "点赞"，"收藏"数
       * @returns {{amass: number, thumb: number}}
       */
      shareObj() {
        return {
          amass: this.article.amass_count,
          thumb: this.article.thumb_count
        };
      },
      /**
       * 文章是否是"图文文章"（而不是快讯之类的）
       * @returns {boolean}
       */
      isImageArticle() {
        return this.article.type === 1;
      }
    }
  };
</script>

<style scoped>
  @import "../../lib/article.css";

  .articlemain {
    background-color: #fff;
  }

  .banner {
    width: 100%;
  }

  .bigtitle {
    font-size: 1.25rem;
    color: #363636;
    letter-spacing: 0;
    padding: 0 1.25rem;
    padding-top: 1rem;
  }

  .author {
    padding: 1.5rem 0 1rem 0;
    border-bottom: 0.125rem solid #d4d4d4;
    margin-bottom: 2rem;
    line-height: 1.75rem;
  }

  .containerbox {
    width: calc(100% - 2rem);
    margin: 0 auto;
  }

  .containerbox .avatar {
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background-size: cover;
  }

  .containerbox .name {
    font-size: 1rem;
    color: #363636;
    letter-spacing: 0;
  }

  .containerbox .viewer {
    padding-left: 1.5rem;
    background-image: url("http://www.zaeke.com/images/look.png");
    background-repeat: no-repeat;
    background-position-y: 0.5rem;
    font-size: 0.75rem;
    color: #a6a6a6;
    letter-spacing: 0;
  }

  .containerbox .pub-time {
    padding-left: 1.5rem;
    margin-right: 1.5rem;
    background-image: url("http://www.zaeke.com/images/time.png");
    background-repeat: no-repeat;
    background-position-y: 0.375rem;
    font-size: 0.75rem;
    color: #a6a6a6;
    letter-spacing: 0;
  }

  .shengming {
    border: none;
    padding: 1rem 0;
    color: #a6a6a6;
    letter-spacing: 0;
    font-size: 0.75rem;
  }
</style>