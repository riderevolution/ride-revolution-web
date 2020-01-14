<template>
    <div class="book_a_bike">
        <section id="banner"></section>
        <section id="content">
            <div class="main_left">
                <div class="header">
                    <h2 class="date">May 15, 2019</h2>
                    <h2 class="time">7:30 PM - 8:20 PM</h2>
                </div>
                <div class="content">
                    <ul>
                        <li>50-Minute Ride</li>
                        <li>Billie Capistrano</li>
                        <li>Shangri-La Plaza</li>
                    </ul>
                </div>
            </div>
            <div class="main_right">
                <div class="header">
                    <div class="back">Back</div>
                </div>
                <div class="content">
                    <!-- <div class="overlay_header">
                        <h3>Please choose your bike/s</h3>
                        <h4>Note: You can book up to 5 bikes.</h4>
                        <img src="/default/studio/studio1.jpg" />
                    </div> -->
                    <div class="seat_wrapper">
                        <div :class="`overlay_seat ${seat.position} ${seat.layout}`" v-for="(seat, key) in seats" :key="key" v-if="seat.data.length > 0">
                            <div class="seat" v-for="(data, key) in seat.data" :key="key">
                                <div class="seat_number">
                                    {{ data.number }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="legends">
                            <ul>
                                <li class="available"><span></span>Available</li>
                                <li class="unavailable"><span></span>Unavailable</li>
                                <li class="guest"><span></span>Guest</li>
                                <li class="you"><span></span>You</li>
                            </ul>
                        </div>
                        <div class="actions">
                            <a href="javascript:void()" class="default_btn">Buy Rides</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                seats: {
                    left: {
                        position: 'left',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '18'
                            },
                            {
                                number: '16'
                            },
                            {
                                number: '17'
                            },
                            {
                                number: '15'
                            }
                        ]
                    },
                    right: {
                        position: 'right',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '12'
                            },
                            {
                                number: '14'
                            },
                            {
                                number: '11'
                            },
                            {
                                number: '13'
                            }
                        ]
                    },
                    bottom: {
                        position: 'bottom',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '10'
                            },
                            {
                                number: '9'
                            },
                            {
                                number: '8'
                            },
                            {
                                number: '7'
                            },
                            {
                                number: '6'
                            },
                            {
                                number: '5'
                            },
                            {
                                number: '4'
                            },
                            {
                                number: '3'
                            },
                            {
                                number: '2'
                            },
                            {
                                number: '1'
                            }
                        ]
                    },
                    bottom_alt: {
                        position: 'bottom_alt',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '28'
                            },
                            {
                                number: '27'
                            },
                            {
                                number: '26'
                            },
                            {
                                number: '25'
                            },
                            {
                                number: '24'
                            },
                            {
                                number: '23'
                            },
                            {
                                number: '22'
                            },
                            {
                                number: '21'
                            },
                            {
                                number: '20'
                            },
                            {
                                number: '19'
                            }
                        ]
                    },
                    bottom_alt_2: {
                        position: 'bottom_alt_2',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '28'
                            },
                            {
                                number: '27'
                            },
                            {
                                number: '26'
                            },
                            {
                                number: '25'
                            },
                            {
                                number: '24'
                            },
                            {
                                number: '23'
                            },
                            {
                                number: '22'
                            },
                            {
                                number: '21'
                            },
                            {
                                number: '20'
                            },
                            {
                                number: '19'
                            }
                        ]
                    },
                }
            }
        }
    }
</script>
