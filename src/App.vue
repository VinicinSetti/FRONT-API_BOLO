<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterView, useRouter } from 'vue-router';
import { ref } from 'vue';

const navBar = ref(0);

const router = useRouter();

router.beforeEach((to, from, next) => {
  if(from.fullPath ==='/login' || to.fullPath === '/login'){
  navBar.value += 1;
  console.log(`Saindo de: ${from.fullPath}, indo para: ${to.fullPath}`);
  }
  next(); // Continue a navegação
});

</script>

<template>
  <NavBar :key="navBar"/>
  <RouterView />
</template>
