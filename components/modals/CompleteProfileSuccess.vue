<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_image">
                <img src="/default/meme/success-meme.jpg"/>
            </div>
            <div class="confirmation_text">
                Success! You have completed your profile.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose(true)">Got It!</div>
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
                    me.$store.state.completeProfileSuccessStatus = false
                    document.body.classList.remove('no_scroll')
                }
                me.$store.state.completeProfilePromptStatus = false
            }
        }
    }
</script>
