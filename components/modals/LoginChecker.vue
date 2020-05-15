<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <!-- <div class="confirmation_image">
                <img src="/default/meme/error-meme.jpg" />
            </div> -->
            <div class="confirmation_title">
                Login or sign up an account in order to proceed.
            </div>
            <div class="button_group alt_2">
                <div class="default_btn_wht flex" @click.once="toggleClose(true)">Confirm</div>
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
                    me.$store.state.loginCheckerStatus = false
                    me.$store.state.loginSignUpStatus = true
                } else {
                    me.$store.state.loginCheckerStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
