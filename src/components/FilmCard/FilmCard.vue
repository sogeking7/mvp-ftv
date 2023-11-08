<script setup>
import { isMobile } from '@/helper'

defineProps(['data'])
</script>

<template>
  <div class="flex flex-col">
    <router-link :to="`/films/${data.id}`">
      <img :src="data.img" class="mb-3 lg:mb-5 xl:mb-6 cursor-pointer rounded-lg w-full" />
    </router-link>
    <p class="lg:text-xl xl:text-2xl font-bold mb-1 lg:mb-2 xl:mb-3 text-white cursor-pointer">
      <router-link :to="`/films/${data.id}`" class="hover:underline">
        {{ data.title }}
      </router-link>
    </p>
    <div>
      <span class="lg:text-xl xl:text-2xl font-bold text-red-900 mr-3">
        {{ isMobile() ? '99₸' : '199₸' }}
      </span>
      <span class="lg:text-xl xl:text-2xl text-white text-opacity-60 line-through font-medium"
        >699₸</span
      >
    </div>
  </div>
</template>
