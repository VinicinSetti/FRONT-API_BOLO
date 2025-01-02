<script setup>
import JobList from './JobList.vue';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axiosInstance from '@/services/api';

defineProps({
    showButton: {
        type: Boolean,
        default: false
    }
})

const users = ref([]);
const maiorCaloteiro = ref([])

onMounted(async () => {
    try {
        const response = await axiosInstance.get('/users');
        users.value = response.data;

        maiorCaloteiro.value = response.data.reduce((max, user) => {
            return user.qtd_total_bolin > max.qtd_total_bolin ? user : max;
        }, { qtd_total_bolin: -Infinity });

        console.log('Dados obtidos:', maiorCaloteiro.value);
    } catch (error) {
        console.error('Erro ao obter listagem:', error.response?.data?.message || error.message);
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="flex justify-center items-center flex-col scontainer-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Maior devedor de bolinho
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6 size-1/3">
                <JobList v-if="maiorCaloteiro" :key="maiorCaloteiro.id" :user="maiorCaloteiro" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">Ver
            todos os devedores de bolinho</RouterLink>
    </section>
</template>
