<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper alt">
            <div class="form_close" @click.once="toggleClose()"></div>
            <div class="confirmation_title">
                Please choose an action for seat 00.
            </div>
            <div class="button_group">
                <div class="flex default_btn_wht" @click.once="toggleAction('package')">Choose Package</div>
                <div class="flex default_btn_red" @click.once="toggleAction('cancel')">Cancel Seat</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleAction (type) {
                const me = this
                switch (type) {
                    case 'package':

                        break
                    case 'cancel':

                        break
                }
                me.toggleClose()
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerActionsPrompt = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
