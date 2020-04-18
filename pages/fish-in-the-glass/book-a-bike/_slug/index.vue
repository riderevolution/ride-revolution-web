<template>
    <div class="book_a_bike inner">
        <booker ref="booking" :inApp="true" />
    </div>
</template>

<script>
    import Booker from '../../../../components/Booker'
    export default {
        layout: 'fish',
        components: {
            Booker
        },
        mounted () {
            const me = this
            let ctr = 0
            let token = me.$route.query.token
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
