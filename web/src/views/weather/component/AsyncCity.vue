<script setup lang="ts">
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const getWeatherData = () => {
  // eslint-disable-next-line prettier/prettier
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    )
    .then((res: any) => {
      const localOffset = new Date().getTimezoneOffset() * 60000
      const utc = res.data.current.dt * 1000 + localOffset
      res.data.currentTime = utc + 1000 * res.data.timezone_offset
      res.data.hourly.forEach((hour: any) => {
        const utc = hour.dt * 1000 + localOffset
        hour.currentTime = utc + 1000 * res.data.timezone_offset
      })
      return res.data
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const weatherData = await getWeatherData()
const STORAGE_KEY_SAVED_CITIES = 'saved-cities'
const removeCity = () => {
  const cities = JSON.parse(
    localStorage.getItem(STORAGE_KEY_SAVED_CITIES) as string
  )
  const updatedCities = cities.filter((city: any) => city.id !== route.query.id)
  localStorage.setItem(STORAGE_KEY_SAVED_CITIES, JSON.stringify(updatedCities))
  router.push({
    name: 'weather',
  })
}
</script>

<template>
  <div class="flex flex-col items-center flex-1">
    <div
      v-if="$route.query.preview"
      class="w-full p-4 text-center text-white bg-weather-secondary"
    >
      <p>
        You are currently previewing this city, click the "+" to start tracking
        this city.
      </p>
    </div>
    <div class="flex flex-col items-center py-12 text-white">
      <h1 class="mb-2 text-4xl">{{ $route.params.city.split('-')[0] }}</h1>
      <p class="mb-12 text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })
        }}
      </p>
      <p class="mb-8 text-8xl">
        &nbsp;{{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
      <img
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`"
        class="w-[150px] h-auto"
        alt=""
      />
    </div>
    <hr class="w-full border border-white border-opacity-10" />
    <!-- Hourly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col items-center gap-4"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                  hour: 'numeric',
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Weekly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex justify-end flex-1 gap-2">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
