<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text">
                Great! You've been successfully booked. We'll send you an email as a receipt.
            </div>
            <div class="button_group alt">
                <nuxt-link to="/my-profile" :event="''" class="flex default_btn_wht" @click.native.once="toggleClose(true)">Go to My Profile</nuxt-link>
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
                    me.$router.push('/my-profile')
                } else {
                    me.$router.push('/book-a-bike')
                }
                me.$store.state.onlinePromptStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
