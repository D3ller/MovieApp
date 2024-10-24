<script setup>
import {Button} from '@/components/ui/button'
import UserPreview from "@/components/user/userPreview.vue";
import {ref, watch} from "vue";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore();

watch(() => userStore.isLoggedIn, (value) => {
  connected.value = value;
})

let connected = ref(false);
let open = ref(false);
</script>

<template>
  <div class="p-4 ring-1 ring-gray-100">
    <div class="container md:flex hidden justify-between">
      <div class="flex space-x-3 items-center">
        <Button as-child variant="link">
            <router-link to="/">
            Accueil
            </router-link>
          </Button>
        <Button as-child variant="link">
            <router-link to="/movies">
            Films
            </router-link>
          </Button>
        <Button as-child variant="link">
          <router-link to="/categories">
            Catégories
            </router-link>
          </Button>
          <Button variant="link">
            <router-link to="/actors">
            Acteurs
            </router-link>
          </Button>
      </div>
      <div>
        <UserPreview v-if="connected"></UserPreview>
        <div v-else class="flex items-center space-x-3">
          <Button as-child variant="outline">
            <router-link to="/register">S'inscrire</router-link>
          </Button>
          <Button as-child>
            <router-link to="/login">Se connecter</router-link>
          </Button>
        </div>
      </div>
    </div>
    <div class="container md:hidden flex justify-end">
      <div class="flex flex-col gap-1 p-3.5 ring-1 ring-gray-200 rounded" @click="open = !open">
        <div :class="{ 'transform rotate-45 translate-y-1.5': open }" class="w-5 h-0.5 bg-black duration-300"></div>
        <div :class="{ 'opacity-0': open }" class="w-5 h-0.5 bg-black duration-300"></div>
        <div :class="{ 'transform -rotate-45 -translate-y-1.5': open }" class="w-5 h-0.5 bg-black duration-300"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>