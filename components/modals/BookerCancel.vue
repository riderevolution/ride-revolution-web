<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text" v-if="type == 1">
                Are you sure you want to cancel this class?
            </div>
            <div class="confirmation_text" v-else>
                Your booking has been cancelled. A email notification will also be sent to your guests.
            </div>
            <div :class="`button_group ${(type != 1) ? 'alt' : ''}`">
                <div class="flex default_btn_red" @click.once="toggleClose(false)" v-if="type == 1"><span>No</span></div>
                <div class="flex default_btn_wht" @click.once="toggleClose(true)">{{ (type == 1) ? 'Yes' : 'Done' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number,
                default: 1
            },
            seat: {
                default: null
            }
        },
        methods: {
            /**
             * [toggleClose toggle action based on the status]
             * @param  {[boolean]} status [action status]
             */
            toggleClose (status) {
                const me = this
                let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
                if (me.type == 2) {
                    me.$parent.cancelType = 1
                    me.$store.state.bookerCancelStatus = false
                    document.body.classList.remove('no_scroll')
                    if (me.$route.query.token) {
                        me.$router.push(`/fish-in-the-glass/book-a-bike?token=${token}`)
                    } else {
                        me.$router.push(`/book-a-bike`)
                    }
                } else {
                    if (status) {
                        /**
                         * Cancel the whole class */
                        me.$axios.get('api/check-token', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.loader(true)
                                let booking_id = 0
                                let user = res.data
                                let formData = new FormData()
                                formData.append('scheduled_date_id', me.seat.bookings[0].scheduled_date_id)
                                formData.append('type', 'cancel')
                                me.$axios.post('api/schedules/validate', formData).then(res => {
                                    if (res.data) {
                                        if (me.$parent.schedule.schedule.studio.online_class) {
                                            me.seat.bookings.forEach((booking, key) => {
                                                if (user.user.id == booking.user_id) {
                                                    booking_id = booking.id
                                                }
                                            })
                                        } else {
                                            booking_id = me.seat.bookings[0].id
                                        }
                                        me.$axios.delete(`api/bookings/${booking_id}`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            }
                                        }).then(res => {
                                            if (res.data) {
                                                me.$store.state.bookerCancelStatus = false
                                                setTimeout( () => {
                                                    me.$parent.toggleCancelled()
                                                }, 500)
                                            }
                                        }).catch(err => {
                                            setTimeout( () => {
                                                me.$store.state.errorOverlayPromptStatus = true
                                                me.$store.state.errorList = err.response.data.errors
                                                me.$store.state.errorPromptStatus = true
                                            }, 500)
                                        }).then(() => {
                                            setTimeout( () => {
                                                me.loader(false)
                                            }, 500)
                                        })
                                    }
                                }).catch(err => {
                                    setTimeout( () => {
                                        me.$store.state.errorOverlayPromptStatus = true
                                        me.$store.state.errorList = err.response.data.errors
                                        me.$store.state.errorPromptStatus = true
                                        me.$store.state.bookerCancelStatus = false
                                        me.loader(false)
                                    }, 500)
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                            setTimeout( () => {
                                me.$store.state.errorOverlayPromptStatus = true
                                me.$store.state.errorList = err.response.data.errors
                                me.$store.state.errorPromptStatus = true
                                me.$store.state.bookerCancelStatus = false
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$store.state.bookerCancelStatus = false
                        document.body.classList.remove('no_scroll')
                    }
                }
            }
        }
    }
</script>
