<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '@/assets/img/logo.png'
import axiosInstance from '@/services/api';
import { onMounted, ref } from 'vue';

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath
}

const isValidUser = ref(false);

const validar = async () => {
    const token = localStorage.getItem('token');
    const user_aut = await axiosInstance.get('/profile');

    if (user_aut.data.email === 'Alex@teste.com') {
        isValidUser.value = true
    }
}

const showPopUp = ref(false)

const togglePopUp = () => {
    showPopUp.value = !showPopUp.value;
}

const router = useRouter();

const logOut = () => {
    localStorage.removeItem('token');
    router.push('/login')
}

onMounted(() => {
    validar();
})

</script>

<template>
    <nav class="bg-green-700 border-b border-green-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div  class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
                    </RouterLink>
                    <div v-if="isValidUser" class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/home" :class="[isActiveLink('/home') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                                'text-white rounded-md px-3 py-2',
                            ]">Home</RouterLink>
                            <RouterLink to="/jobs" :class="[isActiveLink('/jobs') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                                'text-white rounded-md px-3 py-2',
                            ]">Caloteiros</RouterLink>
                            <RouterLink to="/jobs/add" :class="[isActiveLink('/jobs/add') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                                'text-white rounded-md px-3 py-2',
                            ]">Add Caloteiro</RouterLink>
                            <div @click="" class="hover:bg-gray-900 hover:text-white text-white rounded-md px-3 py-2">
                                <button @click="togglePopUp()">Sair</button>
                                <div v-if="showPopUp"
                                    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div
                                        class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex justify-between flex-col">

                                        <div class="flex justify-center items-center">
                                            <div class="p-4 pb-7">
                                                <p class="block text-xl font-medium text-gray-600">Deseja realmente
                                                    sair?</p>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <button @click="togglePopUp(); logOut()"
                                                class="px-4 py-2 bg-green-300 text-black rounded hover:bg-gray-500">
                                                Sim
                                            </button>
                                            <button @click="togglePopUp()"
                                                class="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-500">
                                                Não
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="isActiveLink('/login')">
                    </div>
                    <div v-else class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/home" :class="[isActiveLink('/home') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                                'text-white rounded-md px-3 py-2',
                            ]">Home</RouterLink>
                            <RouterLink to="/jobs" :class="[isActiveLink('/jobs') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                                'text-white rounded-md px-3 py-2',
                            ]">Caloteiros</RouterLink>
                            <div @click="" class="hover:bg-gray-900 hover:text-white text-white rounded-md px-3 py-2">
                                <button @click="togglePopUp()">Sair</button>
                                <div v-if="showPopUp"
                                    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div
                                        class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex justify-between flex-col">

                                        <div class="flex justify-center items-center">
                                            <div class="p-4 pb-7">
                                                <p class="block text-xl font-medium text-gray-600">Deseja realmente
                                                    sair?</p>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <button @click="togglePopUp(); logOut()"
                                                class="px-4 py-2 bg-green-300 text-black rounded hover:bg-gray-500">
                                                Sim
                                            </button>
                                            <button @click="togglePopUp()"
                                                class="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-500">
                                                Não
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>