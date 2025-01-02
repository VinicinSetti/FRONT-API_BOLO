<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListing from '@/components/JobListings.vue';
import TopList from '@/components/TopList.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const validar = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
    }
}

onMounted(() => {
    validar();
})
</script>

<template>
    <Hero />
    <HomeCards />
    <JobListing :limit="3" :showButton="false" />
    <TopList :showButton="true"/>
</template>