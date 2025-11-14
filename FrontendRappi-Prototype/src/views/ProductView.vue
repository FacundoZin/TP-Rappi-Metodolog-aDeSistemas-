<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">
      Menú del restaurante {{ restaurant?.name || 'Desconocido' }}
    </h1>

    <div v-if="restaurant" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="p in products" :key="p.id" class="border rounded-lg bg-white shadow hover:shadow-lg transition p-3">
        <img :src="p.image" alt="Producto" class="w-full h-32 object-cover rounded mb-2" />

        <h2 class="font-semibold">{{ p.name }}</h2>

        <p class="text-gray-600 text-sm mb-2">{{ p.description }}</p>

        <div class="flex items-center gap-2">
          <button @click="store.addToCart(p)" class="bg-red-500 text-white px-2 rounded">
            Agregar
          </button>
          <button @click="store.removeFromCart(p)" class="bg-gray-200 px-2 rounded">
            Restar
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500">Restaurante no encontrado.</div>
  </div>
</template>

<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../main.js'

const route = useRoute()
const restaurantId = parseInt(route.params.id)

const restaurants = [
  { id: 1, name: 'Resto Central', city: 'Buenos Aires', category: 'Comida rápida' },
  { id: 2, name: 'Pizza House', city: 'Rosario', category: 'Pizzería' },
  { id: 3, name: 'GreenBowl', city: 'Córdoba', category: 'Vegano' },
  { id: 4, name: 'Sushi Zen', city: 'Mendoza', category: 'Japonesa' }
]

const restaurant = computed(() => restaurants.find(r => r.id === restaurantId))

const products = [
  {
    id: 1,
    name: 'Hamburguesa',
    description: 'Clásica con queso',
    category: 'Comida rápida',
    image: 'https://www.clarin.com/img/2021/06/17/LC25eDtCT_1200x630__1.jpg'
  },
  {
    id: 2,
    name: 'Papas Fritas',
    description: 'Porción individual',
    category: 'Comida rápida',
    image: 'https://gran.luchito.com/wp-content/uploads/2024/11/Hero-Homemade-chips-826x400.jpg'
  },
  {
    id: 3,
    name: 'Gaseosa',
    description: '500ml',
    category: 'Bebida',
    image: 'https://media.istockphoto.com/id/477567550/es/foto/bebidas-helada.jpg?s=612x612&w=0&k=20&c=utvO5blVI8Ti37mn4vHsxxDo5ZvWlQO1RV6mh5e_Uvs='
  },
  {
    id: 4,
    name: 'Combo Familiar',
    description: '2 burgers + papas + gaseosa',
    category: 'Comida rápida',
    image: 'https://ypfloscorralitos.com.ar/wp-content/uploads/2020/07/Combo-2-Hamburguesa-con-Queso-1.png'
  }
]
</script>