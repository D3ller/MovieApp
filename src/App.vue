<script lang="ts" setup>
import {RouterView} from 'vue-router'
import Navbar from "@/components/layouts/navbar.vue";
import {provide} from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import {useUserStore} from '@/stores/user'

const userStore = useUserStore()

let api_url = 'http://symfony.mmi-troyes.fr:8319/api';
provide('api_url', api_url)

userStore.fetchUser(api_url, Cookies.get('auth_token'))

if (Cookies.get('auth_token')) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${Cookies.get('auth_token')}`}
}


</script>

<template>
  <navbar></navbar>
  <div class="container py-12">
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
