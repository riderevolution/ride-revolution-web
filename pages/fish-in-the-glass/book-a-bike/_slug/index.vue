<template>
    <div class="book_a_bike inner">
        <booker ref="booking" :inApp="true" :booker="true" />
        <transition name="fade">
            <complete-profile-prompt v-if="$store.state.completeProfilePromptStatus" />
        </transition>
    </div>
</template>

<script>
    import Booker from '../../../../components/Booker'
    import CompleteProfilePrompt from '../../../../components/modals/CompleteProfilePrompt'
    export default {
        layout: 'fish',
        components: {
            Booker,
            CompleteProfilePrompt
        },
        mounted () {
            const me = this
            let token = me.$route.query.token
            if (token == null && token == undefined) {
                me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
            } else {
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let user = res.data.user
                        if (user.new_user == 1) {
                            me.$store.state.completeProfilePromptStatus = true
                        }
                        setTimeout( () => {
                            me.$refs.booking.fetchSeats(me.$route.params.slug)
                        }, 10)
                    }
                }).catch(err => {
                    me.$store.state.needLogin = true
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                    me.$nuxt.error({ statusCode: 403, message: 'Something went Wrong' })
                })
            }
        }
    }
</script>
