<script lang="ts" setup>
import {Input} from "@/components/ui/input/index.js";
import {inject, ref} from "vue";
import axios from "axios";
import SearchSelectItem from "@/components/searchSelectItem.vue";
import {Badge} from "@/components/ui/badge";

const props = defineProps<{
  type: 'actors' | 'movies' | 'categories',
  selected: Array<{}>
}>()

let values = ['actors', 'movies', 'categories']
let emit = defineEmits(['updateResult'])
let API_URL = inject('api_url')
let string = ref('')
let result = ref(null)
let selected = ref(props.selected)
let arg = props.type === 'actors' ? 'firstname' : props.type === 'movies' ? 'title' : 'name'

let search = () => {

  if(!values.includes(props.type)) {
    return
  }

  if(string.value === '') {
    result.value = null
    return
  }

  axios.get(`${API_URL}/${props.type}?${arg}=${string.value}&itemsPerPage=2`).then((b) => {
    if(b.data && b.status === 200) {
      result.value = b.data.member
    }
  })
}
let updateResult = (e) => {
  selected.value.push(e)
  emit('updateResult', selected.value)
  result.value = null
  string.value = ''
}
</script>

<template>
<div class="relative">
  <Input v-model="string" :placeholder="'Ajouter un ' + props.type" @input="search"></Input>

  <div v-if="result" class="absolute top-12 left-0 z-[60] flex flex-col gap-3 w-full">
    <searchSelectItem v-for="i in result" :item="i" :type="props.type" @isClicked="updateResult"></searchSelectItem>
  </div>

  <div v-if="selected.length > 0" class="mt-2"><p class="text-[12px]">
    Vous avez sélectionné: {{ selected.length }} résultat<span v-if="selected.length > 1">s</span>

  </p>

    <div class="flex overflow-x-auto mt-2">
      <Badge v-for="(i,index) in selected" :key="index" class="mr-2" @click="selected.splice(index, 1)">{{ i[arg] }}</Badge>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>