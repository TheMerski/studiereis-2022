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
  await Sleep(250);
  window.location.href = '#/';
}
</script>

<template>
  <div class="biggy" v-if="!submitted">Leave a question for the next person</div>
  <footer class="vertical-footer" v-if="!submitted">
    <input type="text" placeholder="Question" maxlength="420" v-model="text" /><br />
    <input type="text" placeholder="Correct answer" maxlength="420" v-model="correct" /><br />
    <input type="text" placeholder="Incorrect answer" maxlength="420" v-model="incorrect" /><br />
    <button @click="send" class="default-button">Save!</button>
  </footer>
  <div v-if="submitted">
    <h3>Thanks for submitting your question!</h3>
  </div>
</template>

<style scoped>
.vertical-footer {
  display: flex;
  flex-direction: column;
}
input {
  padding: 20px;
  border-radius: 10px;
  border: none !important;
  outline: none !important;
}
</style>
