<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <h2 class="confirmation_title alt">Congratulations! You won a badge.</h2>
            <div class="confirmation_text alt">
                Keep going! You're in for a treat.
            </div>
            <div class="confirmation_image">
                <img src="/sample-badge.svg" />
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click="toggleClose(true)">See my profile</div>
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
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                me.$store.state.badgePromptStatus = false
                document.body.classList.remove('no_scroll')
                if (statys) {
                    me.$router.push('/my-profile')
                }
            }
        }
    }
</script>
