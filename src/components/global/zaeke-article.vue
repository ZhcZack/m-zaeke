<template>
  <li class="article">
    <div class="clearfix m_top" v-if="showUser">
      <router-link :to="authorLink">
        <img :src="authorImage" alt="头像" class="m_pic fl">
        <span class="m_author fl">{{username}}</span>
        <slot></slot>
      </router-link>
    </div>
    <router-link :to="articleLink">
      <img :src="coverImage" alt="文章封面图" class="cover">
    </router-link>
    <span class="thumb" v-if="showThumb"></span>
    <span class="amass" v-if="showAmass"></span>
    <router-link :to="articleLink">
      <div class="title etc">{{title}}</div>
      <p class="describe">{{description}}</p>
    </router-link>
    <div class="clearfix viewers">
      <span class="fl font time">{{time}}</span>
      <span class="fr font comment">{{comments}}</span>
      <span class="fr font views">{{views}}</span>
    </div>
  </li>
</template>

<script>
  import { formatTime } from '@/lib/lib';

  export default {
    name: 'zaeke-article',
    props: ['article', 'showUser', 'showThumb', 'showAmass'],
    computed: {
      authorImage() {
        return this.article.authorImage;
      },
      username() {
        return this.article.authorName;
      },
      coverImage() {
        return this.article.coverImage;
      },
      title() {
        return this.article.title;
      },
      description() {
        return this.article.description;
      },
      time() {
        return formatTime(this.article.time * 1000);
      },
      comments() {
        return this.article.comments;
      },
      views() {
        return this.article.views;
      },
      articleID() {
        return this.article.articleID;
      },
      authorID() {
        return this.article.authorID;
      },
      /**
       * 文章链接
       * @returns {string}
       */
      articleLink() {
        return '/article/' + this.articleID;
      },
      /**
       * 作者链接
       * @returns {string}
       */
      authorLink() {
        return '/home/' + this.authorID;
      }
    }
  };
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .article {
    width: 100%;
    margin-bottom: 1.625rem;
    background-color: #fff;
    overflow: hidden;
    list-style-type: none;
    position: relative;
  }

  .m_top {
    display: block;
    padding: 0.5rem 1rem;
  }

  .m_top .m_pic {
    width: 2.25rem;
    height: 2.25rem;
    background-size: cover;

    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .m_top .m_author {
    font-size: 0.875rem;
    color: #a6a6a6;
    line-height: 2.25rem;
    height: 2.25rem;
    background-color: #fff;
  }

  .m_top .m_more {
    font-size: 1rem;
    color: #00e676;
    height: 2.25rem;
    line-height: 2.25rem;
  }

  .cover {
    width: 100%;
    height: auto;
    background-image: url("http://www.zaeke.com/css/images/zaeke_article_default.jpg");
    max-height: 17.5rem;

  }

  .title {
    font-size: 1.125rem;
    color: #333;
    line-height: 2.25rem;
    padding: 0.75rem 1rem 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .describe {
    font-size: 0.875rem;
    color: #767676;
    padding: 0 1rem;
    margin: 0.25rem 0 1rem 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }

  .viewers {
    padding: 0 1rem 1rem;
  }

  .viewers .time {
    padding-left: 1.5rem;
    background-image: url(../../assets/time.png);
    background-repeat: no-repeat;
  }

  .viewers .comment {
    padding-left: 1.25rem;
    background-image: url(../../assets/pinglun2.png);
    background-repeat: no-repeat;
    background-position-y: 2.5px;
  }

  .viewers .views {
    padding-left: 1.25rem;
    background-image: url(../../assets/look.png);
    background-repeat: no-repeat;
    background-position-y: 2.5px;
    margin-right: 1rem;
  }

  .font {
    font-size: 0.75rem;
    color: #a6a6a6;
    line-height: 1.125rem;
  }

  .thumb,
  .amass {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    background-size: cover;
    background-image: url(../../assets/cool.png);
  }

  .amass {
    background-image: url(../../assets/shoucang.png);
  }
</style>