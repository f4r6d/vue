<template>
  <div>
    <bar-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
// Vue 2 syntax with vue-chartjs v3 and chart.js v2
import { Bar } from 'vue-chartjs'

export default {
  name: 'MyBarChart',
  components: {
    BarChart: {
      extends: Bar,
      props: ['chartData', 'options'],
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
      chartData: {
        labels: ['2022', '2023', '2024'],
        datasets: [
          {
            label: 'مقدار فروش',
            backgroundColor: '#42b983',
            data: [987, 1209, 825]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>
/* اگر بخوای چارت رو با ارتفاع خاصی نشون بدی: */
div {
  height: 400px;
}
</style>
