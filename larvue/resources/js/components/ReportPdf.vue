<template>
  <div>
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
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// ایمپورت کامپوننت‌ها
import BarChart from './BarChart.vue'
import ApiChart from './ApiChart.vue'
import BrandAdsChartTable from './BrandAdsChartTable.vue'

export default {
  name: 'PdfExportPage',
  components: {
    BarChart,
    ApiChart,
    BrandAdsChartTable
  },
  methods: {
    async generatePDF() {
      // Landscape mode
      const pdf = new jsPDF('l', 'mm', 'a4')
      const pageElements = document.querySelectorAll('.page')

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i]

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          width: pageEl.offsetWidth,
          height: pageEl.offsetHeight
        })

        const imgData = canvas.toDataURL('image/png')
        // Fit image to PDF page size
        if (i > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight - 15)

        // Add footer 'OHM' at the bottom center
        const footerText = 'OHM'
        const fontSize = 12
        pdf.setFontSize(fontSize)
        const textWidth = pdf.getTextWidth(footerText)
        const x = (pdfWidth - textWidth) / 2
        const y = pdfHeight - 8 // 8mm from bottom
        pdf.text(footerText, x, y)
      }

      pdf.save('report.pdf')
    }
  }
}
</script>

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
