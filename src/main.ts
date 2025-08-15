import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import { createPinia } from 'pinia';
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  return {
    app,
    Pinia
  };
}
