<template>
  <div class="main">
    <div class="main-title">
      <img src="http://www.zaeke.com/css/images/zaeke-special-list.jpg" alt="知客活动">
    </div>
    <div class="speciallist">
      <ul>
        <activity-live v-for="live of lives" :key="live.id" :live="live"/>
      </ul>
    </div>
    <div class="loadmore tc" v-if="more" @click.prevent="loadMore">加载更多……</div>
    <div class="nomore tc" v-if="nomore">没有更多了～</div>
  </div>
</template>

<script>
  import ActivityLive      from '@/components/activity-live'
  import { getActivities } from '@/service/activity'

  export default {
    name: 'activity',
    components: {ActivityLive},
    data() {
      return {
        lives: [],
        skipnum: 0,
        length: 12,
        more: false,
        nomore: false
      }
    },
    methods: {
      getLives(length) {
        getActivities(this.skipnum, length).then(result => {
          if (result) {
            this.skipnum += this.length
            if (result.length < this.length) {
              this.nomore = true
              this.more = false
            } else {
              this.more = true
            }
            for (let item of result) {
              this.lives.push(item)
            }
          }
        })
      },
      loadMore() {
        this.getLives(this.length)
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('headerSlideUp')
        vm.getLives(vm.length)
      })
    }
  }
</script>

<style scoped>
  .main-title {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    overflow: hidden;
  }

  .main-title img {
    width: auto;
    height: 15.625rem;
  }

  .speciallist {
    margin: 0 1rem;
  }

  .loadmore {
    height: 3.75rem;
    color: #767676;
    line-height: 3.75rem;
    background-color: #fff;
    margin: 1rem;
    margin-bottom: 3rem;
    border-radius: 0.375rem;
  }

  .nomore {
    color: rgba(118, 118, 118);
    margin: 3.125rem;
  }
</style>
