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
    </div>
</template>
<script>
    import NavbarExpanded from '../components/NavbarExpanded'
    import Navbar from '../components/Navbar'
    import Foot from '../components/Foot'
    import Loader from '../components/modals/Loader'
    export default {
        components: {
            NavbarExpanded,
            Navbar,
            Foot,
            Loader
        },
        watch:{
            $route (to, from){
                const me = this
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
                        me.$store.state.isMobile = true
                    } else {
                        me.$store.state.isMobile = false
                    }
                }
            }
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        },
    }
</script>
