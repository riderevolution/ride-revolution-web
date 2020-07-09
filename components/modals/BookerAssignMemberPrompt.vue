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
            tempSeat: {
                default: null
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status) {
                    if (me.customer != null) {
                        me.loader(true)
                        Object.keys(me.$parent.seats).forEach((parent) => {
                            Object.keys(me.$parent.seats[parent]).forEach((child) => {
                                if (child == 'data') {
                                    for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                        if (me.$parent.seats[parent][child][i].id == me.tempSeat.id) {
                                            me.$parent.seats[parent][child][i].status = 'reserved-guest'
                                            me.$parent.seats[parent][child][i].temp = {}
                                            me.$parent.seats[parent][child][i].temp.guest = 1
                                            me.$parent.seats[parent][child][i].temp.customer = me.customer
                                            me.$parent.seats[parent][child][i].temp.user_package_count = me.$parent.tempClassPackage
                                            me.$parent.seats[parent][child][i].temp.original_booker_id = me.$parent.user.id
                                            break
                                        }
                                    }
                                }
                            })
                        })
                        me.$parent.toSubmit.bookCount++
                        me.$parent.toSubmit.tempSeat.push(me.tempSeat)
                        me.$parent.tempGuestSeat = null
                        me.$parent.tempClassPackage = null
                        me.$parent.hasGuest = true
                        if (me.$parent.added != null && me.$parent.added != undefined) {
                            me.$parent.added++
                        }
                        setTimeout( () => {
                            me.$store.state.bookerAssignMemberPromptStatus = false
                            document.body.classList.remove('no_scroll')
                            // me.$store.state.bookerAssignSuccessStatus = true
                            me.loader(false)
                        }, 500)
                        
                        me.$parent.removeNext = false

                        this.$scrollTo('.next_wrapper .right .default_btn', {
                            duration: 1000,
                            offset: -750
                        })
                    }
                } else {
                    me.$store.state.bookerAssignMemberPromptStatus = false
                    me.$store.state.bookerAssignStatus = true
                }
            }
        }
    }
</script>
