<script setup lang="ts">
import BarChart from './components/BarChart.vue';
import ApiChart from './components/ApiChart.vue';
import BrandAdsChartTable from './components/BrandAdsChartTable.vue';

</script>

<template>

  <BrandAdsChartTable />

  <hr>

  <BarChart aria-describedby="my-data-table" />

  <table id="my-data-table" class="table table-striped table-bordered">
    <caption>Sales figures for the years 2022 to 2024.</caption>
    <thead>
      <tr>
        <th>2022</th>
        <th>2023</th>
        <th>2024</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>987</td>
        <td>1209</td>
        <td>825</td>
      </tr>
    </tbody>
  </table>

  <hr>

  <ApiChart />

</template>

<style scoped></style>
