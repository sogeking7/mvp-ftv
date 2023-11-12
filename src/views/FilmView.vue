<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MobileModal from '@/components/MobileModal/MobileModal.vue'
import { films } from '@/data'
import { isMobile } from '@/helper'
import KaspiModal from '../components/KaspiModal/KaspiModal.vue'

const id = useRouter().currentRoute.value.params.id
const data = films.filter((v) => v.id === +id)[0]

document.title = data.title

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleBuyBtn = () => {
  openModal()
}

const movieDetails = [
  'Год производства',
  'Страна',
  'Жанр',
  'Режиссер',
  'Оператор',
  'Премьера в мире',
  'Возраст',
  'Продолжительность',
  'Аудиодорожки',
  'Субтитры'
]

const readMoreActivated = ref(false)

onMounted(() => {
  const video = document.querySelector('video')
  if (video) {
    const promise = video.play()
    if (promise !== undefined) {
      promise
        .catch((error) => {
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
        })
        .then(() => {
          // Auto-play started
        })
    }
  }
})
</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-opacity-95 overflow-y-hidden z-50 top-0 bg-[#000]"
  >
    <div class="flex justify-center items-center container px-4 mx-auto">
      <div
        class="border-red-800 bg-[#000] border-2 w-[330px] py-8 px-7 rounded-3xl flex flex-col justify-center gap-12"
      >
        <MobileModal :data="data" :model-value="isModalOpen" @update:model-value="closeModal" />
      </div>
    </div>
  </div>
  <KaspiModal
    v-if="!isMobile()"
    :data="data"
    :model-value="isModalOpen"
    @update:model-value="closeModal"
  />
  <div class="relative w-full" id="hero">
    <div class="absolute w-full top-0 z-10 h-full overlay"></div>
    <div class="relative z-20">
      <MyHeader @update:model-value="handleBuyBtn" />
      <div
        :class="{
          'h-[calc(100vh-74px)] sm:h-[calc(100vh-81.15px)] md:h-[calc(100vh-104px)]':
            !readMoreActivated,
          'pt-32': readMoreActivated
        }"
        class="container mx-auto px-4 w-full flex items-end"
      >
        <div class="w-full lg:w-[70%]">
          <div
            class="flex gap-3 lg:gap-12 lg:flex-row flex-col max-lg:items-center mb-6 lg:mb-8 xl:mb-12"
          >
            <div class="max-w-[142px] min-w-[142px]">
              <img :src="data.img" />
            </div>
            <div>
              <h1
                :class="[
                  'font-bold text-white leading-none',
                  'text-[32px] lg:text-5xl xl:text-[64px] max-lg:text-center',
                  'mb-4 lg:mb-5 xl:mb-6'
                ]"
              >
                {{ data.title }}
              </h1>
              <p
                :class="[
                  'text-white leading-tight',
                  'text-base lg:text-xl xl:text-2xl max-lg:text-center'
                ]"
              >
                <span>
                  {{ readMoreActivated ? data.desc : data.desc.slice(0, 200) + '...' }} {{ ' ' }}
                </span>
                <a
                  class="text-white whitespace-nowrap hover:underline cursor-pointer text-sm lg:text-lg xl:text-xl text-opacity-[55%]"
                  @click="readMoreActivated = !readMoreActivated"
                >
                  {{ readMoreActivated ? 'Скрыть' : 'Читать дальше' }}
                </a>
              </p>
            </div>
          </div>
          <div
            class="flex md:flex-row flex-col md:items-center gap-4 lg:gap-8 xl:gap-12 xl:mb-12 lg:mb-8 mb-6 md:justify-center lg:justify-normal"
          >
            <MyButton
              :class="[
                'sm:font-bold font-semibold',
                'sm:py-5 py-4',
                'sm:px-6 max-sm:w-full',
                'text-base lg:text-lg xl:text-[20px] leading-none'
              ]"
              @click="handleBuyBtn"
            >
              <span class="lg:text-xl xl:text-2xl font-bold text-white mr-2">
                {{ isMobile() ? 'Купить просмотр за 99₸' : 'Купить просмотр за 199₸' }}
              </span>
              <span
                class="lg:text-xl xl:text-2xl text-white text-opacity-60 line-through font-medium"
                >699₸</span
              >
            </MyButton>
            <a :href="`/films/player/${data.id}`">
              <MyButton
                st="outline"
                :class="[
                  'sm:font-bold font-semibold',
                  'sm:py-5 py-4',
                  'sm:px-6 max-sm:w-full',
                  'text-base lg:text-lg xl:text-[20px] leading-none'
                ]"
              >
                Смотреть трейлер
              </MyButton>
            </a>
          </div>
        </div>
      </div>
    </div>
    <video playsinline autoplay muted loop class="absolute top-0 left-0 object-cover w-full h-full">
      <source :src="data.promo" type="video/mp4" />
    </video>
  </div>
  <div class="bg-[#000] overf py-12" id="main">
    <div class="container mx-auto px-4">
      <div class="flex gap-6 lg:gap-8 xl:gap-12 lg:flex-row flex-col">
        <div>
          <h2 class="xl:text-[20px] lg:text-lg text-base text-white font-bold mb-4 lg:mb-5 xl:mb-6">
            О фильме
          </h2>
          <table class="table-auto border-none">
            <tbody class="divide-y-0">
              <tr
                v-for="(name, nameIndex) in movieDetails"
                :key="nameIndex"
                class="xl:text-base lg:text-sm text-xs lg:h-5 xl:h-6"
              >
                <td class="text-white pr-14 py-0">{{ name }}</td>
                <td class="text-white text-opacity-[55%] py-0">{{ data.about[nameIndex] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="xl:text-[20px] lg:text-lg text-base text-white font-bold mb-4 lg:mb-5 xl:mb-6">
            В главных ролях
          </h2>
          <ul class="text-white xl:text-base lg:text-sm text-xs">
            <li v-for="(actor, actorId) in data.actorsList" :key="actorId">{{ actor }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <MyFooter />
</template>

<style scoped>
.overlay {
  background: rgb(0 0 0 / 70%);
  background-image: linear-gradient(#000, #ffffff00, #000);
}
</style>
