<template>
  <div class="thumb-list">
    <ul>
      <zaeke-article :article="amass"
                     v-for="amass of amasses"
                     :key="amass.id"
                     :show-amass="true"
                     :show-user="true"></zaeke-article>
    </ul>
    <div class="tc loadmore" v-if="loadmore" @click.stop="loadMore">加载更多……</div>
    <div class="tc nomore" v-if="nomore">没有更多了～</div>
    <div class="tc none" v-if="none">暂时没有收藏文章～</div>
  </div>
</template>

<script>
  import ZaekeArticle from '@/components/global/zaeke-article'
  import { vipAmass } from '@/service/vip'

  export default {
    name: 'vip-amass',
    components: {ZaekeArticle},
    props: {
      vipID: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        amassPerPage: 10,
        pages: 0,
        amasses: [],
        loadmore: false,
        nomore: false,
        none: false
      }
    },
    created() {
      this.getAmass()
    },
    methods: {
      getAmass(skipnum = 0, length = 10) {
        vipAmass(this.vipID, skipnum, length).then(result => {
          if (result.success) {
            let newAmasses = result.amasses
            for (let amass of newAmasses) {
              this.amasses.push(amass)
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
        this.getAmass(this.pages * this.amassPerPage, this.amassPerPage)
      },
      toggleMoreNomoreNone() {
        const count = this.amasses.length
        if (count === 0) {
          this.none = true
          this.loadmore = false
          this.nomore = false
        } else if (count < this.pages * this.amassPerPage) {
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