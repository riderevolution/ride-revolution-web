<template>
  <div class="my_profile" v-if="loaded">
    <breadcrumb :overlay="false" />
    <transition name="slide">
      <complete-profile v-if="$store.state.completeProfileStatus" />
    </transition>
    <section id="content">
      <h1 class="no_font">My Profile</h1>
      <transition name="fade">
        <div class="profile_tab">
          <div class="top">
            <div class="left">
              <div class="overlay">
                <img
                  class="profile_img"
                  :src="
                    `${
                      user.customer_details.images[0].path != null
                        ? user.customer_details.images[0].path
                        : ''
                    }`
                  "
                  v-if="user.customer_details.images[0].path != null"
                />
                <div class="overlay_letter" v-else>
                  <div class="letter">{{ first_name }}{{ last_name }}</div>
                </div>
                <div class="badges">
                  <div
                    :class="`${key == 0 ? 'first' : 'second'}`"
                    v-for="(data, key) in badges"
                    :key="key"
                    v-if="key <= 1"
                  >
                    <img :src="data.badge_image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="data">
                <div class="name">
                  <h2>{{ user.first_name }} {{ user.last_name }}</h2>
                  <span>
                    <img
                      :src="user.customer_details.customer_type.images[0].path"
                      @click="hoveredType ^= true"
                      @mouseenter="hoveredType = true"
                      @mouseleave="hoveredType = false"
                    />
                    <transition name="slide">
                      <span class="tooltip" v-if="hoveredType">
                        {{ user.customer_details.customer_type.name }}
                      </span>
                    </transition>
                  </span>
                </div>
                <!-- <div class="name"><h2>{{ user.first_name }} {{ user.last_name }}</h2></div> -->
                <div class="info">
                  <div class="label">
                    Username
                    <b>{{ user.member_id }}</b>
                  </div>
                  <div class="label">
                    Store Credits
                    <b>{{ totalItems(storeCredits) }}</b>
                  </div>
                </div>
              </div>
              <div class="btn">
                <div class="default_btn_wht" @click="viewImage(user.qr_url)">
                  <span>QR Code</span>
                </div>
                <div class="default_btn_wht_out ml" @click="checkUser()">
                  <span>Update Profile</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left"></div>
            <ul class="tab_wrapper" v-if="!$store.state.isMobile">
              <li
                :class="
                  `tab_item ${category == 'ride-rev-journey' ? 'active' : ''}`
                "
                @click="toggleTab(0, 'ride-rev-journey')"
              >
                Ride Rev Journey
              </li>
              <li
                :class="`tab_item ${category == 'classes' ? 'active' : ''}`"
                @click="toggleTab(1, 'classes')"
              >
                Classes
              </li>
              <li
                :class="`tab_item ${category == 'packages' ? 'active' : ''}`"
                @click="toggleTab(2, 'packages')"
              >
                Packages
              </li>
              <li
                :class="
                  `tab_item ${category == 'transactions' ? 'active' : ''}`
                "
                @click="toggleTab(3, 'transactions')"
              >
                Transactions
              </li>
              <li
                :class="`tab_item ${category == 'gift-cards' ? 'active' : ''}`"
                @click="toggleTab(4, 'gift-cards')"
              >
                Gift Cards
              </li>
            </ul>
            <div class="mobile" v-else>
              <div class="tab_toggler toggled">
                <div class="toggler" @click.self="toggleDetails($event)">
                  {{ replacer(category) }}
                </div>
                <ul class="tab_wrapper">
                  <li
                    :class="
                      `tab_item ${
                        category == 'ride-rev-journey' ? 'active' : ''
                      }`
                    "
                    @click="toggleTab(0, 'ride-rev-journey')"
                  >
                    Ride Rev Journey
                  </li>
                  <li
                    :class="`tab_item ${category == 'classes' ? 'active' : ''}`"
                    @click="toggleTab(1, 'classes')"
                  >
                    Classes
                  </li>
                  <li
                    :class="
                      `tab_item ${category == 'packages' ? 'active' : ''}`
                    "
                    @click="toggleTab(2, 'packages')"
                  >
                    Packages
                  </li>
                  <li
                    :class="
                      `tab_item ${category == 'transactions' ? 'active' : ''}`
                    "
                    @click="toggleTab(3, 'transactions')"
                  >
                    Transactions
                  </li>
                  <li
                    :class="
                      `tab_item ${category == 'gift-cards' ? 'active' : ''}`
                    "
                    @click="toggleTab(4, 'gift-cards')"
                  >
                    Gift Cards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <profile-tab-content ref="profileTab" :category="category" />
    </section>
    <!-- <referral :summary="summary" /> -->
  </div>
  <skeleton
    :page="'default_box'"
    :has_col="false"
    :has_banner="false"
    :layout="'three'"
    v-else
  />
</template>

