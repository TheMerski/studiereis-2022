<script setup lang="ts">
import { Sleep, stringToBool } from '@/helpers';
import { getQuestions } from '@/services/databaseService';
import { serialHandler } from '@/services/serialHandler';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const vragen = await getQuestions();
const reloadInterval = 10 * 1000;
const vraag = ref(vragen[0]);
const randomBool = ref(stringToBool(vraag.value.id));

async function correct(correct: boolean) {
  if (correct) {
    window.location.href = '#/correct';
  } else {
    window.location.href = '#/incorrect';
  }
}

const interval = setInterval(async function () {
  const latestQuestions = await getQuestions();
  if (latestQuestions[0].id !== vraag.value.id) {
    vraag.value = latestQuestions[0];
    randomBool.value = stringToBool(vraag.value.id);
  }
  console.log('Reloaded questions');
}, reloadInterval);

let running = false;
async function handleSerial() {
  running = true;
  // eslint-disable-next-line no-constant-condition
  while (running) {
    try {
      const text = await serialHandler.read();
      if (text === 'l') {
        correct(randomBool.value);
      } else if (text === 'r') {
        correct(!randomBool.value);
      }
    } catch (err) {
      // Do nothing
    }
    await Sleep(250);
  }
}

onMounted(() => {
  handleSerial();
});

onBeforeUnmount(() => {
  running = false;
  clearInterval(interval);
});
</script>

<template>
  <div class="main">
    <p class="biggy">Question:</p>
    <p class="biggy">
      {{ vraag.question_eng }}
    </p>
    <footer>
      <button @click="correct(randomBool)" class="blue-button">
        {{ randomBool ? vraag.correct_eng : vraag.incorrect_eng }}
      </button>
      <button @click="correct(!randomBool)" class="red-button">
        {{ randomBool ? vraag.incorrect_eng : vraag.correct_eng }}
      </button>
    </footer>
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
</style>
