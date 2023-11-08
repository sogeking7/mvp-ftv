<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { films } from '@/data'
import { useElementSize } from '@vueuse/core'
import { usePlayer } from '@vue-youtube/core'

const id = useRouter().currentRoute.value.params.id
const data = films.filter((v) => v.id === +id)[0]

document.title = 'Cмотреть ' + data.title

const el = ref(null)
const { width, height } = useElementSize(el)

const videoId = ref(data.youtubeLink)
const youtube = ref()

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false,
  playerVars: {},
  height: height
})

onReady((event) => {
  event.target.playVideo()
})
</script>

<template>
  <div class="bg-[#000] h-[100vh] text-white">
    <div class="container flex justify-between items-center mx-auto px-4 py-3" ref="el">
      <router-link to="/">
        <img src="/g/logo.svg" class="w-[70px] sm:w-20 md:w-28" />
      </router-link>
    </div>
    <div
      class="flex items-center h-[calc(100vh-74px)] sm:h-[calc(100vh-81.5px)] md:h-[calc(100vh-104px)]"
    >
      <div
        style="width: 100%"
        ref="el"
        class="w-full flex py-8 bg[#000] h-[300px] sm:h-[calc(100vh-81.5px)] md:h-[calc(100vh-104px)]"
      >
        <youtube-iframe ref="youtube" class="flex-1" @ready="onReady"></youtube-iframe>
      </div>
    </div>
  </div>
</template>
