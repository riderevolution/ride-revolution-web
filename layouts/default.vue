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
            <forgot-password-success v-if="$store.state.forgotPasswordSuccessStatus" />
        </transition>
    </div>
</template>
<script>
    import NavbarExpanded from '../components/NavbarExpanded'
    import Navbar from '../components/Navbar'
    import Foot from '../components/Foot'
    import Loader from '../components/modals/Loader'
    import LoginSignUp from '../components/modals/LoginSignUp'
    import ForgotPasswordSuccess from '../components/modals/ForgotPasswordSuccess'
    export default {
        components: {
            NavbarExpanded,
            Navbar,
            Foot,
            LoginSignUp,
            ForgotPasswordSuccess,
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
                me.$store.state.forgotPasswordSuccessStatus = false
                me.$store.state.loginSignUpStatus = false
                me.$store.state.buyRidesSuccessStatus = false
                me.$store.state.buyRidesPromptStatus = false
                if (to.path == '/buy-rides/package' || to.path == '/buy-rides/store-credit') {
                    me.$router.push('/buy-rides')
                }
            }
        },
        methods: {
            onResize() {
                const me = this
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth < 1025) {
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
