<template>
  <div>
    <h2 class="text-center mb-4">روند ماهیانه توزیع تعداد تبلیغات به تفکیک برند</h2>
    <Bar
      v-if="chartData"
      :data="chartData"
      :options="chartOptions"
      :height="100"
    />
    <div v-else>در حال بارگذاری...</div>
    <table class="table table-bordered table-sm mt-4 text-center" v-if="tableRows.length">
      <thead>
        <tr>
          <th>برند</th>
          <th v-for="label in labels" :key="label">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in tableRows" :key="idx">
          <td>{{ row.label }}</td>
          <td v-for="val in row.data" :key="val">{{ val || '' }}</td>
        </tr>
        <tr class="fw-bold">
          <td>تعداد سازه کل</td>
          <td v-for="total in totals" :key="total">{{ total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref<any>(null)
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
}
const labels = ref<string[]>([])
const tableRows = ref<any[]>([])
const totals = ref<number[]>([])

onMounted(async () => {
  const res = await fetch('/api/brand-ads.json')
  const data = await res.json()
  labels.value = data.labels
  totals.value = data.totals
  tableRows.value = data.datasets.map((ds: any) => ({
    label: ds.label,
    data: ds.data
  }))
  chartData.value = {
    labels: data.labels,
    datasets: data.datasets
  }
})
</script>