<template>
  <div>
    <!-- <Viewer :value="content" :plugins="plugins"></Viewer> -->
    <Editor :value="content" :plugins="plugins" @change="onChange"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import 'juejin-markdown-themes/dist/cyanosis.min.css'

const content = ref('')
const plugins = [gfm(), highlight(), math()]
const onChange = (val: string) => {
  content.value = val
}
</script>
<style scoped>
:deep(.bytemd) {
  height: 100vh;
}
</style>
