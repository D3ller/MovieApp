<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {inject, reactive, ref} from "vue";
import MovieCards from "@/components/cards/MovieCards.vue";
import {nationalities} from "../../public/nationality.js";
import {Button} from "@/components/ui/button/index.js";
import Modal from "@/components/modal.vue";
import {Label} from "@/components/ui/label/index.js";
import {Input} from "@/components/ui/input/index.js";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const route = useRoute()
const id = route.params.id;
const api_url = inject('api_url')
let actor = ref(null)
let movie = ref([])
let more = ref(false)
let modal = reactive({
  delete: false,
  edit: {
    visible: false,
    firstname: '',
    lastname: '',
    bio: '',
    awards: '',
    gender: 'homme',
    dob: new Date(),
    deathDate: '',
    nationality: ''
  }
})

let getActor = () => {
  axios.get(`${api_url}/actors/${id}`).then((e) => {
    console.log(e)
    actor.value = e.data
    modal.edit.firstname = actor.value.firstname
    modal.edit.lastname = actor.value.lastname
    modal.edit.bio = actor.value.bio
    modal.edit.awards = actor.value.awards
    modal.edit.dob = actor.value.dob.substring(0,10)
    modal.edit.gender = actor.value.gender
    modal.edit.nationality = actor.value.nationality
    modal.edit.deathDate = actor.value.deathDate.substring(0,10)
    if (e.data.movies?.length > 0) {
      e.data.movies.forEach((i) => {
        axios.get(`${api_url}/movies/${i.slice(12)}`).then((e) => {
          movie.value.push(e.data)
        })
      })
    }
  })
}
let editActor = () => {
  axios.patch(`${api_url}/actors/${id}`, {
    firstname: modal.edit.firstname,
    lastname: modal.edit.lastname,
    bio: modal.edit.bio,
    awards: modal.edit.awards,
    gender: modal.edit.gender,
    dob: modal.edit.dob,
    nationality: modal.edit.nationality
  }, {
  headers: {
    'Content-Type': 'application/merge-patch+json',
  }
  }).then((e) => {
    if(e.status === 200) {
      window.location.reload()
    }
  })
}
let deleteActor = () => {
  axios.delete(`${api_url}/actors/${id}`).then((e) => {
    if(e.status === 204) {
      router.push('/actors')
    }
  })
}
let extend = () => {
  more.value = !more.value
}
getActor()
</script>

<template>
  <div v-if="actor">

    <modal v-if="modal.edit.visible" title="Ajouter un acteur" @closeMenu="modal.edit.visible = false" @submitForm="editActor">
      <div class="flex max-md:flex-col items-start gap-6">
        <div class="w-full md:w-1/2">
          <div class="grid w-full items-center gap-3">
            <Label for="title">Prénom</Label>
            <Input id="prenom" v-model="modal.edit.firstname" placeholder="Prénom" type="text"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Nom</Label>
            <Input id="nom" v-model="modal.edit.lastname" placeholder="Nom" type="text"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Biographie</Label>
            <Input id="bio" v-model="modal.edit.bio" placeholder="Biographie" type="text"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Date de naissance</Label>
            <Input id="dob" v-model="modal.edit.dob" placeholder="Date de naissance" type="date"/>
          </div>

        </div>

        <div class="w-full md:w-1/2">
          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Récompenses</Label>
            <Input id="awards" v-model="modal.edit.awards" max="100" min="0" placeholder="Récompenses" type="number"/>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="genre">Genre</Label>
            <div class="flex gap-3">
              <div class="flex items-center gap-2">
                <Input id="male" v-model="modal.edit.gender" name="genre" type="radio" value="homme" />
                <Label for="male">Homme</Label>
              </div>
              <div class="flex items-center gap-2">
                <Input id="female" v-model="modal.edit.gender" name="genre" type="radio" value="femme" />
                <Label for="female">Femme</Label>
              </div>
            </div>
          </div>


          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Nationalité</Label>
            <select v-model="modal.edit.nationality" class="w-full p-2 rounded-md border border-gray-300">
              <option v-for="i in nationalities" :key="i.code" :value="i.code">{{ i.country }}</option>
            </select>
          </div>

          <div class="grid w-full items-center gap-3 mt-5">
            <Label for="title">Date de décès</Label>
            <Input id="deathDate" v-model="modal.edit.deathDate" placeholder="Date de décès" type="date"/>
          </div>
        </div>
      </div>

    </modal>
    <modal v-if="modal.delete" title="Supprimer un acteur" @closeMenu="modal.delete = false" @submitForm="deleteActor"></modal>


    <div class="flex max-sm:flex-col max-sm:gap-3 max-sm:mb-3  justify-between"><h1 class="text-4xl font-bold">{{ actor.firstname + ' ' + actor.lastname }}</h1>

      <div v-if="userStore.isLoggedIn" class="flex gap-3">
        <Button @click="modal.edit.visible = true">Editer</Button>
        <Button variant="outline" @click="modal.delete = true">Supprimer</Button>
      </div>

    </div>
    <p class="text-sm text-gray-500 mt-2">
      {{ nationalities.find((e) => e.code === actor.nationality)?.country ?? 'Nationalité inconnue' }}</p>
    <p class="mt-4">{{ more ? actor.bio : actor.bio.substring(0, 355) }}</p>
    <span v-if="actor.bio.length > 355" class="text-sm text-gray-400 hover:underline cursor-pointer"
          @click="extend()">{{ more ? 'Réduire' : 'Lire plus' }}</span>

    <div v-if="movie.length > 0" class="grid grid-cols-12 gap-3 gap-y-6 mt-8">
      <div v-for="(i) in movie" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <MovieCards :key="i" :cover-u-r-l="i.media" :title="i.title" :to="i.id" :year="i.releaseDate"></MovieCards>
      </div>
    </div>

    <div v-else class="mt-16">
      <p class="text-center text-gray-400">Aucun film trouvé
      </p>
    </div>

  </div>


</template>

<style scoped>

</style>