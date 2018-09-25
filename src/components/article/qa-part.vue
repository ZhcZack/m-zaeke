<template>
  <div class="question">
    <div class="wenda">Q&A 问答</div>
    <ul>
      <li v-for="qa of qas" :key="qa.id">
        <div class="quess">{{qa.question}}</div>
        <p class="answer">{{qa.answer}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'qa-part',
    props: ['qas']
  };
</script>

<style scoped>
  .question {
    padding: 1rem;
    background-color: #fff;
    margin: 1rem 0;
  }

  .wenda {
    font-size: 1.25rem;
    color: #263238;
  }

  .question li {
    padding: 1rem 0 0.75rem 0;
    border-bottom: 1px solid #d4d4d4;
    list-style-type: none;
  }

  .question li .quess {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #263238;
    letter-spacing: 0;
  }

  .question li .answer {
    font-size: 0.875rem;
    line-height: 1.625rem;
    color: #767676;
    letter-spacing: 0.8px;
    margin: 0;
  }
</style>