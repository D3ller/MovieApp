import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Movies from "@/views/Movies.vue";
import Movie from "@/views/Movie.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
        },
        {
            path: '/movies',
            name: 'movies',
            component: Movies
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: Movie
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404.vue')
        }
    ]
})

export default router
