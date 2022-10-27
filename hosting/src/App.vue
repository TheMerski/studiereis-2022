<script setup lang="ts">
import { ref, computed, Suspense } from 'vue';
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

loadScript('https://storage.googleapis.com/static.q42.nl/q42.js');
</script>

<template>
  <header>
    <a href="#/">
      <button v-if="showConnect" @click="connect">conn</button>
      <q42 width="125" height="125" />
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
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
