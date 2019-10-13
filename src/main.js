import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

Vue.use(VueTheMask)

// Shorten text to a specified limit without truncating the last word
const shortenText = function(str, maxLen) {
    if (str.length <= maxLen) {
        return str
    }
    return str.substr(0, str.lastIndexOf(' ', maxLen)) + '...'
};

// Format an integer of minutes into XXh XXm or XXm if less than 60
const formatMinutes = function(minutes) {
    if (minutes <= 60) {
        //minutes = String(minutes).padStart(2, '0');
        return minutes + ' minutes'
    }

    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    // Uncomment if leading 0 are required
    // hours = String(hours).padStart(2, '0') + ' ' + (hours > 1 ? 'hours' : 'hour');
    // min = String(min).padStart(2, '0') + ' ' + (min > 1 ? 'minutes' : 'minute');

    hours = hours + ' ' + (hours > 1 ? 'hours' : 'hour');
    min = min + ' ' + (min > 1 ? 'minutes' : 'minute');

    return hours + ' ' + min
};

Vue.filter('shortenText', shortenText);
Vue.filter('formatMinutes', formatMinutes);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
