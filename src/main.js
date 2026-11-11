import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrismicVue from 'prismic-vue';
import linkResolver from './link-resolver';

Vue.config.productionTip = false

// prismic-vue is only used to render the rich-text fields in src/content
// (<prismic-rich-text>). It is not given an API endpoint and never contacts Prismic.
Vue.use(PrismicVue, {
  linkResolver
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
