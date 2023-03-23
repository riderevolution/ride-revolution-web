<template>
  <div id="main_container">
    <!-- Navbar -->
    <navbar />

    <nuxt />

    <!-- Detect Browser -->
    <transition name="slide">
      <div class="modal_disclaimer" v-if="$store.state.checkBrowserStatus">
        <div class="overlay">
          <div class="logo">
            <img src="/logo.svg" alt="ride-revolution" />
          </div>
          <p>For a Better Experience. Please Update your Browser</p>
          <div class="default_btn" @click="proceed()">
            <span>Proceed Anyway</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- Compliance -->
    <transition name="slideAlt">
      <div class="accept_cookies" v-if="$store.state.showComplianceStatus">
        <p>
          This site uses cookies to store information in your computer.
          <br />
          By using our site, you accept the terms of our
          <nuxt-link to="/privacy-policy">Privacy Statement</nuxt-link>
          pursuant to the Data Privacy Act of 2012.
        </p>
        <div class="default_btn_wht" @click="agree()">
          <span>OK, I Agree</span>
        </div>
      </div>
    </transition>

    <!-- Loader -->
    <transition name="fade">
      <loader v-if="$store.state.isLoading" />
    </transition>

    <!-- Footer -->
    <foot />

    <!-- Navbar Expanded -->
    <transition name="fade">
      <navbar-expanded v-if="$store.state.isExpanded" />
    </transition>

    <!-- Login Sign Up -->
    <transition name="fade">
      <login-sign-up v-if="$store.state.loginSignUpStatus" />
    </transition>

    <!-- Login Checker -->
    <transition name="fade">
      <login-checker v-if="$store.state.loginCheckerStatus" />
    </transition>

    <!-- Complete Profile Steps -->
    <transition name="fade">
      <complete-profile-steps v-if="$store.state.completeProfileStepsStatus" />
    </transition>

    <!-- Health Waiver -->
    <!-- <transition name="fade">
      <health-waiver v-if="$store.state.healthWaiver" />
    </transition> -->

    <!-- Health Waiver Success -->
    <!-- <transition name="fade">
      <health-waiver-success v-if="$store.state.healthWaiverSuccess" />
    </transition> -->

    <!-- Complete Profile Success -->
    <transition name="fade">
      <complete-profile-success
        v-if="$store.state.completeProfileSuccessStatus"
      />
    </transition>

    <!-- Forgot Password Sucsses -->
    <transition name="fade">
      <forgot-password-success
        v-if="$store.state.forgotPasswordSuccessStatus"
      />
    </transition>

    <!-- Old User Update Prompt -->
    <transition name="fade">
      <old-user-update-prompt v-if="$store.state.oldUserUpdatePrompt" />
    </transition>

    <!-- Resend Email Prompt -->
    <transition name="fade">
      <resend-email-prompt v-if="$store.state.resendEmailPrompt" />
    </transition>

    <!-- Error Promp -->
    <transition name="fade">
      <error-prompt v-if="$store.state.errorPromptStatus" />
    </transition>

    <!-- Image Viewer -->
    <transition name="fade">
      <image-viewer v-if="$store.state.imageViewerStatus" />
    </transition>

    <!-- Badge Prompt -->
    <transition name="fade">
      <badge-prompt
        v-if="$store.state.badgePromptStatus"
        :badges="$store.state.badges"
      />
    </transition>

    <!-- Package Prompt -->
    <transition name="fade">
      <package-prompt v-if="package_prompt" :payload="payload.package" />
    </transition>

    <div class="no_font">
      <a href="https://www.livechatinc.com/chat-with/12052209/" rel="nofollow">
        Chat with us
      </a>
      , powered by
      <a
        href="https://www.livechatinc.com/?welcome"
        rel="noopener nofollow"
        target="_blank"
      >
        LiveChat
      </a>
    </div>
  </div>
</template>

