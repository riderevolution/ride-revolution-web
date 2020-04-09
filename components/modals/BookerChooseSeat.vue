<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to swap?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group alt">
                        <div class="form_custom_checkbox">
                            <div :id="`seat_${key}`" :class="`custom_checkbox ${(seat.id == firstSeatID) ? 'active' : (seat.id == secondSeatID ? 'active' : '')}`" v-for="(seat, key) in seatNumbers" :key="key" @click="toggleSeat(seat, key)">
                                <label>Bike No. {{ seat.number }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>{{ (seat.temp.guest == 0) ? 'Me' : `${seat.temp.customer.first_name} ${seat.temp.customer.last_name}` }}</p>
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
            seatNumbers: {
                default: null
            }
        },
        data () {
            return {
                firstSeatID: 0,
                firstSeatIndex: null,
                secondSeatID: 0,
                secondSeatIndex: null,
                hasSelectedTwo: false,
                seatCtr: 0
            }
        },
        methods: {
            /**
             * [swapTempObjects swap temp seat temp object]
             * @param  {[int]} index1 [first selected seat]
             * @param  {[int]} index2 [second selected seat]
             * @return {[object]}        [updated tempSeat object]
             */
            swapTempObjects (index1, index2) {
                const me = this
                let temp = me.seatNumbers
                var b = temp[index1].temp
                temp[index1].temp = temp[index2].temp
                temp[index2].temp = b
                return temp
            },
            /**
             * [swapStatusObjects swap temp seat status value]
             * @param  {[int]} index1 [first selected seat]
             * @param  {[int]} index2 [second selected seat]
             * @return {[object]}        [updated tempSeat object]
             */
            swapStatusObjects (index1, index2) {
                const me = this
                let temp = me.seatNumbers
                var b = temp[index1].status
                temp[index1].status = temp[index2].status
                temp[index2].status = b
                return temp
            },
            submissionSuccess () {
                const me = this
                let tempSeat = null
                if (me.secondSeatID) {
                    me.loader(true)

                    tempSeat = me.swapTempObjects(me.firstSeatIndex, me.secondSeatIndex)
                    tempSeat = me.swapStatusObjects(me.firstSeatIndex, me.secondSeatIndex)

                    tempSeat.forEach((element, index) => {
                        if (element.temp.guest == 0) {
                            me.$parent.tempOriginalSeat = element
                        }
                    })

                    me.$parent.toSubmit.tempSeat = tempSeat

                    Object.keys(me.$parent.seats).forEach((parent) => {
                        Object.keys(me.$parent.seats[parent]).forEach((child) => {
                            if (child == 'data') {
                                for (let i = 0; i < me.$parent.seats[parent][child].length; i++) {
                                    for (let j = 0; j < tempSeat.length; j++) {
                                        if (tempSeat[j].id == me.$parent.seats[parent][child][i].id) {
                                            me.$parent.seats[parent][child][i] = tempSeat[j]
                                        }
                                    }
                                }
                            }
                        })
                    })
                    if (me.$parent.added != null && me.$parent.added != undefined) {
                        me.$parent.added++
                    }
                    me.$store.state.bookerChooseSeatStatus = false
                    me.$parent.status = true
                    setTimeout( () => {
                        me.$parent.promptMessage = "You've successfully swapped seats."
                        me.$store.state.buyRidesPromptStatus = true
                        me.loader(false)
                    }, 500)
                    me.$parent.removeNext = false
                    console.log(me.$parent.toSubmit.tempSeat);
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
                        me.secondSeatID = data.id
                        me.secondSeatIndex = unique
                        me.seatCtr++
                    }
                } else {
                    if (data.id != me.secondSeatID) {
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
            me.seatNumbers.forEach((element, index) => {
                if (element.temp.guest == 0) {
                    me.firstSeatID = element.id
                    me.firstSeatIndex = index
                }
            })
            me.seatCtr++
        }
    }
</script>
