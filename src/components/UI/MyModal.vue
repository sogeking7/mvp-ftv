<script setup>
import MyFooter from '../MyFooter.vue'

import { defineProps, defineEmits } from 'vue'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])
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
        <slot></slot>
        <button
          class="mx-auto text-white border-white border-opacity-[55%] border-b w-max text-opacity-[55%]"
          @click="$emit('update:modelValue')"
        >
          назад
        </button>
      </div>
    </div>

    <MyFooter />
  </div>
</template>
