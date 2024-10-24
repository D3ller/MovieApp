<script setup>
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {MagnifyingGlassIcon} from "@radix-icons/vue";
import {inject, reactive, ref} from "vue";
import axios from "axios";
import ActorCard from "@/components/cards/ActorCard.vue";
import {nationalities} from "../../public/nationality.js";
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
import Modal from "@/components/modal.vue";
import {Label} from "@/components/ui/label/index.js";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
let api_url = inject('api_url')
let search = ref(null)
let actors = ref(null)
let pages = ref({
  current: 1,
  last: 1,
  search: false,
})
let addModel = reactive({
  visible: false,
  firstname: '',
  lastname: '',
  bio: '',
  awards: '',
  gender: 'homme',
  dob: new Date(),
  deathDate: '',
  nationality: ''
})


let getActors = () => {
  axios.get(`${api_url}/actors`).then((e) => {
    actors.value = e.data.member;

    console.log(actors.value)
    pages.value.last = Number.parseInt(e.data.view.last.at(-1))
    pages.value.current = 1
  })
}
let searchActors = () => {
  if (search.value === '') {
    axios.get(`${api_url}/actors${pages.value.current > 1 ? `?page=${pages.value.current}` : ''}`)
        .then((response) => {
          actors.value = response.data.member
          pages.value.search = false
        })
    return
  }
  axios.get(`${api_url}/actors${search.value.split(' ').length > 1 ? `?firstname=${search.value.split(' ')[0]}&lastname=${search.value.split(' ')[1]}` : `?firstname=${search.value}`}`)
      .then((response) => {
        console.log(response.data)
        pages.value.search = true
        actors.value = response.data.member
      })
}
/**
 *
 * @param i {number} - Page number
 */
let updatePage = (i) => {
  if (i < 1 || i > pages.value.last) {
    return
  }

  axios.get(`${api_url}/actors?page=${i}${search.value ? `&title=${search.value}` : ''}`)
      .then((response) => {
        actors.value = response.data.member
        pages.value.current = i
      })
}
let addActor = () => {
  axios.post(`${api_url}/actors`, {
    firstname: addModel.firstname,
    lastname: addModel.lastname,
    bio: addModel.bio,
    awards: addModel.awards,
    dob: new Date(addModel.dob).toISOString(),
    gender: addModel.gender,
    nationality: addModel.nationality
  }).then((b) => {
    if (b.status === 201) {
      getActors()
      addModel.visible = false
    }
  })
}

getActors()
</script>

<template>
  <h1 class="text-2xl font-semibold">Tout les acteurs</h1>

  <modal v-if="addModel.visible" title="Ajouter un acteur" @closeMenu="addModel.visible = false" @submitForm="addActor">
    <div class="flex max-md:flex-col items-start gap-6">
      <div class="w-full md:w-1/2">
        <div class="grid w-full items-center gap-3">
          <Label for="title">Prénom</Label>
          <Input id="prenom" v-model="addModel.firstname" placeholder="Prénom" type="text"/>
        </div>

        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Nom</Label>
          <Input id="nom" v-model="addModel.lastname" placeholder="Nom" type="text"/>
        </div>

        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Biographie</Label>
          <Input id="bio" v-model="addModel.bio" placeholder="Biographie" type="text"/>
        </div>

        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Date de naissance</Label>
          <Input id="dob" v-model="addModel.dob" placeholder="Date de naissance" type="date"/>
        </div>

      </div>

      <div class="w-full md:w-1/2">
        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Récompenses</Label>
          <Input id="awards" v-model="addModel.awards" max="100" min="0" placeholder="Récompenses" type="number"/>
        </div>

        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="genre">Genre</Label>
          <div class="flex gap-3">
            <div class="flex items-center gap-2">
              <Input id="male" v-model="addModel.gender" name="genre" type="radio" value="homme" />
              <Label for="male">Homme</Label>
            </div>
            <div class="flex items-center gap-2">
              <Input id="female" v-model="addModel.gender" name="genre" type="radio" value="femme" />
              <Label for="female">Femme</Label>
            </div>
          </div>
        </div>


        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Nationalité</Label>
          <select v-model="addModel.nationality" class="w-full p-2 rounded-md border border-gray-300">
            <option v-for="i in nationalities" :key="i.code" :value="i.code">{{ i.country }}</option>
          </select>
        </div>

        <div class="grid w-full items-center gap-3 mt-5">
          <Label for="title">Date de décès</Label>
          <Input id="deathDate" v-model="addModel.deathDate" placeholder="Date de décès" type="date"/>
        </div>
      </div>
    </div>

  </modal>

  <div class="flex items-center justify-between mt-10">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" v-model="search" class="pl-10" placeholder="Rechercher" type="text" @input="searchActors()"/>
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
    </span>
    </div>

    <Button v-if="userStore.isLoggedIn" variant="secondary" @click="addModel.visible = true">Ajouter un acteur</Button>

  </div>

  <div class="grid grid-cols-12 gap-6 mt-8">
    <div v-for="i in actors" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <ActorCard :key="i" :nationality="nationalities.filter((e) => e.code === i.nationality)"
                 :title="i.firstname + ' ' + i.lastname" :to="i.id"></ActorCard>
    </div>
  </div>

  <Pagination v-if="pages.last && actors?.length > 0 && !pages.search" v-slot="{ page }" :default-page="pages.current"
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