<script setup>
import JobList from '@/components/JobList.vue';
import { ref, onMounted, reactive } from 'vue';
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
        password: data.password,
        qtd_bolin: 0,
        qtd_total_bolin: 0,
    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

    const atualizarUsers = await axiosInstance.get('/users');
        users.value = atualizarUsers.data;
}

const showPopUp = ref(false)

const togglePopUp = () => {
    showPopUp.value = !showPopUp.value;
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

                        <h1 class="text-2xl">Quer adicionar mais um caloteiro?</h1>

                        <hr class="my-4" />

                        <h3 class="text-xl">Digite o nome do caloteiro:</h3>

                        <input v-model="data.name" type="text" class="my-2 bg-green-100 p-2 font-bold w-full"
                            placeholder="Fulano Ciclano">

                        <h3 class="text-xl">Digite o email do caloteior:</h3>

                        <input v-model="data.email" type="text" class="my-2 bg-green-100 p-2 font-bold w-full"
                            placeholder="fulano@exemplo.com">

                        <h3 class="text-xl">Digite a senha do caloteiro:</h3>

                        <input v-model="data.password" type="password" class="my-2 bg-green-100 p-2 font-bold w-full"
                            placeholder="senha123">
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-5 rounded-lg shadow-md mt-6">
                        <button type="button" @click="addCaloteiro(); togglePopUp()"
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-0 block">
                            Adicionar caloteiro
                        </button>
                    </div>
                    <div v-if="showPopUp"
                        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex  justify-between flex-col">
                            <div class="flex justify-end">
                                <button @click="togglePopUp"
                                    class="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                                    X
                                </button>
                            </div>
                            <div class="flex justify-center items-center">
                                <div class="pb-8">
                                    <p class="block text-xl font-medium text-gray-600">Caloteiro adicionado com sucesso!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>