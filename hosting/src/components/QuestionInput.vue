<script setup lang="ts">
import { Sleep } from '@/helpers';
import { createQuestion } from '@/services/databaseService';
import { ref } from 'vue';
const text = ref('');
const correct = ref('');
const incorrect = ref('');
const submitted = ref(false);

async function send() {
  // Get the sequence for the input.
  submitted.value = true;
  await createQuestion(text.value, correct.value, incorrect.value);
  await Sleep(500);
  window.location.href = '#/';
}
</script>

<template>
  <div class="question" v-if="!submitted">
    <h3>
      Leave a question for the next person:<br />
      <input type="text" placeholder="Question" maxlength="420" v-model="text" /><br />
      <input type="text" placeholder="Correct answer" maxlength="420" v-model="correct" /><br />
      <input type="text" placeholder="Incorrect answer" maxlength="420" v-model="incorrect" /><br />
      <button @click="send">Save!</button>
    </h3>
  </div>
  <div v-if="submitted">
    <h3>Thanks for submitting your question!</h3>
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
