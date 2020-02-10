<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_image">
                <img src="/default/meme/error-meme.png" />
            </div>
            <div class="confirmation_text">
                Sorry we don’t recognize that member ID. Please make sure all characters are correct.
            </div>
            <div class="button_group alt">
                <div class="flex default_btn" @click.once="toggleClose(true)">Try Again</div>
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
                    me.$store.state.bookerAssignMemberErrorStatus = false
                } else {
                    me.$store.state.bookerAssignMemberErrorStatus = false
                    document.body.classList.remove('no_scroll')
                }
            }
        }
    }
</script>
