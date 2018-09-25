<template>
  <div class="article-list">
    <ul>
      <template v-for="article of shownArticles">
        <template v-if="article.type === 1">
          <zaeke-article :article="article" :key="article.id"></zaeke-article>
        </template>
        <template v-else>
          <quicknew :article="article" :key="article.id"></quicknew>
        </template>
      </template>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc nomore" v-if="nomore">没有更多了～</div>
    <div class="tc none" v-if="none">还没有发表过文章～</div>
  </div>
</template>

<script>
  import ZaekeArticle from '@/components/global/zaeke-article';
  import { homeArticles } from '@/service/home/home-article';
  import Quicknew from '@/components/global/quicknew';

  export default {
    name: 'home-article',
    components: {Quicknew, ZaekeArticle},
    props: {
      userID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        articlesPerPage: 10,
        pages: 0,
        articles: [],
        shownArticles: [],
        loadmore: false,
        nomore: false,
        none: false
      };
    },
    created() {
      this.getArticles();
    },
    methods: {
      getArticles: function () {
        homeArticles(this.userID).then(result => {
          if (result.status && result.articles.length > 0) {
            this.articles = result.articles;
            this.shownArticles = this.articles.slice(this.pages, this.articlesPerPage);
            this.pages += 1;
            if (this.articles.length > this.pages * this.articlesPerPage) {
              this.loadmore = true;
              this.nomore = false;
            } else {
              this.loadmore = false;
              this.nomore = true;
            }
          } else {
            this.none = true;
          }
        });
      },
      loadMore() {
        if (this.nomore) {
          return;
        }
        let newArticles = this.articles.slice(
          this.pages * this.articlesPerPage,
          (this.pages + 1) * this.articlesPerPage
        );
        for (let article of newArticles) {
          this.shownArticles.push(article);
        }
        this.pages += 1;
        if (this.shownArticles.length >= this.articles) {
          this.nomore = true;
          this.loadmore = false;
        }
      }
    }
  };
</script>

<style scoped>
  .loadmore {
    height: 3.75rem;
    line-height: 3.75rem;
    background-color: #fff;
    margin-bottom: 3rem;
  }

  .nomore {
    height: 7.735rem;
    line-height: 7.735rem;
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.71px;
  }

  .none {
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.71px;
    height: 15rem;
    line-height: 15rem;
    background-color: #fff;
    margin: 1.5rem 0;
  }
</style>