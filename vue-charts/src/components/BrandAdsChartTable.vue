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
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)

const chartData = ref<any>(null)
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    x: { stacked: true },
    y: { beginAtZero: true, stacked: true }
  }
}
const labels = ref<string[]>([])
const tableRows = ref<any[]>([])
const totals = ref<number[]>([])

onMounted(async () => {
  const res = await fetch('/api/brand-ads.json')
  const data = await res.json()
  labels.value = data.labels
  tableRows.value = data.datasets.map((ds: any) => ({
    label: ds.label,
    data: ds.data
  }))
  // Calculate totals for each month
  const monthCount = data.labels.length
  totals.value = Array.from({ length: monthCount }, (_, i) =>
    data.datasets.reduce((sum: number, ds: any) => sum + (ds.data[i] || 0), 0)
  )
  // Add line dataset for totals
  const lineDataset = {
    type: 'line',
    label: 'تعداد سازه کل',
    data: totals.value,
    borderColor: '#FF6600',
    backgroundColor: 'rgba(255,102,0,0.2)',
    fill: false,
    tension: 0.2,
    order: 1,
    pointRadius: 3,
    pointBackgroundColor: '#551111'
  }
chartData.value = {
    labels: data.labels,
    datasets: [
        ...data.datasets.map((ds: any) => ({
            ...ds,
            type: 'bar',
            order: 2,
            barPercentage: 0.5, // Set bar width to 50%
            categoryPercentage: 0.5 // Set category width to 50%
        })),
        lineDataset
    ]
}
})
</script>