<script>
  import NavbarExpanded from '~/components/NavbarExpanded'
  import Navbar from '~/components/Navbar'
  import Foot from '~/components/Foot'
  import Loader from '~/components/modals/Loader'
  import LoginSignUp from '~/components/modals/LoginSignUp'
  import LoginChecker from '~/components/modals/LoginChecker'
  import CompleteProfileSteps from '~/components/modals/CompleteProfileSteps'
  import CompleteProfileSuccess from '~/components/modals/CompleteProfileSuccess'
  import HealthWaiver from '~/components/modals/HealthWaiver'
  import HealthWaiverSuccess from '~/components/modals/HealthWaiverSuccess'
  import ForgotPasswordSuccess from '~/components/modals/ForgotPasswordSuccess'
  import OldUserUpdatePrompt from '~/components/modals/OldUserUpdatePrompt'
  import ResendEmailPrompt from '~/components/modals/ResendEmailPrompt'
  import ErrorPrompt from '~/components/modals/ErrorPrompt'
  import ImageViewer from '~/components/modals/ImageViewer'
  import BadgePrompt from '~/components/modals/BadgePrompt'
  import PackagePrompt from '~/components/modals/PackagePrompt'
  export default {
    components: {
      NavbarExpanded,
      Navbar,
      Foot,
      LoginSignUp,
      LoginChecker,
      CompleteProfileSteps,
      CompleteProfileSuccess,
      HealthWaiver,
      HealthWaiverSuccess,
      ForgotPasswordSuccess,
      OldUserUpdatePrompt,
      ResendEmailPrompt,
      ErrorPrompt,
      ImageViewer,
      BadgePrompt,
      Loader,
      PackagePrompt
    },
    data() {
      return {
        badges: [],
        isMobile: false,
        package_prompt: false,
        payload: {
          package: null
        }
      }
    },
    watch: {
      $route(to, from) {
        const me = this
        document.body.classList.remove('no_scroll')
        me.$store.state.healthWaiver = false
        me.$store.state.healthWaiverSuccess = false
        me.$store.state.completeProfileStepsStatus = false
        me.$store.state.completeProfileStatus = false
        me.$store.state.proTipStatus = false
        me.$store.state.changePasswordStatus = false
        me.$store.state.forgotPasswordSuccessStatus = false
        me.$store.state.loginSignUpStatus = false
        me.$store.state.buyRidesSuccessStatus = false
        me.$store.state.buyRidesPromptStatus = false
        if (
          to.path == '/buy-rides/package' ||
          to.path == '/buy-rides/store-credit'
        ) {
          me.$router.push('/buy-rides')
        }
        if (to.path == '/my-profile/manage-class') {
          me.$router.push('/my-profile')
          me.$store.state.fromManageClass = true
        }
        setTimeout(() => {
          let token = me.$cookies.get('70hokc3hhhn5')
          if (token != null || token != undefined) {
            me.$store.state.token = token
            me.validateToken()
          }
        }, 250)
        me.checkVersion()
      }
    },
    methods: {
      checkBrowser() {
        let me = this
        navigator.sayswho = (function() {
          var ua = navigator.userAgent,
            tem,
            M =
              ua.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || []
          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || []
            return 'IE+' + (tem[1] || '')
          }
          if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
            if (tem != null)
              return tem
                .slice(1)
                .join('+')
                .replace('OPR', 'Opera')
          }
          M = M[2]
            ? [M[1], M[2]]
            : [navigator.appName, navigator.appVersion, '-?']
          if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1])
          return M.join('+')
        })()

        var browser = navigator.sayswho.split('+')
        //Check if browser is IE
        if (browser[0] == 'MSIE' || ('IE' && parseInt(browser[1]) < 13)) {
          me.triggerChecking()
        }
        //Check if browser is Chrome
        else if (browser[0] == 'Chrome' && parseInt(browser[1]) < 65) {
          me.triggerChecking()
        }
        //Check if browser is Firefox
        else if (browser[0] == 'Firefox' && parseInt(browser[1]) < 52) {
          me.triggerChecking()
        }
        //Check if browser is Safari
        else if (browser[0] == 'Safari' && parseInt(browser[1]) < 11) {
          me.triggerChecking()
        }
        //Check if browser is Opera
        else if (browser[0] == 'Opera' && parseInt(browser[1]) < 16) {
          me.triggerChecking()
        }
        //Check if browser is Edge
        else if (browser[0] == 'Edge' && parseInt(browser[1]) < 16) {
          me.triggerChecking()
        } else {
          if (
            me.$cookies.get('agreeCompliance') == null ||
            me.$cookies.get('agreeCompliance') == undefined
          ) {
            me.$store.state.showComplianceStatus = true
          }
        }
      },
      triggerChecking() {
        const me = this
        me.$store.state.checkBrowserStatus = true
        me.$store.state.showComplianceStatus = false
        document.body.classList.add('no_scroll')
      },
      proceed() {
        const me = this
        me.$cookies.set('checkBrowser', 1, {
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        me.$store.state.checkBrowserStatus = false
        me.$store.state.showComplianceStatus = true
        document.body.classList.remove('no_scroll')
      },
      agree() {
        const me = this
        if (
          me.$cookies.get('agreeCompliance') == null ||
          me.$cookies.get('agreeCompliance') == undefined
        ) {
          me.$store.state.showComplianceStatus = false
          me.$cookies.set('agreeCompliance', 1, '7d')
        }
      },
      onResize() {
        const me = this
        if (
          me.$cookies.get('agreeCompliance') != null ||
          me.$cookies.get('agreeCompliance') != undefined
        ) {
          me.$store.state.showComplianceStatus = false
        }
        if (
          me.$cookies.get('checkBrowser') == null ||
          me.$cookies.get('checkBrowser') == undefined
        ) {
          me.checkBrowser()
        } else {
          me.$store.state.checkBrowserStatus = false
        }
        if (document.documentElement && document.documentElement.clientWidth) {
          if (document.documentElement.clientWidth <= 1025) {
            me.isMobile = true
          } else {
            me.isMobile = false
          }
        }
        me.$store.state.isMobile = me.isMobile
        if (me.$route.query.ca_action) {
          me.$store.state.loginSignUpStatus = true
        }
        let token = me.$cookies.get('70hokc3hhhn5')
        if ((token != null) & (token != undefined)) {
          me.$store.state.token = token
        }
        me.checkElements()
        me.checkBadges()
        me.checkVersion()
        document.addEventListener('contextmenu', event =>
          event.preventDefault()
        )
      },
      checkElements() {
        const me = this
        setTimeout(() => {
          if (me.$route.fullPath != '/') {
            if (me.$store.state.articleAlertStatus) {
              if (me.$store.state.proTipStatus) {
                if (
                  document.getElementById('pro_tip') &&
                  document.getElementById('article_alert')
                ) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById(
                    'article_alert'
                  ).offsetHeight +
                    document.getElementById('header').offsetHeight +
                    document.getElementById('pro_tip').offsetHeight}px`
                }
              } else if (me.$store.state.completeProfileStatus) {
                if (
                  document.getElementById('complete_profile') &&
                  document.getElementById('article_alert')
                ) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById(
                    'article_alert'
                  ).offsetHeight +
                    document.getElementById('header').offsetHeight +
                    document.getElementById('complete_profile').offsetHeight}px`

                  document.getElementById(
                    'complete_profile'
                  ).style.top = `${document.getElementById('article_alert')
                    .offsetHeight +
                    document.getElementById('header').offsetHeight}px`
                }
              } else {
                if (document.getElementById('article_alert')) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById('header')
                    .offsetHeight +
                    document.getElementById('article_alert').offsetHeight}px`
                }
              }
            } else if (me.$store.state.proTipStatus) {
              if (me.$store.state.articleAlertStatus) {
                if (
                  document.getElementById('pro_tip') &&
                  document.getElementById('article_alert')
                ) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById(
                    'article_alert'
                  ).offsetHeight +
                    document.getElementById('header').offsetHeight +
                    document.getElementById('pro_tip').offsetHeight}px`
                }
              } else {
                if (document.getElementById('pro_tip')) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById('header')
                    .offsetHeight +
                    document.getElementById('pro_tip').offsetHeight}px`
                }
              }
            } else if (me.$store.state.completeProfileStatus) {
              if (me.$store.state.articleAlertStatus) {
                if (
                  document.getElementById('complete_profile') &&
                  document.getElementById('article_alert')
                ) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById(
                    'article_alert'
                  ).offsetHeight +
                    document.getElementById('header').offsetHeight +
                    document.getElementById('complete_profile').offsetHeight}px`

                  document.getElementById(
                    'complete_profile'
                  ).style.top = `${document.getElementById('article_alert')
                    .offsetHeight +
                    document.getElementById('header').offsetHeight}px`
                }
              } else {
                if (document.getElementById('complete_profile')) {
                  document.getElementById(
                    'main_container'
                  ).style.paddingTop = `${document.getElementById('header')
                    .offsetHeight +
                    document.getElementById('complete_profile').offsetHeight}px`

                  document.getElementById('complete_profile').style.top = `${
                    document.getElementById('header').offsetHeight
                  }px`
                }
              }
            } else {
              document.getElementById('main_container').style.paddingTop = `${
                document.getElementById('header').offsetHeight
              }px`
            }
          } else {
            document.getElementById('main_container').style.paddingTop = 0
          }
        }, 750)
      },
      checkVersion() {
        const me = this
        let token = me.$cookies.get('70hokc3hhhn5')
        if (token != null && token != undefined) {
          me.$axios
            .get('api/check-token', {
              headers: {
                Authorization: `Bearer ${token}`
              },
              data: null
            })
            .then(res => {
              let version = me.$cookies.get('version')

              if (version != null && version != undefined) {
                if (version != res.data.version) {
                  me.$cookies.set('version', res.data.version)
                  location.reload(true)
                }
              } else {
                me.$cookies.set('version', res.data.version)
                location.reload(true)
              }
              // if (!res.data.user.health_waiver) {
              //   me.$store.state.healthWaiver = true
              // }
              if (res.data.expiredPackageNotification) {
                me.payload.package = res.data.expiredPackageNotification
                me.package_prompt = true
              }
            })
            .catch(err => {
              me.debugger(
                `${JSON.stringify(err)} <> ${JSON.stringify(err.response)}`,
                'layouts/default.vue(checkVersion)'
              )
            })
        }
      }
    },
    mounted() {
      const me = this
      me.onResize()
      let token = me.$cookies.get('70hokc3hhhn5')
      if (token != null && token != undefined) {
        me.$store.state.token = token
        me.validateToken()
      }
      // window.__lc = window.__lc || {}
      // window.__lc.license = 12052209
      // ;(function() {
      //   var lc = document.createElement('script')
      //   lc.type = 'text/javascript'
      //   lc.async = true
      //   lc.src =
      //     ('https:' == document.location.protocol ? 'https://' : 'http://') +
      //     'cdn.livechatinc.com/tracking.js'
      //   var s = document.getElementsByTagName('script')[0]
      //   s.parentNode.insertBefore(lc, s)
      // })()

      me.$store.state.inApp = false
    },
    beforeMount() {
      window.addEventListener('load', this.onResize)
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('load', this.onResize)
    },
    head() {
      return {
        title: `Welcome | Ride Revolution`
      }
    }
  }
</script>
