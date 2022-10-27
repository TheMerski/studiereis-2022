<script setup lang="ts">
import { ref, computed, Suspense, type ComponentPublicInstance } from 'vue';
import { loadScript } from 'vue-plugin-load-script';
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

async function handleSerial() {
  let errors = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await serialHandler.read();
      showConnect.value = false;
      errors = 0;
    } catch (err) {
      errors++;
      if (errors > 10) {
        showConnect.value = true;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

function connect() {
  serialHandler.init();
  handleSerial();
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
    <a href="#/">
      <button v-if="showConnect" @click="connect">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="16px" height="16px">    <path d="M 12 0 L 8 4 L 12 8 L 12 5 C 15.859 5 19 8.14 19 12 C 19 12.88 18.82925 13.720094 18.53125 14.496094 L 20.046875 16.009766 C 20.651875 14.800766 21 13.442 21 12 C 21 7.038 16.963 3 12 3 L 12 0 z M 3.953125 7.9902344 C 3.348125 9.1992344 3 10.558 3 12 C 3 16.962 7.037 21 12 21 L 12 24 L 16 20 L 12 16 L 12 19 C 8.141 19 5 15.86 5 12 C 5 11.12 5.17075 10.279906 5.46875 9.5039062 L 3.953125 7.9902344 z"/></svg>
        <div>Refresh</div>
      </button>
    </a>

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
  justify-content: space-between;
}

.main {
  display: flex;
  justify-content: space-between;
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
}

footer button {
  word-break: normal;
  font-size: 2rem;
  width: 48%;
  height: 90px;
}

footer .default-button {
  color: white;
  background-color: maroon;
}

footer .red-button {
  color: white;
  background-color: blue;
}

footer .blue-button {
  color: white;
  background-color: red;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
