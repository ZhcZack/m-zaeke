<template>
  <div class="article-list">
    <ul>
      <template v-for="article of articles">
        <template v-if="article.type === 1">
          <zaeke-article :article="article" :show-user="true" :key="article.id"></zaeke-article>
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
  import ZaekeArticle    from '@/components/global/zaeke-article'
  import Quicknew        from '@/components/global/quicknew'
  import { vipArticles } from '@/service/vip'

  export default {
    name: 'vip-article',
    components: {Quicknew, ZaekeArticle},
    props: {
      vipID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        articlesPerPage: 10,
        pages: 0,
        articles: [],
        loadmore: false,
        nomore: false,
        none: false
      }
    },
    created() {
      this.getArticles()
    },
    methods: {
      getArticles(skipnum = 0, length = 10) {
        vipArticles(this.vipID, skipnum, length).then(result => {
          if (result.success) {
            let newArticles = result.articles
            for (let article of newArticles) {
              this.articles.push(article)
            }
            this.pages += 1
            this.toggleMoreNomoreNone()
          } else {
            this.none = true
          }
        })
      },
      loadMore() {
        if (this.nomore) {
          return
        }
        this.getArticles(this.pages * this.articlesPerPage, this.articlesPerPage)
      },
      toggleMoreNomoreNone() {
        const count = this.articles.length
        if (count === 0) {
          this.none = true
          this.loadmore = false
          this.nomore = false
        } else if (count < this.pages * this.articlesPerPage) {
          this.none = false
          this.loadmore = false
          this.nomore = true
        } else {
          this.loadmore = true
          this.nomore = false
        }
      }
    }
  }
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