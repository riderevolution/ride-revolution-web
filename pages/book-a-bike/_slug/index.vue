<template>
    <div class="book_a_bike inner">
        <breadcrumb :overlay="false" :booker="true" />
        <transition name="slide">
            <pro-tip v-if="$store.state.proTipStatus" />
        </transition>
        <booker ref="booking" />
        <transition name="fade">
            <complete-profile-prompt v-if="$store.state.completeProfilePromptStatus" />
        </transition>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import ProTip from '../../../components/ProTip'
    import Booker from '../../../components/Booker'
    import CompleteProfilePrompt from '../../../components/modals/CompleteProfilePrompt'
    export default {
        components: {
            Breadcrumb,
            ProTip,
            Booker,
            CompleteProfilePrompt
        },
        mounted () {
            const me = this
            let token = me.$cookies.get('70hokc3hhhn5')
            if (!me.$store.state.isAuth && token == null && token == undefined) {
                me.$store.state.loginSignUpStatus = true
                document.body.classList.add('no_scroll')
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
                    me.$nuxt.error({ statusCode: 403, message: 'Something went Wrong' })
                })
            }
            me.$store.state.proTipStatus = true
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `Book a Bike | Ride Revolution`,
                link: [
                    {
                        rel: 'nofollow',
                        href: `${host}${me.$route.fullPath}`
                    }
                ]
            }
        }
    }
</script>
