<template>
  <footer v-if="!hidden" id="global-footer">
    <img src="http://www.zaeke.com/css/images/m_zaeke_logo.png" alt="logo" class="logo">
    <div class="slogan tc">ZAEKE | 知客、让数码更懂你</div>
    <div class="tc beian">
      <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备14017158 &copy; ZAEKE 知客</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'global-footer',
    computed: {
      hidden() {
        return this.$store.state.footerHidden;
      }
    }
  };
</script>

<style scoped>
  footer {
    background: #263238;
    height: 9rem;
    padding-top: 1.5rem;
    z-index: 99;
  }

  .logo {
    display: block;
    margin: 0 auto;
    width: 5.125rem;
    height: 1.25rem;
  }

  .slogan {
    font-size: 0.875rem;
    color: #666;
    letter-spacing: 0;
    line-height: 1.25rem;
    padding: 0.75rem 0 1.4375rem 0;
    border-bottom: 0.125rem solid #666;
  }

  .beian {
    font-size: 0.75rem;
    color: #666;
    letter-spacing: 0;
    line-height: 2.5rem;
  }

  .beian a {
    color: #666;
    text-decoration: none;
  }
</style>