<template>
    <div id="main_container">
        <nuxt />
        <transition name="fade">
            <loader v-if="$store.state.isLoading" />
        </transition>
    </div>
</template>
<script>
    import Loader from '../components/modals/Loader'
    export default {
        components: {
            Loader
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
