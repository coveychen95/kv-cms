<script setup lang="ts">
import axios from 'axios' 
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const getWeatherData = () => {
  axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
  ).then((res: any) => {
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = res.data.current.dt * 1000 + localOffset
    res.data.currentTime = utc + 1000 * res.data.timezone_offset;
    res.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * res.data.timezone_offset;
    });
    return res.data;
  }).catch((err: any) => {
    console.log(err)
  })
}

const weatherData = await getWeatherData()
const STORAGE_KEY_SAVED_CITIES = 'saved-cities'
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_CITIES));
  const updatedCities = cities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem(
    STORAGE_KEY_SAVED_CITIES,
    JSON.stringify(updatedCities)
  );
  router.push({
    name: "weather",
  });
}
</script>

<template>
  <div>

  </div>
</template>