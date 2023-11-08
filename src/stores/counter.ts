import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTvMode = defineStore('tvMode', () => {
  const mode = ref(true)
  function toggle() {
    mode.value = !mode.value
  }

  return { mode, toggle }
})
