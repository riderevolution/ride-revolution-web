<template>
    <div class="default_modal alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                It seems like your account was created from our old website. Kindly check your email to reset your password.
                If you haven't received any email within 5 minutes, click the button below.
            </div>
            <div class="button_group alt">
                <div :class="`flex default_btn_wht ${(after5Mins) ? '' : 'disabled'}`" @click="toggleClose()">Resend Email</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: null
            }
        },
        data () {
            return {
                after5Mins: true
            }
        },
        methods: {
            toggleClose () {
                const me = this
                let formData = new FormData()
                formData.append('email', me.$store.state.oldUserEmail)
                me.loader(true)
                me.$axios.post('api/resend-old-account-resetter', formData).then(res => {
                    setTimeout( () => {
                        me.after5Mins = false
                        me.$store.state.resendEmailPrompt = true
                    }, 500)
                }).catch(err => {
                    me.$store.state.errorOverlayPromptStatus = true
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }).then(() => {
                    setTimeout(() => {
                        me.loader(false)
                        let interval = setInterval(() => {
                            me.after5Mins = true
                        }, 300000)
                        setTimeout( () => {
                            clearInterval(interval)
                        }, 300000)
                    }, 500)
                })
            }
        }
    }
</script>
