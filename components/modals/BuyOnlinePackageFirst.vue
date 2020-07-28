<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text">
                You do not have current Revolution At Home credits (Live Online Classes). Purchase now to join!
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">Buy Rides</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.$parent.webApp) {
                        let token = me.$route.query.token
                        me.$router.push(`/fish-in-the-glass/buy-rides?token=${token}#package`)
                    } else {
                        me.$router.push('/buy-rides#package')
                    }
                }
                me.$store.state.buyOnlinePackageFirstStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            document.body.classList.add('no_scroll')
        }
    }
</script>
