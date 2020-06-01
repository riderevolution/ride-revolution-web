<template lang="html">
    <div v-if="loaded">
        <section id="content" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''} ${(submitted) ? 'overlay' : ''}`">
            <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div class="flex_step" v-if="step == 1">
                        <div class="main_left">
                            <div>
                                <div class="header">
                                    <h2 class="date">{{ $moment(schedule.date).format('MMM DD, YYYY') }}</h2>
                                    <h2 class="date">{{ schedule.schedule.start_time }} - {{ schedule.schedule.end_time }}</h2>
                                </div>
                                <div v-if="!isMobile">
                                    <div class="content">
                                        <ul>
                                            <li><span><img class="icon" src="/icons/ride-icon.svg" />{{ parseScheduleRide(schedule.schedule.class_length) }} Ride <img class="info" src="/icons/info-booker-icon.svg" /></span></li>
                                            <li><span><img class="icon" src="/icons/instructor-icon.svg" />{{ schedule.schedule.instructor_schedules[0].user.first_name }} {{ schedule.schedule.instructor_schedules[0].user.last_name }}</span></li>
                                            <li><span><img class="icon" src="/icons/location-icon.svg" />{{ schedule.schedule.studio.name }}</span></li>
                                        </ul>
                                    </div>
                                    <div class="description">
                                        <h3>What else can I do?</h3>
                                        <ul>
                                            <li><b>Add a guest.</b> You can book for up to 4 more people using the same account. Non-members will be sent an email invitation to sign up as a member before they can ride.</li>
                                            <li><b>Switch Seats.</b> You can switch any of your booked seats as long as there are vacant bikes available.</li>
                                            <li><b>Switch Class Package.</b> If you have more than one class package you can reselect which one you’d like to use for this class.</li>
                                        </ul>
                                    </div>
                                    <div class="waitlisted" v-if="isWaitlisted">
                                        <div class="label">Waitlisted</div>
                                        <div class="user">
                                            <div class="name">
                                                {{ user.first_name }} {{ user.last_name }}
                                            </div>
                                            <div class="default_btn_red" @click="cancelWaitlist()">Cancel</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="details_toggle" v-else>
                                    <div class="toggler" @click.self="toggleDetails($event)">Show Details</div>
                                    <div class="toggle_data">
                                        <div class="content">
                                            <ul>
                                                <li><span><img class="icon" src="/icons/ride-icon.svg" />{{ parseScheduleRide(schedule.schedule.class_length) }} Ride <img class="info" src="/icons/info-booker-icon.svg" /></span></li>
                                                <li><span><img class="icon" src="/icons/instructor-icon.svg" />{{ schedule.schedule.instructor_schedules[0].user.first_name }} {{ schedule.schedule.instructor_schedules[0].user.last_name }}</span></li>
                                                <li><span><img class="icon" src="/icons/location-icon.svg" />{{ schedule.schedule.studio.name }}</span></li>
                                            </ul>
                                        </div>
                                        <div class="description">
                                            <h3>What else can I do?</h3>
                                            <ul>
                                                <li><b>Add a guest.</b> You can book for up to 4 more people using the same account. Non-members will be sent an email invitation to sign up as a member before they can ride.</li>
                                                <li><b>Switch Seats.</b> You can switch any of your booked seats as long as there are vacant bikes available.</li>
                                                <li><b>Switch Class Package.</b> If you have more than one class package you can reselect which one you’d like to use for this class.</li>
                                            </ul>
                                        </div>
                                        <div class="waitlisted" v-if="isWaitlisted">
                                            <div class="label">Waitlisted</div>
                                            <div class="user">
                                                <div class="name">
                                                    {{ user.first_name }} {{ user.last_name }}
                                                </div>
                                                <div class="default_btn_red" @click="cancelWaitlist()">Cancel</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="main_right">
                            <div class="header" v-if="!isMobile">
                                <nuxt-link to="/book-a-bike" class="back" v-if="!inApp && !manage">Back</nuxt-link>
                                <nuxt-link :to="`/fish-in-the-glass/book-a-bike?token=${$route.query.token}`" class="back" v-else-if="inApp && !manage">Back</nuxt-link>
                                <nuxt-link to="/my-profile" class="back" v-else-if="!inApp && manage">Back</nuxt-link>
                                <nuxt-link :to="`/fish-in-the-glass/book-a-bike?token=${$route.query.token}`" class="back" v-else-if="inApp && manage">Back</nuxt-link>
                            </div>
                            <div class="content" :id="`parent_${layout}`">
                                <div class="seat_wrapper">
                                    <div class="overlay_header">
                                        <h3>Please choose your bike/s</h3>
                                        <h4>Note: You can book up to 5 bikes.</h4>
                                        <img :src="schedule.schedule.instructor_schedules[0].user.instructor_details.images[0].path" />
                                    </div>
                                    <div :class="`overlay_seat ${seat.position} ${seat.layout}`" v-for="(seat, key) in populateSeats" :key="key" v-if="seat.data.length > 0">
                                        <div @click="signIn(data)" :class="`seat ${addClass(data)}`" v-for="(data, key) in seat.data" :key="key">

                                            <transition name="fade">
                                                <img class="seat_image" :src="data.temp.customer.customer_details.images[0].path" v-if="!isMobile && (data.temp && data.temp.customer.customer_details.images[0].path != null)" />
                                            </transition>

                                            <transition name="fade">
                                                <div class="overlay" v-if="!isMobile && (data.temp && data.temp.customer.customer_details.images[0].path == null)">
                                                    <div class="letter">
                                                        {{ data.temp.customer.first_name.charAt(0) }}{{ data.temp.customer.last_name.charAt(0) }}
                                                    </div>
                                                </div>
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
                                    <transition name="fade">
                                        <div class="actions" v-if="cancelSwitchingSeat">
                                            <div class="next_wrapper">
                                                <div class="left">
                                                    <div class="flex package">
                                                        <div class="default_btn_red" @click="chooseSeat('cancel')"><span>Cancel Switch</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="actions" v-if="!schedule.guestHere && !isSwitchingSeat && ((manage) ? !res.waitlisted : true)">
                                            <transition name="fade">
                                                <div class="next_wrapper">
                                                    <div class="left" v-if="toSubmit.tempSeat.length > 0">
                                                        <div class="flex package">
                                                            <div class="toggler" v-if="hasGuest">
                                                                <p>Swap seat for:</p>
                                                                <div class="picker" @click="chooseSeat('swap')">Bike No. {{ tempOriginalSeat.number }}</div>
                                                            </div>
                                                            <div class="default_btn_out" @click="chooseSeat('switch')" v-if="canSwitch"><span>Switch Seat</span></div>
                                                        </div>
                                                    </div>
                                                    <div class="right alt" v-if="isMobile && !removeNext">
                                                        <nuxt-link to="/book-a-bike" class="back" v-if="!inApp && !manage">Back</nuxt-link>
                                                        <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" class="back" v-else-if="inApp && !manage">Back</nuxt-link>
                                                        <nuxt-link to="/my-profile" class="back" v-else-if="!inApp && manage">Back</nuxt-link>
                                                        <nuxt-link :to="`/fish-in-the-glass/book-a-bike?token=${$route.query.token}`" class="back" v-else-if="inApp && manage">Back</nuxt-link>
                                                        <div class="default_btn" @click="toggleStep('next')">Next</div>
                                                    </div>
                                                    <div class="right" v-if="!isMobile && !removeNext">
                                                        <div class="default_btn" @click="toggleStep('next')">Next</div>
                                                    </div>
                                                    <div class="right" v-if="!checkPackage">
                                                        <nuxt-link to="/buy-rides" rel="canonical" class="default_btn" v-if="!inApp">Buy Rides</nuxt-link>
                                                        <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" rel="canonical" class="default_btn" v-else>Buy Rides</nuxt-link>
                                                    </div>
                                                </div>
                                            </transition>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div id="step_2" :class="`step form ${(step != 2) ? 'overlay' : ''}`">
                <transition name="slideX">
                    <div v-if="step == 2" class="preview_book_form">
                        <h2 class="header_title">Let’s make sure we got this right.</h2>
                        <div class="preview">
                            <div class="item">
                                <h3>Class</h3>
                                <p>{{ schedule.schedule.class_type.name }}</p>
                            </div>
                            <div class="item">
                                <h3>Instructor</h3>
                                <p>{{ schedule.schedule.instructor_schedules[0].user.first_name }} {{ schedule.schedule.instructor_schedules[0].user.last_name }}</p>
                            </div>
                            <div class="item">
                                <p>Studio</p>
                                <p>{{ schedule.schedule.studio.name }}</p>
                            </div>
                            <div class="item">
                                <p>Date</p>
                                <p>{{ $moment(schedule.date).format('MMMM DD, YYYY') }}</p>
                            </div>
                            <div class="item">
                                <p>Time</p>
                                <p>{{ schedule.schedule.start_time }} - {{ schedule.schedule.end_time }}</p>
                            </div>
                            <div class="item">
                                <p>Bike No.</p>
                                <p>{{ getAllTempSeats(toSubmit.tempSeat) }}</p>
                            </div>
                            <div class="item">
                                <p>Class Packages Used</p>
                                <p>{{ getAllTempPackages(toSubmit.tempSeat) }}</p>
                            </div>
                            <div class="total">
                                <p>Consumes</p>
                                <p>{{ toSubmit.bookCount * schedule.schedule.class_credits }} Credit/s</p>
                            </div>
                            <div class="preview_actions">
                                <div class="back" @click="toggleStep('prev')">Back</div>
                                <div class="default_btn" @click="submitPreview()">Let's Do This</div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>
        <transition name="fade">
            <booker-assign v-if="$store.state.bookerAssignStatus" />
        </transition>
        <transition name="fade">
            <booker-choose-package :tempSeat="dummyData" v-if="$store.state.bookerChoosePackageStatus" :category="'inner'" :type="type" />
        </transition>
        <transition name="fade">
            <booker-choose-seat :seatNumbers="toSubmit.tempSeat" v-if="$store.state.bookerChooseSeatStatus" />
        </transition>
        <transition name="fade">
            <booker-switch-seat :seatNumbers="toSubmit.tempSeat" v-if="$store.state.bookerSwitchSeatStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-member-prompt :customer="customer" :tempSeat="tempGuestSeat" v-if="$store.state.bookerAssignMemberPromptStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-member-error v-if="$store.state.bookerAssignMemberErrorStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-non-member-error v-if="$store.state.bookerAssignNonMemberErrorStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-non-member :email="nonMember.email" :nonMember="nonMember" :tempSeat="tempGuestSeat" v-if="$store.state.bookerAssignNonMemberStatus" />
        </transition>
        <transition name="fade">
            <booker-assign-success :message="message" v-if="$store.state.bookerAssignSuccessStatus" />
        </transition>
        <transition name="fade">
            <booker-prompt :message="promptMessage" v-if="$store.state.bookerPromptStatus" :status="status" />
        </transition>
        <transition name="fade">
            <booker-success v-if="$store.state.buyRidesSuccessStatus" :data="instructor" />
        </transition>
        <transition name="fade">
            <buy-package-first v-if="$store.state.buyPackageFirstStatus" />
        </transition>
        <transition name="fade">
            <booker-actions :seat="dummyData" v-if="$store.state.bookerActionsPrompt" />
        </transition>
    </div>
</template>

<script>
    import BookerAssign from './modals/BookerAssign'
    import BookerChoosePackage from './modals/BookerChoosePackage'
    import BookerChooseSeat from './modals/BookerChooseSeat'
    import BookerSwitchSeat from './modals/BookerSwitchSeat'
    import BookerAssignMemberPrompt from './modals/BookerAssignMemberPrompt'
    import BookerAssignMemberError from './modals/BookerAssignMemberError'
    import BookerAssignNonMemberError from './modals/BookerAssignNonMemberError'
    import BookerAssignNonMember from './modals/BookerAssignNonMember'
    import BookerAssignSuccess from './modals/BookerAssignSuccess'
    import BookerPrompt from './modals/BookerPrompt'
    import BookerSuccess from './modals/BookerSuccess'
    import BuyPackageFirst from './modals/BuyPackageFirst'
    import BookerActions from './modals/BookerActions'
    export default {
        props: {
            inApp: {
                type: Boolean,
                default: false
            },
            manage: {
                type: Boolean,
                default: false
            }
        },
        components: {
            BookerAssign,
            BookerChoosePackage,
            BookerChooseSeat,
            BookerSwitchSeat,
            BookerAssignMemberPrompt,
            BookerAssignMemberError,
            BookerAssignNonMemberError,
            BookerAssignNonMember,
            BookerAssignSuccess,
            BookerPrompt,
            BookerSuccess,
            BuyPackageFirst,
            BookerActions
        },
        data () {
            return {
                instructor: {},
                res: [],
                isMobile: false,
                step: 1,
                type: 1,
                loaded: false,
                removeNext: false,
                submitted: false,
                customer: null,
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
                nonMember: {
                    email: null,
                    first_name: null,
                    last_name: null,
                    customer_details:  {
                        images: [
                            {
                                path: null
                            }
                        ]
                    }
                },
                layout: 0,
                currentSeat: [],
                message: 'Cheers! Successfully added a Guest.',
                promptMessage: '',
                status: false,
                tempClassPackage: null,
                hasGuest: false,
                seatStatus: '',
                hasBooked: false,
                tempGuestSeat: null,
                tempOriginalSeat: null,
                dummyData: null,
                toSubmit: {
                    bookCount: 0,
                    tempSeat: []
                },
                user: '',
                isWaitlisted: false,
                canSwitch: false,
                isSwitchingSeat: false,
                cancelSwitchingSeat: false,
                selectedSwitchSeat: null,
                webApp: false
            }
        },
        computed: {
            populateSeats () {
                const me = this
                let result
                result = me.seats
                return result
            },
        },
        methods: {
            cancelWaitlist () {
                const me = this
                let formData = new FormData()
                let token = (!me.inApp) ? me.$cookies.get('token') : me.$route.query.token
                formData.append('scheduled_date_id', me.$route.params.slug)
                me.loader(true)
                me.$axios.post('api/schedules/waitlist', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.promptMessage = 'You have been successfully removed from the waitlist.'
                        document.body.classList.add('no_scroll')
                        me.$store.state.bookerPromptStatus = true
                        setTimeout( () => {
                            if (!me.inApp) {
                                me.$router.push('/my-profile')
                            } else {
                                me.$router.push(`/fish-in-the-glass/book-a-bike?token=${token}`)
                            }
                        }, 1500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            toggleDetails (event) {
                const me = this
                let target = event.target
                if (target.parentNode.classList.contains('toggled')) {
                    target.nextElementSibling.style.height = `${0}px`
                    target.parentNode.classList.remove('toggled')
                } else {
                    target.parentNode.classList.add('toggled')
                    target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                }
            },
            /**
             * [addClass description]
             * @param {[type]} seat [description]
             */
            addClass (seat) {
                const me = this
                let result = ''
                if (me.isSwitchingSeat) {
                    result += 'switch '
                }
                switch (seat.status) {
                    case 'open':
                        result += 'open'
                        break
                    case 'reserved':
                    case 'reserved-guest':
                    case 'signed-in':
                        if (seat.temp) {
                            if (seat.temp.guest != 0) {
                                result += 'reserved-guest'
                            } else {
                                result += 'reserved alt'
                            }
                        } else {
                            if (seat.bookings.length > 0) {
                                if (seat.bookings[0].user != null) {
                                    if (seat.bookings[0].original_booker_id == me.user.id) {
                                        if (seat.bookings[0].is_guest == 1) {
                                            result += 'reserved-guest'
                                        } else {
                                            result += 'reserved alt'
                                        }
                                    } else {
                                        if (seat.bookings[0].user_id == me.user.id) {
                                            if (seat.bookings[0].is_guest == 1) {
                                                result += 'reserved alt'
                                            }
                                        } else {
                                            result += 'reserved'
                                        }
                                    }
                                } else {
                                    if (seat.bookings[0].original_booker_id == me.user.id) {
                                        if (seat.bookings[0].is_guest == 1) {
                                            result += 'reserved-guest'
                                        }
                                    } else {
                                        result += 'reserved'
                                    }
                                }
                            } else if (seat.comp.length > 0) {

                            }
                        }
                        break
                    case 'blocked':
                    case 'comp':
                        result += 'blocked comp'
                        break
                }
                return result
            },
            /**
             * Conversion of hours and minutes */
            parseScheduleRide (data) {
                const me = this
                let result = ''
                let time = data.split('+')[1]
                let hour = time.split(':')[0]
                let minutes = time.split(':')[1]
                if (hour != 0) {
                    result += me.$moment(time, 'H:m').format('HH') + (hour > 1) ? ' Hours' : ' Hour'
                    result += me.$moment(time, 'H:m').format('mm') + ' Minutes'
                } else {
                    result += me.$moment(time, 'H:m').format('mm') + ' Minutes'
                }
                return result
            },
            getAllTempSeats (data) {
                const me = this
                let ctr = 0
                let result = ''
                data.forEach((element, index) => {
                    if (ctr == 0) {
                        result = element.number
                    } else if (ctr > 0) {
                        result += `, ${element.number}`
                    }
                    ctr++
                })
                return result
            },
            getAllTempPackages (data) {
                const me = this
                let packages = []
                let result = ''
                let ctr = 0
                data.forEach((element, index) => {
                    if (packages.length == 0) {
                        packages.push(element.temp.class_package.class_package.name)
                    } else {
                        if (packages.indexOf(element.temp.class_package.class_package.name) <= -1) {
                            packages.push(element.temp.class_package.class_package.name)
                        }
                    }
                })
                packages.forEach((element, index) => {
                    if (ctr == 0) {
                        result = element
                    } else if (ctr > 0) {
                        result += `, ${element}`
                    }
                    ctr++
                })
                return result
            },
            submitPreview () {
                const me = this
                let token = (!me.inApp) ? me.$cookies.get('token') : me.$route.query.token
                let formData = new FormData()
                if (me.manage) {
                    formData.append('update', 1)
                }
                formData.append('scheduled_date_id', me.$route.params.slug)
                formData.append('seats', JSON.stringify(me.toSubmit.tempSeat))
                formData.append('total_credit_count', me.toSubmit.bookCount)
                me.loader(true)
                me.$axios.post('api/web/bookings', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.submitted = true
                        me.step = 0
                        me.$store.state.buyRidesSuccessStatus = true
                        me.$scrollTo('#content', {
                            offset: -250
                        })
                    }
                }).catch(err => {
                    document.body.classList.add('no_scroll')
                    setTimeout( () => {
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorPromptStatus = true
                    }, 500)
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            toggleStep (type) {
                const me = this
                switch (type) {
                    case 'next':
                        if (me.hasBooked) {
                            me.step = 2
                            me.$scrollTo('.inner', {
                                offset: 0
                            })
                        } else {
                            me.promptMessage = 'Please select a seat first before proceeding.'
                            me.$store.state.bookerPromptStatus = true
                            document.body.classList.add('no_scroll')
                        }
                        break
                    case 'prev':
                        me.step = 1
                        me.$scrollTo('.inner', {
                            offset: 0
                        })
                        break
                }
            },
            /**
             * [chooseSeat toggle the swap and switch seat]
             * @param  {[string]} type [type of action]
             */
            chooseSeat (type) {
                const me = this
                me.loader(true)
                switch (type) {
                    case 'swap':
                        setTimeout( () => {
                            me.$store.state.bookerChooseSeatStatus = true
                            document.body.classList.add('no_scroll')
                            me.loader(false)
                        }, 500)
                        break
                    case 'switch':
                        setTimeout( () => {
                            me.$store.state.bookerSwitchSeatStatus = true
                            document.body.classList.add('no_scroll')
                            me.loader(false)
                        }, 500)
                        break
                    case 'cancel':
                        setTimeout( () => {
                            me.selectedSwitchSeat = null
                            me.isSwitchingSeat = false
                            me.cancelSwitchingSeat = false
                            me.loader(false)
                        }, 500)
                        break
                }
            },
            /**
             * [signIn check the seat]
             * @param  {[object]} data [seat structure]
             */
            signIn (data) {
                const me = this
                me.currentSeat = data
                me.seatStatus = data.status
                if (me.schedule.guestHere) {
                    me.promptMessage = 'Sorry! A guest cannot manage/change this class.'
                    me.$store.state.bookerPromptStatus = true
                    document.body.classList.add('no_scroll')
                } else {
                    if (me.checkPackage == 1) {
                        switch (data.status) {
                            case 'blocked':
                            case 'comp':
                                me.promptMessage = 'Sorry! This is seat is blocked or being maintained.'
                                me.$store.state.bookerPromptStatus = true
                                document.body.classList.add('no_scroll')
                                break
                            case 'reserved':
                            case 'reserved-guest':
                                if (data.temp) {
                                    me.dummyData = data
                                    me.$store.state.bookerActionsPrompt = true
                                    document.body.classList.add('no_scroll')
                                } else {
                                    me.promptMessage = 'This seat is already booked or reserved by someone else.'
                                    me.$store.state.bookerPromptStatus = true
                                    document.body.classList.add('no_scroll')
                                }
                                break
                            case 'open':
                                me.dummyData = data
                                if (me.isSwitchingSeat) {
                                    me.switchSeatData (me.selectedSwitchSeat, data)
                                } else {
                                    if (me.user.user_package_counts.length > 0 && !me.hasBooked) {
                                        me.loader(true)
                                        setTimeout(() => {
                                            me.$store.state.bookerChoosePackageStatus = true
                                            document.body.classList.add('no_scroll')
                                        }, 500)
                                    } else {
                                        if (me.toSubmit.tempSeat.length == 5) {
                                            me.promptMessage = "You've already reached the limit of adding guest."
                                            me.$store.state.bookerPromptStatus = true
                                            document.body.classList.add('no_scroll')
                                        } else {
                                            me.tempGuestSeat = data
                                            me.loader(true)
                                            setTimeout(() => {
                                                me.$store.state.bookerChoosePackageStatus = true
                                                document.body.classList.add('no_scroll')
                                            }, 500)
                                        }
                                    }
                                }
                                break
                        }
                    } else {
                        me.$store.state.buyPackageFirstStatus = true
                        document.body.classList.remove('no_scroll')
                    }
                }
            },
            /**
             * [deleteFirstSeat delete the first seat in the temp]
             * @param  {[object]} data [the seat selected from the switch seat]
             * @return {[object]}      [return temp seat]
             */
            deleteFirstSeat (data) {
                const me= this
                let temp = me.toSubmit.tempSeat
                temp.forEach((element, index) => {
                    if (element.id == data.id) {
                        me.toSubmit.tempSeat.splice(index, 1)
                    }
                })
                return temp
            },
            /**
             * [deleteCurrentSeat delete the current seat before switching]
             * @param  {[int]} id [the id of the first seat]
             * @return {[object]}    [the original seats]
             */
            deleteCurrentSeat (id) {
                const me = this
                let seats = me.seats
                /**
                 * Delete the value of the first seat in the seats */
                Object.keys(seats).forEach((parent) => {
                    Object.keys(seats[parent]).forEach((child) => {
                        if (child == 'data') {
                            for (let i = 0; i < seats[parent][child].length; i++) {
                                if (seats[parent][child][i].id == me.selectedSwitchSeat.id) {
                                    seats[parent][child][i].status = 'open'
                                    delete seats[parent][child][i].temp
                                }
                            }
                        }
                    })
                })
                return seats
            },
            /**
             * [swapSeatData switching of datas]
             * @param  {[object]} firstSeat  [the seat selected from the switch seat]
             * @param  {[object]} secondSeat [the seat selected from the switch seat booker]
             */
            switchSeatData (firstSeat, secondSeat) {
                const me = this
                me.loader(true)
                let id = 0
                me.toSubmit.tempSeat = me.deleteFirstSeat(firstSeat)
                /**
                 * Change first the second seat value to first seat value */
                Object.keys(me.seats).forEach((parent) => {
                    Object.keys(me.seats[parent]).forEach((child) => {
                        if (child == 'data') {
                            for (let i = 0; i < me.seats[parent][child].length; i++) {
                                if (me.seats[parent][child][i].id == firstSeat.id) {
                                    id = me.seats[parent][child][i].id
                                }
                                if (me.seats[parent][child][i].id == secondSeat.id) {
                                    me.seats[parent][child][i].temp = {}
                                    me.seats[parent][child][i].status = firstSeat.status
                                    me.seats[parent][child][i].temp.guest = firstSeat.temp.guest
                                    me.seats[parent][child][i].temp.class_package = firstSeat.temp.class_package
                                    me.seats[parent][child][i].temp.customer = firstSeat.temp.customer
                                    if (firstSeat.temp.old_class_package_id) {
                                        me.seats[parent][child][i].temp.changedPackage = firstSeat.temp.changedPackage
                                        me.seats[parent][child][i].temp.old_class_package_id = firstSeat.temp.old_class_package_id
                                    }
                                    if (me.seats[parent][child][i].temp.guest == 0) {
                                        me.tempOriginalSeat = me.seats[parent][child][i]
                                        if (me.toSubmit.tempSeat.length > 0) {
                                            me.toSubmit.tempSeat.unshift(me.seats[parent][child][i])
                                        } else {
                                            me.toSubmit.tempSeat.push(me.seats[parent][child][i])
                                        }
                                    } else {
                                        me.toSubmit.tempSeat.push(me.seats[parent][child][i])
                                    }
                                    break
                                }
                            }
                        }
                    })
                })
                me.deleteCurrentSeat (id)
                me.isSwitchingSeat = false
                me.cancelSwitchingSeat = false
                me.promptMessage = `You've successfully switched to seat number ${secondSeat.number}`
                me.status = true
                setTimeout(() => {
                    me.$store.state.bookerPromptStatus = true
                    document.body.classList.add('no_scroll')
                    me.loader(false)
                }, 500)
            },
            /**
             * [fetchSeats fetch all the seats]
             * @param  {[int]} id [schedule date id slug]
             */
            fetchSeats (id) {
                const me = this
                let token = (!me.inApp) ? me.$cookies.get('token') : me.$route.query.token
                me.loader(true)
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        me.user = res.data.user
                        me.$axios.get(`api/scheduled-dates/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                if (!me.manage) {
                                    if (res.data.scheduledDate.originalHere || res.data.scheduledDate.guestHere) {
                                        if (!me.inApp) {
                                            me.$router.push(`/my-profile/manage-class/${id}`)
                                        } else {
                                            me.$router.push(`/fish-in-the-glass/manage-class/${id}?token=${token}`)
                                        }
                                    }
                                }
                                me.layout = res.data.scheduledDate.schedule.studio_id
                                let layout = `layout_${res.data.scheduledDate.schedule.studio_id}`
                                me.seats = { left: { position: 'left', layout: layout, data: [] }, right: { position: 'right', layout: layout, data: [] }, bottom: { position: 'bottom', layout: layout, data: [] }, bottom_alt: { position: 'bottom_alt', layout: layout, data: [] }, bottom_alt_2: { position: 'bottom_alt_2', layout: layout, data: [] }, }
                                me.res = res.data
                                me.temp = res.data.seats
                                me.schedule = res.data.scheduledDate
                                me.instructor = me.schedule.schedule.instructor_schedules[0].user
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
                                if (!me.manage) {
                                    me.checkPackage = (res.data.userPackagesCount > 0) ? 1 : 0
                                } else {
                                    me.checkPackage = 1
                                    me.removeNext = true

                                    if (res.data.waitlisted) {
                                        me.isWaitlisted = true
                                    }

                                    if (res.data.tempSeats != null) {
                                        me.toSubmit.tempSeat = me.parser(res.data.tempSeats.data)
                                        // me.tempBookCount = me.parser(res.data.tempSeats.data).length
                                        // package_id = res.data.tempSeats.class_package_id
                                        me.bookingID = res.data.tempSeats.booking_id
                                        me.hasBooked = true
                                        me.canSwitch = true
                                        if (me.toSubmit.tempSeat.length > 1) {
                                            me.hasGuest = true
                                        }
                                        me.toSubmit.tempSeat.forEach((element, index) => {
                                            if (element.temp.guest == 0) {
                                                me.tempOriginalSeat = element
                                            }
                                        })
                                        Object.keys(me.seats).forEach((parent) => {
                                            Object.keys(me.seats[parent]).forEach((child) => {
                                                if (child == 'data') {
                                                    for (let i = 0; i < me.seats[parent][child].length; i++) {
                                                        for (let j = 0; j < me.toSubmit.tempSeat.length; j++) {
                                                            if (me.toSubmit.tempSeat[j].id == me.seats[parent][child][i].id) {
                                                                me.seats[parent][child][i] = me.toSubmit.tempSeat[j]
                                                            }
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    }
                                }
                                me.loaded = true
                            }
                        }).catch(err => {
                            me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                            me.loader(false)
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onResize() {
                const me = this
                if (me.$route.query.token) {
                    me.webApp = true
                } else {
                    me.webApp = false
                }
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth <= 1025) {
                        me.isMobile = true
                    } else {
                        me.isMobile = false
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.onResize()
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        }
    }
</script>
