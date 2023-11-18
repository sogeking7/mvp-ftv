<script setup>
import { ref, onRenderTriggered } from 'vue'

import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'

import MyButton from '@/components/UI/MyButton.vue'
import FilmCard from '@/components/FilmCard/FilmCard.vue'
import MyModal from '@/components/UI/MyModal.vue'
import DesktopModal from '@/components/DesktopModal/DesktopModal.vue'
import { isMobile } from '@/helper'
import { films } from '@/data'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

function handleCodeBtn() {
  if (isMobile()) {
    const mainElement = document.getElementById('main')
    if (mainElement) mainElement.scrollIntoView({ behavior: 'smooth' })
  } else {
    openModal()
  }
}
</script>

<template>
  <div
    :class="{
      html: openModal
    }"
    class="bg-no-repeat bg-cover bg-center h-screen relative w-full"
    id="hero"
  >
    <div class="absolute w-full top-0 z-10 h-screen overlay"></div>
    <div class="relative z-20">
      <MyHeader @update:model-value="handleCodeBtn" />
      <div class="flex justify-center h-[80vh] flex-col">
        <div
          class="h-[50vh] md:h-[50vh] lg:h-[80vh] container mx-auto px-4 w-full flex items-center justify-center"
        >
          <div class="flex flex-col items-center justify-center md:w-[70%]">
            <h1
              :class="[
                'mb-3 lg:mb-5  xl:mb-6',
                'text-white font-bold leading-tight text-center',
                'text-[32px] lg:text-5xl xl:text-[64px]'
              ]"
            >
              Казахстанские фильмы и сериалы эксклюзивно
            </h1>
            <p
              :class="[
                'mb-6 lg:mb-9 xl:mb-12',
                'text-white text-center leading-tight',
                'text-base lg:text-xl xl:text-2xl'
              ]"
            >
              Покупай за недорого и смотри казахстанские фильмы первым. Библиотека фильмов
              пополняется каждую неделю.
            </p>
            <MyButton
              :class="[
                'sm:font-bold font-semibold',
                'sm:py-5 py-4',
                'sm:px-12 max-sm:w-full',
                'text-base lg:text-lg xl:text-[20px]'
              ]"
              @click="handleCodeBtn"
            >
              {{ isMobile() ? 'Начать просмотр' : 'Ввести код' }}
            </MyButton>
          </div>
        </div>
        <li class="container mx-auto flex justify-center">
          <a class="mx-auto" href="/#main">
            <img class="animate-bounce w-9 md:w-10 lg:w-12" src="/g/arrow.svg" />
          </a>
        </li>
      </div>
    </div>
  </div>
  <div class="bg-[#000]" id="main">
    <div class="container px-4 mx-auto">
      <h2 class="text-2xl lg:text-3xl xl:text-[32px] text-white font-bold lg:py-8 py-6 xl:py-12">
        Доступные к просмотру
      </h2>
      <div
        class="grid pb-10 gap-x-4 md:gap-x-8 gap-y-8 lg:grid-cols-4 md:grid-cols-3 min-[360px]:grid-cols-2"
      >
        <FilmCard v-for="i in films" :key="i.id" :data="i" />
      </div>
    </div>
  </div>
  <MyFooter />

  <MyModal :model-value="isModalOpen" @update:model-value="closeModal">
    <DesktopModal />
  </MyModal>
</template>

<style scoped>
.overlay {
  background: rgb(0 0 0 / 80%);
  background-image: linear-gradient(to bottom, #12121200, #1212121a, #000);
}

@media only screen and (min-width: 320px) {
  #hero {
    background-image: url('/public/desktop-bg.webp');
  }
}

@media only screen and (max-width: 468px) {
  #hero {
    background-image: url('/public/mob.webp');
  }
}
</style>
