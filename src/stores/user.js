import {defineStore} from 'pinia';
import axios from 'axios';
import Cookies from "js-cookie";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    getters: {
        getUser: (state) => state.user,
        isLoggedIn: (state) => state.isAuthenticated,
    },
    actions: {
        /**
         *
         * @param api_url {string} - Lien de l'API
         * @param cookie - Token d'authentification
         * @returns {Promise<void>}
         */
        async fetchUser(api_url, cookie) {
            try {
                if (!cookie) return;
                const response = await axios.get(`${api_url}/me`, {
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                    }
                });
                this.user = response.data;
                this.isAuthenticated = true;
                console.log('User:', this.user);
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
                Cookies.remove('auth_token');
            }
        },
        logout() {
            this.user = null;
            this.isAuthenticated = false;
            Cookies.remove('auth_token');
        }
    }
});
