<script setup>
import MovieCards from "@/components/cards/MovieCards.vue";
import {MagnifyingGlassIcon} from '@radix-icons/vue'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {inject, reactive, ref} from "vue";
import {Button} from "@/components/ui/button/index.js";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import axios from "axios";
import Modal from "@/components/modal.vue";
import SearchSelect from "@/components/searchSelect.vue";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const variableGlobale = inject('api_url');
const modal = ref(false)

let search = ref('')
let films = ref(null);
let pages = reactive({
  current: 1,
  last: 1,
  search: false,
})

let addMovieInput = reactive({
  title: '',
  director: '',
  online: false,
  releaseAt: new Date(),
  notation: 0.0,
  actors: []
})

let loadMovies = () => {
  axios.get(`${variableGlobale}/movies`)
      .then((response) => {
        films.value = response.data.member
        pages.last = Number.parseInt(response.data.view.last.at(-1));
        pages.current = 1
      })
      .catch((error) => {
        console.error(error)
      })
}
/**
 *
 * @param i {number} Page number
 */
let updatePage = (i) => {
  if (i < 1 || i > pages.last) {
    return
  }

  axios.get(`${variableGlobale}/movies?page=${i}${search.value ? `&title=${search.value}` : ''}`)
      .then((response) => {
        films.value = response.data.member
        pages.current = i
      })
      .catch((error) => {
        console.error(error)
      })
}
let searchMovie = () => {
  if(search.value === '') {
    console.log(pages)
    axios.get(`${variableGlobale}/movies${pages.current > 1 ? `?page=${pages.current}` : ''}`)
        .then((response) => {
          films.value = response.data.member
          pages.search = false
          pages.last = Number.parseInt(response.data.view.last.at(-1));
        })
        .catch((error) => {
          console.error(error)
        })
    return;
  }

  axios.get(`${variableGlobale}/movies?title=${search.value}`)
      .then((response) => {
        films.value = response.data.member
        pages.search = true
      })
      .catch((error) => {
        console.error(error)
      })
}
let submitForm = () => {
  console.log(addMovieInput)
  axios.post(`${variableGlobale}/movies`, {
    title: addMovieInput.title,
    director: addMovieInput.director,
    release_date: addMovieInput.releaseAt,
    online: addMovieInput.online,
    created_at: new Date(),
    rating: addMovieInput.notation,
    media: `https://via.placeholder.com/640x480.png/0055dd?text=${addMovieInput.title.replace(/[^a-zA-Z0-9]/g, '-')}`,
    actors: addMovieInput.actors.map((i) => '/api/actors/'+i.id)
  }).then((b) => {
    if (b.data && b.status === 201) {
      loadMovies()
      modal.value = false
    }
  })
}
/**
 *
 * @param array - {object[]} Tableau d'acteurs
 */
let updateSelected = (array) => {
  addMovieInput.actors = array
}

loadMovies()

</script>

<template>
  <h1 class="text-2xl font-semibold">Tout les films</h1>


  <Transition appear>
    <modal v-if="modal" title="Ajouter un film" @closeMenu="modal = false" @submitForm="submitForm">
      <div class="flex max-md:flex-col items-start gap-6">
        <div class="w-full md:w-1/2">
          <div class="grid w-full items-center gap-3">
            <Label for="title">Titre</Label>
            <Input id="title" v-model="addMovieInput.title" placeholder="Titre" type="text"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="realisateur">Réalisateur</Label>
            <Input id="realisateur" v-model="addMovieInput.director" placeholder="Réalisateur" type="text"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="date">Date de sortie</Label>
            <Input id="date" v-model="addMovieInput.releaseAt" placeholder="Date de sortie" type="date"/>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="grid w-full items-center gap-3">
            <Label for="notation">Notation</Label>
            <Input id="notation" v-model="addMovieInput.notation" max="5" placeholder="Notation" step="0.1"
                   type="number"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label>Acteur(s) - 2 résultats affichés</Label>
            <searchSelect :selected="[]" type="actors" @updateResult="updateSelected"></searchSelect>
          </div>
        </div>
      </div>
    </modal>
  </Transition>

  <div class="flex items-center justify-between mt-10 gap-2">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" v-model="search" class="pl-10" placeholder="Rechercher" type="text" @input="searchMovie()"/>
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
    </span>
    </div>

    <Button v-if="userStore.isLoggedIn" variant="secondary" @click="modal = true">Ajouter un film</Button>
  </div>

  <div v-if="films?.length > 0" class="grid grid-cols-12 gap-3 gap-y-6 mt-4">
    <div v-for="(i) in films" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <MovieCards :key="i" :cover-u-r-l="i.media" :title="i.title" :to="parseInt(i.id)"
                  :year="i.releaseDate"></MovieCards>
    </div>
  </div>

  <div v-else class="mt-16">
    <p class="text-center text-gray-400">Aucun film trouvé</p>
  </div>

  <Pagination v-if="pages.last && films?.length > 0 && !pages.search" v-slot="{ page }" :default-page="pages.current"
              :sibling-count="pages.current" :total="pages.last*10"
              class="mt-10" show-edges>
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="updatePage(1)"/>
      <PaginationPrev @click="updatePage(pages.current-1)"/>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child
                            @click="updatePage(item.value)">
          <Button :variant="item.value === page ? 'default' : 'outline'" class="w-10 h-10 p-0">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index"/>
      </template>

      <PaginationNext @click="updatePage(pages.current+1)"/>
      <PaginationLast @click="updatePage(pages.last)"/>
    </PaginationList>
  </Pagination>

</template>

<style scoped>

</style>