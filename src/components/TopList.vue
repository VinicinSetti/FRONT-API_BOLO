<script setup>
import JobList from './JobList.vue';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axiosInstance from '@/services/api';

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const users = ref([]);

onMounted(async () => {
    try {
        const response = await axiosInstance.get('/users');
        users.value = response.data;
        console.log('Dados obtidos:', response.data);
    } catch (error) {
        console.error('Erro ao obter listagem:', error.response?.data?.message || error.message);
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Maior devedor de bolinho
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobList v-for="user in users.slice(0, 1)" :key="user.id" :user="user" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">Ver todos os devedores de bolinho</RouterLink>
    </section>
</template>
