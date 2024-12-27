<script setup>
import axiosInstance from '@/services/api';
import { defineProps, ref, computed, reactive } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const props = defineProps({
    user: Object
})

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath
}

const showPopUp = ref(false)

const togglePopUp = () => {
    showPopUp.value = !showPopUp.value;
}


const data = reactive({
    qtd_bolin: 0
});


const atualizar = async () => {
    try {
        const token = localStorage.getItem('token')
        const user_aut = await axiosInstance.get('/profile')
        if (user_aut.data.id === "e64efaf4-70b7-4b3d-b9d0-61d0a58c34a3") {
            const response = await axiosInstance.put(`/profile/${props.user.id}`, {
                name: props.user.name,
                email: props.user.email,
                qtd_bolin: data.qtd_bolin,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                props.user.qtd_bolin = data.qtd_bolin;
        } else {
            console.error('Usuario sem permição para atualizar')
        }
    } catch (error) {
        console.error('Erro ao atualizar:', error.response?.data?.message || error.message);
    }
}

</script>


<template>
    <!-- user Listing 1 -->
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="flex justify-between items-center">
                    <div class="text-gray-600 my-2">{{ user.email }}</div>
                    <div v-if="isActiveLink('/jobs/add')" class="justify-end">
                        <button @click="togglePopUp"
                            class="bg-green-500 hover:bg-green-600 text-white rounded-full w-full focus:outline-none focus:shadow-outline mt-0 block py-1 px-2">
                            Edit </button>
                    </div>
                    <div v-if="showPopUp"
                        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full flex  justify-between flex-col">
                            <div class="flex justify-center items-center">
                                <h2 class="text-lg font-bold mb-4 ">Atualize a quantidade de bolinhos do {{ user.name }}
                                </h2>
                            </div>
                            <div class="flex justify-center items-center">
                                <div class="p-5">
                                    <p class="block text-xl font-medium text-gray-600">Valor atual de bolinhos:</p>
                                    <p class="p-3 flex justify-center items-center border border-gray-300">{{ user.qtd_bolin }}</p>
                                    <form @submit.prevent="atualizar(); togglePopUp()" class="mt-6 space-y-4">
                                        <label for="qtd_bolin" class="block text-xl font-medium text-gray-600">
                                            Quantidade de bolinho:
                                        </label>
                                        <input v-model="data.qtd_bolin" type="number"
                                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Digite a quantidade" required>
                                        <button @click="atualizar(); togglePopUp()"
                                            class="bg-green-500 hover:bg-green-600 text-white rounded-full w-full focus:outline-none focus:shadow-outline mt-0 block py-1 px-2"
                                            type="button">
                                            Atualizar
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="flex justify-end">
                                <button @click="togglePopUp"
                                    class="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="text-xl font-bold">{{ user.name }}</h3>
            </div>

            <!-- <div class="mb-5">
                <div>
                    {{ trucatedDescription }}
                </div>
                <button @click="toggleFullDescription" class="text-green-500 hover:text-green-600 mb-5">
                    {{ showFullDescription ? 'Less' : 'More'}}
                </button>
            </div> -->

            <h3 class="text-orange-500 mb-2 text-xl">Quantidade de bolinho a dever: {{ user.qtd_bolin }}</h3>

            <!-- <div class="border border-gray-100 mb-5"></div> -->

            <!-- <div class="flex flex-col lg:flex-row justify-between mb-4">
                <RouterLink :to="'/users/' + user.id"
                    class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                </RouterLink>
            </div> -->
        </div>
    </div>
</template>
