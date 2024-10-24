<script setup>

import {Input} from "@/components/ui/input/index.js";
import {MagnifyingGlassIcon} from "@radix-icons/vue";
import {Button} from "@/components/ui/button/index.js";
import Modal from "@/components/modal.vue";
import {inject, ref} from "vue";
import axios from "axios";

let api_url = inject('api_url');

let search = ref(null);
let categories = ref(null);
let filter = ref(null);

let searchCategory = () => {
  if (search.value === '') {
    filter.value = categories.value;
    return;
  }
  filter.value = categories.value.filter((i) => i.title.toLowerCase().includes(search.value.toLowerCase()));
}
let getCategories = () => {
  axios.get(`${api_url}/categories`)
      .then((response) => {
        categories.value = response.data.member
        console.log(categories.value)
        filter.value = categories.value
      })
      .catch((error) => {
        console.error(error)
      })
}

getCategories()
</script>

<template>
  <h1 class="text-2xl font-semibold">Tout les catégories</h1>

  <div class="flex items-center justify-between mt-10">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" v-model="search" class="pl-10" placeholder="Rechercher" type="text" @input="searchCategory()"/>
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
    </span>
    </div>

    <Button variant="secondary">Ajouter une catégorie</Button>
  </div>

  <div class="grid grid-cols-12 gap-3 gap-y-3 mt-4">
    <RouterLink v-for="i in filter"
                :key="i.title"
                :to="'/category/'+i.id"
                class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-32 rounded-xl flex justify-center items-center text-lg font-semibold bg-blue-400"
    >{{ i.title }}
    </RouterLink>
  </div>
</template>

<style scoped>

</style>