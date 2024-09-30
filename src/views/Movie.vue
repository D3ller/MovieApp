<script setup>
import {useRoute} from "vue-router";
import ActorCard from "@/components/cards/ActorCard.vue";

const route = useRoute()
let id = route.params.id.replace('-', ' ')
</script>

<template>
  <div class="w-full h-80 bg-amber-100 relative after:absolute rounded-t-xl after:bg-gradient-to-b after:from-transparent after:to-white after:w-full after:h-full overflow-hidden">
    <h1 class="p-4 text-4xl font-bold capitalize absolute bottom-0 z-10">{{id}}</h1>
    <img src="https://www.screentune.com/wp-content/uploads/2023/10/Critique-Inception-2010-ScreenTune.jpg" class="w-full h-full object-cover absolute">
  </div>

  <div class="grid w-full items-center gap-3 mt-20">
    <h2 class="text-xl font-bold">Acteurs</h2>
    <div class="flex gap-x-3">
      <ActorCard title="ffff" format="compact" v-for="i in 4" :key="i"/>
    </div>
  </div>

</template>

<style scoped>

</style>