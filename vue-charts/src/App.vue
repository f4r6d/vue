<script setup lang="ts">
import BarChart from './components/BarChart.vue';
import ApiChart from './components/ApiChart.vue';
import BrandAdsChartTable from './components/BrandAdsChartTable.vue';

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const generatePDF = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4')

  const pageElements = document.querySelectorAll('.page')

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i] as HTMLElement

    const canvas = await html2canvas(pageEl, {
      scale: 2,
      useCORS: true
    })

    const imgData = canvas.toDataURL('image/png')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  }

  pdf.save('report.pdf')
}

</script>

<template>

  <button @click="generatePDF" class="btn btn-primary mt-3">
    ذخیره به عنوان PDF
  </button>

  <div id="pdf-content">
    <div class="page">

      <BrandAdsChartTable />

      <hr>

    </div>

    <div class="page">
      <BrandAdsChartTable />

      <hr>
    </div>

    <div class="page">
      <BrandAdsChartTable />

      <hr>
    </div>


    <div class="page">

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

    </div>


  </div>

</template>

<style scoped>
.page {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  margin-bottom: 10mm;
  background: white;
  page-break-after: always;
  box-sizing: border-box;
}
</style>
