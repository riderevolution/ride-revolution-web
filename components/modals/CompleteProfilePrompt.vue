<template>
    <div class="default_modal alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <!-- <div class="form_close" @click="toggleClose(false)"></div> -->
            <!-- <div class="confirmation_image">
                <img src="/default/meme/oops-complete-meme.jpg" />
            </div> -->
            <div class="confirmation_title">
                Oops! You have to complete your profile first.
            </div>
            <div class="confirmation_text">
                Please complete your profile details so we can improve your experience. It won’t take long, we promise.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">Complete</div>
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
                    me.$store.state.completeProfileStepsStatus = true
                } else {
                    document.body.classList.remove('no_scroll')
                }
                me.$store.state.completeProfilePromptStatus = false
            }
        },
        mounted () {
            const me = this
            me.loader(false)
            document.body.classList.add('no_scroll')
        }
    }
</script>
