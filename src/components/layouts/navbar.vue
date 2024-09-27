<script setup>
import {Button} from '@/components/ui/button'
</script>

<template>
  <div class="p-4 ring-1 ring-gray-100">
    <div class="container flex justify-between">
      <div class="flex space-x-3">
          <Button variant="link" as-child>
            <router-link to="/">
            Accueil
            </router-link>
          </Button>
          <Button variant="link" as-child>
            <router-link to="/movies">
            Films
            </router-link>
          </Button>
          <Button variant="link" as-child>
            <router-link to="/category">
            Catégories
            </router-link>
          </Button>
          <Button variant="link">
            <router-link to="/actors">
            Acteurs
            </router-link>
          </Button>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline" as-child><router-link to="/register">S'inscrire</router-link></Button>
        <Button as-child><router-link to="/login">Se connecter</router-link></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>