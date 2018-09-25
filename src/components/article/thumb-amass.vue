<template>
  <div class="share clearfix">
    <span class="amass pointer tc">收藏 | {{amassNum}}</span>&nbsp;
    <span class="thumb pointer tc">点赞 | {{thumbNum}}</span>
  </div>
</template>

<script>
  export default {
    name: 'thumb-amass',
    props: ['shareObj'],
    computed: {
      amassNum() {
        return this.shareObj.amass;
      },
      thumbNum() {
        return this.shareObj.thumb;
      }
    }
  };
</script>

<style scoped>
  .share {
    padding: 0;
    text-align: center;
    padding-bottom: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
  }

  .share .amass,
  .share .thumb {
    width: 7.5rem;
    height: 2.5rem;
    border: 1px solid #263238;
    color: #263238;
    line-height: 2.375rem;
    display: inline-block;
  }

  .share .thumb {
    color: #ff2b2b;
    border-color: #ff2b2b;
  }
</style>