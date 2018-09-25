<template>
  <div class="thumb-list">
    <ul>
      <zaeke-article :article="thumb"
                     v-for="thumb of thumbs"
                     :key="thumb.id"
                     :show-thumb="true"
                     :show-user="true"></zaeke-article>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc nomore" v-if="nomore">没有更多了～</div>
    <div class="tc none" v-if="none">还没有点过赞哦～</div>

  </div>
</template>

<script>
  import ZaekeArticle from '@/components/global/zaeke-article';
  import { vipThumbs } from '@/service/vip';

  export default {
    name: 'vip-thumb',
    components: {ZaekeArticle},
    props: {
      vipID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        thumbsPerPage: 10,
        pages: 0,
        thumbs: [],
        loadmore: false,
        nomore: false,
        none: false
      };
    },
    created() {
      this.getThumbs();
    },
    methods: {
      getThumbs(skipnum = 0, length = 10) {
        vipThumbs(this.vipID, skipnum, length).then(result => {
          if (result.success && result.thumbs.length > 0) {
            let newThumbs = result.thumbs;
            window.console.log(newThumbs);
            for (let thumb of newThumbs) {
              this.thumbs.push(thumb);
            }
            this.pages += 1;
            if (this.thumbs.length >= this.pages * this.thumbsPerPage) {
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
        this.getThumbs(this.pages * this.thumbsPerPage, this.thumbsPerPage);
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