<script setup lang="ts">import { serialHandler } from '@/services/serialHandler';


async function newQuestion(leaveQuestion: boolean) {
  if (leaveQuestion) {
    window.location.href = '#/add-question';
  } else {
    window.location.href = '#/';
  }
}

async function handleSerial() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const text = await serialHandler.read();
      if (text === 'l') {
        newQuestion(true);
      } else if (text === 'r') {
        newQuestion(false);
      }
    } catch (err) {
      // Do nothing
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
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
