<script setup lang="ts">
import { Ref, ref } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'
import VOtpInput from 'vue3-otp-input'
import { useRouter } from 'vue-router'
import { films } from '@/data'

const paymentSuccessful = ref(false)
const loading = ref(false)
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)
const bindModal = ref('')
const valid: Ref<string | undefined> = ref(undefined)

// `/films/player/${data.id}`
function handlePlayBtn() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    paymentSuccessful.value = true
  }, 1000)
  // show video
  const data = films.filter((v) => v.code === bindModal.value)[0]

  if (data) {
    console.log(valid)
    valid.value = `/films/player/${data.id}`
  }
}
</script>

<template>
  <div class="flex gap-16 flex-col">
    <h2 class="text-center text-white font-bold">Введите код фильма</h2>
    <div style="display: flex; flex-direction: row">
      <v-otp-input
        ref="otpInput"
        v-model:value="bindModal"
        input-classes="mx-[10px] bg-transparent text-center otp-input border-2 outline-none focus:shadow-[0_0_0_3px_white] focus:border-none w-[48px] h-[64px] border-red-800 text-white leading-none rounded-lg text-[48px]"
        separator=""
        :num-inputs="4"
        :should-auto-focus="true"
        input-type="letter-numeric"
        :conditionalClass="['one', 'two', 'three', 'four']"
        :placeholder="['', '', '', '']"
      />
    </div>
    <a :href="valid" class="w-full">
      <MyButton
        :class="['py-4', 'font-bold w-full leading-none']"
        :loading="loading"
        :disabled="bindModal.length !== 4"
        @click="handlePlayBtn"
      >
        Перейти к просмотру
      </MyButton>
    </a>
  </div>
</template>
