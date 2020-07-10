<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <!-- <div class="confirmation_image">
                <img src="/default/meme/before-cancel-meme.jpg" v-if="type == 1"/>
                <img src="/default/meme/cancelled-meme.jpg" v-else/>
            </div> -->
            <div class="confirmation_text" v-if="type == 1">
                Are you sure you want to cancel this class?
            </div>
            <div class="confirmation_text" v-else>
                Your booking has been cancelled.
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
            }
        },
        methods: {
            /**
             * [toggleClose toggle action based on the status]
             * @param  {[boolean]} status [action status]
             */
            toggleClose (status) {
                const me = this
                if (me.type == 2) {
                    me.$parent.type = 1
                    me.$parent.toggledMenuTab('upcoming')
                    me.$store.state.cancelClassStatus = false
                    document.body.classList.remove('no_scroll')
                } else {
                    if (status) {
                        let token = me.$cookies.get('70hokc3hhhn5')
                        me.$axios.get('api/check-token', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                let user = res.data
                                let url = ''
                                let formData = new FormData()
                                formData.append('scheduled_date_id', me.$parent.tempBooking.scheduled_date_id)
                                formData.append('type', 'cancel')
                                if (me.$parent.tabCategory == 'upcoming') {
                                    url = `api/bookings/${me.$parent.tempBooking.id}`
                                } else if (me.$parent.tabCategory == 'waitlisted') {
                                    url = `api/waitlists/${me.$parent.tempBooking.id}`
                                }
                                me.$axios.post('api/schedules/validate', formData).then(res => {
                                    if (res.data) {
                                        me.loader(true)
                                        me.$axios.delete(`${url}`).then(res => {
                                            if (res.data) {
                                                me.$store.state.cancelClassStatus = false
                                                setTimeout( () => {
                                                    me.$parent.toggleCancelled()
                                                }, 500)
                                            }
                                        }).catch(err => {
                                            setTimeout( () => {
                                                me.$store.state.errorList = err.response.data.errors
                                                me.$store.state.errorPromptStatus = true
                                                me.$store.state.errorOverlayPromptStatus = true
                                            }, 500)
                                        }).then(() => {
                                            setTimeout( () => {
                                                me.loader(false)
                                            }, 500)
                                        })
                                    }
                                }).catch(err => {
                                    me.$store.state.cancelClassStatus = false
                                    me.$store.state.errorList = err.response.data.errors
                                    me.$store.state.errorPromptStatus = true
                                    me.$store.state.errorOverlayPromptStatus = true
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        me.$store.state.cancelClassStatus = false
                        document.body.classList.remove('no_scroll')
                    }
                }
            }
        }
    }
</script>
