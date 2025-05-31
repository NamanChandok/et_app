<template>
    <div id="app" class="max-w-5xl mx-auto">
        <header class="py-6 flex justify-between items-center">
            <h1 class="text-xl font-semibold">⚡ Charging Station Manager</h1>
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
                    class="bg-red-500 text-white px-4 py-1.5 cursor-pointer hover:shadow-lg"
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
