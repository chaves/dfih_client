import Vue from "vue";
import axios from "axios";
import "./plugins/vuetify";
import App from "./App.vue";

Vue.config.productionTip = false;
window.axios = require("axios");

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

import router from "./router/router.js";

window.app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
