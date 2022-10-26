<script setup lang="ts">
import { createQuestion, getQuestions } from '@/services/databaseService';
import { ref, onMounted } from 'vue';
const text = ref('');

async function send() {
  // Get the sequence for the input.
  createQuestion(text.value);
}
</script>

<template>
  <div class="greetings">
    <h3>
      Vragen enzo:<br />
      <input type="text" placeholder="Vraag" maxlength="420" v-model="text" />
      <button @click="send">Send!</button>
    </h3>
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
