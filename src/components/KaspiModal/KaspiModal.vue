<script setup>
import { ref } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'

defineProps(['modelValue', 'data'])
defineEmits(['update:modelValue'])

const kaspiPay = ref(false)
const loadingKaspi = ref(false)

function handlKaspiBtn() {
  loadingKaspi.value = true
  setTimeout(() => {
    loadingKaspi.value = false
    kaspiPay.value = true
  }, 1000)
}

function handlePlayBtn() {
  // show video
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed h-[100vh] w-full flex flex-col gap-16 justify-between max-xl:overflow-y-scroll overflow-y-hidden z-50 top-0 bg-[#000]"
  >
    <div class="container items-center mx-auto px-4 py-3">
      <img
        src="/g/logo.svg"
        class="cursor-pointer w-[70px] sm:w-20 md:w-28"
        @click="$emit('update:modelValue')"
      />
    </div>

    <div class="flex justify-center items-center container px-4 mx-auto">
      <div
        class="border-red-800 bg-[#000] border-2 w-[330px] py-8 px-7 rounded-3xl flex flex-col justify-center gap-12"
      >
        <div v-if="kaspiPay" class="flex gap-12 flex-col">
          <h2 class="text-center text-white font-bold">
            Оплата за просмотр фильма {{ data.title }}
          </h2>
          <div class="flex flex-col gap-6">
            <img src="/g/check-green.svg" class="mx-auto w-12 h-12" />
            <p class="text-center text-white text-opacity-[55%]">
              Успешная оплата, нажмите на кнопку чтобы начать просмотр.
            </p>
            <a :href="`/films/player/${data.id}`" class="w-full">
              <MyButton :class="['py-4', 'font-bold leading-none w-full']"> Смотреть </MyButton>
            </a>
          </div>
        </div>
        <div v-else class="flex gap-12 flex-col">
          <h2 class="text-center text-white font-bold">
            Оплата за просмотр фильма {{ data.title }}
          </h2>
          <div class="flex justify-between">
            <span class="text-center text-white text-opacity-[55%]"> Цена </span>
            <span class="text-center text-white font-bold">199 ₸</span>
          </div>
          <div class="flex items-center gap-4 flex-col">
            <span class="text-center text-white text-opacity-[55%]"> Сканируйте и платите </span>
            <img src="/films/qr.png" class="w-[120px] h-[120px]" />
          </div>
          <MyButton
            :class="['py-4', 'font-bold leading-none']"
            :loading="loadingKaspi"
            @click="handlKaspiBtn"
          >
            Оплатить
          </MyButton>
        </div>
        <button
          class="mx-auto text-white border-white border-opacity-[55%] border-b w-max text-opacity-[55%]"
          @click="kaspiPay ? (kaspiPay = false) : $emit('update:modelValue')"
        >
          назад
        </button>
      </div>
    </div>

    <MyFooter />
  </div>
</template>
