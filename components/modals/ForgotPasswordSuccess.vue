<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_image">
                <img src="/default/meme/success-meme.jpg" />
            </div>
            <div class="confirmation_text">
                Success! We've sent your new password. Please check the email you've provided us.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose()">Great</div>
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
            }
        }
    }
</script>
