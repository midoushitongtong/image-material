import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import imageLazyLoad from './directives/image-lazy-load';
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(imageLazyLoad);

app.mount('#app');
