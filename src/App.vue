<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Navbar from "@/components/layouts/navbar.vue";
</script>

<template>
  <navbar></navbar>
  <div class="container py-12">
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
