<script setup>
import { defineProps } from 'vue'

defineProps(['st', 'disabled', 'loading'])
</script>
<template>
  <button
    :class="{
      'border-2 border-white hover:bg-white hover:bg-opacity-5': st === 'outline' && !disabled,
      'hover:bg-red-900 bg-red-800 border-none': !st && !disabled,
      'hover:shadow-[0_0_0_2px_white]': !st && !disabled,
      'opacity-50 cursor-not-allowed hover:bg-red-900 bg-red-800': disabled || loading,
      custom_button: true
    }"
    class="rounded-full flex justify-center items-center text-white relative"
    :disabled="disabled || loading"
  >
    <slot></slot>
    <img v-if="loading" class="w-4 h-4 animate-spin ml-2 fill-white" src="/g/spinner.svg" />
  </button>
</template>
