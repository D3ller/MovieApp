<script setup>

import MovieCards from "@/components/cards/MovieCards.vue";
import { MagnifyingGlassIcon } from '@radix-icons/vue'
import { Input } from '@/components/ui/input'
import {ref} from "vue";
import {Button} from "@/components/ui/button/index.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

let search = ref('')
let addStatus = ref(false)

let films = [
  {title: 'Titanic', coverURL: 'https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2024/03/shutterstock_1837038775-1.jpg', year: 2023, slug: 'titanic'},
  {title: 'Inception', coverURL: 'https://www.screentune.com/wp-content/uploads/2023/10/Critique-Inception-2010-ScreenTune.jpg', year: 2008, slug: 'inception'},
  {title: 'Django Unchained', coverURL: 'https://media.gqmagazine.fr/photos/5dea6130061f7b00082f3405/16:9/w_2560%2Cc_limit/Djangounchained.jpg', year: 2012, slug: 'django-inception'},
  {title: 'The Revenant', coverURL: 'https://m.media-amazon.com/images/S/pv-target-images/7f49467e54e5639a175e4f0f3bffa565be6542aa08af7609da8eb351b1982d81._SX1080_FMjpg_.jpg', year: 2015, slug: 'the-revenant'},
  {title: 'Interstellar', coverURL: 'https://m.media-amazon.com/images/I/91kFYg4fX3L._SL1500_.jpg', year: 2014, slug: 'interstellar'},
  {title: 'The Dark Knight', coverURL: 'https://m.media-amazon.com/images/I/51AJQIk00GL._AC_SY679_.jpg', year: 2008, slug: 'the-dark-knight'},
  {title: 'Gladiator', coverURL: 'https://m.media-amazon.com/images/I/81Afz3qf1eL._SL1500_.jpg', year: 2000, slug: 'gladiator'},
  {title: 'The Matrix', coverURL: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg', year: 1999, slug: 'the-matrix'},
  {title: 'Avatar', coverURL: 'https://m.media-amazon.com/images/I/61OUGpU06eL._AC_SL1024_.jpg', year: 2009, slug: 'avatar'},
  {title: 'Pulp Fiction', coverURL: 'https://m.media-amazon.com/images/I/71c05L7MCQL._AC_SY679_.jpg', year: 1994, slug: 'pulp-fiction'},
  {title: 'The Shawshank Redemption', coverURL: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg', year: 1994, slug: 'the-shawshank-redemption'},
  {title: 'Fight Club', coverURL: 'https://m.media-amazon.com/images/I/81D+KJkO5bL._AC_SY679_.jpg', year: 1999, slug: 'fight-club'},
  {title: 'Forrest Gump', coverURL: 'https://m.media-amazon.com/images/I/61pK+14NbyL._AC_SL1000_.jpg', year: 1994, slug: 'forrest-gump'},
  {title: 'The Lord of the Rings: The Fellowship of the Ring', coverURL: 'https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg', year: 2001, slug: 'the-lord-of-the-rings-fellowship'}
];

let filter = ref(films);


let searchMovie = () => {
  if(search.value === '') {
    filter.value = films;
    return;
  }
  filter.value = films.filter((i) => i.title.toLowerCase().includes(search.value.toLowerCase()));
}

</script>

<template>
  <h1 class="text-2xl font-semibold">Tout les films <span v-if="filter.length > 0">({{filter.length}})</span></h1>

  <div class="flex items-center justify-between mt-10">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Rechercher" class="pl-10" v-model="search" @input="searchMovie()"/>
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
    </span>
    </div>

    <AlertDialog>
      <AlertDialogTrigger><Button variant="secondary">Ajouter un film</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ajouter un film</AlertDialogTitle>
          <AlertDialogDescription>
            <div class="grid w-full items-center gap-1.5">
              <Label for="title">Titre</Label>
              <Input id="title" type="text" placeholder="Rechercher"/>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction>Valider</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>

  <div class="grid grid-cols-12 gap-3 gap-y-6 mt-4" v-if="filter.length > 0">
    <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" v-for="(i, index) in filter">
      <MovieCards :key="i" :to="i.slug" :cover-u-r-l="i.coverURL" :title="i.title" :year="i.year"></MovieCards>
    </div>
  </div>

  <div class="mt-16" v-else>
    <p class="text-center text-gray-400">Aucun film trouvé</p>
  </div>

</template>

<style scoped>

</style>