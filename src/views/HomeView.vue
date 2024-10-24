<script setup>
import MovieCards from "@/components/cards/MovieCards.vue";
import {Button} from "@/components/ui/button/index.js";
import ActorCard from "@/components/cards/ActorCard.vue";
import axios from "axios";
import {inject, ref} from "vue";

const api_url = inject('api_url')
let films = ref(null)
let actors = ref(null)

let getMoviesAndActors = () => {
  axios.get(`${api_url}/movies?itemsPerPage=4`).then((e) => {
    films.value = e.data.member
  })

  axios.get(`${api_url}/actors?itemsPerPage=4`).then((e) => {
    actors.value = e.data.member
    console.log(actors.value)
  })
}

getMoviesAndActors()
</script>

<template>
  <div class="flex justify-between items-center"><h1 class="text-2xl font-semibold">Film récents</h1>

    <Button as-child variant="secondary">
      <router-link to="/movies">Voir plus</router-link>
    </Button>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div v-for="(i, index) in films" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <MovieCards :key="i" :cover-u-r-l="i.media" :title="i.title" :to="i.id" :year="i.releaseDate"></MovieCards>
    </div>
  </div>

  <div class="flex justify-between items-center mt-20"><h1 class="text-2xl font-semibold">Acteurs ajoutés</h1>

    <Button as-child variant="secondary">
      <router-link to="/actors">Voir plus</router-link>
    </Button>
  </div>

  <div class="grid grid-cols-12 mt-5 gap-6">
    <div v-for="(i, index) in actors" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <ActorCard :key="i" :title="i.firstname + ' ' + i.lastname" :to="i.id"></ActorCard>
    </div>
  </div>


</template>
