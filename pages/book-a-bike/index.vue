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
                        <li><span><img class="icon" src="/icons/ride-icon.svg" />50-Minute Ride <img class="info" src="/icons/info-booker-icon.svg" /></span></li>
                        <li><span><img class="icon" src="/icons/instructor-icon.svg" />Billie Capistrano</span></li>
                        <li><span><img class="icon" src="/icons/location-icon.svg" />Shangri-La Plaza</span></li>
                    </ul>
                </div>
            </div>
            <div class="main_right">
                <div class="header">
                    <div class="back">Back</div>
                </div>
                <div class="content">
                    <div class="seat_wrapper">
                        <div class="overlay_header">
                            <h3>Please choose your bike/s</h3>
                            <h4>Note: You can book up to 5 bikes.</h4>
                            <img src="/sample-image-booker.png" />
                        </div>
                        <div :class="`overlay_seat ${seat.position} ${seat.layout}`" v-for="(seat, key) in seats" :key="key" v-if="seat.data.length > 0">
                            <div @click="signIn(data)" :class="`seat ${(data.status == 'reserved') ? 'reserved' : (data.status == 'blocked') ? 'blocked' : (data.status == 'guest') ? 'guest' : ''}`" v-for="(data, key) in seat.data" :key="key">
                                <transition name="slide">
                                    <img class="seat_image" src="/sample-image-booker.png" v-if="data.status == 'reserved'" />
                                </transition>
                                <transition name="slide">
                                    <img class="seat_image" src="/sample-image-booker.png" v-if="data.status == 'guest'" />
                                </transition>
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
                            <a href="javascript:void()" class="default_btn" v-if="!checkPackage">Buy Rides</a>
                            <transition name="fade">
                                <div class="next_wrapper" v-if="checkPackage">
                                    <div class="left">
                                        <div class="flex package">
                                            <div class="toggler">
                                                <p>Class Package:</p>
                                                <div class="picker" @click="choosePackage()">10 Class Package</div>
                                            </div>
                                            <div class="toggler" v-if="hasGuest">
                                                <p>Switch seat for:</p>
                                                <div class="picker" @click="chooseSeat()">Bike No. 8</div>
                                            </div>
                                        </div>
                                        <div class="flex package_detail">
                                            <p>Total Rides Left: 9</p>
                                            <p class="bold">Total Rides Used: 1</p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <a href="javascript:void()" class="default_btn">Next</a>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <transition name="fade">
            <booker-assign v-if="$store.state.bookerAssignStatus" />
        </transition>
        <transition name="fade">
            <booker-choose-package v-if="$store.state.bookerChoosePackageStatus" />
        </transition>
        <transition name="fade">
            <booker-choose-seat v-if="$store.state.bookerChooseSeatStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-member-prompt :customer="customer" v-if="$store.state.bookerAssignMemberPromptStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-member-error v-if="$store.state.bookerAssignMemberErrorStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-non-member :email="nonMemberEmail" v-if="$store.state.bookerAssignNonMemberStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-success :message="message" v-if="$store.state.bookerAssignSuccessStatus" />
        </transition>
    </div>
</template>

