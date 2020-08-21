<template>
    <div class="default_modal alt">
        <div class="background" @click="close()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="close()"></div>
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
            close () {
                const me = this
                me.$store.state.oldUserUpdatePrompt = false
                document.body.classList.remove('no_scroll')
            },
            toggleClose () {
                const me = this
                let formData = new FormData()
                formData.append('email', me.$store.state.oldUserEmail)
                if (me.after5Mins) {
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
                } else {
                    me.$store.state.errorOverlayPromptStatus = true
                    me.$store.state.errorList = ['Oops! Please wait 5 minutes before resending the link.']
                    me.$store.state.errorPromptStatus = true
                }
            }
        }
    }
</script>
