<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <h2 class="confirmation_title">Confirm Deactivation</h2>
            <div class="confirmation_image">
                <img src="/default/meme/are-you-sure-meme.jpg" />
            </div>
            <div class="confirmation_text">
                Are you sure to deactivate your account? You may reactivate it later, if you wish.
            </div>
            <div class="button_group">
                <div class="flex default_btn_red" @click.once="toggleClose(false)"><span>Cancel</span></div>
                <div class="flex default_btn" @click.once="toggleClose(true)">Deactivate</div>
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
                    me.$store.state.loginSignUpStatus = true
                    me.$store.state.deactivateAccountPromptStatus = false
                } else {
                    me.$store.state.deactivateAccountPromptStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
