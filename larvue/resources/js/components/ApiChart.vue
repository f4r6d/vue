<template>
  <div class="container">
    <bar-chart v-if="loaded && chartData" :chart-data="chartData" />
    <div v-else-if="error" class="text-danger">Failed to load chart data.</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
// Vue 2 + vue-chartjs v3 + chart.js v2
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChartWrapper',
  components: {
    BarChart: {
      extends: Bar,
      props: ['chartData'],
      data() {
        return {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'bottom'
            }
          }
        }
      },
      mounted() {
        this.renderChart(this.chartData, this.options)
      },
      watch: {
        chartData: {
          handler(newVal) {
            if (newVal) {
              this.renderChart(newVal, this.options)
            }
          },
          deep: true
        }
      }
    }
  },
  data() {
    return {
      chartData: null,
      loaded: false,
      error: false
    }
  },
  mounted() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      this.loaded = false
      this.error = false
      try {
        const response = await fetch('/api/userlist.json')
        const data = await response.json()
        this.chartData = {
          labels: data.labels || [],
          datasets: data.datasets || []
        }
        this.loaded = true
      } catch (e) {
        console.error(e)
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
