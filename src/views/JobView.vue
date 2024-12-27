<script setup>
import JobList from '@/components/JobList.vue';
import { ref, onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axiosInstance from '@/services/api';
// import { parseAst } from 'vite';

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const data = reactive({
    name: '',
    email: '',
    password: ''
});

const users = ref([]);

const addCaloteiro = async () => {

    const response = await axiosInstance.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

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
    <section class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4"></div>
                        <h1 class="text-3xl font-bold mb-4">Devedores de bolinho</h1>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                            <p class="text-orange-700">Sinta-se livre para editar ou adicionar mais caloteiros de
                                bolinho!!</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        <JobList v-for="user in users.slice(0, limit || users.length)" :key="user.id" :user="user" />
                    </div>


                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">NewTek Solutions</h2>

                        <p class="my-2">
                            NewTek Solutions is a leading technology company specializing in
                            web development and digital solutions. We pride ourselves on
                            delivering high-quality products and services to our clients
                            while fostering a collaborative and innovative work environment.
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Digite o nome do caloteiro:</h3>

                        <input v-model="data.name" type="text" class="my-2 bg-green-100 p-2 font-bold w-full" placeholder="Fulano Ciclano">

                        <h3 class="text-xl">Digite o email do caloteior:</h3>

                        <input v-model="data.emaile" type="text" class="my-2 bg-green-100 p-2 font-bold w-full"
                            placeholder="fulano@exemplo.com">

                        <h3 class="text-xl">Digite a senha do caloteiro:</h3>

                        <input v-model="data.password" type="text" class="my-2 bg-green-100 p-2 font-bold w-full" placeholder="senha123">
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-5 rounded-lg shadow-md mt-6">
                        <!-- <h3 class="text-xl font-bold mb-6">Manage Job</h3> -->
                        <!-- <a href="add-job.html"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit
                            Job</a> -->
                        <button type="button" @click="addCaloteiro"
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-0 block">
                            Adicionar caloteiro
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>