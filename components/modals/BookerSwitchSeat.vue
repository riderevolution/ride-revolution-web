<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to switch?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`seat_${key}`" :class="`custom_checkbox ${(seat.id == selectedID) ? 'active' : ''}`" v-for="(seat, key) in seatNumbers" :key="key" @click="toggleSeat(seat, key)">
                                <label>Bike No. {{ seat.number }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>{{ (seat.guest == 0) ? 'Me' : `${seat.temp.first_name} ${seat.temp.last_name}` }}</p>
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
                selected: 0,
                selectedID: 0
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                let temp = me.selected
                if (me.selectedID) {
                    me.loader(true)
                    me.$parent.selectedSwitchSeat = temp
                    me.$parent.isSwitchingSeat = true
                    setTimeout( () => {
                        me.$store.state.bookerSwitchSeatStatus = false
                        document.body.classList.remove('no_scroll')
                        me.loader(false)
                    }, 500)
                }
            },
            /**
             * [toggleSeat get the selected seat or update the first selected seat]
             * @param  {[object]} data   [seat object]
             * @param  {[int]} unique [index of the seat]
             */
            toggleSeat (data, unique) {
                const me = this
                me.selected = data
                me.selectedID = data.id
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerSwitchSeatStatus = false
                document.body.classList.remove('no_scroll')
            }
        },
        mounted () {
            const me = this
            me.seatNumbers.forEach((element, index) => {
                if (element.guest == 0) {
                    me.selected = element
                    me.selectedID = element.id
                }
            })
        }
    }
</script>