<script>
  import Skeleton from '../../components/Skeleton'
  import Breadcrumb from '../../components/Breadcrumb'
  import CompleteProfile from '../../components/CompleteProfile'
  import ProfileTabContent from '../../components/ProfileTabContent'
  import Referral from '../../components/Referral'
  export default {
    components: {
      Skeleton,
      Breadcrumb,
      CompleteProfile,
      ProfileTabContent,
      Referral
    },
    data() {
      return {
        summary: {
          res: '',
          total: 0,
          discount: 0,
          type: ''
        },
        loaded: false,
        componentLoaded: false,
        hoveredType: false,
        category: 'ride-rev-journey',
        storeCredits: 0,
        first_name: '',
        last_name: '',
        user: [],
        badges: []
      }
    },
    methods: {
      toggleDetails(event) {
        const me = this
        let target = event.target
        if (target.parentNode.classList.contains('toggled')) {
          target.nextElementSibling.style.height = `${0}px`
          target.parentNode.classList.remove('toggled')
        } else {
          target.parentNode.classList.add('toggled')
          target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
        }
      },
      viewImage(imageUrl) {
        const me = this
        me.$store.state.viewImageUrl = imageUrl
        me.$store.state.imageViewerStatus = true
        document.body.classList.add('no_scroll')
      },
      checkUser() {
        const me = this
        if (me.user.new_user == 1) {
          me.$store.state.completeProfileStepsStatus = true
          document.body.classList.add('no_scroll')
        } else {
          me.$router.push(`/my-profile/update-profile`)
        }
      },
      toggleTab(key, category) {
        const me = this
        me.category = category
        switch (category) {
          case 'ride-rev-journey':
            me.loader(true)
            me.$axios
              .get(`api/customers/${me.user.id}/ride-rev-journey`)
              .then(res => {
                if (res.data) {
                  let series_data = []
                  let series_labels = []
                  for (
                    let i = 0,
                      len =
                        res.data.customer.rideRevJourney.monthlyRideCount.series
                          .data.length;
                    i < len;
                    i++
                  ) {
                    series_data.push(
                      res.data.customer.rideRevJourney.monthlyRideCount.series
                        .data[i].count
                    )
                    series_labels.push(
                      me
                        .$moment(
                          res.data.customer.rideRevJourney.monthlyRideCount
                            .series.data[i].month_year,
                          'MMM YYYY'
                        )
                        .format('MMM')
                    )
                  }
                  res.data.customer.rideRevJourney.topInstructors.forEach(
                    (instructor, index) => {
                      instructor.hovered = false
                    }
                  )
                  setTimeout(() => {
                    me.$refs.profileTab.rideRevJourney =
                      res.data.customer.rideRevJourney
                    me.$refs.profileTab.series[0].data = series_data
                    me.$refs.profileTab.usertoNow = me
                      .$moment(res.data.customer.created_at)
                      .toNow()
                    me.$refs.profileTab.tabChartCategory = 'monthly'
                    me.$refs.profileTab.chartOptions.xaxis.categories = series_labels
                  }, 10)
                }
              })
              .catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
              })
              .then(() => {
                setTimeout(() => {
                  me.loader(false)
                }, 500)
              })
            break
          case 'classes':
            me.loader(true)
            me.$axios
              .get(`api/customers/${me.user.id}/upcoming-classes`)
              .then(res => {
                if (res.data) {
                  setTimeout(() => {
                    me.$refs.profileTab.classes = []
                    res.data.customer.upcomingClasses.forEach((data, index) => {
                      data.toggled = false
                      data.checked = false
                      me.$refs.profileTab.classes.push(data)
                    })
                  }, 10)
                }
              })
              .catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
              })
              .then(() => {
                setTimeout(() => {
                  me.$refs.profileTab.tabCategory = 'upcoming'
                }, 10)
                setTimeout(() => {
                  me.$refs.profileTab.toggleDetails()
                  me.$refs.profileTab.ctr = 0
                  me.loader(false)
                }, 500)
              })
            break
          case 'packages':
            me.loader(true)
            me.$axios
              .get(`api/customers/${me.user.id}/packages`)
              .then(res => {
                if (res.data) {
                  setTimeout(() => {
                    me.$refs.profileTab.packages = []
                    res.data.customer.user_package_counts.forEach(
                      (data, index) => {
                        if (
                          parseInt(
                            me
                              .$moment(
                                data.computed_expiration_date != null
                                  ? data.computed_expiration_date
                                  : data.expiry_date_if_not_activated
                              )
                              .diff(me.$moment())
                          ) > 0
                        ) {
                          data.shares.forEach(share => {
                            share.active = false
                          })
                          // if (!data.paypal_subscription_id) {
                          data.toggled = false
                          data.expired = false
                          me.$refs.profileTab.packages.push(data)
                          // }
                        }
                      }
                    )
                  }, 10)
                }
              })
              .catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
              })
              .then(() => {
                setTimeout(() => {
                  me.$refs.profileTab.tabCategory = 'active'
                }, 10)
                setTimeout(() => {
                  me.$refs.profileTab.toggleDetails()
                  me.$refs.profileTab.ctr = 0
                  me.loader(false)
                }, 500)
              })
            break
          case 'transactions':
            me.loader(true)
            me.$axios
              .get(`api/customers/${me.user.id}/transactions`)
              .then(res => {
                if (res.data) {
                  setTimeout(() => {
                    me.$refs.profileTab.transactions = []
                    me.$refs.profileTab.transactions =
                      res.data.customer.payments
                    me.$refs.profileTab.totalPendingPayment =
                      res.data.customer.totalPendingPayments
                  }, 10)
                }
              })
              .catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
              })
              .then(() => {
                setTimeout(() => {
                  me.loader(false)
                }, 500)
              })
            break
          case 'gift-cards':
            me.loader(true)
            me.$axios
              .get(`api/customers/${me.user.id}/gift-cards?forWebBooking=1`)
              .then(res => {
                if (res.data) {
                  setTimeout(() => {
                    me.$refs.profileTab.giftCards = []
                    res.data.customer.giftCards.forEach((data, index) => {
                      me.$refs.profileTab.giftCards.push(data)
                    })
                  }, 10)
                }
              })
              .catch(err => {
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
              })
              .then(() => {
                setTimeout(() => {
                  me.loader(false)
                }, 500)
              })
            break
        }
        setTimeout(() => {
          me.$refs.profileTab.getHeight()
          me.$refs.profileTab.unique = key
        }, 10)
        setTimeout(() => {
          me.$store.state.fromManageClass = false
        }, 500)
      }
    },
    mounted() {
      const me = this
      let token = me.$cookies.get('70hokc3hhhn5')
      me.loader(true)
      if (token == null || token == undefined) {
        me.$store.state.loginSignUpStatus = true
        document.body.classList.add('no_scroll')
        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
        setTimeout(() => {
          me.loader(false)
        }, 500)
      } else {
        me.$axios
          .get('api/check-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if (res.data) {
              me.user = res.data.user
              me.badges = res.data.acquiredBadges
              me.storeCredits =
                res.data.user.store_credits === null
                  ? 0
                  : res.data.user.store_credits.amount
              me.first_name = res.data.user.first_name.charAt(0)
              me.last_name = res.data.user.last_name.charAt(0)
              if (res.data.user.new_user == 1) {
                me.$store.state.completeProfileStatus = true
              }
              if (
                me.$store.state.fromManageClass ||
                me.$route.hash == '#classes'
              ) {
                me.loaded = true
                setTimeout(() => {
                  me.componentLoaded = true
                  me.category = 'classes'
                  me.toggleTab(1, 'classes')
                }, 10)
              } else if (me.$route.hash == '#packages') {
                me.loaded = true
                setTimeout(() => {
                  me.componentLoaded = true
                  me.category = 'packages'
                  me.toggleTab(2, 'packages')
                }, 10)
              } else {
                me.$axios
                  .get(`api/customers/${me.user.id}/ride-rev-journey`)
                  .then(res => {
                    if (res.data) {
                      me.loaded = true
                      setTimeout(() => {
                        me.componentLoaded = true
                        res.data.customer.rideRevJourney.topInstructors.forEach(
                          (instructor, index) => {
                            instructor.hovered = false
                          }
                        )
                        let series_data = []
                        let series_labels = []
                        for (
                          let i = 0,
                            len =
                              res.data.customer.rideRevJourney.monthlyRideCount
                                .series.data.length;
                          i < len;
                          i++
                        ) {
                          series_data.push(
                            res.data.customer.rideRevJourney.monthlyRideCount
                              .series.data[i].count
                          )
                          series_labels.push(
                            me
                              .$moment(
                                res.data.customer.rideRevJourney
                                  .monthlyRideCount.series.data[i].month_year,
                                'MMM YYYY'
                              )
                              .format('MMM')
                          )
                        }
                        me.$refs.profileTab.rideRevJourney =
                          res.data.customer.rideRevJourney
                        me.$refs.profileTab.series[0].data = series_data
                        me.$refs.profileTab.usertoNow = me
                          .$moment(res.data.customer.created_at)
                          .toNow()
                        me.$refs.profileTab.tabChartCategory = 'monthly'
                        me.$refs.profileTab.chartOptions.xaxis.categories = series_labels
                      }, 10)
                    }
                  })
                  .catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                  })
                  .then(() => {
                    setTimeout(() => {
                      me.loader(false)
                    }, 500)
                  })
              }
            }
          })
          .catch(err => {
            me.$store.state.needLogin = true
            me.$store.state.errorList = err.response.data.errors
            me.$store.state.errorPromptStatus = true
          })
      }
    },
    head() {
      const me = this
      let host = process.env.baseUrl
      return {
        title: `My Profile | Ride Revolution`,
        link: [
          {
            rel: 'nofollow',
            href: `${host}${me.$route.fullPath}`
          }
        ]
      }
    }
  }
</script>
