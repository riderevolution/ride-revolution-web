<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper alt">
            <div class="form_close" @click.once="toggleClose()"></div>
            <div class="confirmation_title">
                Please choose an action for seat {{ seat.number }}.
            </div>
            <div class="button_group">
                <div class="flex default_btn_wht" @click="toggleAction('package')">Change Package</div>
                <div class="flex default_btn_red" @click="toggleAction('cancel')">Cancel Booking</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seat: {
                default: null
            }
        },
        methods: {
            /**
             * [toggleAction check if what action will process]
             * @param  {[string]} type [type of action]
             */
            toggleAction (type) {
                const me = this
                switch (type) {
                    case 'package':
                        me.$store.state.bookerActionsPrompt = false
                        me.loader(true)
                        setTimeout(() => {
                            me.$store.state.bookerChoosePackageStatus = true
                        }, 500)
                        break
                    case 'cancel':
                        me.$store.state.bookerRemoveBookingStatus = true
                        break
                }
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerActionsPrompt = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
