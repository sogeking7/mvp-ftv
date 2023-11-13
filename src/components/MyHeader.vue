<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { isMobile } from '@/helper'
import MyButton from './UI/MyButton.vue'

defineEmits(['update:modelValue'])

const route = useRoute().path.split('/')[1]
const numbers = [162, 163, 159, 162, 165, 154]
const currentIndex = ref(0)

const updateNumbers = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % numbers.length
  }, 5000)
}
const currentNumber = computed(() => numbers[currentIndex.value])
onMounted(updateNumbers)
</script>

<template>
  <div class="bg-transparent w-full">
    <div class="container flex justify-between items-center mx-auto px-4 py-3">
      <router-link to="/">
        <img src="/g/logo.gif" class="w-[70px] sm:w-20 md:w-28" />
      </router-link>
      <div class="flex items-center gap-10">
        <div v-if="route === 'films'">
          <div v-if="isMobile()" class="flex gap-2">
            <img src="/g/eye.svg" />
            <span class="text-white font-medium">{{ currentNumber }}</span>
          </div>
          <div v-else class="text-white font-medium">Сейчас смотрят: {{ currentNumber }}</div>
        </div>
        <MyButton @click="$emit('update:modelValue')" class="px-6 py-2 font-medium max-sm:hidden">
          Ввести код
        </MyButton>
      </div>
    </div>
  </div>
</template>
