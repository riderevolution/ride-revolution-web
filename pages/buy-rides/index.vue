<template>
  <transition name="fade">
    <div :class="`buy_rides ${hasHash}`" v-if="loaded">
      <banner :res="res" />
      <section id="packages" class="alt">
        <div class="header">
          <h2>
            Select your class package.
            <img
              src="/icons/info-booker-icon.svg"
              @click="togglePopUp($event, 'packages')"
              v-if="$store.state.isMobile"
            />
          </h2>
          <div class="description" v-if="!$store.state.isMobile">
            <p>
              Get ready to RIDE, MOVE, and BREATHE together. Choose the package
              for you and get your #RevOn!
            </p>
          </div>
          <transition name="slide">
            <div
              class="description_overlay"
              v-if="$store.state.isMobile && showInfoPackages"
            >
              <div class="pointer"></div>
              <p>
                Get ready to RIDE, MOVE, and BREATHE together. Choose the
                package for you and get your #RevOn!
              </p>
            </div>
          </transition>
        </div>
        <div class="content" id="package">
          <nuxt-link
            :event="''"
            @click.native="
              checkIfLoggedIn(
                $event,
                `/buy-rides/package/${data.slug}`,
                data,
                'package'
              )
            "
            rel="canonical"
            :to="`/buy-rides/package/${data.slug}`"
            :class="['package_wrapper', 'ov', checkClass(data)]"
            v-for="(data, key) in populatePackages"
            :key="key"
          >
            <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
            <div class="ribbon" v-else-if="data.is_promo == 0 && data.online">
              Online
            </div>
            <div class="ribbon" v-else-if="data.is_promo == 0 && !data.online">
              Studio
            </div>
            <div class="package_header">
              <h2 class="title">{{ data.name }}</h2>
              <div
                class="description"
                v-line-clamp="4"
                v-html="data.summary"
              ></div>
            </div>
            <div class="violator" v-if="data.recurring">
              <span>Subscription</span>
            </div>
            <div class="discounted_price" v-if="data.is_promo == 1">
              Php {{ totalItems(data.package_price) }}
            </div>
            <div class="price">
              Php
              {{
                totalItems(
                  data.is_promo == 1
                    ? data.discounted_price
                    : data.package_price
                )
              }}
            </div>
            <template v-if="data.slug == 'sleigh-ride-package-20-class-pack'">
              <div class="expires">Until January 8, 2023</div>
            </template>
            <template v-else>
              <div class="expires">
                Valid For {{ data.expires_in }} {{ data.expiry_type
                }}{{ data.expires_in > 1 ? 's' : '' }}
              </div>
            </template>
            <div class="default_btn_out" v-if="!$store.state.isMobile">
              <span>Buy Now</span>
            </div>
            <div class="default_btn_wht_alt green" v-else>
              <div class="text">
                <div class="border_top left"></div>
                <div class="border_top left alt"></div>
                <div class="border_top right"></div>
                <span>Buy Now</span>
                <div class="border_bottom left"></div>
                <div class="border_bottom right"></div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </section>
      <promo />
      <section id="packages" class="container alt">
        <div class="header">
          <h2>
            Buy Store Credits
            <img
              src="/icons/info-booker-icon.svg"
              @click="togglePopUp($event, 'store-credits')"
              v-if="$store.state.isMobile"
            />
          </h2>
          <div class="description" v-if="!$store.state.isMobile">
            <p>
              Store credits may be used to purchase class packages, in-studio
              food and beverages, or Ride Revolution merchandise.
            </p>
          </div>
          <transition name="slide">
            <div
              class="description_overlay"
              v-if="$store.state.isMobile && showInfoStoreCredits"
            >
              <div class="pointer"></div>
              <p>
                Store credits may be used to purchase class packages, in-studio
                food and beverages, or Ride Revolution merchandise.
              </p>
            </div>
          </transition>
        </div>
        <div class="content" id="storecredits">
          <nuxt-link
            :event="''"
            @click.native="
              checkIfLoggedIn(
                $event,
                `/buy-rides/store-credit/${data.slug}`,
                data,
                'store-credit'
              )
            "
            rel="canonical"
            :to="`/buy-rides/store-credit/${data.slug}`"
            class="package_wrapper ov"
            v-for="(data, key) in populateStoreCredits"
            :key="key"
          >
            <div class="package_header alt">
              <h2 class="title">{{ data.name }}</h2>
            </div>
            <div class="price">Php {{ totalItems(data.amount) }}</div>
            <div class="expires">No Expiry</div>
            <div class="default_btn_out" v-if="!$store.state.isMobile">
              <span>Buy Now</span>
            </div>
            <div class="default_btn_wht_alt green" v-else>
              <div class="text">
                <div class="border_top left"></div>
                <div class="border_top left alt"></div>
                <div class="border_top right"></div>
                <span>Buy Now</span>
                <div class="border_bottom left"></div>
                <div class="border_bottom right"></div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </section>
      <section id="digital">
        <img class="full" src="/default/buy-rides/send-digital-bg.jpg" />
        <div class="overlay">
          <h2>Share a ride with your loved ones.</h2>
          <h3>Experience Ride Revolution together!</h3>
          <nuxt-link
            rel="canonical"
            to="/buy-rides/digital-gift-card"
            class="default_btn"
          >
            Buy a Gift Card
          </nuxt-link>
        </div>
      </section>
    </div>
    <skeleton
      :page="'default_centered'"
      :col="{ class: 'three', count: 12 }"
      v-else
    />
  </transition>
