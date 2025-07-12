const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | تنظیمات زیر برای ساخت فایل‌های JavaScript و Sass استفاده می‌شود.
 | این تنظیمات از Vue نسخه ۲ پشتیبانی می‌کنند.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .vue({ version: 2 }) // اگر Vue 2 استفاده می‌کنی
   .sass('resources/sass/app.scss', 'public/css');
