<template>
  <div class="article-result">
    <ul>
      <template v-for="article of articles">
        <template v-if="article.type === 1">
          <zaeke-article :article="article" :key="article.id"></zaeke-article>
        </template>
        <template v-else>
          <quicknew :article="article" :key="article.id"></quicknew>
        </template>
      </template>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc none" v-if="none">没有搜索到相关文章</div>
    <div class="tc nomore" v-if="nomore">暂无更多文章</div>
  </div>
</template>

<script>
  import ZaekeArticle from '@/components/global/zaeke-article';
  import Quicknew from '@/components/global/quicknew';
  import { articles } from '@/service/search/search';
  import { log } from '@/lib/lib';
  // import { log } from '@/lib/lib';

  export default {
    name: 'search-article',
    components: {Quicknew, ZaekeArticle},
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        articles: [],
        pages: 0,
        articlesPerPage: 10,
        loadmore: false,
        nomore: false,
        none: false
      };
    },
    watch: {
      keyword: function (newValue) {
        this.articles = [];
        this.pages = 0;
        this.getArticles(newValue, 0, this.articlesPerPage);
      }
    },
    methods: {
      getArticles(keyword, skipnum, length) {
        if (keyword.trim() === '') {
          return;
        }
        articles(keyword, skipnum, length).then(result => {
          if (result.status) {
            let newArticles = result.articles;
            for (let article of newArticles) {
              this.articles.push(article);
            }

            let articlesCount = newArticles.length;
            log(articlesCount);
            if (articlesCount === 0) {
              this.none = true;
            } else if (articlesCount < this.articlesPerPage && articlesCount > 0) {
              this.nomore = true;
              this.loadmore = false;
            } else {
              this.loadmore = true;
            }

            this.$emit('updateArticlesCount', result.total);
          }
        });
      },
      loadMore() {
        this.pages += 1;
        this.getArticles(this.keyword, this.pages * this.articlesPerPage, this.articlesPerPage);
      }
    },
    created() {
      this.getArticles(this.keyword, 0, this.articlesPerPage);
    }
  };
</script>

<style scoped>
  .none {
    height: 11.5rem;
    line-height: 10.25rem;
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.71px;
  }

  .nomore {
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.71px;
    height: 3.125rem;
    line-height: 3.125rem;
  }

  .loadmore {
    height: 3.75rem;
    line-height: 3.75rem;
    background-color: #fff;
    margin-bottom: 3rem;
  }
</style>