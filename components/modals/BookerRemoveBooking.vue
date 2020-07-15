<template>
    <div class="default_modal overlay alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text" v-html="getText()"></div>
            <div class="button_group alt">
                <div class="flex default_btn_red" @click.once="toggleClose(false)">Cancel</div>
                <div class="flex default_btn_wht ml" @click.once="toggleClose(true)">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seat: {
                default: false
            }
        },
        methods: {
            getText () {
                const me = this
                let result = ''
                if (me.$route.name == 'my-profile-manage-class-slug') {
                    if (me.seat.bookings.length > 0) {
                        result = `Are you sure you want to remove seat number <b style="text-decoration: underline;">${me.seat.number}</b>? The action will only take place if you click <b style="text-transform: uppercase; text-decoration: underline;">"Confirm"</b>. A email notification will also be sent to this guest.`
                    } else {
                        result = `Are you sure you want to cancel seat number <b style="text-decoration: underline;>${me.seat.number}</b>?`
                    }
                } else {
                    result = `Are you sure you want to cancel seat number <b style="text-decoration: underline;>${me.seat.number}</b>?`
                }
                return result
            },
            toggleClose (status) {
                const me = this
                if (status) {
                    me.loader(true)
                    me.$axios.delete(`api/bookings/${me.seat.bookings[0].id}`).then(res => {
                        if (res.data) {
                            setTimeout( () => {
                                me.$store.state.bookerActionsPrompt = false
                                me.$store.state.bookerRemoveBookingStatus = false
                                if (me.seat.bookings[0].is_guest == 1) {
                                    me.$parent.promptMessage = 'Your booking has been successfully cancelled.'
                                    me.$store.state.bookerPromptStatus = true
                                }
                            }, 500)
                        }
                    }).catch(err => {
                        setTimeout( () => {
                            me.$store.state.bookerActionsPrompt = false
                            me.$store.state.bookerRemoveBookingStatus = false
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }, 500)
                    }).then(() => {
                        setTimeout( () => {
                            if (me.seat.bookings[0].is_guest == 0) {
                                me.$store.state.bookerCancelStatus = true
                                me.$parent.cancelType = 2
                                me.loader(false)
                            } else {
                                me.$parent.fetchSeats(me.$route.params.slug)
                            }
                        }, 500)
                    })
                } else {
                    me.$store.state.bookerRemoveBookingStatus = false
                }
            }
        }
    }
</script>
