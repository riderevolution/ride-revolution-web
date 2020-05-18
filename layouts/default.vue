<template>
    <div id="main_container">
        <navbar />
        <nuxt />
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
            <complete-profile-steps v-if="$store.state.completeProfileStepsStatus" />
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
            Loader
        },
        data () {
            return {
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
            onResize() {
                const me = this
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth <= 1025) {
                        me.isMobile = true
                    } else {
                        me.isMobile = false
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.onResize()
            me.validateToken()
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
