<script setup lang="ts">
import { stringToBool } from '@/helpers';
import { getQuestions } from '@/services/databaseService';

const vragen = await getQuestions();
const vraag = vragen[0];
const randomBool = stringToBool(vraag.id);

async function correct(correct: boolean) {
  if (correct) {
    window.location.href = '#/correct';
  } else {
    window.location.href = '#/incorrect';
  }
}
</script>

<template>
  <p>
    Question: {{ vraag.question_eng }} <br />
    <button @click="correct(randomBool)">
      {{ randomBool ? vraag.correct_eng : vraag.incorrect_eng }}
    </button>
    <button @click="correct(!randomBool)">
      {{ randomBool ? vraag.incorrect_eng : vraag.correct_eng }}
    </button>
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
