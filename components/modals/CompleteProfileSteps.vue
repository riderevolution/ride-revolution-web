<template>
    <div :class="`${(height > 200) ? 'sticky' : ''} login_sign_up ${($route.fullPath == '/') ? 'front' : 'not_front'}`">
        <div class="close_icon" @click="toggleClose()"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                height: 0
            }
        },
        methods: {
            /**
             * Close login/sign up modal */
            toggleClose () {
                const me = this
                me.$store.state.completeProfileStepsStatus = false
                document.body.classList.remove('no_scroll')
            },
            /**
             * Detect height of scroll */
            windowLoginScroll () {
                const me = this
                let height = window.pageYOffset | document.body.scrollTop
                let element = document.querySelector('.login_sign_up')
                if (element.classList.contains('front')) {
                    me.height = height
                }
            }
        },
        mounted () {
            const me = this
            me.windowLoginScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowLoginScroll)
            window.addEventListener('scroll', this.windowLoginScroll)
            window.addEventListener('resize', this.windowLoginScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowLoginScroll)
            window.removeEventListener('scroll', this.windowLoginScroll)
            window.removeEventListener('resize', this.windowLoginScroll)
        }
    }
</script>
