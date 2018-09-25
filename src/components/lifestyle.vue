<template>
  <!--人与生活-->
  <div class="main clearfix">
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-else>
      <ul>
        <template v-for="article of articles">
          <zaeke-article :article="article" :key="article.id"></zaeke-article>
        </template>
      </ul>
      <div class="tc pointer loadmore" v-if="more" @click.prevent="loadmore">加载更多……</div>
      <div class="tc pointer nomore" v-if="nomore">没有更多了～</div>
    </template>
  </div>
</template>

<script>
  import ZaekeArticle from '@/components/global/zaeke-article.vue';
  import { lifestyleArticles } from '@/service/lifestyle';
  import Loading from '@/components/global/loading';

  export default {
    name: 'lifestyle',
    components: {
      Loading,
      ZaekeArticle
    },
    data() {
      return {
        skipnum: 0,
        length: 10,
        articles: [],
        more: false,
        nomore: false
      };
    },
    methods: {
      loadmore() {
        this.skipnum += 10;
        this.getArticles(this.skipnum);
      },
      getArticles(skipnum, length = 10) {
        lifestyleArticles(this.skipnum, length).then(articles => {
          if (articles) {
            this.more = true;
            if (articles.length < this.length) {
              this.more = false;
              this.nomore = true;
            }
            for (let article of articles) {
              this.articles.push(article);
            }
          }
        });
      }
    },
    computed: {
      loading() {
        return this.articles.length === 0;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('headerSlideUp');
        vm.getArticles(vm.skipnum);
      });
    }
  };
</script>

<style scoped>
  .loadmore,
  .nomore {
    color: #767676;
    font-size: 0.875rem;
    height: 3.75rem;
    line-height: 3.75rem;
    background-color: #fff;
    margin-bottom: 3rem;
  }
</style>