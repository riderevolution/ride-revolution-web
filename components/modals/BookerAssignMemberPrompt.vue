<template>
    <div class="default_modal">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                Are you sure you want to add this member?
            </div>
            <div class="member_info" v-if="customer != null">
                <div class="member_image">
                    <img :src="customer.customer_details.images[0].path" v-if="customer.customer_details.images[0].path != null" />
                    <div class="overlay" v-else>
                        <div class="letter">
                            {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                        </div>
                    </div>
                </div>
                <h2>{{ customer.first_name }} {{ customer.last_name }}</h2>
                <h3>{{ customer.member_id }}</h3>
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="flex default_btn_out" @click.once="toggleClose(false)"><span>No</span></a>
                <div class="flex default_btn" @click.once="toggleClose(true)">Yes</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            customer: {
                default: null
            },
            seat: {
                default: null
            }
        },
        data () {
            return {
                user: []
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.customer != null) {
                        me.loader(true)
                        let formData = new FormData()
                        formData.append('scheduled_date_id', me.$route.params.slug)
                        formData.append('user_id', me.customer.id)
                        formData.append('email', me.customer.email)
                        me.$axios.post('api/extras/check-user-booking', formData).then(res => {
                            if (res.data) {
                                let formData2 = new FormData(document.querySelector('#default_form.assign'))
                                if (me.customer != '' && me.$parent.assignType == 'member') {
                                    formData2.append('guest_email', me.customer.email)
                                }
                                formData2.append('scheduled_date_id', me.$route.params.slug)
                                formData2.append('is_guest', 1)
                                formData2.append('seat_id', me.seat.id)
                                formData2.append('user_id', me.user.id)
                                formData2.append('user_package_count_id', me.$parent.tempClassPackage.id)
                                me.$axios.post('api/bookings', formData2).then(res => {
                                    if (res.data) {
                                        setTimeout( () => {
                                            me.$parent.tempGuestSeat = null
                                            me.$parent.tempClassPackage = null
                                            me.$parent.hasGuest = true
                                            me.$store.state.bookerAssignStatus = false
                                            me.$store.state.bookerAssignMemberPromptStatus = false
                                            me.$parent.message = 'Seat has been reserved to your Guest.'
                                            me.$store.state.bookerAssignSuccessStatus = true
                                        }, 500)
                                    }
                                }).catch(err => {
                                    setTimeout( () => {
                                        me.$store.state.bookerAssignStatus = false
                                        me.$store.state.bookerAssignMemberPromptStatus = false
                                        me.$store.state.errorOverlayPromptStatus = true
                                        me.$store.state.errorList = err.response.data.errors
                                        me.$store.state.errorPromptStatus = true
                                        me.$parent.fetchSeats(me.$route.params.slug)
                                    }, 500)
                                }).then(() => {
                                    setTimeout( () => {
                                        me.$parent.fetchSeats(me.$route.params.slug)
                                    }, 500)
                                })
                            }
                        }).catch(err => {
                            me.$store.state.errorOverlayPromptStatus = true
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                            me.loader(false)
                        })
                    }
                } else {
                    me.$store.state.bookerAssignMemberPromptStatus = false
                    me.$store.state.bookerAssignStatus = true
                }
            }
        },
        mounted () {
            const me = this
            let token = (me.$route.query.token != null) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
            me.$axios.get('api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data) {
                    me.user = res.data.user
                }
            }).catch(err => {
                me.$store.state.errorOverlayPromptStatus = true
                me.$store.state.errorList = err.response.data.errors
                me.$store.state.errorPromptStatus = true
            }).then(() => {
                setTimeout(() => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
