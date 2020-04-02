<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <div class="confirmation_text">
                You are about to send an email invitation to:
            </div>
            <div class="confirmation_highlight">
                {{ email }}
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="flex default_btn_out" @click.once="toggleClose(false)"><span>Back</span></a>
                <div class="flex default_btn" @click.once="toggleClose(true)">Continue</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            email: {
                type: String,
                default: null
            },
            nonMember: {
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
                    if (me.email != null) {
                        me.loader(true)
                        setTimeout( () => {
                            me.loader(true)
                            Object.keys(me.$parent.seats).forEach((parent) => {
                                Object.keys(me.$parent.seats[parent]).forEach((child) => {
                                    if (child == 'data') {
                                        for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                            if (me.$parent.seats[parent][child][i].id == me.tempSeat.id) {
                                                me.$parent.seats[parent][child][i].guest = 2
                                                me.$parent.seats[parent][child][i].status = 'reserved-guest'
                                                me.$parent.seats[parent][child][i].temp = me.nonMember
                                                me.$parent.seats[parent][child][i].class_package = me.$parent.tempClassPackage
                                                me.$parent.seats[parent][child][i].original_booker_id = me.$parent.user.id
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
                                me.$store.state.bookerAssignStatus = false
                                me.$store.state.bookerAssignNonMemberStatus = false
                                me.$store.state.bookerAssignSuccessStatus = true
                                me.loader(false)
                            }, 500)
                            me.$parent.removeNext = false
                        }, 500)
                    }
                } else {
                    me.$store.state.bookerAssignNonMemberStatus = false
                    me.$store.state.bookerAssignStatus = true
                }
            }
        }
    }
</script>
