<script setup lang="ts">
export interface Props {
  city: {
    city: string
    state: string
    weather: {
      main: {
        temp: number
        temp_max: number
        temp_min: number
      }
    }
  }
}

withDefaults(defineProps<Props>(), {
  city: () => ({
    city: '',
    state: '',
    weather: {
      main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
      },
    },
  }),
})
</script>
<template>
  <div
    class="flex px-3 py-6 rounded-md shadow cursor-pointer bg-weather-secondary-md"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="self-end text-3xl">
        {{ Math.round(city.weather.main.temp) }}&deg; }}
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          {{ 'H: ' + Math.round(city.weather.main.temp_max) }}
        </span>
        <span>
          {{ 'L: ' + Math.round(city.weather.main.temp_min) }}
        </span>
      </div>
    </div>
  </div>
</template>
