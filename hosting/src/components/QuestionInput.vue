<script setup lang="ts">
import { Sleep } from '@/helpers';
import { createQuestion } from '@/services/databaseService';
import { serialHandler } from '@/services/serialHandler';
import { onBeforeUnmount, onMounted, ref } from 'vue';
const text = ref('');
const correct = ref('');
const incorrect = ref('');
const submitted = ref(false);

async function send() {
  // Get the sequence for the input.
  submitted.value = true;
  createQuestion(text.value, correct.value, incorrect.value);
  await Sleep(750);
  window.location.href = '#/';
}

function cancel() {
  window.location.href = '#/';
}

function formFilled(): boolean {
  return text.value !== '' && correct.value !== '' && incorrect.value !== '';
}

let running = false;
async function handleSerial() {
  running = true;
  // eslint-disable-next-line no-constant-condition
  while (running) {
    try {
      const serialText = await serialHandler.read();
      if (serialText === 'l') {
        if (formFilled()) {
          send();
        }
      } else if (serialText === 'r') {
        cancel();
      }
    } catch (err) {
      // Do nothing
    }
    await Sleep(250);
  }
}

// Autofocus on input field.
const vFocus = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mounted: (el: any) => el.focus(),
};

onMounted(() => {
  handleSerial();
});

onBeforeUnmount(() => {
  running = false;
});
</script>

<template>
  <div class="biggy" v-if="!submitted">Leave a question for the next person</div>
  <form class="vertical-footer" v-if="!submitted" @submit.prevent="send">
    <div class="form-group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 40 40"
        version="1.1"
        class="question-icon"
      >
        <g id="surface1">
          <path
            style="
              stroke: none;
              fill-rule: nonzero;
              fill: rgb(14.509804%, 71.764706%, 82.745098%);
              fill-opacity: 1;
            "
            d="M 40 20 C 40 8.953125 31.046875 0 20 0 C 8.953125 0 0 8.953125 0 20 C 0 31.046875 8.953125 40 20 40 C 31.046875 40 40 31.046875 40 20 Z M 40 20 "
          />
          <path
            style="stroke: none; fill-rule: nonzero; fill: rgb(100%, 100%, 100%); fill-opacity: 1"
            d="M 11.144531 13.996094 C 11.144531 12.875 11.503906 11.738281 12.222656 10.585938 C 12.945312 9.433594 13.996094 8.480469 15.375 7.722656 C 16.757812 6.96875 18.371094 6.589844 20.210938 6.589844 C 21.925781 6.589844 23.4375 6.90625 24.746094 7.539062 C 26.058594 8.171875 27.070312 9.027344 27.785156 10.117188 C 28.5 11.203125 28.855469 12.382812 28.855469 13.660156 C 28.855469 14.664062 28.652344 15.542969 28.246094 16.296875 C 27.839844 17.054688 27.355469 17.707031 26.792969 18.253906 C 26.230469 18.804688 25.226562 19.726562 23.773438 21.027344 C 23.371094 21.394531 23.050781 21.714844 22.808594 21.992188 C 22.566406 22.269531 22.386719 22.523438 22.265625 22.753906 C 22.148438 22.984375 22.058594 23.214844 21.992188 23.445312 C 21.925781 23.675781 21.832031 24.082031 21.699219 24.660156 C 21.476562 25.886719 20.773438 26.5 19.59375 26.5 C 18.976562 26.5 18.460938 26.300781 18.042969 25.898438 C 17.625 25.496094 17.414062 24.902344 17.414062 24.109375 C 17.414062 23.117188 17.566406 22.257812 17.875 21.53125 C 18.179688 20.804688 18.589844 20.167969 19.097656 19.621094 C 19.605469 19.070312 20.289062 18.417969 21.152344 17.660156 C 21.90625 17 22.453125 16.5 22.789062 16.164062 C 23.125 15.828125 23.410156 15.453125 23.640625 15.039062 C 23.871094 14.625 23.984375 14.179688 23.984375 13.695312 C 23.984375 12.75 23.632812 11.953125 22.933594 11.300781 C 22.230469 10.652344 21.324219 10.328125 20.210938 10.328125 C 18.914062 10.328125 17.957031 10.65625 17.34375 11.3125 C 16.730469 11.964844 16.210938 12.933594 15.785156 14.207031 C 15.382812 15.542969 14.621094 16.210938 13.5 16.210938 C 12.835938 16.210938 12.277344 15.976562 11.824219 15.507812 C 11.371094 15.042969 11.144531 14.539062 11.144531 13.996094 Z M 19.789062 33.410156 C 19.066406 33.410156 18.4375 33.175781 17.902344 32.710938 C 17.363281 32.242188 17.09375 31.589844 17.09375 30.753906 C 17.09375 30.007812 17.355469 29.382812 17.875 28.875 C 18.394531 28.367188 19.03125 28.113281 19.789062 28.113281 C 20.53125 28.113281 21.15625 28.367188 21.664062 28.875 C 22.171875 29.382812 22.425781 30.007812 22.425781 30.753906 C 22.425781 31.578125 22.160156 32.230469 21.628906 32.699219 C 21.097656 33.171875 20.484375 33.410156 19.789062 33.410156 Z M 19.789062 33.410156 "
          />
        </g>
      </svg>
      <input
        type="text"
        placeholder="Question"
        maxlength="150"
        v-model="text"
        required
        autofocus
        v-focus
      /><br />
    </div>
    <br />
    <div class="form-group">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
        <path
          fill="#c8e6c9"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        />
        <path
          fill="#4caf50"
          d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
        />
      </svg>
      <input type="text" placeholder="Correct answer" maxlength="42" v-model="correct" required />
    </div>
    <br />
    <div class="form-group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style="fill: #000000"
      >
        <path
          fill="#f44336"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        ></path>
        <path
          fill="#fff"
          d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
        ></path>
        <path
          fill="#fff"
          d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
        ></path>
      </svg>
      <input
        type="text"
        placeholder="Incorrect answer"
        maxlength="42"
        required
        v-model="incorrect"
      />
    </div>
    <br />
    <div class="center-btn">

      <button type="submit" value="Save!" class="light-blue-button" :disabled="!formFilled()">
          Save!
      </button>
      <button @click="cancel" class="red-button">Cancel</button>
    </div>

  </form>
  <div v-if="submitted">
    <h3 class="biggy">Thanks for submitting your question!</h3>
  </div>
</template>

<style scoped>

.center-btn{
  display: flex;
  flex-direction: row;
  width: 100%;
}

.center-btn button{
  width: 48% !important;
  margin: 1%;
}
.form-group {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.question-icon {
  margin-left: 4px;
  margin-right: 4px;
}

.form-group input {
  margin-left: 10px;
  font-size: 20px;
  flex: 1;
}

.vertical-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  height: 56px;
}

input {
  padding: 20px;
  border-radius: 10px;
  border: none !important;
  outline: none !important;
}
</style>
