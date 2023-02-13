<script setup lang="ts">
import { ref } from 'vue'
import axios from 'ax'
const WEATHER_KEY = import.meta.env.VITE_APP_WEATHER_KEY

</script>

<template>
  <main class="container text-white">
    <div class="relative pt-4 mb-8">
      <input
        type="text"
        placeholder="Search for a city or state"
        class="w-full px-1 py-2 bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute w-full px-1 py-2 text-white shadow-md bg-weather-secondary top-[66px]"
      >
        <p>Sorry, something went wrong, pleaser try again.</p>
        <p class="py-2">No results match your query, try a different term.</p>
        <li class="py-2 cursor-pointer">search result</li>
      </ul>
    </div>
  </main>
</template>
