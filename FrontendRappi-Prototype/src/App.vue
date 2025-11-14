<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">

    <NavBar @search="searchParams = $event" />

    <router-view :searchParams="searchParams"></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';

const searchParams = ref({ text: '', type: 'name' })
</script>
