<template>
    <div class="default_modal overlay alt">
        <div class="background"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                Are you sure you want to cancel seat number {{ seat.number }}
            </div>
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
            toggleClose (status) {
                const me = this
                if (status) {
                    /**
                     * Check all the seats */
                    Object.keys(me.$parent.seats).forEach((parent) => {
                        Object.keys(me.$parent.seats[parent]).forEach((child) => {
                            if (child == 'data') {
                                for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                    if (me.$parent.seats[parent][child][i].id == me.seat.id) {
                                        /**
                                         * Check all tempseats */
                                        me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                            /**
                                             * Check if seat and temp seat has same id */
                                            if (me.$parent.seats[parent][child][i].id == element.id) {
                                                /**
                                                 * If tempseat is original */
                                                if (element.temp.guest == 0) {
                                                    me.$parent.hasBooked = false
                                                    me.$parent.tempOriginalSeat = null
                                                /**
                                                 * if tempseat is not original */
                                             } else {
                                                    me.$parent.tempGuestSeat = null
                                                    me.$parent.tempClassPackage = null
                                                }
                                                if (me.$parent.toSubmit.bookCount > 0) {
                                                    me.$parent.toSubmit.bookCount--
                                                }
                                                /**
                                                 * delete all the temp objects connected to the id */
                                                delete me.$parent.seats[parent][child][i].temp
                                                me.$parent.seats[parent][child][i].status = 'open'
                                                me.$parent.toSubmit.tempSeat.splice(index, 1)

                                                /**
                                                 * Check if the tempseat length less than of equal to 1 */
                                                // if (me.$parent.toSubmit.tempSeat.length == 0) {
                                                //     me.$parent.removeNext = true
                                                // }
                                                // if (me.$parent.toSubmit.tempSeat.length == 1) {
                                                //     me.$parent.hasGuest = false
                                                // }

                                                me.$store.state.bookerActionsPrompt = false
                                                me.loader(true)
                                                setTimeout(() => {
                                                    me.$store.state.bookerRemoveBookingStatus = false
                                                    document.body.classList.remove('no_scroll')
                                                    me.$parent.status = false
                                                    me.loader(false)
                                                }, 500)
                                            }
                                        })
                                        break
                                    }
                                }
                            }
                        })
                    })
                } else {
                    me.$store.state.bookerRemoveBookingStatus = false
                }
            }
        }
    }
</script>
