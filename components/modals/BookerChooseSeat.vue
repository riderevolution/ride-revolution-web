<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to swap?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`seat_${key}`" :class="`custom_checkbox ${(key == 1) ? 'active' : ''}`" v-if="key != 0" v-for="(seat, key) in bikeSeats" :key="key" @click="toggleSeat(seat, key)">
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
                originalIndex: null,
                currentSeatIndex: null,
                bikeSeats: []
            }
        },
        methods: {
            swapGuestObjects (index1, index2) {
                const me = this
                var b = me.bikeSeats[index1].guest
                me.bikeSeats[index1].guest = me.bikeSeats[index2].guest
                me.bikeSeats[index2].guest = b
                return me.bikeSeats
            },
            swapTempObjects (index1, index2) {
                const me = this
                var b = me.bikeSeats[index1].temp
                me.bikeSeats[index1].temp = me.bikeSeats[index2].temp
                me.bikeSeats[index2].temp = b
                return me.bikeSeats
            },
            submissionSuccess () {
                const me = this
                let tempSeat = null
                if (me.selectedSeat) {
                    me.loader(true)
                    me.bikeSeats = me.swapGuestObjects(me.originalIndex, me.currentSeatIndex)
                    me.bikeSeats = me.swapTempObjects(me.originalIndex, me.currentSeatIndex)
                    me.bikeSeats[me.originalIndex].status = (me.bikeSeats[me.originalIndex].status == 'guest') ? 'reserved' : 'guest'
                    me.bikeSeats[me.currentSeatIndex].status = (me.bikeSeats[me.currentSeatIndex].status == 'reserved') ? 'guest' : 'reserved'

                    me.$parent.toSubmit.tempSeat = me.bikeSeats

                    Object.keys(me.$parent.seats).forEach((parent) => {
                        Object.keys(me.$parent.seats[parent]).forEach((child) => {
                            if (child == 'data') {
                                for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                    for (let j = 0; j < me.bikeSeats.length; j++) {
                                        if (me.bikeSeats[j].id == me.$parent.seats[parent][child][i].id) {
                                            me.$parent.seats[parent][child][i] = me.bikeSeats[j]
                                        }
                                    }
                                }
                            }
                        })
                    })
                    setTimeout( () => {
                        me.$store.state.bookerChooseSeatStatus = false
                        document.body.classList.remove('no_scroll')
                        me.loader(false)
                    }, 500)
                }
            },
            toggleSeat (data, unique) {
                const me = this
                let formData = new FormData()
                me.selectedSeat = data.id
                me.currentSeatIndex = unique
                document.getElementById(`seat_${unique}`).classList.add('active')
                me.bikeSeats.forEach((element, index) => {
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
            me.bikeSeats = me.seatNumbers
            me.bikeSeats.forEach((element, index) => {
                if (index == 0) {
                    me.originalIndex = index
                    me.originalSeat = element.id
                }
                if (index == 1) {
                    me.currentSeatIndex = index
                    me.selectedSeat = element.id
                }
            })
        }
    }
</script>
