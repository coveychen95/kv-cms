<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation></SiteNavigation>
    <main class="container text-white">
      <div class="relative pt-4 mb-8">
        <input
          v-model="searchQuery"
          @input="getSearchResults"
          type="text"
          placeholder="Search for a city or state"
          class="w-full px-1 py-2 bg-transparent border-b text-weather-secondary focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        />
        <ul
          v-if="searchQuery && searchResult"
          class="absolute w-full px-1 py-2 text-white shadow-md bg-weather-secondary top-[66px]"
        >
          <p v-if="searchError">Sorry, something went wrong, pleaser try again.</p>
          <p v-else-if="!searchError && searchResult.length === 0" class="py-2">No results match your query, try a different term.</p>
          <template v-else>
            <li v-for="item in searchResult" :key="item.id" @click="previewCity(item)" class="py-2 cursor-pointer">{{item.place_name}}</li>
          </template>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
  import SiteNavigation from './component/SiteNavigation.vue'
  import { ref } from 'vue'
  import axios from 'axios'
  const WEATHER_KEY = import.meta.env.VITE_APP_WEATHER_KEY
  
  const searchQuery = ref('')
  const queryTimeout = ref(null)
  const searchResult = ref(null)
  const searchError = ref(null)

  const getSearchResults = () => {
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== '') {
        const result = await axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${WEATHER_KEY}&types=place`)
        .catch(() => {
          searchError.value = true
        })
        if (result) {
          searchResult.value = result.data.features
        }
        return
      }
      searchError.value = ''
    }, 300)
  }

  const previewCity = (city) => {
    console.log('city: ', city)
  }
</script>