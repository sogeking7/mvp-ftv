<script setup>
import { ref, onMounted } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'
import { useRoute } from 'vue-router'

const props = defineProps(['modelValue', 'data', 'payedTv', 'payedMobile'])
defineEmits(['update:modelValue'])

const kaspiPay = ref(false)
const paymentTv = ref(false)
const paymentMobile = ref(false)
const loadingTv = ref(false)
const loadingMobile = ref(false)
const loadingKaspi = ref(false)

onMounted(() => {
  kaspiPay.value = props.payedTv || props.payedMobile
  paymentTv.value = props.payedTv
  paymentMobile.value = props.payedMobile
})

function handleTVBtn() {
  loadingTv.value = true
  setTimeout(() => {
    loadingTv.value = false
    paymentTv.value = true
  }, 1000)
}

function handleMobileBtn() {
  loadingMobile.value = true
  setTimeout(() => {
    loadingMobile.value = false
    paymentMobile.value = true
  }, 1000)
}

function handlKaspiBtn() {
  loadingKaspi.value = true
  setTimeout(() => {
    loadingKaspi.value = false
    // kaspiPay.value = true
  }, 1000)
}

function handlePlayBtn() {
  // show video
}
</script>

<template>
  <div
    v-if="kaspiPay"
    class="fixed h-[100svh] w-full flex flex-col gap-12 items-center max-xl:overflow-y-scroll overflow-y-hidden z-50 top-0 left-0 bg-[#000]"
  >
    <div class="container items-center mx-auto px-4 py-3">
      <img
        src="/g/logo.gif"
        class="cursor-pointer w-[70px] sm:w-20 md:w-28"
        @click="$emit('update:modelValue')"
      />
    </div>
    <div class="flex justify-center items-center container">
      <div
        class="bg-[#000] w-[330px] py-8 px-7 rounded-3xl flex flex-col items-center justify-center gap-12"
      >
        <h2 class="text-center text-white font-bold">Оплата за просмотр фильма {{ data.title }}</h2>
        <div v-if="paymentMobile" class="flex flex-col gap-6">
          <img src="/g/check-green.svg" class="mx-auto w-12 h-12" />
          <p class="text-center text-white text-opacity-[55%]">
            Успешная оплата, нажмите на кнопку чтобы начать просмотр.
          </p>
          <a :href="`/films/player/${data.id}`" class="w-full">
            <MyButton :class="['py-4', 'font-bold leading-none w-full']" @click="handlePlayBtn">
              Смотреть
            </MyButton>
          </a>
        </div>
        <div v-else class="flex flex-col">
          <img src="/g/check-green.svg" class="mx-auto w-12 h-12 mb-6" />
          <p class="text-center text-white text-opacity-[55%] mb-6">Успешная оплата</p>
          <div class="mb-6">
            <p class="text-center text-white text-opacity-[55%]">Шаг 1</p>
            <p class="text-center text-white">На телевизоре перейдите на сайт <b>FTV.kz</b></p>
          </div>
          <div class="mb-12">
            <p class="text-center text-white text-opacity-[55%]">Шаг 2</p>
            <p class="text-center text-white">
              На главном экране нажмите на кнопку “Ввести код” и введите следующий код:
            </p>
          </div>
          <div class="flex gap-3 mx-auto">
            <div
              class="w-12 h-16 border-2 border-red-800 flex items-center justify-center rounded-lg text-5xl text-white"
              v-for="i in data.code"
              :key="i"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <button
          class="mx-auto text-white border-white border-opacity-[55%] border-b w-max text-opacity-[55%]"
          @click="$emit('update:modelValue')"
        >
          назад
        </button>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col">
    <h2 class="text-center text-white font-bold mb-12">
      Оплата за просмотр фильма {{ data.title }}
    </h2>
    <div v-if="paymentMobile || paymentTv" class="flex flex-col gap-12">
      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between">
          <span class="text-center text-white text-opacity-[55%]"> Просмотр </span>
          <span class="text-center text-white font-bold">
            {{ paymentMobile ? 'Моб. телефон' : 'Телевизор' }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-center text-white text-opacity-[55%]"> Цена </span>
          <span class="text-center text-white font-bold">
            {{ paymentMobile ? '99 ₸' : '199 ₸' }}
          </span>
        </div>
      </div>
      <MyButton
        :class="['py-4', 'font-bold leading-none']"
        :loading="loadingKaspi"
        @click="
          () => {
            handlKaspiBtn()
            $router.push({
              path: `/pay/${data.id}`,
              query: { type: paymentMobile ? 'mobile' : 'tv' }
            })
          }
        "
      >
        Оплатить через Kaspi.kz
      </MyButton>
      <button
        class="mx-auto text-white border-white border-opacity-[55%] border-b w-max text-opacity-[55%]"
        @click="
          () => {
            paymentMobile = false
            paymentTv = false
          }
        "
      >
        назад
      </button>
    </div>
    <div v-else class="flex flex-col">
      <p class="text-center text-white text-opacity-[55%] mb-6">
        Где вы хотите посмотреть этот фильм?
      </p>
      <div class="flex flex-col mb-12">
        <MyButton
          :class="['py-4', 'font-bold leading-none']"
          :loading="loadingMobile"
          @click="handleMobileBtn"
          :disabled="loadingTv"
          class="mb-4"
        >
          Моб. телефон
        </MyButton>
        <MyButton
          :class="['py-4', 'font-bold leading-none']"
          :loading="loadingTv"
          @click="handleTVBtn"
          :disabled="loadingMobile"
        >
          Телевизор
        </MyButton>
      </div>
      <button
        class="mx-auto text-white border-white border-opacity-[55%] border-b w-max text-opacity-[55%]"
        @click="$emit('update:modelValue')"
      >
        назад
      </button>
    </div>
  </div>
</template>
