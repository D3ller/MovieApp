<script setup>
import {Button} from "@/components/ui/button/index.js";
import {onMounted, onUnmounted} from "vue";

let props = defineProps({
  title: {
    default: 'Modal',
    type: String,
    required: false
  }
})

let emit = defineEmits(['closeMenu', 'submitForm'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

let click = () => {
  emit('closeMenu')
}

let submitForm = () => {
  emit('submitForm')
}
</script>

<template>
  <div class="h-screen w-screen bg-black bg-opacity-60 z-50 fixed top-0 left-0 flex items-center justify-center" @click="click"
       @keyup.esc="click">

    <div id="modal" class="max-w-2xl w-full h-fit bg-white rounded-xl p-8 mx-auto absolute overflow-y-auto" @click.stop>
      <h1 class="text-xl font-semibold mb-5">{{ props.title }}</h1>
      <slot></slot>

      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-3 mt-5">
        <Button @click="submitForm">Valider</Button>
        <Button variant="secondary" @click="click">Annuler</Button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>