import './assets/stylesheets/css/global.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';

library.add(fab);
library.add(far);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('body');
