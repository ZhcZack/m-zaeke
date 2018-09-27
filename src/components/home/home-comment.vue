<template>
  <div class="comment-list">
    <ul>
      <zaeke-comment v-for="comment of shownComments" :comment="comment" :key="comment.id"></zaeke-comment>
    </ul>
    <div class="loadmore tc" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="nomore tc" v-if="nomore">没有更多了～</div>
    <div class="none tc" v-if="none">还没有发表评论～</div>
  </div>
</template>

<script>
  import ZaekeComment     from '@/components/global/zaeke-comment'
  import { homeComments } from '@/service/home/home-comment'

  export default {
    name: 'home-comment',
    components: {
      ZaekeComment
    },
    props: {
      userID: {
        type: Number
      }
    },
    data() {
      return {
        commentsPerPage: 10,
        pages: 0,
        comments: [],
        shownComments: [],
        loadmore: false,
        nomore: false,
        none: false
      }
    },
    created() {
      this.getComments()
    },
    methods: {
      getComments() {
        homeComments(this.userID).then(result => {
          if (result.status && result.comments.length > 0) {
            this.comments = result.comments
            this.shownComments = this.comments.slice(this.pages, this.commentsPerPage)
            this.pages += 1
            if (this.comments.length > this.pages * this.commentsPerPage) {
              this.loadmore = true
              this.nomore = false
            } else {
              this.loadmore = false
              this.nomore = true
            }
          } else {
            this.none = true
          }
        })
      },
      loadMore() {
        if (this.nomore) {
          return
        }
        let newComments = this.comments.slice(
          this.pages * this.commentsPerPage,
          (this.pages + 1) * this.commentsPerPage
        )
        for (let comment of newComments) {
          this.shownComments.push(comment)
        }
        this.pages += 1
        if (this.shownComments.length >= this.comments.length) {
          this.nomore = true
          this.loadmore = false
        }
      }
    },
    computed: {}
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