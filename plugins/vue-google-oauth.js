import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

Vue.use(GAuth, {
	clientId: '130311091998-hr6heenijkmgc8un6qudviv6o29ess1b.apps.googleusercontent.com',
	scope: 'profile email'
})