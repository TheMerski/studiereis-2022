<script setup lang="ts">

async function newQuestion(leaveQuestion: boolean) {
  if (leaveQuestion) {
    window.location.href = '#/add-question';
  } else {
    window.location.href = '#/';
  }
}
</script>

<template>
  <p>
    Correct!<br />
    Do you want to leave a new question for the next one?<br />
    <button @click="newQuestion(true)">Yes</button>
    <button @click="newQuestion(false)">No</button>
  </p>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
