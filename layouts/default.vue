<template>
    <div id="main_container">
        <navbar />
        <nuxt />
        <transition name="slide">
            <div class="modal_disclaimer" v-if="$store.state.checkBrowserStatus">
                <div class="overlay">
                    <div class="logo">
                        <img src="/logo.svg" alt="ride-revolution" />
                    </div>
                    <p>For a Better Experience. Please Update your Browser</p>
                    <div class="default_btn" @click="proceed()"><span>Proceed Anyway</span></div>
                </div>
            </div>
        </transition>
        <transition name="slideAlt">
            <div class="accept_cookies" v-if="$store.state.showComplianceStatus">
                <p>This site uses cookies to store information in your computer.<br> By using our site, you accept the terms of our <nuxt-link to="/privacy-policy">Privacy Statement</nuxt-link> pursuant to the Data Privacy Act of 2012.</p>
                <div class="default_btn_wht" @click="agree()"><span>OK, I Agree</span></div>
            </div>
        </transition>
        <transition name="fade">
            <loader v-if="$store.state.isLoading" />
        </transition>
        <foot />
        <transition name="fade">
            <navbar-expanded v-if="$store.state.isExpanded" />
        </transition>
        <transition name="fade">
            <login-sign-up v-if="$store.state.loginSignUpStatus" />
        </transition>
        <transition name="fade">
            <login-checker v-if="$store.state.loginCheckerStatus" />
        </transition>
        <transition name="fade">
            <complete-profile-steps v-if="!$store.state.completeProfileStepsStatus" />
        </transition>
        <transition name="fade">
            <complete-profile-success v-if="$store.state.completeProfileSuccessStatus" />
        </transition>
        <transition name="fade">
            <forgot-password-success v-if="$store.state.forgotPasswordSuccessStatus" />
        </transition>
        <transition name="fade">
            <error-prompt v-if="$store.state.errorPromptStatus" />
        </transition>
        <transition name="fade">
            <image-viewer v-if="$store.state.imageViewerStatus" />
        </transition>
        <transition name="fade">
            <badge-prompt v-if="$store.state.badgePromptStatus" :badges="$store.state.badges" />
        </transition>
    </div>
</template>
<script>
    import NavbarExpanded from '../components/NavbarExpanded'
    import Navbar from '../components/Navbar'
    import Foot from '../components/Foot'
    import Loader from '../components/modals/Loader'
    import LoginSignUp from '../components/modals/LoginSignUp'
    import LoginChecker from '../components/modals/LoginChecker'
    import CompleteProfileSteps from '../components/modals/CompleteProfileSteps'
    import CompleteProfileSuccess from '../components/modals/CompleteProfileSuccess'
    import ForgotPasswordSuccess from '../components/modals/ForgotPasswordSuccess'
    import ErrorPrompt from '../components/modals/ErrorPrompt'
    import ImageViewer from '../components/modals/ImageViewer'
    import BadgePrompt from '../components/modals/BadgePrompt'
    export default {
        components: {
            NavbarExpanded,
            Navbar,
            Foot,
            LoginSignUp,
            LoginChecker,
            CompleteProfileSteps,
            CompleteProfileSuccess,
            ForgotPasswordSuccess,
            ErrorPrompt,
            ImageViewer,
            BadgePrompt,
            Loader
        },
        data () {
            return {
                badges: [],
                isMobile: false
            }
        },
        watch:{
            $route (to, from){
                const me = this
                me.validateToken()
                document.body.classList.remove('no_scroll')
                me.$store.state.completeProfileStepsStatus = false
                me.$store.state.completeProfileStatus = false
                me.$store.state.proTipStatus = false
                me.$store.state.changePasswordStatus = false
                me.$store.state.forgotPasswordSuccessStatus = false
                me.$store.state.loginSignUpStatus = false
                me.$store.state.buyRidesSuccessStatus = false
                me.$store.state.buyRidesPromptStatus = false
                if (to.path == '/buy-rides/package' || to.path == '/buy-rides/store-credit') {
                    me.$router.push('/buy-rides')
                }
                if (to.path == '/my-profile/manage-class') {
                    me.$router.push('/my-profile')
                    me.$store.state.fromManageClass = true
                }
            }
        },
        methods: {
            checkBrowser () {
                let me = this
                navigator.sayswho= (function(){
                    var ua = navigator.userAgent, tem,
                        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
                    if(/trident/i.test(M[1])){
                        tem =  /\brv[ :]+(\d+)/g.exec(ua) || []
                        return 'IE+'+(tem[1] || '')
                    }
                    if(M[1] === 'Chrome'){
                        tem= ua.match(/\b(OPR|Edge)\/(\d+)/)
                        if(tem!= null) return tem.slice(1).join('+').replace('OPR', 'Opera')
                    }
                    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?']
                    if((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1])
                    return M.join('+')
                })()

                var browser = navigator.sayswho.split('+')
                //Check if browser is IE
                if (browser[0] == 'MSIE' || 'IE' && parseInt(browser[1]) < 13) {
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
                    if (me.$cookies.get('agreeCompliance') == null || me.$cookies.get('agreeCompliance') == undefined) {
                        me.$store.state.showComplianceStatus = true
                    }
                }
            },
            triggerChecking () {
                const me = this
                me.$store.state.checkBrowserStatus = true
                me.$store.state.showComplianceStatus = false
                document.body.classList.add('no_scroll')
            },
            proceed () {
                const me = this
                me.$cookies.set('checkBrowser', 1, {
                    maxAge: 1000 * 60 * 60 * 24 * 7
                })
                me.$store.state.checkBrowserStatus = false
                me.$store.state.showComplianceStatus = true
                document.body.classList.remove('no_scroll')
            },
            agree () {
                const me = this
                if (me.$cookies.get('agreeCompliance') == null || me.$cookies.get('agreeCompliance') == undefined) {
                    me.$store.state.showComplianceStatus = false
                    me.$cookies.set('agreeCompliance', 1, '7d')
                }
            },
            onResize() {
                const me = this
                let token = me.$cookies.get('token')
                if (me.$cookies.get('agreeCompliance') != null || me.$cookies.get('agreeCompliance') != undefined) {
                    me.$store.state.showComplianceStatus = false
                }
                if (me.$cookies.get('checkBrowser') == null || me.$cookies.get('checkBrowser') == undefined) {
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
                me.validateToken()
                me.checkBadges()
            }
        },
        mounted () {
            const me = this
            me.onResize()
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        }
    }
</script>