</template>

<script>
  import Banner from '../../components/Banner'
  import Promo from '../../components/Promo'
  import Skeleton from '../../components/Skeleton'
  export default {
    components: {
      Banner,
      Skeleton,
      Promo
    },
    data() {
      return {
        loaded: false,
        res: [],
        toShowPackages: 3,
        toShowStoreCredits: 3,
        showInfoPackages: false,
        showLoadedPackages: false,
        showInfoStoreCredits: false,
        showLoadedStoreCredits: false,
        packages: [],
        credits: []
      }
    },
    computed: {
      /**
       * Anchor in div */
      hasHash() {
        let hash = this.$route.hash
        if (hash.length > 0) {
          setTimeout(() => {
            if (hash == '#package') {
              this.$scrollTo(`${hash}`, {
                duration: 1000,
                offset: -200
              })
            } else {
              this.$scrollTo(`${hash}`, {
                duration: 1000,
                offset: 300
              })
            }
          }, 100)
        }
      },
      populatePackages() {
        const me = this
        let result = []
        for (let i = 0; i < me.packages.length; i++) {
          if (me.packages[i]) {
            result.push(me.packages[i])
          }
        }
        return result
      },
      populateStoreCredits() {
        const me = this
        let result = []
        for (let i = 0; i < me.credits.length; i++) {
          if (me.credits[i]) {
            result.push(me.credits[i])
          }
        }
        return result
      }
    },
    methods: {
      checkClass(data) {
        const me = this
        let result = ''
        if (data.is_promo == 1) {
          result = 'promo'
        } else {
          if (data.online) {
            if (data.recurring) {
              result = 'subs'
            } else {
              result = 'alt'
            }
          } else {
            result = 'alt_2'
          }
        }

        return result
      },
      checkIfLoggedIn(event, slug, data, type) {
        const me = this
        event.preventDefault()
        if (!me.$store.state.isAuth) {
          me.$store.state.loginCheckerStatus = true
          document.body.classList.add('no_scroll')
        } else {
          if (type == 'package') {
            me.loader(true)
            let token = me.$route.query.token
              ? me.$route.query.token
              : me.$cookies.get('70hokc3hhhn5')
            let formData = new FormData()
            formData.append('class_package_id', data.id)
            me.$axios
              .get('api/check-token', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then(res => {
                let unbuyablePackages = res.data.unbuyablePackages
                if (unbuyablePackages.includes(data.id)) {
                  document.body.classList.add('no_scroll')
                  me.$store.state.errorList = [
                    'Sorry! You still have the same ongoing package.'
                  ]
                  me.$store.state.errorPromptStatus = true
                  setTimeout(() => {
                    me.loader(false)
                  }, 500)
                } else {
                  me.$axios
                    .post('api/extras/check-package-validity', formData, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    })
                    .then(res => {
                      if (res.data) {
                        me.$router.push(slug)
                      }
                    })
                    .catch(err => {
                      me.debugger(err.response)
                      if (err.response?.data && err.response.data?.errors) {
                        setTimeout(() => {
                          document.body.classList.add('no_scroll')
                          me.$store.state.errorList = err.response.data.errors
                          me.$store.state.errorPromptStatus = true
                        }, 500)
                      }
                    })
                    .then(() => {
                      setTimeout(() => {
                        me.loader(false)
                      }, 500)
                    })
                }
              })
          } else {
            me.$router.push(slug)
          }
        }
      },
      loadMoreContent(type) {
        const me = this
        switch (type) {
          case 'packages':
            if (!me.showLoadedPackages) {
              me.toShowPackages += 3
              me.$scrollTo('.load', {
                container: '#package',
                offset: -250
              })
            }
            break
          case 'store-credits':
            if (!me.showLoadedStoreCredits) {
              me.toShowStoreCredits += 3
              me.$scrollTo('.load', {
                container: '#store_credits',
                offset: -250
              })
            }
            break
        }
      },
      togglePopUp(event, type) {
        const me = this
        let target = event.target
        let parentWidth = target.parentNode.scrollWidth
        switch (type) {
          case 'packages':
            if (target.parentNode.classList.contains('toggled')) {
              target.parentNode.classList.remove('toggled')
            } else {
              target.parentNode.classList.add('toggled')
              setTimeout(() => {
                let popUpWidth = target.parentNode.parentNode.querySelector(
                  '.description_overlay'
                ).scrollWidth
                target.parentNode.parentNode.querySelector(
                  '.description_overlay .pointer'
                ).style.right = `calc((${popUpWidth}px / 2) - (${parentWidth}px / 2))`
              }, 200)
            }
            me.showInfoPackages ^= true
            break
          case 'store-credits':
            if (target.parentNode.classList.contains('toggled')) {
              target.parentNode.classList.remove('toggled')
            } else {
              target.parentNode.classList.add('toggled')
              setTimeout(() => {
                let popUpWidth = target.parentNode.parentNode.querySelector(
                  '.description_overlay'
                ).scrollWidth
                target.parentNode.parentNode.querySelector(
                  '.description_overlay .pointer'
                ).style.right = `calc((${popUpWidth}px / 2) - (${parentWidth}px / 2))`
              }, 200)
            }
            me.showInfoStoreCredits ^= true
            break
        }
      },
      async initial() {
        const me = this
        me.loader(true)
        setTimeout(() => {
          me.toShowPackages = me.$store.state.isMobile
            ? 3
            : me.packages.length >= 6
            ? 6
            : me.packages.length
          me.toShowStoreCredits = me.$store.state.isMobile
            ? 3
            : me.credits.length >= 6
            ? 6
            : me.credits.length
          me.loaded = true
          me.loader(false)
        }, 500)
      }
    },
    async mounted() {
      const me = this
      await setTimeout(() => {
        me.initial()
      }, 10)
    },
    asyncData({ $axios, params, store, error }) {
      return $axios
        .get('api/packages/for-buy-rides')
        .then(res => {
          if (res.data) {
            return {
              res: res.data.pageSetting,
              packages: res.data.classPackages,
              credits: res.data.storeCredits
            }
          }
        })
        .catch(err => {
          error({ statusCode: 404, message: 'Page not found' })
        })
    },
    head() {
      const me = this
      let host = process.env.baseUrl
      return {
        title: `${me.res.title} | Ride Revolution`,
        link: [
          {
            rel: 'canonical',
            href: `${host}${me.$route.fullPath}`
          }
        ],
        meta: [
          {
            hid: 'og:title',
            property: 'og:title',
            content: `${me.res.meta_title}`
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: `${me.res.meta_description}`
          },
          {
            hid: 'og:keywords',
            property: 'og:keywords',
            content: `${me.res.meta_keywords}`
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: `${host}/${me.$route.fullPath}`
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: `${me.res.banners[0].path}`
          },
          {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: `${me.res.banners[0].alt}`
          },
          { hid: 'og:type', property: 'og:type', content: 'website' },
          {
            hid: 'og:site_name',
            property: 'og:site_name',
            content: 'Ride Revolution'
          }
        ]
      }
    }
  }
</script>
