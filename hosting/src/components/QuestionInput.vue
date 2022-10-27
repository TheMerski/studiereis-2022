<script setup lang="ts">
import { createQuestion } from '@/services/databaseService';
import { ref } from 'vue';
const text = ref('');
const correct = ref('');
const incorrect = ref('');

async function send() {
  // Get the sequence for the input.
  createQuestion(text.value, correct.value, incorrect.value);
  window.location.href = '#/';
}
</script>

<template>
  <div class="biggy">
    Leave a question for the next person
  </div>
  <footer class="vertical-footer">
      <input type="text" placeholder="Question" maxlength="420" v-model="text" /><br />
      <input type="text" placeholder="Correct answer" maxlength="420" v-model="correct" /><br />
      <input type="text" placeholder="Incorrect answer" maxlength="420" v-model="incorrect" /><br />
      <button @click="send" class="default-button">Save!</button>
  </footer>
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
