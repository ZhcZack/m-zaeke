<template>
  <div class="comment-result">
    <ul>
      <zaeke-comment :comment="comment" v-for="comment of comments" :key="comment.id" :user-link="true"></zaeke-comment>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc none" v-if="none">没有搜索到相关文章</div>
    <div class="tc nomore" v-if="nomore">暂无更多文章</div>
  </div>
</template>

<script>
  import ZaekeComment from '@/components/global/zaeke-comment';
  import { comments } from '@/service/search/search';
  import { log } from '@/lib/lib';

  export default {
    name: 'search-comment',
    components: {ZaekeComment},
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        comments: [],
        pages: 0,
        commentsPerPage: 10,
        loadmore: false,
        nomore: false,
        none: false
      };
    },
    watch: {
      keyword: function (newValue) {
        this.comments = [];
        this.pages = 0;
        this.getComments(newValue, 0, this.commentsPerPage);
      }
    },
    methods: {
      getComments(keyword, skipnum, length) {
        if (keyword.trim() === '') {
          return;
        }
        comments(keyword, skipnum, length).then(result => {
          if (result.status) {
            let newComments = result.comments;
            for (let comment of newComments) {
              this.comments.push(comment);
            }

            let commentCount = newComments.length;
            log(commentCount);
            if (commentCount === 0) {
              this.none = true;
            } else if (commentCount < this.commentsPerPage && commentCount > 0) {
              this.nomore = true;
              this.loadmore = false;
            } else {
              this.loadmore = true;
            }

            this.$emit('updateCommentsCount', result.total);
          }
        });
      },
      loadMore() {
        this.pages += 1;
        this.getComments(this.keyword, this.pages * this.commentsPerPage, this.commentsPerPage);
      }
    },
    created() {
      this.getComments(this.keyword, 0, this.commentsPerPage);
    }
  };
</script>

<style scoped>

</style>