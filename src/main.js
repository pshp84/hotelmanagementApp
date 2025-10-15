import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import gsapPlugin from "./plugins/gsap";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(gsapPlugin);

app.mount("#app");
