<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to swap?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group alt">
                        <div class="form_custom_checkbox">
                            <div :id="`seat_${key}`" :class="`custom_checkbox ${(seat.id == firstSeatID) ? 'active' : (seat.id == secondSeatID ? 'active' : '')}`" v-for="(seat, key) in seats" :key="key" @click="toggleSeat(seat, key)">
                                <label>Bike No. {{ seat.number }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info" v-if="seat.bookings[0].is_guest == 0">
                                    <p>Me</p>
                                </div>
                                <div class="info" v-else>
                                    <p>{{ (seat.bookings[0].user == null) ? `${seat.bookings[0].guest_first_name} ${seat.bookings[0].guest_last_name}` : `${seat.bookings[0].user.first_name} ${seat.bookings[0].user.last_name}` }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn" v-if="hasSelectedTwo">Select</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seats: {
                default: null
            }
        },
        data () {
            return {
                firstBooking: 0,
                firstSeatID: 0,
                firstSeatIndex: null,
                secondBooking: 0,
                secondSeatID: 0,
                secondSeatIndex: null,
                hasSelectedTwo: false,
                seatCtr: 0
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                let tempSeat = null
                if (me.secondSeatID) {
                    me.loader(true)
                    let formData = new FormData()
                    formData.append('first_booking_id', me.firstBooking)
                    formData.append('second_booking_id', me.secondBooking)

                    me.$axios.post(`api/bookings/swap-seats`, formData).then(res => {
                        if (res.data) {
                            setTimeout( () => {
                                me.$store.state.bookerChooseSeatStatus = false
                                me.$parent.promptMessage = "You've successfully swapped seats."
                                me.$store.state.bookerPromptStatus = true
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
                            me.$parent.fetchSeats(me.$route.params.slug)
                        }, 500)
                    })
                }
            },
            /**
             * [toggleSeat get the selected seat or update the first selected seat]
             * @param  {[object]} data   [seat object]
             * @param  {[int]} unique [index of the seat]
             */
            toggleSeat (data, unique) {
                const me = this
                if (me.seatCtr < 2) {
                    if (me.firstSeatID != data.id) {
                        me.secondBooking = data.bookings[0].id
                        me.secondSeatID = data.id
                        me.secondSeatIndex = unique
                        me.seatCtr++
                    }
                } else {
                    if (data.id != me.secondSeatID) {
                        me.firstBooking = data.bookings[0].id
                        me.firstSeatID = data.id
                        me.firstSeatIndex = unique
                        me.seatCtr--
                    }
                }
                if (me.seatCtr == 2) {
                    me.hasSelectedTwo = true
                }
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerChooseSeatStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            me.seats.forEach((element, index) => {
                if (element.bookings[0].is_guest == 0) {
                    me.firstBooking = element.bookings[0].id
                    me.firstSeatID = element.id
                    me.firstSeatIndex = index
                }
            })
            me.seatCtr++
        }
    }
</script>
