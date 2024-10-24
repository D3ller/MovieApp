<script setup>
let props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
})

let emit = defineEmits(['isClicked'])

let click = () => {
  emit('isClicked', props.item)
}
</script>

<template>
  <div v-if="type === 'actors'" class="bg-[#f1f5f9] p-2 text-sm rounded-xl ring-1 ring-gray-200 ring-opacity-80" @click="click">
    {{item.firstname + ' ' + item.lastname}}
  </div>

  <div v-if="type === 'movies'" class="bg-[#f1f5f9] p-2 text-sm rounded-xl ring-1 ring-gray-200 ring-opacity-80" @click="click">
    {{item.title}}
  </div>
</template>

<style scoped>

</style>