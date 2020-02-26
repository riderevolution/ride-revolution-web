<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_image">
                <img src="/default/meme/oops-complete-meme.jpg" />
            </div>
            <div class="confirmation_title">
                Oops! You have to complete your profile first.
            </div>
            <div class="confirmation_text">
                For us to serve you better, please do update your profile. It’s not gonna take you forever, we promise.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose()">Complete</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.completeProfilePromptStatus = false
                me.$store.state.completeProfileStepsStatus = true
            }
        }
    }
</script>
