<template>
  <div class="comment-list">
    <ul>
      <zaeke-comment v-for="comment of comments" :comment="comment" :key="comment.id"></zaeke-comment>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc nomore" v-if="nomore">没有更多了～</div>
    <div class="tc none" v-if="none">还没有发表过评论～</div>
  </div>
</template>

<script>
  import ZaekeComment from '@/components/global/zaeke-comment';
  import { vipComments } from '@/service/vip';

  export default {
    name: 'vip-comment',
    components: {ZaekeComment},
    props: {
      vipID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        commentsPerPage: 10,
        pages: 0,
        comments: [],
        loadmore: false,
        nomore: false,
        none: false
      };
    },
    created() {
      this.getComments();
    },
    methods: {
      getComments(skipnum = 0, length = 10) {
        vipComments(this.vipID, skipnum, length).then(result => {
          if (result.success && result.comments.length > 0) {
            let newComments = result.comments;
            for (let comment of newComments) {
              this.comments.push(comment);
            }
            this.pages += 1;
            if (this.comments.length >= this.pages * this.commentsPerPage) {
              this.loadmore = true;
              this.nomore = false;
            } else {
              this.loadmore = false;
              this.nomore = true;
            }
          } else if (this.loadmore) {
            this.loadmore = false;
            this.nomore = true;
          } else {
            this.none = true;
          }
        });
      },
      loadMore() {
        if (this.nomore) {
          return;
        }
        this.getComments(this.pages * this.commentsPerPage, this.commentsPerPage);
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