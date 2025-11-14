<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Restaurantes</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="r in filteredRestaurants" :key="r.id"
        class="border rounded-lg bg-white shadow hover:shadow-lg transition p-3">
        <img :src="r.image" alt="Restaurante" class="w-full h-32 object-cover rounded mb-2" />
        <h2 class="font-semibold">{{ r.name }}</h2>
        <p class="text-gray-600 text-sm">{{ r.category }}</p>
        <p class="text-gray-500 text-xs">{{ r.city }}</p>
        <router-link :to="'/restaurant/' + r.id" class="text-red-600 font-medium mt-2 inline-block hover:underline">
          Ver menú
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ searchParams: Object })
const restaurants = [
  {
    id: 1,
    name: 'Resto Central',
    city: 'Buenos Aires',
    category: 'Comida rápida',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600'
  },
  {
    id: 2,
    name: 'Pizza House',
    city: 'Rosario',
    category: 'Pizzería',
    image: 'https://images.rappi.com.ar/restaurants_background/4-1737062648691.jpg?e=webp&d=700x100&q=10'
  },
  {
    id: 3,
    name: 'GreenBowl',
    city: 'Córdoba',
    category: 'Vegano',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600'
  },
  {
    id: 4,
    name: 'Sushi Zen',
    city: 'Mendoza',
    category: 'Japonesa',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/7f/2a/eb/sushi-zen.jpg?w=900&h=500&s=1'
  }
]

const filteredRestaurants = computed(() => {
  const q = props.searchParams?.text?.toLowerCase() || ''
  const type = props.searchParams?.type || 'name'
  if (!q) return restaurants
  return restaurants.filter(r => r[type].toLowerCase().includes(q))
})
</script>