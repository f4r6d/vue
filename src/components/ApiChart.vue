<template>
    <div class="container">
        <Bar v-if="loaded && chartData" :data="chartData" />
        <div v-else-if="error" class="text-danger">Failed to load chart data.</div>
        <div v-else>Loading...</div>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { ref, onMounted } from 'vue'

const chartData = ref < any > (null)
const loaded = ref(false)
const error = ref(false)

onMounted(async () => {
    loaded.value = false
    error.value = false
    try {
        const response = await fetch('/api/userlist.json')
        const data = await response.json()

        // Ensure the data is in the correct format for vue-chartjs
        chartData.value = {
            labels: data.labels || [],
            datasets: data.datasets || []
        }
        loaded.value = true
    } catch (e) {
        console.error(e)
        error.value = true
    }
})
</script>