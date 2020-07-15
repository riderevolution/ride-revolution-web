<template>
    <div class="buy_rides inner">
        <transition name="fade">
            <buy-rides-success :summary="summary" />
        </transition>
    </div>
</template>

<script>
    import BuyRidesSuccess from '../../../components/modals/BuyRidesSuccess'
    export default {
        layout: 'fish',
        components: {
            BuyRidesSuccess
        },
        data () {
            return {
                summary: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                }
            }
        },
        methods: {
            initial () {
                const me = this
                if (me.$route.query.pid) {
                    let formData = new FormData()
                    formData.append('pid', me.$route.query.pid)

                    me.loader(true)
                    me.$axios.post('api/extras/pid', formData).then(res => {
                        setTimeout( () => {
                            me.summary = JSON.parse(res.data.pid.paymaya_details)
                        }, 500)
                    }).catch(err => {
                        me.$router.push(`/fish-in-the-glass/buy-rides?token=${me.$route.query.token}`)
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                } else {
                    me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                }
            }
        },
        mounted () {
            const me = this
            me.initial()
        }
    }
</script>
