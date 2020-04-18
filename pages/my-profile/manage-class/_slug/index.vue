<template>
    <div class="book_a_bike inner">
        <breadcrumb :overlay="false" />
        <section id="banner"></section>
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <booker ref="booking" :manage="true" />
    </div>
</template>

<script>
    import Breadcrumb from '../../../../components/Breadcrumb'
    import ProTip from '../../../../components/ProTip'
    import Booker from '../../../../components/Booker'
    export default {
        components: {
            Breadcrumb,
            ProTip,
            Booker
        },
        mounted () {
            const me = this
            let ctr = 0
            let token = me.$cookies.get('token')
            me.$store.state.proTipStatus = true
            setInterval( () => {
                if (ctr < 1) {
                    if (!me.$store.state.isAuth && token == null && token == undefined) {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                    } else {
                        setTimeout( () => {
                            me.$refs.booking.fetchSeats(me.$route.params.slug)
                        }, 10)
                    }
                    ctr++
                }
            }, 250)
        }
    }
</script>
