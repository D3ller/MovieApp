import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Movies from "@/views/Movies.vue";
import Movie from "@/views/Movie.vue";
import {useUserStore} from "@/stores/user.js";

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
            component: () => import('../views/Login.vue'),
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore()
                if (userStore.isLoggedIn) {
                    next({name: 'profile'})
                } else {
                    next()
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore()
                if (userStore.isLoggedIn) {
                    next({name: 'profile'})
                } else {
                    next()
                }
            }
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
            path: '/categories',
            name: 'categories',
            component: () => import('../views/Categories.vue')
        },
        {
            path: '/category/:id',
            name: 'category',
            component: () => import('../views/Category.vue')
        },
        {
            path: '/actors',
            name: 'actors',
            component: () => import('../views/Actors.vue')
        },
        {
            path: '/actor/:id',
            name: 'actor',
            component: () => import('../views/Actor.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/User.vue'),
            beforeEnter: async (to, from, next) => {
                const userStore = useUserStore()
                if (userStore.isLoggedIn) {
                    next()
                } else {
                    next({name: 'login', query: {redirect: 'profile'}})
                }
            }
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404.vue')
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: () => import('../views/Forgot.vue')
        }
    ]
})

export default router
