import { createApp } from "vue";
import store from "./store/index";
import router from "./router";
import Vuelidade from "vuelidate";
import App from "./App.vue";

const app = createApp(App).use(store).use(router).use(Vuelidade);

app.mount("#app");
