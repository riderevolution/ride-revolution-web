<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <!-- <div class="confirmation_image">
                <img src="/default/meme/cancelled-meme.jpg" />
            </div> -->
            <div class="confirmation_text">
                You have been successfully removed from the waitlist.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click.once="toggleClose()">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleClose () {
                const me = this
                me.$router.push(`/fish-in-the-glass/book-a-bike?token=${$route.query.token}`)
                me.$store.state.waitlistPrompt = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
