<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow w-80">
      <h1 class="text-xl font-bold mb-4 text-center">Iniciar Sesión</h1>

      <input v-model="email" type="email" placeholder="Email" class="w-full mb-3 px-3 py-2 border rounded" />

      <input v-model="password" type="password" placeholder="Contraseña" class="w-full mb-4 px-3 py-2 border rounded" />

      <button @click="login" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
        Entrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const login = () => {
  if (email.value.trim() === '' || password.value.trim() === '') {
    alert('Completa los datos')
    return
  }

  router.push('/')
}
</script>
