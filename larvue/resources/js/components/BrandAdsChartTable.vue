<template>
  <div>
    <h2 class="text-center mb-4">روند ماهیانه توزیع تعداد تبلیغات به تفکیک برند</h2>

    <bar-chart v-if="chartData" :chart-data="chartData" :options="chartOptions" :height="100" />
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

<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'StackedBarChartWithTable',
  components: {
    barChart: {
      extends: Bar,
      props: ['chartData', 'options'],
      mounted() {
        this.renderChart(this.chartData, this.options)
      },
      watch: {
        chartData: {
          deep: true,
          handler(val) {
            if (val) this.renderChart(val, this.options)
          }
        }
      }
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        legend: { position: 'top' },
        title: { display: false },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true, ticks: { beginAtZero: true } }]
        }
      },
      labels: [],
      tableRows: [],
      totals: []
    }
  },
  mounted() {
    this.loadChartData()
  },
  methods: {
    async loadChartData() {
      try {
        const res = await fetch('/api/brand-ads.json')
        const data = await res.json()

        this.labels = data.labels
        this.tableRows = data.datasets.map(ds => ({
          label: ds.label,
          data: ds.data
        }))

        // محاسبه‌ی مجموع برای هر ستون (ماه)
        const monthCount = data.labels.length
        this.totals = Array.from({ length: monthCount }, (_, i) =>
          data.datasets.reduce((sum, ds) => sum + (ds.data[i] || 0), 0)
        )

        const lineDataset = {
          type: 'line',
          label: 'تعداد سازه کل',
          data: this.totals,
          borderColor: '#FF6600',
          backgroundColor: 'rgba(255,102,0,0.2)',
          fill: false,
          lineTension: 0.2,
          pointRadius: 3,
          pointBackgroundColor: '#551111',
          order: 1
        }

        this.chartData = {
          labels: data.labels,
          datasets: [
            ...data.datasets.map(ds => ({
              ...ds,
              type: 'bar',
              order: 2,
              barPercentage: 0.5,
              categoryPercentage: 0.5
            })),
            lineDataset
          ]
        }
      } catch (error) {
        console.error('خطا در دریافت داده‌های چارت:', error)
      }
    }
  }
}
</script>
