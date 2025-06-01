<template>
    <div id="app" class="max-w-5xl px-4 mx-auto">
        <header class="py-6 flex justify-between items-center">
            <h1 class="text-xl font-semibold">
                <svg
                    class="w-5 h-5 inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 2L4.09 12.97A1 1 0 0 0 5 14.5h4.5l-2 7.5 8.91-10.97A1 1 0 0 0 15.5 9.5H11l2-7.5Z"
                    />
                </svg>
                Charging Station Manager
            </h1>
            <button
                v-if="authState.isLoggedIn"
                class="fixed md:hidden top-6 right-4 z-50 cursor-pointer"
                @click="navOpen = !navOpen"
            >
                <svg
                    class="w-8 h-8 transition-transform"
                    :class="{ 'transform rotate-45': navOpen }"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14m-7 7V5"
                    />
                </svg>
            </button>
            <nav
                v-if="authState.isLoggedIn"
                class="fixed md:relative flex md:items-center flex-col md:flex-row gap-6 inset-y-0 md:right-0 w-3/5 md:w-max md:p-0 pl-12 px-4 py-6 z-40 bg-white shadow-xl md:shadow-none text-xl md:text-base transition-all duration-300"
                :class="{ 'right-0': navOpen, '-right-full': !navOpen }"
            >
                <div class="h-8 w-8 md:hidden"></div>
                <router-link
                    to="/chargers"
                    class="hover:underline underline-offset-4"
                    >Chargers</router-link
                >
                <router-link
                    to="/map"
                    class="hover:underline underline-offset-4"
                    >Map View</router-link
                >
                <router-link
                    to="/profile"
                    class="hover:underline underline-offset-4"
                    >Profile</router-link
                >
                <button
                    class="bg-red-600 text-white px-4 py-1.5 w-max cursor-pointer transition-colors hover:bg-red-700"
                    @click="logout"
                >
                    Logout
                </button>
            </nav>
        </header>

        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { authState, logout as doLogout } from "./stores/auth";
import { ref } from "vue";

const router = useRouter();

const navOpen = ref(false);

function logout() {
    doLogout();
    router.push("/");
}
</script>
