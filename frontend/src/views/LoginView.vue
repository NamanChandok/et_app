<template>
    <div class="space-y-2 text-center my-24">
        <h2 class="text-center text-xl font-semibold">Login to your account</h2>

        <p class="text-gray-600">
            Enter your email below to login to your account
        </p>
        <form
            @submit.prevent="submit"
            class="flex flex-col gap-2 items-center py-2"
        >
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold" for="email">Email</label>
                <input
                    v-model="email"
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    class="border-2 border-gray-400 rounded-md p-2 w-96 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold" for="password"
                    >Password</label
                >
                <input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    class="border-2 border-gray-400 rounded-md p-2 w-96 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <button
                class="bg-black text-white w-96 px-4 py-2 rounded-md cursor-pointer"
            >
                Login
            </button>
        </form>
        <p v-if="error">{{ error }}</p>
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
