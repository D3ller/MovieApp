<script setup>
import {inject, reactive} from "vue";
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import router from "@/router/index.js";
import axios from "axios";

let login = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  errorMessage: ''
})
const API_URL = inject('api_url')

let register = () => {
  try {

  const regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
  if(!regex.test(login.email)) {
    return login.errorMessage = 'Adresse email invalide';
  }

  if(login.password !== login.confirmPassword) {
    return login.errorMessage = "Les mots de passe ne correspondent pas"
  }

  const passwordReg = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?/~_+-=|\\\\]).{8,32}$');

  if (!passwordReg.test(login.password)) {
    return login.errorMessage = "Votre mot de passe doit contenir au moins un nombre, une majuscule et un caractère spécial";
  }

    login.errorMessage = ''

    axios.post(`${API_URL}/users`, {
      email: login.email,
      plainPassword: login.password
    }).then((e) => {
      if (e.status === 201) {
        router.push({path: `/login`, query: {register: true}})
      }
    }).catch((e) => {
      login.errorMessage = e.response.data.violations[0].message
    })

  } catch (e) {
    login.errorMessage = e.message
  }

}
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 aria-label="S'inscrire au site" class="text-center text-3xl font-bold">S'inscrire</h1>

    <Transition appear="">
      <Alert v-if="login.errorMessage" aria-live="assertive" class="mt-5" variant="destructive">
        <AlertTitle>Une erreur est survenue</AlertTitle>
        <AlertDescription>
          {{login.errorMessage}}
        </AlertDescription>
      </Alert>
    </Transition>

    <form class="flex flex-col gap-2.5 mt-4" @submit.prevent="register">
      <div class="grid w-full items-center gap-1.5">
        <Label class="font-semibold" for="email">Adresse email</Label>
        <Input id="email" v-model="login.email" aria-label="Adresse email" placeholder="Votre adresse email" required
               type="text"/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="password">Mot de passe</Label>
        <Input id="password" v-model="login.password" aria-label="Mot de passe" placeholder="Votre mot de passe"
               required type="password"/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="confirm_password">Confirmer le mot de passe</Label>
        <Input id="confirm_password" v-model="login.confirmPassword" aria-describedby="passwordHelp"
               aria-label="Confirmer le mot de passe" placeholder="Confirmer votre mot de passe" required
               type="password"/>
      </div>

      <router-link class="text-sm mt-4 hover:underline" to="/login">Vous avez déjà un compte ? Cliquez ici</router-link>

      <Button class="w-fit">S'inscrire</Button>

    </form>
  </div>
</template>

<style scoped>
</style>