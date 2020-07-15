<template>
    <div class="buy_rides inner">
        <transition name="fade">
            <transaction-status :title="title" />
        </transition>
    </div>
</template>

<script>
    import TransactionStatus from '../../../components/modals/TransactionStatus'
    export default {
        layout: 'fish',
        components: {
            TransactionStatus
        },
        data () {
            return {
                title: ''
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
                            console.log(res.data);
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
            if (me.$route.params.slug == 'failed') {
                me.title = 'Transaction failed, Please try again.'
            } else {
                me.title = 'Transaction cancelled, Please try again.'
            }
            me.initial()
        }
    }
</script>
