<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <!-- <div class="confirmation_image">
                <img src="/default/meme/success-meme.jpg" />
            </div> -->
            <div class="confirmation_text">
                Success! We've sent your new password. Please check the email you've provided us.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">OK</div>
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
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.forgotPasswordSuccessStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
