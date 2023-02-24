<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CityCard from './CityCard.vue'
const savedCities = ref<Array<any>>([])
const STORAGE_KEY_SAVED_CITIES = 'saved-cities'
const getCities = async () => {
  if (localStorage.getItem(STORAGE_KEY_SAVED_CITIES)) {
    savedCities.value = JSON.parse(
      localStorage.getItem(STORAGE_KEY_SAVED_CITIES) as string
    )
    const requests: Promise<any>[] = []
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      )
    })
    const weatherData = await Promise.all(requests)
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data
    })
  }
}
await getCities()
const router = useRouter()
const goToCityView = (city: any) => {
  router.push({
    name: 'weatherCity',
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  })
}
</script>
<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0" class="px-8 text-sm text-white">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
