<template>
  <div class="main clearfix">
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-else>
      <ul>
        <template v-for="article of articles">
          <template v-if="article.type === 1">
            <zaeke-article :article="article" show-user="true" :key="article.id">
            </zaeke-article>
          </template>
          <template v-else>
            <quicknew :article="article" :key="article.id"></quicknew>
          </template>
        </template>
      </ul>
      <div class="tc pointer loadmore" v-if="more" @click.prevent="loadmore">加载更多……</div>
      <div class="tc pointer nomore" v-if="nomore">没有更多了～</div>
    </template>
  </div>
</template>

<script>
  import { index } from '@/service/index-page';
  import ZaekeArticle from '@/components/global/zaeke-article.vue';
  import Quicknew from '@/components/global/quicknew.vue';
  import Loading from '@/components/global/loading';

  export default {
    name: 'index-page',
    components: {Loading, Quicknew, ZaekeArticle},
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
        index(this.skipnum).then(articles => {
          if (articles) {
            if (articles.length < this.length) {
              this.nomore = true;
              this.more = false;
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
        index(vm.skipnum).then(articles => {
          if (articles) {
            vm.more = true;
            for (let article of articles) {
              vm.articles.push(article);
            }
          }
        });
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
