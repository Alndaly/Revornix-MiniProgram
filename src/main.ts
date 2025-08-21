import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import { createPinia } from 'pinia';
import App from "./App.vue";
import customHeader from '@/components/cusomHeader/index.vue'
import mineTabBar from '@/components/mineTabBar/index.vue'

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  app.component('custom-header', customHeader)
  app.component('mine-tab-bar', mineTabBar)
  return {
    app,
    Pinia
  };
}
