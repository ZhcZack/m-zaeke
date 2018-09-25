<template>
  <div class="tabs clearfix">
    <router-link :to="searchLink(tag)" v-for="(tag, index) of tags" class="fl" :key="index">
      <template v-if="index === 0">
        <span class="green-check pointer">{{tag.name}}</span>
      </template>
      <template v-else>
        <span class="pointer">{{tag.name}}</span>
      </template>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'user-tags',
    props: ['tags'],
    methods: {
      searchLink(tag) {
        return '/search/' + tag.name;
      }
    }
  };
</script>

<style scoped>
  .tabs {
    padding: 0 1rem;
    margin: 0 auto;
    margin-top: 1rem;
  }

  .tabs a {
    margin-bottom: 0.625rem;
    text-decoration: none;
  }

  .tabs span {
    background-color: #fff;
    color: #a6a6a6;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #a6a6a6;
    line-height: 1.5;
  }

  .tabs span.green-check {
    border-color: #10cc70;
    background-color: #10cc70;
    color: #fff;
  }
</style>