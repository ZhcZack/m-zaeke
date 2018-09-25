<template>
  <div class="tag-result">
    <ul class="clearfix">
      <li class="fl" v-for="tag of tags" :key="tag.id">
        <span class="tag-search" @click.stop="searchTagArticle(tag.id)">{{tag.name}}</span>
      </li>
    </ul>
    <div class="none tc" v-if="none">暂无标签</div>
  </div>
</template>

<script>
  import { tags } from '@/service/search/search';
  // import { log } from '@/lib/lib';

  export default {
    name: 'search-tag',
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tags: [],
        none: false
      };
    },
    watch: {
      keyword: function (newValue) {
        this.getSearchTags(newValue);
      }
    },
    created() {
      this.getSearchTags(this.keyword);
    },
    methods: {
      /**
       * 获取对应标签并展示
       * @param keyword 标签关键字
       */
      getSearchTags(keyword) {
        if (keyword.trim() === '') {
          return;
        }
        // log(keyword);
        tags(keyword).then(result => {
          if (result.status) {
            // log(result.tags);
            this.tags = result.tags;
            const tagsCount = result.tags.length;

            this.none = tagsCount === 0;
            this.$emit('updateTagsCount', tagsCount);
          }
        });
      },
      searchTagArticle(tagID) {
        window.console.log(tagID);
      }
    }
  };
</script>

<style scoped>
  .tag-result {
    background-color: #fff;
    padding: 2.5rem 2.5rem 1rem 2.5rem;
  }

  .tag-result li {
    list-style-type: none;
    margin: 0 1.5rem 1.5rem 0;
  }

  .tag-result span {
    display: inline-block;
    font-size: 1rem;
    color: #a6a6a6;
    line-height: 1rem;
    border: 1px solid #a6a6a6;
    padding: 0.75rem 1rem;
  }

  .tag-result .none {
    height: 11.5rem;
    line-height: 10.25rem;
    font-size: 1rem;
    color: #a6a6a6;
    letter-spacing: 0.71px;
  }
</style>