<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to swap?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`seat_${key}`" :class="`custom_checkbox ${(key == 1) ? 'active' : ''}`" v-if="key != 0" v-for="(seat, key) in seats" :key="key" @click="toggleSeat(seat, key)">
                                <label>Bike No. {{ seat.number }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>{{ (key == 0) ? 'Me' : `${seat.temp.first_name} ${seat.temp.last_name}` }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form_button">
                            <button type="submit" class="default_btn">Select</button>
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
            seatNumbers: {
                default: null
            }
        },
        data () {
            return {
                selectedSeat: 0,
                originalSeat: 0,
                original: null,
                seat: null,
                seats: []
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedSeat) {
                    let tempOriginal = me.original
                    let tempSeat = me.seat
                    let tempSeats = []
                    if (tempOriginal.id == me.originalSeat) {
                        me.original.guest = tempSeat.guest
                        tempSeats.push(me.original)
                    }
                    if (tempSeat.id == me.selectedSeat) {
                        me.seat.guest = 0
                        tempSeats.push(me.seat)
                    }
                    console.log(tempSeats);
                    //
                    // if (tempSeat.id == me.selectedSeat) {
                    //     me.original.guest = tempSeat.guest
                    // }


                    // console.log(me.seats);
                    // me.$store.state.bookerChooseSeatStatus = false
                    // document.body.classList.remove('no_scroll')
                }
            },
            toggleSeat (data, unique) {
                const me = this
                let formData = new FormData()
                me.selectedSeat = data.id
                me.seat = data
                document.getElementById(`seat_${unique}`).classList.add('active')
                me.seats.forEach((element, index) => {
                    if (unique != index) {
                        document.getElementById(`seat_${index}`).classList.remove('active')
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerChooseSeatStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            me.seats = me.seatNumbers
            me.seats.forEach((element, index) => {
                if (index == 0) {
                    me.original = element
                    me.originalSeat = element.id
                }
                if (index == 1) {
                    me.seat = element
                    me.selectedSeat = element.id
                }
            })
        }
    }
</script>
