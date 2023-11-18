<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { films } from '@/data'
import { isMobile } from '@/helper'

const id = useRouter().currentRoute.value.params.id
const data = films.filter((v) => v.id === +id)[0]

const state = ref(false)
const loading = ref(false)

function handleClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    state.value = true
  }, 1000)
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <div class="h-screen bg-[#efefef]">
      <!-- state true -->
      <div v-if="state" class="h-full relative">
        <div class="h-[6%] bg-white flex justify-center items-center">
          <span class="font-semibold sm:text-lg text-black"> FTV.KZ </span>
        </div>
        <div class="bg-[#b9dd7b] h-[160px] sm:h-[18%] pt-8 px-3">
          <p class="text-2xl sm:text-3xl font-bold mb-4">Ваш платеж принят.</p>
          <p class="text-5xl sm:text-6xl font-bold">99₸</p>
        </div>
        <div class="absolute bottom-0 w-full h-full flex justify-end pb-16 flex-col">
          <div class="px-3 h-[7%] mb-4 w-full">
            <button
              @click="
                () => {
                  if (isMobile()) {
                    const r = $route.query.type
                    $router.push({ path: `/films/payed/${data.id}`, query: { type: r } })
                  } else {
                    $router.push(`/films/payed/${data.id}`)
                  }
                }
              "
              class="active:bg-[rgb(59_135_202)] flex justify-center items-center hover:bg-opacity-90 sm:text-lg h-full w-full bg-[rgb(59_135_202)]"
            >
              Вернуться в FTV.KZ
            </button>
          </div>
          <div class="px-3 h-[7%]">
            <button
              @click="handleClick"
              class="border border-[rgb(59_135_202)] flex justify-center items-center hover:bg-opacity-90 sm:text-lg h-full w-full bg-transparent text-[rgb(59_135_202)]"
            >
              Перейти в платежи
            </button>
          </div>
        </div>
      </div>
      <!-- state false -->
      <div v-else class="h-full">
        <div class="h-[50px] sm:h-[60px] bg-white mb-4 flex justify-center items-center">
          <span class="font-semibold sm:text-lg text-black"> FTV.KZ </span>
        </div>
        <div
          class="h-[70px] sm:h-[100px] bg-white mb-10 px-3 pt-4 sm:pt-5 border-x border-[1px] border-[#d4d4d4]"
        >
          <p class="mb-3 sm:mb-4 text-[#aaa] text-xs sm:text-sm leading-none">Номер заказа</p>
          <p class="sm:text-xl text-black leading-none">
            {{ data.code }}
          </p>
        </div>
        <div
          class="h-[70px] sm:h-[100px] bg-white mb-10 px-3 flex justify-between items-center border-x border-[1px] border-[#d4d4d4]"
        >
          <p class="sm:text-xl text-black leading-none">К оплате</p>
          <p class="sm:text-xl text-black leading-none">
            {{ isMobile() || $route.query.type === 'tv' ? '99 ₸' : '199 ₸' }}
          </p>
        </div>
        <div
          class="h-[70px] sm:h-[100px] bg-white mb-6 px-3 flex justify-between items-center border-x border-[1px] border-[#d4d4d4]"
        >
          <div class="flex gap-5 items-center">
            <img src="/kaspi.png" class="w-[57px]" />
            <p class="sm:text-xl text-black leading-none tracking-tight">Kaspi Gold</p>
          </div>
          <p class="sm:text-xl text-black leading-none tracking-tight">99 999,99 ₸</p>
        </div>
        <p class="text-center text-[#a8a8a8] sm:text-lg mb-6">Коммисия 0 ₸</p>
        <div class="px-3 h-[59px] sm:h-[69px]">
          <button
            @click="handleClick"
            class="active:bg-[rgb(59_135_202)] flex justify-center items-center hover:bg-opacity-90 rounded-[3px] sm:text-lg h-full w-full bg-[rgb(59_135_202)]"
          >
            К оплате {{ isMobile() ? '99 ₸' : '199 ₸' }}
            <img v-if="loading" class="w-4 h-4 animate-spin ml-2 fill-white" src="/g/spinner.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
