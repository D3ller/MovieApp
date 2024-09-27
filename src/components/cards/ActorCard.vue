<script setup>
import {Skeleton} from "@/components/ui/skeleton/index.js";

let props = defineProps({
  title: {
    type: String,
    required: false
  },
  format: {
    type: String,
    required: false,
    default: 'full',
    validator: (value) => ['compact', 'full'].includes(value)
  }
})
</script>

<template>
  <router-link to="/actors/leonardo-di-caprio" v-if="title && format === 'full'">
    <div class="flex flex-col gap-4 items-center">
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8yhDDv3b5ixR0-eeKOz9sfth6qlJxUFRuMk3fRJktRUVlO4fJ"
          class="w-60 h-60 rounded-full object-cover" alt="">
      <div class="flex flex-col gap-0.5 self-start"><h3 class="text-lg font-semibold">Leonardo Di Caprio</h3>
        <p class="text-sm text-gray-400">Ukrainian</p></div>
    </div>
  </router-link>
  <div v-else-if="!title && format === 'full'">
    <div class="flex flex-col gap-4 items-center">
<Skeleton class="w-60 h-60 rounded-full"></Skeleton>
      <div class="flex flex-col w-full gap-2">
        <Skeleton class="h-6 w-2/3"></Skeleton>
        <Skeleton class="h-3 w-1/3"></Skeleton>
      </div>

    </div>
    </div>

  <router-link to="/actors/leonardo-di-caprio" v-if="title && format === 'compact'" class="w-36 h-52 bg-amber-100 rounded-xl">
    {{title}}
  </router-link>
</template>

<style scoped>

</style>