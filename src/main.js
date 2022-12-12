import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import App from "@/App.vue";

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faSearch);

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(router).component("FontAwesomeIcon", FontAwesomeIcon).mount("#app");
