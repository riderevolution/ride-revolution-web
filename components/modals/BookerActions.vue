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
                <div class="flex default_btn_red" @click.once="toggleAction('cancel')">Cancel Seat</div>
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
            toggleAction (type) {
                const me = this
                switch (type) {
                    case 'package':
                        me.$store.state.bookerChoosePackageStatus = true
                        break
                    case 'cancel':
                        Object.keys(me.$parent.seats).forEach((parent) => {
                            Object.keys(me.$parent.seats[parent]).forEach((child) => {
                                if (child == 'data') {
                                    for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                        if (me.$parent.seats[parent][child][i].id == me.seat.id) {
                                            me.$parent.toSubmit.tempSeat.forEach((element, index) => {
                                                if (me.$parent.seats[parent][child][i].temp.id == element.temp.id) {
                                                    if (me.$parent.toSubmit.tempSeat.length <= 1 && element.guest == 0) {
                                                        me.$parent.removeNext = true
                                                    }
                                                    if (element.guest == 0) {
                                                        me.$parent.hasBooked = false
                                                        me.$parent.tempOriginalSeat = null
                                                    } else {
                                                        me.$parent.toSubmit.bookCount--
                                                        me.$parent.tempGuestSeat = null
                                                        me.$parent.tempClassPackage = null
                                                    }
                                                    delete me.$parent.seats[parent][child][i].guest
                                                    delete me.$parent.seats[parent][child][i].temp
                                                    me.$parent.seats[parent][child][i].status = 'open'
                                                    me.$parent.toSubmit.tempSeat.splice(index, 1)
                                                    console.log(me.$parent.toSubmit)
                                                }
                                            })
                                            break
                                        }
                                    }
                                }
                            })
                        })
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
