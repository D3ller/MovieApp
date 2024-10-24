<script setup>
import {useRoute} from "vue-router";
import ActorCard from "@/components/cards/ActorCard.vue";
import Slider from "@/components/slider.vue";
import {Badge} from "@/components/ui/badge/index.js";
import {Button} from "@/components/ui/button/index.js";
import axios from "axios";
import {inject, reactive, ref} from "vue";
import {Pencil2Icon, StarFilledIcon, Cross1Icon} from '@radix-icons/vue'
import Modal from "@/components/modal.vue";
import {Label} from "@/components/ui/label/index.js";
import {Input} from "@/components/ui/input/index.js";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";
import SearchSelect from "@/components/searchSelect.vue";
const userStore = useUserStore()

let API_URL = inject('api_url')
const route = useRoute()
let id = route.params.id.replace('-', ' ')
let data = ref(null)
let modal = reactive({
  delete: false,
  edit: false,
  editInput: {
    title: '',
    director: '',
    releaseAt: new Date(),
    note: 0.0
  }
})
let categories = ref([])
let actors = ref([])
let newActors = ref([])
let rating = ref(null)

let getMovie = () => {
  axios.get(`${API_URL}/movies/${route.params.id}`)
      .then((response) => {
        data.value = response.data
        rating.value = (response.data.rating / 5) * 10
        console.log(rating.value)
        modal.editInput.title = response.data.title
        modal.editInput.director = response.data.director
        modal.editInput.releaseAt = response.data.releaseDate.substring(0, 10)
        modal.editInput.note = response.data.rating
        console.log(modal.editInput.releaseAt)
        response.data.categories.forEach((i) => {
          console.log(i)
          axios.get(`${API_URL}/categories/${i.slice(16)}`)
              .then((response) => {
                categories.value.push({id: response.data.id, name: response.data.title})
              })
              .catch((error) => {
                console.error(error)
              })
        })
        response.data.actors.forEach((i) => {
          axios.get(`${API_URL}/actors/${i.slice(12)}`)
              .then((response) => {
                actors.value.push(response.data)
                newActors.value.push(response.data)
              })
              .catch((error) => {
                console.error(error)
              })
        })
      })
      .catch((error) => {
        console.error(error)
      })
}
let deleteMovie = () => {
  axios.delete(`${API_URL}/movies/${route.params.id}`).then((b) => {
    if(b.status === 204) {
      router.push('/movies')
    }
  })
}
let updateMovie = () => {
  axios.patch(`${API_URL}/movies/${route.params.id}`, {
    title: modal.editInput.title,
    director: modal.editInput.director,
    releaseDate: modal.editInput.releaseAt,
    rating: modal.editInput.note,
    actors: newActors.value.map((i) => i['@id'])
  }, {
  headers: {
    'Content-Type': 'application/merge-patch+json'
  }
  }).then((b) => {
    if(b.status === 200) {
      window.location.reload()
      modal.edit = false
    }
  })
}

getMovie()
</script>

