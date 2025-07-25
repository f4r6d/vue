window._ = require('lodash');

window.axios = require('axios');

// تنظیم هدر درخواست AJAX
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// اگر CSRF Token در meta موجود بود، به عنوان هدر ست کن
const token = document.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: Ensure <meta name="csrf-token" content="..."> exists in your HTML.');
}


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
