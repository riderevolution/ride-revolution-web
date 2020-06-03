<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <!-- <div class="confirmation_image">
                <img src="/default/meme/yehey-meme.jpg" />
            </div> -->
            <div class="confirmation_text">
                Sent! We greatly appreciate your feedback.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose()">Great</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.commentSuccessStatus = false
                document.body.classList.remove('no_scroll')
                me.$router.push(`/instructors/${me.$route.params.slug}`)
            }
        }
    }
</script>
