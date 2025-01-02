import './assets/main.css'
import 'primeicons/primeicons.css'
import router from './router'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router);

app.use(Toast, {
    position: POSITION.TOP_RIGHT,  // Posição do toast (opcional)
    timeout: 5000,                 // Tempo de exibição
  });

app.mount('#app'); 
