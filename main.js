import App from './App'

import {
	requestLogin,
	uniRequest,
} from './utils/httpRequest.js';
Vue.prototype.requestLogin = requestLogin;
Vue.prototype.uniRequest = uniRequest;
import {
	formatDateTime,
	routeGuard
} from './utils/utils.js'
Vue.prototype.formatDateTime = formatDateTime;
Vue.prototype.routeGuard = routeGuard

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
