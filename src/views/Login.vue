<script setup>
import {reactive} from "vue";
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import {Label} from "@/components/ui/label/index.js";

import * as v from '@valibot/valibot';

const LoginSchema = v.object({
  email: v.pipe(
      v.string('Your email must be a string.'),
      v.nonEmpty('Please enter your email.'),
      v.email('The email address is badly formatted.')
  ),
  password: v.pipe(
      v.string('Your password must be a string.'),
      v.nonEmpty('Please enter your password.'),
      v.minLength(8, 'Your password must have 8 characters or more.')
  ),
});

let login = reactive({
  email: "",
  password: ""
})
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-center text-3xl font-bold">Se connecter</h1>

    <form class="flex flex-col gap-2.5 mt-10">
      <div class="grid w-full items-center gap-1.5">
        <Label class="font-semibold" for="email">Adresse email</Label>
        <Input id="email" type="text" placeholder="Votre adresse email" v-model="login.email"/>
      </div>

      <div class="grid w-full items-center gap-1.5 mt-4">
        <Label class="font-semibold" for="password">Mot de passe</Label>
        <Input id="password" type="password" placeholder="Votre mot de passe" v-model="login.password"/>
      </div>

      <Button class="mt-6 w-fit">Se connecter</Button>

    </form>
  </div>
</template>

<style scoped>

</style>