<script setup>
import {inject, reactive} from "vue";
import Cookies from 'js-cookie';
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {Label} from "@/components/ui/label/index.js";
import {useRoute} from "vue-router";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert/index.js";
import axios from "axios";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";

const route = useRoute();
let API_URL = inject('api_url')
const userStore = useUserStore();
let login = reactive({
  email: "",
  password: "",
  errorMessage: ''
})

function setJwtToken(token) {
  Cookies.set('auth_token', token, {expires: 7});
}
let connect = () => {
  if (!login.email || !login.password) {
    return login.errorMessage = "Veuillez remplir tous les champs"
  }

  axios.post(`${API_URL.slice(0, -3)}auth`, {
    email: login.email,
    password: login.password
  }).then((e) => {
    setJwtToken(e.data.token)
    axios.defaults.headers.common = {'Authorization': `Bearer ${e.data.token}`}
    userStore.fetchUser(API_URL, e.data.token).then(() => {
      router.push({path: '/profile'})
    })
  })
}

if (userStore.user) {
  router.push({path: '/profile'})
}
</script>

<template>


  <div class="p-4 max-w-lg mx-auto">

    <Transition appear>
      <Alert v-if="route.query.register && !login.errorMessage">
        <AlertTitle>Compte créé</AlertTitle>
        <AlertDescription>
          Votre compte a été créé avec succès, veuillez vous connecter
        </AlertDescription>
      </Alert>
    </Transition>

    <Transition appear>
      <Alert v-if="route.query.redirect && !login.errorMessage">
        <AlertTitle>Connectez-vous</AlertTitle>
        <AlertDescription>
          Vous devez être connecté pour accéder à cette page
        </AlertDescription>
      </Alert>
    </Transition>

    <Transition appear>
      <Alert v-if="login.errorMessage" variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          {{ login.errorMessage }}
        </AlertDescription>
      </Alert>
    </Transition>

    <h1 class="text-center text-3xl font-bold mt-5">Se connecter</h1>

    <form class="flex flex-col gap-2.5 mt-10" @submit.prevent="connect">
      <div class="grid w-full items-center gap-1.5">
        <Label class="font-semibold" for="email">Adresse email</Label>
        <Input id="email" v-model="login.email" placeholder="Votre adresse email" type="text"/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="password">Mot de passe</Label>
        <Input id="password" v-model="login.password" placeholder="Votre mot de passe" type="password"/>
      </div>

      <RouterLink class="hover:underline text-sm w-fit" to="/forgot">Vous avez oublié votre mot de passe ?</RouterLink>

      <Button class="mt-6 w-fit">Se connecter</Button>

    </form>
  </div>
</template>

<style scoped>

</style>