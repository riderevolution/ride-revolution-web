<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper alt">
            <div class="form_close" @click.once="toggleClose()"></div>
            <div class="confirmation_title">
                Please choose an action for seat {{ seat.number }}.
            </div>
            <div class="button_group">
                <div class="flex default_btn_wht" @click.once="toggleAction('package')">Choose Package</div>
                <div class="flex default_btn_red" @click.once="toggleAction('cancel')">Remove Seat</div>
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
                                                    if (me.$parent.toSubmit.tempSeat.length == 0) {
                                                        me.$parent.removeNext = true
                                                    }
                                                    if (me.$parent.toSubmit.tempSeat.length == 1) {
                                                        me.$parent.hasGuest = false
                                                    }

                                                    me.$store.state.bookerActionsPrompt = false
                                                    me.loader(true)
                                                    setTimeout(() => {
                                                        me.$parent.promptMessage = `You've cancelled seat number ${me.$parent.seats[parent][child][i].number}`
                                                        me.$store.state.buyRidesPromptStatus = true
                                                        document.body.classList.remove('no_scroll')
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
                        me.$parent.removeNext = false
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
