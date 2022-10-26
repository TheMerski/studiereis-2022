<script setup lang="ts">
import { getQuestions } from '@/services/databaseService';

const vragen = await getQuestions();
console.log(vragen);
</script>

<template>
  <div v-for="vraag in vragen" :key="vraag.id">
    <p>
      Vraag: {{ vraag.question_eng }} <br />
      Correct antw: {{ vraag.correct_eng }} <br />
      Fout antw: {{ vraag.incorrect_eng }} <br />
    </p>
  </div>
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