<script>
    import BookerAssign from '../../components/modals/BookerAssign'
    import BookerChoosePackage from '../../components/modals/BookerChoosePackage'
    import BookerChooseSeat from '../../components/modals/BookerChooseSeat'
    import BookerAssignMemberPrompt from '../../components/modals/BookerAssignMemberPrompt'
    import BookerAssignMemberError from '../../components/modals/BookerAssignMemberError'
    import BookerAssignNonMember from '../../components/modals/BookerAssignNonMember'
    import BookerAssignSuccess from '../../components/modals/BookerAssignSuccess'
    export default {
        components: {
            BookerAssign,
            BookerChoosePackage,
            BookerChooseSeat,
            BookerAssignMemberPrompt,
            BookerAssignMemberError,
            BookerAssignNonMember,
            BookerAssignSuccess
        },
        data () {
            return {
                customer: {
                    path: '/sample-image-booker.png',
                    name: 'A. Hepburn',
                    member_id: 'MEMBER ID: RR-12345'
                },
                seats: {
                    left: {
                        position: 'left',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '18',
                                status: 'blocked'
                            },
                            {
                                number: '16',
                                status: 'blocked'
                            },
                            {
                                number: '17',
                                status: 'blocked'
                            },
                            {
                                number: '15',
                                status: 'blocked'
                            }
                        ]
                    },
                    right: {
                        position: 'right',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '12',
                                status: 'open'
                            },
                            {
                                number: '14',
                                status: 'open'
                            },
                            {
                                number: '11',
                                status: 'open'
                            },
                            {
                                number: '13',
                                status: 'open'
                            }
                        ]
                    },
                    bottom: {
                        position: 'bottom',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '10',
                                status: 'open'
                            },
                            {
                                number: '9',
                                status: 'open'
                            },
                            {
                                number: '8',
                                status: 'open'
                            },
                            {
                                number: '7',
                                status: 'open'
                            },
                            {
                                number: '6',
                                status: 'open'
                            },
                            {
                                number: '5',
                                status: 'open'
                            },
                            {
                                number: '4',
                                status: 'open'
                            },
                            {
                                number: '3',
                                status: 'open'
                            },
                            {
                                number: '2',
                                status: 'open'
                            },
                            {
                                number: '1',
                                status: 'open'
                            }
                        ]
                    },
                    bottom_alt: {
                        position: 'bottom_alt',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '28',
                                status: 'open'
                            },
                            {
                                number: '27',
                                status: 'open'
                            },
                            {
                                number: '26',
                                status: 'open'
                            },
                            {
                                number: '25',
                                status: 'open'
                            },
                            {
                                number: '24',
                                status: 'open'
                            },
                            {
                                number: '23',
                                status: 'open'
                            },
                            {
                                number: '22',
                                status: 'open'
                            },
                            {
                                number: '21',
                                status: 'open'
                            },
                            {
                                number: '20',
                                status: 'open'
                            },
                            {
                                number: '19',
                                status: 'open'
                            }
                        ]
                    },
                    bottom_alt_2: {
                        position: 'bottom_alt_2',
                        layout: 'layout_1',
                        data: [
                            {
                                number: '28',
                                status: 'open'
                            },
                            {
                                number: '27',
                                status: 'open'
                            },
                            {
                                number: '26',
                                status: 'open'
                            },
                            {
                                number: '25',
                                status: 'open'
                            },
                            {
                                number: '24',
                                status: 'open'
                            },
                            {
                                number: '23',
                                status: 'open'
                            },
                            {
                                number: '22',
                                status: 'open'
                            },
                            {
                                number: '21',
                                status: 'open'
                            },
                            {
                                number: '20',
                                status: 'open'
                            },
                            {
                                number: '19',
                                status: 'open'
                            }
                        ]
                    }
                },
                checkPackage: 0,
                nonMemberEmail: null,
                currentSeat: [],
                message: 'Cheers! Successfully added a Guest.',
                hasGuest: false
            }
        },
        methods: {
            chooseSeat () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.$store.state.bookerChooseSeatStatus = true
                    document.body.classList.add('no_scroll')
                    me.loader(false)
                }, 500)
            },
            choosePackage () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.$store.state.bookerChoosePackageStatus = true
                    document.body.classList.add('no_scroll')
                    me.loader(false)
                }, 500)
            },
            signIn (data) {
                const me = this
                me.currentSeat = data
                if (me.checkPackage == 0) {
                    me.loader(true)
                    document.body.classList.add('no_scroll')
                    setTimeout( () => {
                        me.checkPackage = 1
                        data.status = 'reserved'
                        document.body.classList.remove('no_scroll')
                        me.loader(false)
                    }, 500)
                } else {
                    if (me.checkPackage == 1) {
                        me.$store.state.bookerAssignStatus = true
                        document.body.classList.add('no_scroll')
                        me.checkPackage = 1
                    }
                }
            }
        }
    }
</script>
