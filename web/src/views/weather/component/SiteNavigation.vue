<template>
  <header class="sticky top-0 shadow-lg bg-weather-primary">
    <nav class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
        <i class="text-2xl fa-solid fa-sun"></i>
        <p class="text-2xl">The Local Weather</p>
      </RouterLink>
      <div class="flex justify-end flex-1 gap-3">
        <i class="text-xl duration-150 cursor-pointer fa-solid fa-circle-info hover:text-weather-secondary"></i>
        <i class="text-xl duration-150 cursor-pointer fa-solid fa-plus hover:text-weather-secondary"></i>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>