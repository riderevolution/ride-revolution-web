<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose()"></div>
            <div class="confirmation_text">
                Thank you for submitting an inquiry. We will get in touch with you
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
                me.$store.state.contactUsPromptStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
