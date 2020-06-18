<template>
    <div class="buy_rides inner">
        <breadcrumb :overlay="false" />
        <transition name="fade">
            <buy-rides-success />
        </transition>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import BuyRidesSuccess from '../../components/modals/BuyRidesSuccess'
    export default {
        components: {
            Breadcrumb,
            BuyRidesSuccess
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
                            console.log(res.data);
                        }, 500)
                    }).catch(err => {
                        me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
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
