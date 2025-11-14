<template>
  <header class="flex flex-wrap items-center justify-between bg-red-600 text-white p-4 gap-3">

    <router-link to="/" class="font-bold text-xl hover:text-gray-200">
      🍔 DeliveryApp
    </router-link>

    <div class="flex flex-grow items-center gap-2">
      <input
        v-model="searchText"
        @input="emitSearch"
        type="text"
        placeholder="Buscar..."
        class="rounded px-3 py-1 text-gray-800 w-full"
      />

      <select
        v-model="filterType"
        @change="emitSearch"
        class="text-gray-800 rounded px-2 py-1"
      >
        <option value="name">Nombre</option>
        <option value="city">Ciudad</option>
        <option value="category">Categoría</option>
      </select>
    </div>

    <div class="flex items-center gap-4">
      <router-link to="/cart" class="font-semibold hover:text-gray-200">
        🛒 Carrito ({{ totalItems }})
      </router-link>

      <!-- Botón Login visible solo si NO estás en /login -->
      <router-link
        v-if="$route.name !== 'login'"
        to="/login"
        class="font-semibold hover:text-gray-200"
      >
        Ingresar
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../main.js'

const emit = defineEmits(['search'])
const searchText = ref('')
const filterType = ref('name')

const emitSearch = () => {
  emit('search', { text: searchText.value, type: filterType.value })
}

const totalItems = computed(() => store.cart.reduce((a, b) => a + b.qty, 0))
</script>
