import pkg from './package'
import webpack from 'webpack'
import axios from 'axios'

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
      { name: 'facebook-domain-verification', content: 'pwe1fd2xmzm0s4p67b9qeozui6cvx4' },
      { hid: 'description', name: 'description', content: pkg.description },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://js.recurly.com/v4/recurly.css' }
    ],
    script: [
      { src: 'https://apis.google.com/js/platform.js', async: true, defer: true },
      { src: 'https://connect.facebook.net/en_US/sdk.js' },
      { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true, defer: true },
      { src: `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&disable-funding=credit,card&currency=PHP&vault=true` },
      { src: 'https://unpkg.com/paymaya-js-sdk@2.0.0/dist/bundle.js' }
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
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: [
        '/refer-a-friend_bak',
        '/ride-rewards_bak',
        '/reset-password',
        '/my-profile',
        '/invite',
        '/transaction',
        '/thank-you',
        '/fish-in-the-glass',
        '/book-a-bike/**',
        '/testing',
        '/testing*',
        '/testing/**'
      ],
      Sitemap: 'https://www.riderevolution.ph/sitemap.xml'
    }],
    ['@nuxtjs/sitemap', {
      hostname: 'https://www.riderevolution.ph',
      gzip: true,
      defaults: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date()
      },
      xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      exclude: [
        '/refer-a-friend_bak',
        '/book-a-bike/**',
        '/ride-rewards_bak',
        '/reset-password',
        '/reset-password*',
        '/invite',
        '/invite*',
        '/invite/**',
        '/transaction',
        '/transaction*',
        '/transaction/**',
        '/thank-you',
        '/thank-you*',
        '/thank-you/**',
        '/fish-in-the-glass',
        '/fish-in-the-glass*',
        '/fish-in-the-glass/**',
        '/my-profile',
        '/my-profile*',
        '/my-profile/**',
        '/testing',
        '/testing*',
        '/testing/**'
      ],
      routes () {
        return axios.get(`${process.env.API_URL}/api/sitemap`)
          .then(res => res.data.sitemap)
      }
    }],
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
  proxy: {
    '/api': {
      target: process.env.API_URL,
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
  },
  env: {
    baseUrl: process.env.BASE_URL
  },
  /*
  ** Build configuration
  */
  build: {
      /*
      ** You can extend webpack config here
      */
      extend(config, {isDev, isClient}) {
        config.module.rules.forEach(rule => {
          if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
            // add a second loader when loading images
            rule.use.push({
              loader: 'image-webpack-loader',
              options: {
                svgo: {
                  plugins: [
                    // use these settings for internet explorer for proper scalable SVGs
                    // https://css-tricks.com/scale-svg/
                    { removeViewBox: false },
                    { removeDimensions: true }
                  ]
                }
              }
            })
          }
        })
      }
  },
  serverMiddleware: [
    (req, res, next) => {
      if (/\/{2,}/.test(req.url)) {
        const url = req.url.replace(/\/{2,}/g, '/')
        res.writeHead(301, { 'Location': url })
        return res.end()
      }
      next()
    }
  ],
  server: {
    port: process.env.PORT
  },
}
