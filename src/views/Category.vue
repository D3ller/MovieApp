<script setup>
import {useRoute} from "vue-router";
import MovieCards from "@/components/cards/MovieCards.vue";
import {inject, reactive, ref} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import Modal from "@/components/modal.vue";
import {useUserStore} from "@/stores/user.js";
import {Button} from "@/components/ui/button/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Input} from "@/components/ui/input/index.js";
import SearchSelect from "@/components/searchSelect.vue";

const userStore = useUserStore()
const route = useRoute()
const id = route.params.id.replace('-', ' ')
let api_url = inject('api_url')
let films = ref([])
let category_data = ref(null)

let modal = reactive({
  edit: {
    visible: false,
    title: '',
    movies: []
  },
  delete: false
})
let getCategory = () => {
  axios.get(`${api_url}/categories/${id}`).then((res) => {
    category_data.value = res.data
    res.data.movies.forEach(e => {
      axios.get(`${api_url}/movies/${e.substring(12)}`).then((e) => {
        films.value.push(e.data)
        modal.edit.movies.push(e.data)
      })
    })
  }).catch((e) => {
    router.push('/404')
  })
}
let deleteCategory = () => {
  if(films.value.length > 0) {
    modal.delete = false
    return alert('Vous ne pouvez pas supprimer une catégorie qui contient des films')
  }

  axios.delete(`${api_url}/categories/${id}`).then(() => {
    router.push('/categories')
  })
}
let editCategory = () => {
  axios.patch(`${api_url}/categories/${id}`, {
    title: modal.edit.title,
    movies: modal.edit.movies.map(e => '/api/movies/'+e.id)
  }, {
headers: {
  "Content-Type": "application/merge-patch+json"
}
  }).then(() => {

    window.location.reload()
  })
}

getCategory()
</script>

<template>
  <div v-if="category_data">

    <Transition appear>
      <Modal v-if="modal.delete" title="Supprimer une catégorie" @closeMenu="modal.delete = false" @submitForm="deleteCategory"/>
    </Transition>

    <Transition appear>
      <Modal v-if="modal.edit.visible" title="Editer une catégorie" @closeMenu="modal.edit.visible = false" @submitForm="editCategory">
        <div class="flex flex-col gap-3">
          <Label>Titre</Label>
          <Input v-model="modal.edit.title"></Input>
          <Label>Films</Label>
          <SearchSelect :selected="modal.edit.movies" class="mb-10" type="movies"></SearchSelect>
        </div>
      </Modal>
    </Transition>

    <div :class="{
      'justify-between': userStore.isLoggedIn,
      'justify-center': !userStore.isLoggedIn
    }" class="flex"><h1 class="text-center text-4xl font-bold capitalize">{{ category_data.title }}</h1>
      <div v-if="userStore.isLoggedIn" class="flex gap-3">
        <Button @click="modal.edit.visible = true">Editer</Button>
        <Button variant="outline" @click="modal.delete = true">Supprimer</Button>
      </div>
    </div>

    <div v-if="films.length > 0" class="grid grid-cols-12 gap-3 gap-y-6 mt-8">
      <div v-for="(i, index) in films" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <MovieCards :key="i" :cover-u-r-l="i.media" :title="i.title" :to="i.id" :year="i.releaseDate"></MovieCards>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>