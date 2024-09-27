<script setup>
import MovieCards from "@/components/cards/MovieCards.vue";
import {Button} from "@/components/ui/button/index.js";
import ActorCard from "@/components/cards/ActorCard.vue";

let films = [
  {title: 'Titanic', coverURL: 'https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2024/03/shutterstock_1837038775-1.jpg', year: 2023, slug: 'titanic'},
  {title: 'Inception', coverURL: 'https://www.screentune.com/wp-content/uploads/2023/10/Critique-Inception-2010-ScreenTune.jpg', year: 2008, slug: 'inception'},
  {title: 'Django Unchained', coverURL: 'https://media.gqmagazine.fr/photos/5dea6130061f7b00082f3405/16:9/w_2560%2Cc_limit/Djangounchained.jpg', year: 2012, slug: 'django-inception'},
  {title: 'The Revenant', coverURL: 'https://m.media-amazon.com/images/S/pv-target-images/7f49467e54e5639a175e4f0f3bffa565be6542aa08af7609da8eb351b1982d81._SX1080_FMjpg_.jpg', year: 2015, slug: 'the-revenant'},
]
</script>

<template>
  <div class="flex justify-between items-center"><h1 class="text-2xl font-semibold">Film récents</h1>

    <Button variant="secondary" as-child><router-link to="/movies">Voir plus</router-link></Button>
  </div>

  <div class="grid grid-cols-12 space-x-3 mt-4">
    <div class="col-span-3" v-for="(i, index) in films">
      <MovieCards :key="i" :to="i.slug" :cover-u-r-l="i.coverURL" :title="i.title" :year="i.year"></MovieCards>
    </div>
  </div>

  <div class="flex justify-between items-center mt-20"><h1 class="text-2xl font-semibold">Acteurs ajoutés</h1>

    <Button variant="secondary" as-child><router-link to="/actors">Voir plus</router-link></Button>
  </div>

  <div class="grid grid-cols-12 mt-4">
    <div class="col-span-3" v-for="(i, index) in 4">
      <ActorCard :key="i"></ActorCard>
    </div>
  </div>


</template>
