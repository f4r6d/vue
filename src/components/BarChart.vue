<script setup lang="ts">
import { Bar } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { ref } from 'vue'

const chartData = ref({
        labels: [ '2022', '2023', '2024' ],
        datasets: [
           { data: [987, 1209, 825] } 
          ]
      })

const chartOptions = ref({
        responsive: true
      })

</script>

<template>

  <Bar
    id="my-chart-id"  
    :options="chartOptions"
    :data="chartData"
  />

</template>

<style scoped>

</style>
