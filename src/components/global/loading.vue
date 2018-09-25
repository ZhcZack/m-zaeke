<template>
  <div id="loading">
    <img src="http://www.zaeke.com/css/images/m_zaeke_logo.png" alt="ZAEKE知客">
  </div>
</template>

<script>
  export default {
    name: 'loading',
  };
</script>

<style scoped>
  #loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f6;
  }

  #loading img {
    animation: loading 2s infinite linear;
  }

  @keyframes loading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>