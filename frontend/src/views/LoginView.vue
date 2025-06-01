<template>
    <div class="space-y-2 text-center my-24">
        <h2 class="text-xl font-semibold">Login to your account</h2>

        <p class="text-gray-600">
            Enter your email below to login to your account
        </p>
        <form
            @submit.prevent="submit"
            class="flex flex-col gap-2 items-center py-2"
        >
            <div class="flex flex-col gap-1 items-start w-full md:w-96">
                <label class="text-sm font-semibold" for="email">Email</label>
                <input
                    v-model="email"
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-full transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start w-full md:w-96">
                <label class="text-sm font-semibold" for="password"
                    >Password</label
                >
                <input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-full transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <button
                class="bg-black text-white w-full md:w-96 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
                Login
            </button>
        </form>
        <p v-if="error" class="text-red-500">{{ error }}</p>
        <p class="text-sm">
            Don't have an account?
            <router-link to="/register" class="underline underline-offset-4"
                >Register</router-link
            >
        </p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../services/auth";
import { useRouter } from "vue-router";
import { getToken } from "../stores/auth";

if (getToken()) {
    router.push("/chargers");
}

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

async function submit() {
    try {
        await login(email.value, password.value);
        router.push("/chargers");
    } catch (e) {
        error.value = e.message;
    }
}
</script>
