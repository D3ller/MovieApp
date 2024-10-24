<script setup>
import {useUserStore} from "@/stores/user.js";
import {Button} from "@/components/ui/button/index.js";

const userStore = useUserStore();
const user = userStore.user;
</script>

<template>
  <h1 class="text-2xl font-bold">Votre profil</h1>
  <p><b>ID:</b> {{ user.id }}</p>
  <p><b>Email:</b> {{ user.email }}</p>

  <Button class="mt-5" variant="outline">Editer le profil</Button>
</template>

<style scoped>

</style>