<template>
    <div id="main_container" class="fish">
        <nuxt />
        <transition name="fade">
            <complete-profile-steps v-if="$store.state.completeProfileStepsStatus" />
        </transition>
        <transition name="fade">
            <complete-profile-success v-if="$store.state.completeProfileSuccessStatus" />
        </transition>
        <transition name="fade">
            <error-prompt v-if="$store.state.errorPromptStatus" />
        </transition>
        <transition name="fade">
            <loader v-if="$store.state.isLoading" />
        </transition>
    </div>
</template>
<script>
    import CompleteProfileSteps from '../components/modals/CompleteProfileSteps'
    import CompleteProfileSuccess from '../components/modals/CompleteProfileSuccess'
    import Loader from '../components/modals/Loader'
    import ErrorPrompt from '../components/modals/ErrorPrompt'
    export default {
        components: {
            CompleteProfileSteps,
            CompleteProfileSuccess,
            Loader,
            ErrorPrompt
        },
        data () {
            return {
                isMobile: false
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
