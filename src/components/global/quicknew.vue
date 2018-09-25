<template>
  <li class="article quicknew">
    <div class="greentitle">
      ZAEKE 快讯<span class="fr time">{{time}}</span>
    </div>
    <router-link :to="articleLink">
      <div class="clearfix">
        <div class="fl q_title etc">{{title}}</div>
      </div>
    </router-link>
  </li>
</template>

<script>
  import { formatTime } from '@/lib/lib';

  export default {
    props: ['article'],
    name: 'quicknew',
    computed: {
      time() {
        return formatTime(this.article.time * 1000);
      },
      articleLink() {
        return '/article/' + this.article.articleID;
      },
      title() {
        return this.article.title;
      }
    }
  };
</script>

<style scoped>
  .article {
    border-radius: 0;
    padding: 1rem;
    width: 100%;
    margin-bottom: 1.625rem;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    text-align: left;
    text-decoration: none;
  }

  .article .greentitle {
    font-size: 0.75rem;
    color: #00e676;
    line-height: 1.125rem;
  }

  .article .time {
    font-size: 0.75rem;
    color: #a6a6a6;
    padding-left: 1.5rem;
    background-image: url(http://www.zaeke.com/css/images/time.png);
    background-repeat: no-repeat;
  }

  .fr {
    float: right;
  }

  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  .article > a {
    text-decoration: none;
  }

  .article .q_title {
    font-size: 1.125rem;
    width: 100%;
    color: #464646;
    line-height: 2.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
