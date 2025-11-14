<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🛒 Carrito de compras</h1>
    <div v-if="store.cart.length === 0" class="text-gray-500">Tu carrito está vacío</div>
    <div v-else class="space-y-3">
      <div v-for="item in store.cart" :key="item.id"
        class="flex justify-between items-center bg-white p-3 rounded shadow">
        <div>
          <h2 class="font-semibold">{{ item.name }}</h2>
          <p class="text-gray-500 text-sm">{{ item.category }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="store.removeFromCart(item)" class="bg-gray-200 px-2 rounded">-</button>
          <span>{{ item.qty }}</span>
          <button @click="store.addToCart(item)" class="bg-red-500 text-white px-2 rounded">+</button>
        </div>
      </div>
      <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded">Confirmar compra</button>
    </div>
  </div>
</template>

<script setup>
import { store } from '../main.js';
</script>