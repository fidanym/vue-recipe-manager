import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Shorten text to a specified limit without truncating the last word
const shortenText = function(str, maxLen) {
    if (str.length <= maxLen) {
        return str
    }
    return str.substr(0, str.lastIndexOf(' ', maxLen))
};

// Format an integer of minutes into XXh XXm or XXm if less than 60
const formatMinutes = function(minutes) {
    if (minutes <= 60) {
        return minutes + ' minutes'
    }

    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;
    let hours_word = hours > 1 ? 'hours' : 'hour';
    let minutes_word = min > 1 ? 'minutes' : 'minutes';
    return hours + ' ' + hours_word + ' ' + min + ' ' + minutes_word;
};

Vue.filter('shortenText', shortenText);
Vue.filter('formatMinutes', formatMinutes);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
