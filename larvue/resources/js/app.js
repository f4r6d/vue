require('./bootstrap');

import Vue from 'vue';
window.Vue = Vue;

// ثبت کامپوننت‌ها
Vue.component('brand-ads-chart-table', require('./components/BrandAdsChartTable.vue').default);
Vue.component('bar-chart', require('./components/BarChart.vue').default);
Vue.component('report-pdf', require('./components/ReportPdf.vue').default);
Vue.component('api-chart', require('./components/ApiChart.vue').default);

// mount
new Vue({
    el: '#app',
});
