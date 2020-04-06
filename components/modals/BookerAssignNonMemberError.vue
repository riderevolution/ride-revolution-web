<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_image">
                <img src="/default/meme/error-meme.jpg" />
            </div>
            <div class="confirmation_text">
                Sorry the email address you've entered is already existing. Please try another email.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">Try Again</div>
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
                    me.$store.state.bookerAssignStatus = true
                    me.$store.state.bookerAssignNonMemberErrorStatus = false
                } else {
                    me.$store.state.bookerAssignNonMemberErrorStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
