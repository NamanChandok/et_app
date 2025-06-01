<template>
    <div class="space-y-2 text-center my-24">
        <h2 class="text-xl font-semibold">Create an account</h2>
        <p class="text-gray-600">
            Enter your details below to create your account
        </p>
        <form
            @submit.prevent="submit"
            class="flex flex-col gap-2 items-center py-2"
        >
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold" for="username"
                    >Username</label
                >
                <input
                    v-model="username"
                    id="username"
                    placeholder="example"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-96 transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold" for="email">Email</label>
                <input
                    v-model="email"
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-96 transition-colors focus:border-blue-500 focus:ring-blue-500"
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
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-96 transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex flex-col gap-1 items-start">
                <label class="text-sm font-semibold" for="c_password"
                    >Confirm Password</label
                >
                <input
                    v-model="c_password"
                    id="c_password"
                    type="password"
                    placeholder="******"
                    required
                    class="border-2 border-gray-300 rounded-md p-2 w-96 transition-colors focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <button
                class="bg-black text-white w-96 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
                Register
            </button>
        </form>
        <p v-if="error">{{ error }}</p>
        <p class="text-sm">
            Already have an account?
            <router-link to="/" class="underline underline-offset-4"
                >Login</router-link
            >
        </p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "../services/auth";
import { useRouter } from "vue-router";
import { getToken } from "../stores/auth";

if (getToken()) {
    router.push("/chargers");
}

const username = ref("");
const email = ref("");
const password = ref("");
const c_password = ref("");
const error = ref("");
const router = useRouter();

async function submit() {
    try {
        await register(
            username.value,
            email.value,
            password.value,
            c_password.value,
        );
        router.push("/chargers");
    } catch (e) {
        error.value = e.message;
    }
}
</script>
