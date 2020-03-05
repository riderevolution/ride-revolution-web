<template>
    <transition name="fade">
        <div class="book_a_bike inner" v-if="loaded">
            <breadcrumb :overlay="false" />
            <section id="banner"></section>
            <transition name="slide">
                <pro-tip v-if="$store.state.proTipStatus" />
            </transition>
            <section id="content" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''}`">
                <div class="main_left">
                    <div>
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

                </div>
                <div class="main_right">
                    <div class="header" v-if="!$parent.$parent.isMobile">
                        <nuxt-link to="/book-a-bike" class="back">Back</nuxt-link>
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
                                        <img class="seat_image" src="/sample-image-booker.png" v-if="!$parent.$parent.isMobile && data.status == 'reserved'" />
                                    </transition>
                                    <transition name="slide">
                                        <img class="seat_image" src="/sample-image-booker.png" v-if="!$parent.$parent.isMobile && data.status == 'guest'" />
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
                                <nuxt-link to="/buy-rides" rel="canonical" class="default_btn" v-if="!checkPackage">Buy Rides</nuxt-link>
                                <transition name="fade">
                                    <div class="next_wrapper" v-if="checkPackage">
                                        <div class="left">
                                            <div class="flex package">
                                                <div class="toggler">
                                                    <p>Class Package:</p>
                                                    <div class="picker" @click="choosePackage()">
                                                        {{ packageSelected }}
                                                        <transition name="slide">
                                                            <div class="package_violator" v-if="pointPackage">Choose Package Here</div>
                                                        </transition>
                                                    </div>
                                                </div>
                                                <div class="toggler" v-if="hasGuest">
                                                    <p>Switch seat for:</p>
                                                    <div class="picker" @click="chooseSeat()">Bike No. 8</div>
                                                </div>
                                            </div>
                                            <div class="flex package_details">
                                                <div class="toggler">
                                                    <p>Total Rides Left:</p>
                                                    <p class="margin">9</p>
                                                </div>
                                                <div class="toggler">
                                                    <p class="bold">Total Rides Used:</p>
                                                    <p class="bold margin">1</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <nuxt-link to="/book-a-bike/asdasd/asdasdasd" class="default_btn">Next</nuxt-link>
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
            <transition name="fade">
                <buy-rides-prompt :message="promptMessage" v-if="$store.state.buyRidesPromptStatus" :status="status" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import ProTip from '../../../components/ProTip'
    import BookerAssign from '../../../components/modals/BookerAssign'
    import BookerChoosePackage from '../../../components/modals/BookerChoosePackage'
    import BookerChooseSeat from '../../../components/modals/BookerChooseSeat'
    import BookerAssignMemberPrompt from '../../../components/modals/BookerAssignMemberPrompt'
    import BookerAssignMemberError from '../../../components/modals/BookerAssignMemberError'
    import BookerAssignNonMember from '../../../components/modals/BookerAssignNonMember'
    import BookerAssignSuccess from '../../../components/modals/BookerAssignSuccess'
    import BuyRidesPrompt from '../../../components/modals/BuyRidesPrompt'
    export default {
        components: {
            Breadcrumb,
            ProTip,
            BookerAssign,
            BookerChoosePackage,
            BookerChooseSeat,
            BookerAssignMemberPrompt,
            BookerAssignMemberError,
            BookerAssignNonMember,
            BookerAssignSuccess,
            BuyRidesPrompt
        },
        data () {
            return {
                loaded: false,
                customer: {
                    path: '/sample-image-booker.png',
                    name: 'A. Hepburn',
                    member_id: 'MEMBER ID: RR-12345'
                },
                temp: [],
                schedule: [],
                seats: {
                    left: {
                        position: 'left',
                        data: []
                    },
                    right: {
                        position: 'right',
                        data: []
                    },
                    bottom: {
                        position: 'bottom',
                        data: []
                    },
                    bottom_alt: {
                        position: 'bottom_alt',
                        data: []
                    },
                    bottom_alt_2: {
                        position: 'bottom_alt_2',
                        data: []
                    },
                },
                ctr: 0,
                checkPackage: 0,
                nonMemberEmail: null,
                currentSeat: [],
                message: 'Cheers! Successfully added a Guest.',
                promptMessage: '',
                status: false,
                classPackageID: 0,
                packageSelected: 'Please Select a Package',
                pointPackage: false,
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
                if (me.checkPackage == 1) {
                    switch (data.status) {
                        case 'blocked':
                            me.promptMessage = 'Sorry! This is seat is blocked or being maintained.'
                            me.$store.state.buyRidesPromptStatus = true
                            document.body.classList.add('no_scroll')
                            break
                        case 'open':
                            if (me.classPackageID == 0) {
                                me.promptMessage = 'Please select a package first before booking on your preferred seat.'
                                me.$store.state.buyRidesPromptStatus = true
                                document.body.classList.add('no_scroll')
                                me.pointPackage = true
                            }
                            break
                    }
                    console.log(data);
                    // me.loader(true)
                    // document.body.classList.add('no_scroll')
                    // setTimeout( () => {
                    //     me.checkPackage = 1
                    //     data.status = 'reserved'
                    //     document.body.classList.remove('no_scroll')
                    //     me.loader(false)
                    // }, 500)
                } else {
                    // if (me.checkPackage == 1) {
                    //     me.$store.state.bookerAssignStatus = true
                    //     document.body.classList.add('no_scroll')
                    //     me.checkPackage = 1
                    // }
                }
            },
            fetchSeats (id) {
                const me = this
                let token = me.$cookies.get('token')
                me.$axios.get(`api/scheduled-dates/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let layout = `layout_${res.data.scheduledDate.schedule.studio_id}`
                        me.seats = { left: { position: 'left', layout: layout, data: [] }, right: { position: 'right', layout: layout, data: [] }, bottom: { position: 'bottom', layout: layout, data: [] }, bottom_alt: { position: 'bottom_alt', layout: layout, data: [] }, bottom_alt_2: { position: 'bottom_alt_2', layout: layout, data: [] }, }
                        me.temp = res.data.seats
                        me.schedule = res.data.scheduledDate
                        me.temp.forEach((seat , index) => {
                            switch (seat.position) {
                                case 'left':
                                    me.seats.left.data.push(seat)
                                    break
                                case 'right':
                                    me.seats.right.data.push(seat)
                                    break
                                case 'bottom':
                                    me.seats.bottom.data.push(seat)
                                    break
                                case 'bottom_alt':
                                    me.seats.bottom_alt.data.push(seat)
                                    break
                                case 'bottom_alt_2':
                                    me.seats.bottom_alt_2.data.push(seat)
                                    break
                            }
                            me.ctr++
                        })
                        me.checkPackage = (res.data.userPackagesCount > 0) ? 1 : 0
                        me.loaded = true
                    }
                })
            }
        },
        mounted () {
            const me = this
            let ctr = 0
            let token = me.$cookies.get('token')
            me.$store.state.proTipStatus = true
            setInterval( () => {
                if (ctr < 1) {
                    if (!me.$store.state.isAuth && token == null && token == undefined) {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                    } else {
                        me.fetchSeats(me.$route.params.slug)
                    }
                    ctr++
                }
            }, 250)
        }
    }
</script>
