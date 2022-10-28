<script setup lang="ts">
import { Sleep } from '@/helpers';
import { serialHandler } from '@/services/serialHandler';
import { onMounted, onBeforeUnmount } from 'vue';

async function newQuestion(leaveQuestion: boolean) {
  if (leaveQuestion) {
    window.location.href = '#/add-question';
  } else {
    window.location.href = '#/';
  }
}

let running = false;
async function handleSerial() {
  running = true;
  // eslint-disable-next-line no-constant-condition
  while (running) {
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
    await Sleep(250);
  }
}

onMounted(() => {
  handleSerial();
});

onBeforeUnmount(() => {
  running = false;
});

setTimeout(function () {
  document.getElementById('confetti')?.classList.add('hidden');
}, 2600);

</script>

<template>
  <img id="confetti" src="../../public/gif_5.gif" />
  <div class="biggy">
    <span class="green">Correct!</span><br />
    Do you want to leave a new question for the next one?<br />
  </div>
  <footer>
    <button @click="newQuestion(true)" class="blue-button">Yes</button>
    <button @click="newQuestion(false)" class="red-button">No</button>
  </footer>
</template>

<style scoped>
footer .other-button {
  color: maroon;
}

img {
  position: absolute;
  height: 800px;
  width: 800px;
  left: 0;
  top: 20%;
  z-index: -1;
}
img.hidden {
  display: none;
}
.green {
  color: green;
  font-weight: inherit;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
</style>
