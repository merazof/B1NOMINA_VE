import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



//importa la configuracion de axios
import './axios'

// crea la app
const app = createApp(App);

app.use(router,store)


//id donde se renderiza la app en el index.html
app.mount('#app')
