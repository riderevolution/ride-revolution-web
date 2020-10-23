<template>
    <div id="complete_profile">
        <div class="profile_text">
            <span>Profile Progress 30%</span>
            <div class="wrapper">
                <div :class="`rec ${(n <= 3) ? 'active' : ''}`" v-for="n in 10"></div>
            </div>
            <span class="complete" @click="toggleSteps()">Complete your profile now</span>
            <span>,&nbsp;so you can book your first ride.</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleSteps () {
                const me = this
                me.$store.state.completeProfileStepsStatus = true
                document.body.classList.add('no_scroll')
            },
            windowScroll () {
                const me = this
                if (me.$store.state.completeProfileStatus) {
                    if (me.$store.state.articleAlertStatus) {
                        if (document.getElementById('complete_profile') && document.getElementById('article_alert')) {
                            document.getElementById('complete_profile').style.top = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
                        }
                    } else {
                        if (document.getElementById('complete_profile')) {
                            document.getElementById('complete_profile').style.top = `${document.getElementById('header').scrollHeight}px`
                        }
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.windowScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowScroll)
            window.addEventListener('scroll', this.windowScroll)
            window.addEventListener('resize', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowScroll)
            window.removeEventListener('scroll', this.windowScroll)
            window.removeEventListener('resize', this.windowScroll)
        }
    }
</script>
