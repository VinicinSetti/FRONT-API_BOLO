<template>
  <form @submit.prevent="submit">
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center flex-col">
        <h1 class="text-xl p-5 mb-3 fw-normal">Please sign in</h1>
        <div>
          <h3 class="text-xl">Email:</h3>
          <input v-model="data.email" type="email" class="my-2 bg-green-100 p-2 font-bold max-w-xl w-full"
            placeholder="Email" required>

          <h3 class="text-xl">Senha:</h3>
          <input v-model="data.password" type="password" class="my-2 bg-green-100 p-2 font-bold max-w-xl w-full"
            placeholder="Password" required>

          <button
            class="bg-green-400 hover:bg-green-600 text-white rounded-full w-full focus:outline-none focus:shadow-outline mt-0 block py-1 px-2"
            type="submit">Sign in</button>
        </div>
      </div>
    </div>
  </form>

</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { RouterLink, useRouter } from "vue-router";
import axiosInstance from '@/services/api'



const data = reactive({
  email: '',
  password: ''
});
const router = useRouter();

async function submit() {
  const token = localStorage.getItem('token');
  if (token) {
    router.push('/home');
  }
  try {
    const response = await axiosInstance.post('/sessions', {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('token', response.data.token); // Armazene o token retornado
    console.log('Login realizado com sucesso!');
    router.push('/home');
  } catch (error) {
    console.error('Erro no login:', error.response?.data?.message || error.message);
  }
}




onMounted(() => {
  submit();
})
</script>