<script setup>
import { Skeleton } from '@/components/ui/skeleton'

let props = defineProps({
  title: {
    type: String,
    required: false
  },
  year: {
    type: Number,
    required: false
  },
  coverURL: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false
  }
})
</script>

<template>
  <router-link :to="'/movie/'+to" class="" v-if="title">
    <div class="duration-300 ring-1 ring-white/5 ring-inset hover:drop-shadow-lg hover:scale-105">
      <div class="min-h-48 rounded-xl mb-2" :style="{ background: 'url(' + coverURL + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">

      </div>

      <h2 class="text-lg font-bold">{{title}}</h2>
      <p class="text-sm text-gray-500">{{ year }}</p></div>
  </router-link>

  <div v-else>
    <div class="ring-1 ring-white/5 ring-inset">
      <Skeleton class="min-h-48 rounded-xl mb-2">
      </Skeleton>

      <div class="flex flex-col gap-2">
        <Skeleton class="h-7 w-2/3"></Skeleton>
        <Skeleton class="h-4 w-1/3"></Skeleton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>