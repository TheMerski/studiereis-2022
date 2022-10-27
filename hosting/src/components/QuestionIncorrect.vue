<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

let timeoutSeconds = 5;
const timeout = ref(timeoutSeconds);

const interval = setInterval(function () {
  console.log(timeoutSeconds);
  if (timeoutSeconds <= 1) {
    clearInterval(interval);
    window.location.href = '#/';
  } else {
    timeoutSeconds--;
    timeout.value = timeoutSeconds;
  }
}, 1000);
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="biggy">
    Sorry, that's <span class="red">incorrect</span>.<br />
  </div>
</template>

<style scoped>
.red {
  color: red;
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
