import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import Breadcrumb from "./components/Breadcrumb.vue";

const app = createApp(App);

app.component("Breadcrumb", Breadcrumb);
app.use(router);
app.mount("#app");
