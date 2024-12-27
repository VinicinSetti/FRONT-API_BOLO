<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>

    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import axiosInstance from '@/services/api'

export default {
  name: "Login",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });
    const router = useRouter();

    async function submit() {
      try {
        const response = await axiosInstance.post('/sessions', {
          email: data.email,
          password: data.password,
        });
        localStorage.setItem('token', response.data.token); // Armazene o token retornado
        console.log('Login realizado com sucesso!');
      } catch (error) {
        console.error('Erro no login:', error.response?.data?.message || error.message);
      }
    }

    return {
      data,
      submit
    }
  }
}
</script>