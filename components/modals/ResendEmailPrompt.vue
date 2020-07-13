<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_text">
                Email has been resent. You can resend the email after 5 minutes.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">OK</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.resendEmailPrompt = false
            }
        }
    }
</script>
