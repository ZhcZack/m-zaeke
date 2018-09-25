<template>
  <div class="main">
    <div class="top-search">
      <div class="banxin">
        <div class="clearfix search-tab">
          <input type="text" class="fl search-box" placeholder="请输入关键字" v-model="inputKeyword">
          <button class="fl search-button" @click.stop="search">搜索</button>
        </div>
        <ul class="clearfix result-type">
          <li class="fl" @click.stop="clearCheck(); articlesCheck = true;">
            <span :class="articlesCheck ? 'checked' : ''">文章({{searchArticlesCount}})</span>
          </li>
          <li class="fl" @click.stop="clearCheck(); commentsCheck = true;">
            <span :class="commentsCheck ? 'checked' : ''">评论({{searchCommentsCount}})</span>
          </li>
          <li class="fl" @click.stop="clearCheck(); tagsCheck = true;">
            <span :class="tagsCheck ? 'checked' : ''">标签({{searchTagsCount}})</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix" style="margin-bottom: 1.5rem;">
      <search-article :keyword="searchKeyword"
                      @updateArticlesCount="updateArticlesCount"
                      v-show="articlesCheck"></search-article>
      <search-comment :keyword="searchKeyword"
                      @updateCommentsCount="updateCommentsCount"
                      v-show="commentsCheck"></search-comment>
      <search-tag :keyword="searchKeyword"
                  @updateTagsCount="updateTagsCount"
                  v-show="tagsCheck"></search-tag>
    </div>
  </div>
</template>

<script>
  import SearchTag from '@/components/search/search-tag';
  import SearchArticle from '@/components/search/search-article';
  import { log } from '@/lib/lib';
  import SearchComment from '@/components/search/search-comment';

  export default {
    name: 'search-result',
    components: {SearchComment, SearchArticle, SearchTag},
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        inputKeyword: '',
        searchKeyword: '',
        searchArticlesCount: 0,
        searchCommentsCount: 0,
        searchTagsCount: 0,
        articlesCheck: true,
        commentsCheck: false,
        tagsCheck: false
      };
    },
    methods: {
      /**
       * 更新标签数量
       */
      updateTagsCount(number) {
        log(number);
        this.searchTagsCount = number;
      },
      /**
       * 更新文章数量
       */
      updateArticlesCount(number) {
        this.searchArticlesCount = number;
      },
      /**
       * 更新评论数量
       */
      updateCommentsCount(number) {
        this.searchCommentsCount = number;
      },
      clearCheck() {
        this.articlesCheck = false;
        this.commentsCheck = false;
        this.tagsCheck = false;
      },
      /**
       * 路由的跳转方法（更新搜过关键字）
       */
      search() {
        this.$router.replace('/search/' + this.inputKeyword);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('headerSlideUp');
        vm.inputKeyword = vm.keyword;
        vm.searchKeyword = vm.keyword;

      });
    },
    beforeRouteUpdate(to, from, next) {
      let text = to.params.keyword; // 得到新路由路径里的关键字
      this.inputKeyword = text;
      this.searchKeyword = text;
      next();
    },
    computed: {
    }
  };
</script>

<style scoped>
  .top-search {
    background-color: #fff;
    margin-bottom: 1.5rem;
  }

  .banxin {
    margin: 0 auto;
    padding: 0;
  }

  .search-tab {
    padding: 1rem;
  }

  .search-box {
    width: calc(100% - 4.8125rem);
    height: 2.5rem;
    font-size: 1rem;
    color: #464646;
    letter-spacing: 0.23px;
    line-height: 1.75rem;
    outline: none;
    border: 1px solid #263238;
    padding-left: 1rem;
    margin-right: 0;
  }

  .search-button {
    width: 4rem;
    border: 1px solid #263238;
    border-left: none;
    height: 2.5rem;
    font-size: 1rem;
    color: #464646;
    letter-spacing: 0;
    background-color: #fff;
    outline: none;
  }

  .result-type {
    margin: 0 auto;
    width: 68%;
  }

  .result-type li {
    width: 33.333%;
    text-align: center;
    margin: 0 !important;
    list-style-type: none;
    padding-bottom: 0.625rem;
    cursor: default;
  }

  .result-type li .checked {
    color: #00e676;
    border-bottom: 0.25rem solid #00e676;
  }

  .result-type li span {
    font-size: 0.875rem;
    color: #464646;
    letter-spacing: 0;
    padding-bottom: 0.375rem;
    border-bottom: 0.25px solid transparent;
  }
</style>