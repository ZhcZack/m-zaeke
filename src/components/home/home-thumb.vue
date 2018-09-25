<template>
  <div class="thumb-list">
    <ul>
    </ul>
    <div class="loadmore tc" v-if="loadmore">加载更多～</div>
    <div class="nomore tc" v-if="nomore">没有更多了～</div>
    <div class="none tc" v-if="none">还没有点过赞哦～</div>
  </div>
</template>

<script>
  export default {
    name: 'home-thumb',
    data() {
      return {
        loadmore: false,
        nomore: false,
        none: true
      };
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