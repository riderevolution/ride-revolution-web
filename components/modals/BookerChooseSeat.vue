<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
            <form id="default_form" class="overlay alt" @submit.prevent="submissionSuccess()">
                <div class="modal_wrapper">
                    <h2 class="form_title">Which seat would you like to switch?</h2>
                    <div class="form_close" @click="toggleClose()"></div>
                    <div class="modal_main_group">
                        <div class="form_custom_checkbox">
                            <div :id="`package_${key}`" :class="`custom_checkbox ${(key == 0) ? 'active' : ''}`" v-for="(seat, key) in seats" :key="key" @click="togglePackage(seat, key)">
                                <label>{{ seat.title }}</label>
                                <svg id="check" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                    <g transform="translate(-804.833 -312)">
                                        <circle class="circle" cx="14" cy="14" r="14" transform="translate(805.833 313)" />
                                        <path class="mark" d="M6466.494,185.005l4.85,4.85,9.6-9.6" transform="translate(-5653.091 142.403)" />
                                    </g>
                                </svg>
                                <div class="info">
                                    <p>{{ seat.user }}</p>
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
        data () {
            return {
                seats: [
                    {
                        id: 1,
                        title: 'Bike No. 8',
                        user: 'Me'
                    },
                    {
                        id: 2,
                        title: 'Bike No. 15',
                        user: 'Matt Stefanina'
                    }
                ],
                selectedSeat: 0
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                if (me.selectedSeat) {
                    me.$store.state.bookerChooseSeatStatus = false
                    document.body.classList.remove('no_scroll')
                }
            },
            togglePackage (data, unique) {
                const me = this
                let formData = new FormData()
                formData.append('class_package_id', data.id)
                me.selectedSeat = data.id
                document.getElementById(`package_${unique}`).classList.add('active')
                me.seats.forEach((element, index) => {
                    if (unique != index) {
                        document.getElementById(`package_${index}`).classList.remove('active')
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.bookerChooseSeatStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
