<template>
    <div id="app" class="max-w-5xl mx-auto">
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
            <nav v-if="authState.isLoggedIn" class="space-x-6">
                <router-link
                    to="/chargers"
                    class="hover:underline underline-offset-4"
                    >Chargers</router-link
                >
                <router-link
                    to="/profile"
                    class="hover:underline underline-offset-4"
                    >Profile</router-link
                >
                <button
                    class="bg-red-600 text-white px-4 py-1.5 cursor-pointer transition-colors hover:bg-red-700"
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

const router = useRouter();

function logout() {
    doLogout();
    router.push("/");
}
</script>