<template>
  <div v-if="data">

    <Transition appear>
      <modal v-if="modal.edit" title="Editer un film" @closeMenu="modal.edit = false" @submitForm="updateMovie">
        <div class="flex max-md:flex-col items-start gap-6">
          <div class="w-full md:w-1/2">
            <div class="grid w-full items-center gap-3">
              <Label for="title">Titre</Label>
              <Input id="title" v-model="modal.editInput.title" placeholder="Titre" type="text"/>
            </div>

            <div class="grid w-full items-center gap-3 mt-5">
              <Label for="realisateur">Réalisateur</Label>
              <Input id="realisateur" v-model="modal.editInput.director" placeholder="Réalisateur" type="text"/>
            </div>

            <div class="grid w-full items-center gap-3 mt-5">
              <Label for="date">Date de sortie</Label>
              <Input id="date" v-model="modal.editInput.releaseAt" placeholder="Date de sortie" type="date"/>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <div class="grid w-full items-center gap-3">
              <Label for="note">Note</Label>
              <Input id="note" v-model="modal.editInput.note" max="5" placeholder="Note" step="0.1" type="number"/>
            </div>

            <div class="grid w-full items-center gap-3 mt-5">
              <Label>Acteur(s) - 2 résultats affichés</Label>
              <searchSelect :selected="newActors" type="actors"></searchSelect>
            </div>
          </div>
        </div>
      </modal>
    </Transition>

    <modal v-if="modal.delete" title="Supprimer un film" @closeMenu="modal.delete = false" @submitForm="deleteMovie"></modal>


    <div
        class="w-full h-80 bg-amber-100 relative after:absolute rounded-t-xl after:bg-gradient-to-b after:from-transparent after:to-white after:w-full after:h-full overflow-hidden group">

      <div v-if="userStore.isLoggedIn" class="w-10 h-10 absolute cursor-pointer rounded-full top-5 right-20 opacity-0 group-hover:opacity-100 duration-300 bg-black z-10 hidden md:flex justify-center items-center text-white"
           @click="modal.edit = true">
        <Pencil2Icon class="w-5 h-5"></Pencil2Icon>
      </div>

      <div v-if="userStore.isLoggedIn" class="w-10 h-10 absolute cursor-pointer rounded-full top-5 right-5 opacity-0 group-hover:opacity-100 duration-300 bg-black z-10 hidden md:flex justify-center items-center text-white"
          @click="modal.delete = true">
        <Cross1Icon class="w-5 h-5"></Cross1Icon>
      </div>


      <h1 class="p-4 text-2xl md:text-3xl lg:text-4xl font-bold capitalize absolute bottom-0 z-10">{{ data.title }}</h1>
      <img :src="data.media" alt=""
           class="w-full h-full object-cover absolute">
    </div>

    <div v-if="userStore.isLoggedIn" class="grid grid-cols-2 gap-3 md:hidden mt-5">
      <Button class="col-span-1" @click="modal.edit = true">Editer</Button>
      <Button class="col-span-1" variant="outline" @click="modal.delete = true">Supprimer</Button>
    </div>

    <div v-if="categories" class="mt-5 flex flex-wrap gap-2">
      <RouterLink v-for="i in categories" :to="'/category/'+i.id">
        <Badge>{{ i.name }}</Badge>
      </RouterLink>
    </div>

    <div class="flex max-md:flex-col gap-10 mt-5">

      <div v-if="rating" class="flex flex-col gap-3">
        <h2 class="text-xl font-semibold">Notation</h2>
        <div class="w-fit h-fit relative">
          <span :style="{color: rating > 5 ? '#00cc66' : Math.round(rating) > 3 ? '#ffcc00' : '#ff3300'}"
                class="absolute flex gap-1.5 items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">{{
              rating.toFixed(1)
            }}<StarFilledIcon class="w-6 h-6"></StarFilledIcon></span>
          <svg class="m-auto" height="140" viewBox="0 0 100 100" width="140">
            <circle :fill="rating > 5 ? '#dcfce7' : Math.round(rating) > 3 ? '#fef9c3' : '#fec3c3'"
                    :stroke="rating > 5 ? '#00cc66' : Math.round(rating) > 3 ? '#ffcc00' : '#ff3300'"
                    :stroke-dashoffset="1-(rating/10)"
                    cx="50"
                    cy="50"
                    pathLength="1"
                    r="45"
                    stroke-dasharray="1"
                    stroke-linecap="round"
                    stroke-width="7"
                    transform="rotate(-90 50 50)"></circle>
          </svg>
        </div>
      </div>
      <slider v-if="actors.length > 0" title="Acteurs">
        <template #content>
          <ActorCard v-for="i in actors" :key="i.id" :title="i.firstname + ' ' + i.lastname" :to="i.id"
                     format="compact"></ActorCard>
        </template>
      </slider>

      <div v-else>
        <h2 class="text-xl font-semibold">Acteurs</h2>
        <p>Aucun acteur n'est associé à ce film</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>