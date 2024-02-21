import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';

import 'bootstrap/scss/bootstrap.scss';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.component('VueLoading', Loading);

app.mount('#app');
