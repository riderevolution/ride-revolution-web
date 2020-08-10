import pkg from './package'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.description,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://apis.google.com/js/platform.js', async: true, defer: true },
      { src: 'https://connect.facebook.net/en_US/sdk.js' },
      { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true, defer: true },
      { src: 'https://www.paypal.com/sdk/js?client-id=AZ0wEMysFjb0VvF8II46HHsx6fLzAZD5-r0Pn_mopzG8Kyz-Ylzm7HDyFb_oG2tm8j16l-0HLIUhPLiX&disable-funding=credit,card&currency=PHP&buyer-country=PH' },
    ],
    htmlAttrs: {
      lang: 'en'
    }
  },

  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
      color: '#26A48B',
      throttle: 0,
      height: '4px'
  },
  /*
  ** Global CSS
  */
  css: [
      '~/assets/stylus/app.styl',
      '~/assets/stylus/mobile.styl',
      '~/assets/stylus/fonts.styl'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      { src: '~/plugins/vue-awesome-swiper', ssr: false },
      { src: '~/plugins/vue-apexcharts', ssr: false },
      { src: '~/plugins/v-calendar', ssr: false },
      { src: '~/plugins/vue-scrollto', ssr: false },
      { src: '~/plugins/vue-line-clamp', ssr: false },
      { src: '~/plugins/vue-moment' },
      { src: '~/plugins/vue-click-outside' },
      { src: '~/plugins/vue-cookie' },
      { src: '~/plugins/vee-validate' },
      { src: '~/plugins/vue-google-oauth', ssr: false },
      { src: '~/plugins/vue-google-maps', ssr: false },
      { src: '~/plugins/ga', ssr: false },
      { src: '~/plugins/mixins'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '2709134129368768',
      disabled: false
    }],
    ['nuxt-lazy-load', {
      directiveOnly: true
    }]
  ],

  robots: {
    UserAgent: '*',
    Disallow: ''
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: (process.env.NODE_ENV == "development") ? 'http://api.riderevolution.test' : 'https://api.riderevolution.ph',
    // baseURL: (process.env.NODE_ENV == "development") ? 'https://610968818b2e.ngrok.io' : 'https://api.riderevolution.ph',
    baseURL: (process.env.NODE_ENV == "development") ? 'http://127.0.0.1:8000' : 'https://api.riderevolution.ph',
    credentials: false
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://beta.riderevolution.ph'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
