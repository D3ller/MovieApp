<script setup>
import {reactive} from "vue";
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {Label} from "@/components/ui/label/index.js";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import router from "@/router/index.js";

let login = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  errorMessage: ''
})

let register = () => {

  const regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
  if(!regex.test(login.email)) {
    login.errorMessage = 'Adresse email invalide';
  }

  if(login.password !== login.confirmPassword) {
    login.errorMessage = "Les mots de passe ne correspondent pas"
  }

  const passwordReg = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?/~_+-=|\\\\]).{8,32}$');

  if (!passwordReg.test(login.password)) {
    login.errorMessage = "Votre mot de passe doit contenir au moins un nombre, une majuscule et un caractère spécial";
  }

  console.log('C bon')
  //axios.post
  router.push({ path: `/login`, query: {register: true} })

}
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-center text-3xl font-bold" aria-label="S'inscrire au site">S'inscrire</h1>

    <Transition appear="">
      <Alert variant="destructive" class="mt-5" aria-live="assertive" v-if="login.errorMessage">
        <AlertTitle>Une erreur est survenue</AlertTitle>
        <AlertDescription>
          {{login.errorMessage}}
        </AlertDescription>
      </Alert>
    </Transition>

    <form class="flex flex-col gap-2.5 mt-4" @submit.prevent="register">
      <div class="grid w-full items-center gap-1.5">
        <Label class="font-semibold" for="email">Adresse email</Label>
        <Input id="email" type="text" placeholder="Votre adresse email" v-model="login.email" aria-label="Adresse email" required/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="password">Mot de passe</Label>
        <Input id="password" type="password" placeholder="Votre mot de passe" v-model="login.password" aria-label="Mot de passe" required/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="confirm_password">Confirmer le mot de passe</Label>
        <Input id="confirm_password" type="password" placeholder="Confirmer votre mot de passe" v-model="login.confirmPassword" aria-label="Confirmer le mot de passe" aria-describedby="passwordHelp" required/>
      </div>

      <router-link class="text-sm mt-4 hover:underline" to="/login">Vous avez déjà un compte ? Cliquez ici</router-link>

      <Button class="w-fit">S'inscrire</Button>

    </form>
  </div>
</template>

<style scoped>
</style>