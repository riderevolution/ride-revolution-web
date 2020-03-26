<template>
    <transition name="fade">
        <div class="book_a_bike inner" v-if="loaded">
            <section id="content" :class="`${(!$store.state.proTipStatus) ? 'dismiss' : ''}`">
                <div id="step_1" :class="`step ${(step != 1) ? 'overlay' : ''}`">
                    <transition name="slideX">
                        <div class="flex_step" v-if="step == 1">
                            <div class="main_left">
                                <div>
                                    <div class="header">
                                        <h2 class="date">{{ $moment(schedule.date).format('MMM DD, YYYY') }}</h2>
                                        <h2 class="time">{{ schedule.schedule.start_time }} - {{ schedule.schedule.end_time }}</h2>
                                    </div>
                                    <div class="content">
                                        <ul>
                                            <li><span><img class="icon" src="/icons/ride-icon.svg" />{{ parseScheduleRide(schedule.schedule.class_length) }} Ride </span></li>
                                            <li><span><img class="icon" src="/icons/instructor-icon.svg" />{{ schedule.schedule.instructor_schedules[0].user.first_name }} {{ schedule.schedule.instructor_schedules[0].user.last_name }}</span></li>
                                            <li><span><img class="icon" src="/icons/location-icon.svg" />{{ schedule.schedule.studio.name }}</span></li>
                                        </ul>
                                    </div>
                                    <div class="description">
                                        <h3>What can I do?</h3>
                                        <ul>
                                            <li><b>Add a guest.</b> You can add up to 4 persons (depending on the class package you use). Non-members will be sent an email invitation to sign up as a member before they can ride.</li>
                                            <li><b>Switch Seats.</b> You can switch your seat and your guests' seat if there are vacant bikes.</li>
                                            <li><b>Switch Class Package.</b> If you have more than one class package you can reselect which one you'd like to use for this class.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="main_right">
                                <div class="header" v-if="!$parent.$parent.isMobile">
                                    <nuxt-link :to="`/fish-in-the-glass/book-a-bike?token=${$route.query.token}`" class="back">Back</nuxt-link>
                                </div>
                                <div class="content">
                                    <div class="seat_wrapper">
                                        <div class="overlay_header">
                                            <h3>Please choose your bike/s</h3>
                                            <h4>Note: You can book up to 5 bikes.</h4>
                                            <img :src="schedule.schedule.instructor_schedules[0].user.instructor_details.images[0].path" />
                                        </div>
                                        <div :class="`overlay_seat ${seat.position} ${seat.layout}`" v-for="(seat, key) in populateSeats" :key="key" v-if="seat.data.length > 0">
                                            <div @click="signIn(data)" :class="`seat ${addClass(data)}`" v-for="(data, key) in seat.data" :key="key">

                                                <transition name="slide">
                                                    <img class="seat_image" :src="data.temp.customer_details.images[0].path" v-if="!$parent.$parent.isMobile && (data.temp && data.temp.customer_details.images[0].path != null)" />

                                                    <div class="overlay" v-else-if="!$parent.$parent.isMobile && (data.temp && data.temp.customer_details.images[0].path == null)">
                                                        <div class="letter">
                                                            {{ data.temp.first_name.charAt(0) }}{{ data.temp.last_name.charAt(0) }}
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
                                        <div class="actions" v-if="!schedule.guestHere">
                                            <transition name="fade">
                                                <div class="next_wrapper">
                                                    <div class="left" v-if="hasBooked">
                                                        <div class="flex package">
                                                            <div class="toggler" v-if="hasGuest">
                                                                <p>Swap seat for:</p>
                                                                <div class="picker" @click="chooseSeat()">Bike No. {{ tempOriginalSeat.number }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="right" v-if="!removeNext">
                                                        <div class="default_btn" @click="toggleStep('next')">Next</div>
                                                    </div>
                                                    <div class="right" v-if="!checkPackage">
                                                        <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" rel="canonical" class="default_btn">Buy Rides</nuxt-link>
                                                    </div>
                                                    <div class="action_mobile">
                                                        <nuxt-link :to="`/fish-in-the-glass/buy-rides?token=${$route.query.token}`" class="back"><span>Back</span></nuxt-link>
                                                    </div>
                                                </div>
                                            </transition>
                                        </div>
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
                                    <p>{{ toSubmit.bookCount }} Credit/s</p>
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
                <booker-assign-member-prompt :customer="customer" :tempSeat="tempGuestSeat" v-if="$store.state.bookerAssignMemberPromptStatus" />
            </transition>
            <transition name="fade">
                <booker-assign-member-error v-if="$store.state.bookerAssignMemberErrorStatus" />
            </transition>
            <transition name="fade">
                <booker-assign-non-member :email="nonMember.email" :nonMember="nonMember" :tempSeat="tempGuestSeat" v-if="$store.state.bookerAssignNonMemberStatus" />
            </transition>
            <transition name="fade">
                <booker-assign-success :message="message" v-if="$store.state.bookerAssignSuccessStatus" />
            </transition>
            <transition name="fade">
                <buy-rides-prompt :message="promptMessage" v-if="$store.state.buyRidesPromptStatus" :status="status" />
            </transition>
            <transition name="fade">
                <booker-success v-if="$store.state.buyRidesSuccessStatus" />
            </transition>
            <transition name="fade">
                <buy-package-first v-if="$store.state.buyPackageFirstStatus" />
            </transition>
            <transition name="fade">
                <booker-actions :seat="dummyData" v-if="$store.state.bookerActionsPrompt" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import BookerAssign from '../../../../components/modals/BookerAssign'
    import BookerChoosePackage from '../../../../components/modals/BookerChoosePackage'
    import BookerChooseSeat from '../../../../components/modals/BookerChooseSeat'
    import BookerAssignMemberPrompt from '../../../../components/modals/BookerAssignMemberPrompt'
    import BookerAssignMemberError from '../../../../components/modals/BookerAssignMemberError'
    import BookerAssignNonMember from '../../../../components/modals/BookerAssignNonMember'
    import BookerAssignSuccess from '../../../../components/modals/BookerAssignSuccess'
    import BuyRidesPrompt from '../../../../components/modals/BuyRidesPrompt'
    import BookerSuccess from '../../../../components/modals/BookerSuccess'
    import BuyPackageFirst from '../../../../components/modals/BuyPackageFirst'
    import BookerActions from '../../../../components/modals/BookerActions'
    export default {
        layout: 'fish',
        components: {
            BookerAssign,
            BookerChoosePackage,
            BookerChooseSeat,
            BookerAssignMemberPrompt,
            BookerAssignMemberError,
            BookerAssignNonMember,
            BookerAssignSuccess,
            BuyRidesPrompt,
            BookerSuccess,
            BuyPackageFirst,
            BookerActions
        },
        data () {
            return {
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
                currentSeat: [],
                message: 'Cheers! Successfully added a Guest.',
                promptMessage: '',
                status: false,
                tempClassPackage: null,
                classPackage: null,
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
                user: ''
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
            addClass (seat) {
                const me = this
                let result = ''
                switch (seat.status) {
                    case 'open':
                        result = 'open'
                        break
                    case 'reserved':
                    case 'reserved-guest':
                        if (seat.temp) {
                            if (seat.guest != 0) {
                                result = 'reserved-guest'
                            } else {
                                result = 'reserved alt'
                            }
                        } else {
                            if (seat.bookings.length > 0) {
                                if (seat.bookings[0].user != null) {
                                    if (seat.bookings[0].original_booker_id == me.user.id) {
                                        if (seat.bookings[0].is_guest == 1) {
                                            result = 'reserved-guest'
                                        } else {
                                            result = 'reserved alt'
                                        }
                                    } else {
                                        if (seat.bookings[0].user_id == me.user.id) {
                                            if (seat.bookings[0].is_guest == 1) {
                                                result = 'reserved alt'
                                            }
                                        } else {
                                            result = 'reserved'
                                        }
                                    }
                                } else {
                                    if (seat.bookings[0].original_booker_id == me.user.id) {
                                        if (seat.bookings[0].is_guest == 1) {
                                            result = 'reserved-guest'
                                        }
                                    } else {
                                        result = 'reserved'
                                    }
                                }
                            } else if (seat.comp.length > 0) {

                            }
                        }
                        break
                    case 'blocked':
                    case 'comp':
                        result = 'blocked comp'
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
                        packages.push(element.class_package.class_package.name)
                    } else {
                        if (packages.indexOf(element.class_package.class_package.name) <= -1) {
                            packages.push(element.class_package.class_package.name)
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
                let token = me.$route.query.token
                let formData = new FormData()
                formData.append('scheduled_date_id', me.$route.params.slug)
                formData.append('seats', JSON.stringify(me.toSubmit.tempSeat))
                me.loader(false)
                me.$axios.post('api/web/bookings', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    console.log(res.data)
                //     if (res.data) {
                //         me.submitted = true
                //         me.step = 0
                //         me.$store.state.buyRidesSuccessStatus = true
                //         me.$scrollTo('#content', {
                //             offset: -250
                //         })
                //     }
                // }).catch(err => {
                //     setTimeout( () => {
                //         me.$store.state.errorList = err.response.data.errors
                //         me.$store.state.errorStatus = true
                //     }, 500)
                // }).then(() => {
                //     setTimeout( () => {
                //         me.loader(false)
                //     }, 500)
                })
            },
            toggleStep (type) {
                const me = this
                switch (type) {
                    case 'next':
                        if (me.hasBooked) {
                            me.step = 2
                            document.querySelector('.book_a_bike.inner').scrollIntoView({block: 'center', behavior: 'smooth'})
                        } else {
                            me.promptMessage = 'Please select a seat first before proceeding.'
                            me.$store.state.buyRidesPromptStatus = true
                            document.body.classList.add('no_scroll')
                        }
                        break
                    case 'prev':
                        me.step = 1
                        document.querySelector('.book_a_bike.inner').scrollIntoView({block: 'center', behavior: 'smooth'})
                        break
                }
            },
            chooseSeat () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.$store.state.bookerChooseSeatStatus = true
                    document.body.classList.add('no_scroll')
                    me.loader(false)
                }, 500)
            },
            signIn (data) {
                const me = this
                me.currentSeat = data
                me.seatStatus = data.status
                if (me.checkPackage == 1) {
                    switch (data.status) {
                        case 'blocked':
                        case 'comp':
                            me.promptMessage = 'Sorry! This is seat is blocked or being maintained.'
                            me.$store.state.buyRidesPromptStatus = true
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
                                me.$store.state.buyRidesPromptStatus = true
                                document.body.classList.add('no_scroll')
                            }
                            break
                        case 'open':
                            me.dummyData = data
                            if (me.user.user_package_counts.length > 0 && !me.hasBooked) {
                                me.$store.state.bookerChoosePackageStatus = true
                                document.body.classList.add('no_scroll')
                            } else {
                                if (me.toSubmit.tempSeat.length == 5) {
                                    me.promptMessage = "You've already reached the limit of adding guest."
                                    me.$store.state.buyRidesPromptStatus = true
                                    document.body.classList.add('no_scroll')
                                } else {
                                    me.tempGuestSeat = data
                                    me.$store.state.bookerChoosePackageStatus = true
                                    document.body.classList.add('no_scroll')
                                }
                            }
                            break
                    }
                } else {
                    me.$store.state.buyPackageFirstStatus = true
                    document.body.classList.remove('no_scroll')
                }
            },
            fetchSeats (id) {
                const me = this
                let token = me.$route.query.token
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
                                if (res.data.scheduledDate.originalHere || res.data.scheduledDate.guestHere) {
                                    me.$router.push(`/fish-in-the-glass/manage-class/${id}?token=${token}`)
                                }
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

                                // if (!me.checkPackage) {
                                //     me.$store.state.buyPackageFirstStatus = true
                                //     document.body.classList.remove('no_scroll')
                                // }

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
            }
        },
        mounted () {
            const me = this
            let ctr = 0
            let token = me.$route.query.token
            me.$store.state.proTipStatus = true
            setInterval( () => {
                if (ctr < 1) {
                    if (token == null && token == undefined) {
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
