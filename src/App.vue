<template>
  <div id="app">
    <div class="container">
      <global-header></global-header>
      <router-view></router-view>
      <global-footer></global-footer>
    </div>
  </div>
</template>

<script>
  // import {log} from '@/lib/lib';

  import GlobalHeader from '@/components/global/global-header';
  import GlobalFooter from '@/components/global/global-footer';

  export default {
    name: 'app',
    data() {
      return {
        lists: []
      };
    },
    created() {},
    components: {
      GlobalFooter,
      GlobalHeader,
    }
  };
</script>


<style>
  * {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  @media screen and (min-width: 768px) {
    html {
      font-size: 20px;
    }
  }

  html,
  body {
    font-family: -apple-system, Helvetica, Arial, 微软雅黑, sans-serif;
    background-color: white;
  }

  body {
    position: relative;
  }

  .container {
    margin-top: 2.75rem;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .tc {
    text-align: center;
  }

  .pointer {
    cursor: pointer;
  }

  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  #app {
    color: #2c3e50;
    background-color: #f6f6f6;
    position: relative;
  }

  #app > .container > .main {
    min-height: calc(100vh - 11.75rem);
  }

  @media screen and (min-width: 769px) {
    #app {
      width: 750px;
      margin: 0 auto;
    }
  }
</style>
