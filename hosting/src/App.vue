<script setup lang="ts">
import { ref, computed, Suspense } from 'vue';
import QuestionDisplay from './components/QuestionDisplay.vue';
import QuestionInput from './components/QuestionInput.vue';
import QuestionCorrect from './components/QuestionCorrect.vue';
import QuestionIncorrect from './components/QuestionIncorrect.vue';
import { serialHandler } from './services/serialHandler';

const routes: { [route: string]: any } = {
  '/': QuestionDisplay,
  '/add-question': QuestionInput,
  '/correct': QuestionCorrect,
  '/incorrect': QuestionIncorrect,
};

const showConnect = ref(true);

async function checkSerialActive() {
  // eslint-disable-next-line no-constant-condition
  showConnect.value = false;
  // Wait 10 sec for the connection to exist
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // Active resolves when the connection is closed.
  await serialHandler.active();
  console.log('Serial closed');
  showConnect.value = true;
}

function connect() {
  serialHandler.init();
  checkSerialActive();
}

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'];
});
</script>

<template>
  <header>
    <button v-if="showConnect" @click="connect" class="connect">
      <div>Connect</div>
    </button>

    <div class="wrapper"></div>
  </header>
  <main>
    <Suspense>
      <!-- component with nested async dependencies -->
      <component :is="currentView" />

      <!-- loading state via #fallback slot -->
      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  text-align: right;
}

.biggy {
  color: maroon;
  font-size: 2rem;
  font-weight: 600;
}

header button {
  display: flex;
  justify-content: center;
  float: right;
}

header button svg {
  margin-right: 5px;
}

main {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

button {
  font-family: 'VariableMontserrat';
  text-transform: uppercase;
  outline: none !important;
  border: none !important;
  border-radius: 20px;
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0;
  position: absolute;
  width: 100%;
}

button:not(.connect) {
  word-break: normal;
  font-size: 1.5rem;
  width: 48%;
  height: 90px;
}

footer .default-button {
  color: white;
  background-color: maroon;
}

.red-button {
  color: white;
  background-color: red;
}

.blue-button {
  color: white;
  background-color: rgb(31, 105, 255);
}

.light-blue-button {
  color: white;
  background-color: rgb(31, 105, 255);
}

.light-blue-button:disabled {
  color: white;
  background-color: rgb(194, 195, 197);
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
