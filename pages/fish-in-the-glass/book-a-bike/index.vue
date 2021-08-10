<template>
    <transition name="fade">
        <div class="book_a_bike landing" v-if="loaded">
            <section id="content">
                <div class="left">
                    <div class="filter_accordion" v-if="$store.state.isMobile">
                        <label>Filter</label>
                        <div class="toggler" @click="toggleFilter($event)"></div>
                    </div>
                    <div class="filter">
                        <div class="wrapper studio_filter">
                            <h3>Studios</h3>
                            <div class="group">
                                <input type="radio" name="studios" id="studio_0" value="0" checked @change="toggleStudio(null, 'static')">
                                <label for="studio_0" style="padding-left: 0px; display: inline-block;">All Studios</label>
                            </div>
                            <div class="group" v-for="(studio, key) in studios" :key="key">
                                <input type="radio" name="studios" :id="`studio_${key + 1}`" @change="toggleStudio(studio, 'dynamic')">
                                <label :for="`studio_${key + 1}`" style="padding-left: 0px; display: inline-block;">{{ studio.name }}</label>
                            </div>
                        </div>
                        <div class="wrapper instructor_filter">
                            <h3>Instructors</h3>
                            <div :class="`autocomplete ${(toggledAutocomplete) ? 'toggled' : ''}`" v-click-outside="toggleAutoCompleteOutside">
                                <input type="text" name="instructor" class="text" placeholder="Search for an instructor" v-model="searchedInstructor" @click="toggleAutoComplete()">
                                <transition name="slideAlt">
                                    <div class="autocomplete_dropdown" v-if="toggledAutocomplete">
                                        <div :class="`list ${(`${data.first_name} ${data.last_name}` == checkSearchedInstructor) ? 'active' : ''}`" v-for="(data, key) in instructors" :key="key" @click="selectIntructor(data)">
                                            <img v-if="data.instructor_details.images[0].path != null" :src="data.instructor_details.images[0].path" />
                                            <div class="overlay" v-else>
                                                <div class="letter">
                                                    {{ data.first_name.charAt(0) }}{{ data.last_name.charAt(0) }}
                                                </div>
                                            </div>
                                            <p>{{ data.first_name }} {{ data.last_name }}</p>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="date_navigator">
                        <div :id="`date_${key}`" :class="`date ${($moment().format('MMM-D') == `${result.month}-${result.day}`) ? 'active' : ''}`" v-for="(result, key) in results" :key="key" @click="toggleDate(result.year, $moment(`${result.month}-${result.day}-${result.year}`, 'MMM-DD-YYYY').format('M'), result.day, key)">
                            <div class="overlay">
                                <div class="abbr">{{ result.abbr }}</div>
                                <div class="month">{{ result.month }}</div>
                                <div class="day">{{ result.day }}</div>
                            </div>
                        </div>
                        <div class="date_controls" v-if="!$store.state.isMobile">
                            <div class="prev" @click="generatePrevClasses()"></div>
                            <div class="next" @click="generateNextClasses()"></div>
                        </div>
                    </div>
                    <div class="date_controls_mobile" v-if="$store.state.isMobile">
                        <div class="prev" @click="generatePrevClasses()"></div>
                        <div class="next" @click="generateNextClasses()"></div>
                    </div>
                    <div class="schedule_list">
                        <div class="header">
                            <span>Showing rides in </span>
                            <span :class="`label ${(hasStudioFilter) ? 'active' : ''}`">{{ studioFilter }}<img v-if="hasStudioFilter && studioFilter != 'all studios'" @click="resetFilter('studio')" src="/icons/filter-close.svg" /></span>
                            <span>with</span>
                            <span :class="`label ${(hasSearchedInstructor) ? 'active' : ''}`">{{ checkSearchedInstructor }}<img v-if="hasSearchedInstructor" @click="resetFilter('instructor')" src="/icons/filter-close.svg" /></span>
                        </div>
                        <div v-if="res.schedules.length > 0">
                            <div :class="`${(!$store.state.isMobile) ? 'content' : 'content_mobile'}`">
                                <div :class="`schedule${(data.past || data.ongoing) ? ' pst' : ''}`" v-for="(data, key) in res.schedules" :key="key">
                                    <div class="time" v-if="!$store.state.isMobile">{{ $moment(data.schedule.start_time, 'hh:mm A').format('h:mm A') }}</div>
                                    <div class="class" v-if="!$store.state.isMobile">
                                        <div class="image_wrapper" v-html="getInstructorsImageInSchedule(data)"></div>
                                        <div class="info">
                                            <h2>{{ getInstructorsInSchedule(data) }}</h2>
                                            <div class="ride">
                                                <p>{{ (data.schedule.custom_name != null) ? data.schedule.custom_name : data.schedule.class_type.name }} </p>
                                                <div class="info_icon">
                                                    <img src="/icons/info-booker-icon.svg" @click="toggleScheduleInfo(data)" />
                                                    <transition name="slideAltY">
                                                        <div class="info_overlay" v-if="data.toggled">
                                                            <div class="pointer"></div>
                                                            Details: <span v-html="(data.schedule.description != null) ? data.schedule.description : data.schedule.class_type.description">
                                                            </span>
                                                            Credits to Deduct: {{ data.schedule.class_credits }}
                                                        </div>
                                                    </transition>
                                                </div>
                                            </div>
                                            <h3>{{ data.schedule.studio.name }}</h3>
                                        </div>
                                    </div>
                                    <div class="image_wrapper" v-html="getInstructorsImageInSchedule(data)" v-if="$store.state.isMobile"></div>
                                    <div class="info" v-if="$store.state.isMobile">
                                        <div class="time">{{ $moment(data.schedule.start_time, 'h:mm A').format('h:mm A') }}</div>
                                        <h2>{{ getInstructorsInSchedule(data) }}</h2>
                                        <div class="ride">
                                            <p>{{ (data.schedule.custom_name != null) ? data.schedule.custom_name : data.schedule.class_type.name }} </p>
                                            <div class="info_icon">
                                                <img src="/icons/info-booker-icon.svg" @click="toggleScheduleInfo(data)" />
                                                <transition name="slideAltY">
                                                    <div class="info_overlay" v-if="data.toggled">
                                                        <div class="pointer"></div>
                                                        Details: <span v-html="(data.schedule.description != null) ? data.schedule.description : data.schedule.class_type.description">
                                                        </span>
                                                        Credits to Deduct: {{ data.schedule.class_credits }}
                                                    </div>
                                                </transition>
                                            </div>
                                        </div>
                                        <h3>{{ data.schedule.studio.name }}</h3>
                                    </div>
                                    <div class="action" v-if="!data.past && !data.ongoing">
                                        <nuxt-link :to="`/book-a-bike/${data.id}`" :event="''" @click.native="checkIfNew(data, 'book', $event)" class="btn default_btn_out" v-if="data.hasUser && !data.isWaitlisted && !data.isFull && !data.originalHere && !data.guestHere">
                                            <span>Book Now</span>
                                        </nuxt-link>
                                        <div @click="checkIfNew(data, 'waitlist', $event)" class="btn default_btn_out" v-else-if="data.hasUser && !data.isWaitlisted && data.isFull && !data.originalHere && !data.guestHere && !data.schedule.studio.online_class">
                                            <span>Waitlist</span>
                                        </div>
                                        <div class="btn default_btn_out disabled" v-else-if="data.hasUser && data.isWaitlisted && !data.schedule.studio.online_class">
                                            <span>Waitlisted</span>
                                        </div>
                                        <nuxt-link :to="`/fish-in-the-glass/manage-class/${data.id}?token=${$route.query.token}`" class="btn default_btn_out" v-else-if="data.hasUser && (data.originalHere || data.guestHere)">
                                            <span>Manage Class</span>
                                        </nuxt-link>
                                        <div class="btn default_btn_out" @click="checkIfLoggedIn($event)" v-else-if="!data.hasUser && !$store.state.isAuth">
                                            <span>Book Now</span>
                                        </div>
                                    </div>
                                    <div class="action" v-else-if="data.past && !data.ongoing">
                                        <div class="btn default_btn_out disabled">
                                            <span>Class is Over</span>
                                        </div>
                                    </div>
                                    <div class="action" v-else-if="!data.past && data.ongoing">
                                        <div class="btn default_btn_out disabled">
                                            <span>Class is Ongoing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="no_schedule" v-else>
                            <p>SCHEDULES ARE POSTED ON MONDAYS OF EVERY WEEK.</p>
                        </div>
                    </div>
                </div>
            </section>
            <transition name="fade">
                <complete-profile-prompt v-if="$store.state.completeProfilePromptStatus" />
            </transition>
            <transition name="fade">
                <booker-choose-package v-if="$store.state.bookerChoosePackageStatus" :category="'landing'" :type="type" />
            </transition>
            <transition name="fade">
                <buy-package-first v-if="$store.state.buyPackageFirstStatus" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import BookerChoosePackage from '../../../components/modals/BookerChoosePackage'
    import CompleteProfilePrompt from '../../../components/modals/CompleteProfilePrompt'
    import BuyPackageFirst from '../../../components/modals/BuyPackageFirst'
    export default {
        layout: 'fish',
        components: {
            BookerChoosePackage,
            CompleteProfilePrompt,
            BuyPackageFirst
        },
        data () {
            return {
                schedule: [],
                type: 0,
                webApp: true,
                message: '',
                status: false,
                loaded: false,
                isPrev: false,
                toggledAutocomplete: false,
                current: 0,
                last: 0,
                currentMonth: '',
                currentYear: '',
                currentDay: '',
                results: [],
                res: {
                    schedules: []
                },
                studios: [],
                instructors: [],
                studioID: 0,
                instructorID: 0,
                studioFilter: 'all studios',
                hasStudioFilter: false,
                searchedInstructor: '',
                hasSearchedInstructor: false
            }
        },
        computed: {
            /**
             * Toggle the filter is not selected a instructor or removed a instructor */
            checkSearchedInstructor () {
                const me = this
                let result = ''
                let id = (me.studioID == 0) ? '' : me.studioID
                if (me.searchedInstructor != '') {
                    result = `${me.searchedInstructor}`
                    me.hasSearchedInstructor = true

                } else {
                    me.hasSearchedInstructor = false
                    result = 'all instructors '
                }
                setTimeout( () => {
                    me.$axios.post(`api/instructors/search${(me.searchedInstructor != '') ? `?q=${result}&forWeb=1&studio_id=${id}` : `?forWeb=1&studio_id=${id}`}`).then(res => {
                        if (res.data) {
                            me.instructors = res.data.instructors
                        }
                    })
                }, 250)
                return result
            }
        },
        methods: {
            getInstructorsImageInSchedule (data) {
                const me = this
                let result = ''
                if (data != '') {
                    let ins_ctr = 0
                    let instructor = []
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        // if (ins.substitute == 0) {
                        //     ins_ctr += 1
                        // }
                        if (ins.primary == 1) {
                            instructor = ins
                        }
                    })

                    if (ins_ctr == 2) {
                        result = `
                            <img class="image" src="${instructor.user.instructor_details.images[0].path}" />
                            <img class="image" src="${data.schedule.instructor_schedules[1].user.instructor_details.images[0].path}" />
                        `
                    } else {
                        result = `<img class="image" src="${instructor.user.instructor_details.images[0].path}" />`
                    }
                }

                return result
            },
            getInstructorsInSchedule (data) {
                const me = this
                let result = ''
                if (data != '') {
                    let ins_ctr = 0
                    let instructor = []
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        if (ins.substitute == 0) {
                            ins_ctr += 1
                        }
                        if (ins.primary == 1) {
                            instructor = ins
                        }
                    })

                    if (ins_ctr == 2) {
                        result = `${instructor.user.instructor_details.nickname} + ${data.schedule.instructor_schedules[1].user.instructor_details.nickname}`
                    } else {
                        result = `${instructor.user.fullname}`
                    }

                }

                return result
            },
            /**
             * Toggle info in each schedule */
            toggleScheduleInfo (data) {
                const me = this
                data.toggled ^= true
            },
            /**
             * Check if user is logged in */
            checkIfLoggedIn (event) {
                const me = this
                let token = me.$route.query.token
                event.preventDefault()
                if (token == null && token == undefined) {
                    me.$store.state.loginCheckerStatus = true
                    document.body.classList.add('no_scroll')
                }
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
                    result += `${me.$moment(time, 'h:m').format('h')} ${(hour > 1) ? 'Hours ' : 'Hour '}`
                    result += me.$moment(time, 'h:m').format('mm') + ' Minutes'
                } else {
                    result += me.$moment(time, 'h:m').format('mm') + ' Minutes'
                }
                return result
            },
            /**
             * Validation if the user doesn't completed their profile */
            checkIfNew (data, type, event) {
                const me = this
                let token = me.$route.query.token
                event.preventDefault()
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let user = res.data.user
                        if (res.data.user.new_user == 0) {
                            if (data.hasUser && token != null && token != undefined) {
                                switch (type) {
                                    case 'book':
                                        me.loader(true)
                                        let hasPackages = false
                                        let formData = new FormData()
                                        formData.append('scheduled_date_id', data.id)
                                        formData.append('type', 'booking')
                                        me.$axios.post('api/schedules/validate', formData).then(res => {
                                            me.$axios.get(`api/customers/${user.id}/packages?forWeb=1`).then(res => {
                                                if (res.data) {
                                                    setTimeout( () => {
                                                        res.data.customer.user_package_counts.forEach((data, index) => {
                                                            if (parseInt(me.$moment((data.computed_expiration_date != null) ? data.computed_expiration_date : data.expiry_date_if_not_activated).diff(me.$moment())) > 0) {
                                                                hasPackages = true
                                                            }
                                                        })
                                                        // if (hasPackages) {
                                                            me.$router.push(`/fish-in-the-glass/book-a-bike/${data.id}?token=${token}`)
                                                        // } else {
                                                        //     me.$store.state.buyPackageFirstStatus = true
                                                        //     document.body.classList.remove('no_scroll')
                                                        // }
                                                    }, 500)
                                                }
                                            }).catch(err => {
                                                me.$store.state.errorList = err.response.data.errors
                                                me.$store.state.errorPromptStatus = true
                                            }).then(() => {
                                                setTimeout( () => {
                                                    me.loader(false)
                                                }, 500)
                                            })
                                        }).catch(err => {
                                            me.$store.state.errorList = err.response.data.errors
                                            me.$store.state.errorPromptStatus = true
                                            me.loader(false)
                                        })
                                        break
                                    case 'waitlist':
                                        me.schedule = data
                                        me.loader(true)
                                        setTimeout( () => {
                                            me.$store.state.bookerChoosePackageStatus = true
                                            document.body.classList.add('no_scroll')
                                            me.loader(false)
                                        }, 500)
                                        break
                                }
                            }
                        } else {
                            // me.$router.push(`/fish-in-the-glass/book-a-bike/${data.id}?token=${token}`)
                            me.$store.state.completeProfilePromptStatus = true
                        }
                    }
                }).catch(err => {
                    me.$store.state.needLogin = true
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                })
            },
            /**
             * Toggling of instructors custom autocomplete dropdown */
            toggleFilter (event) {
                const me = this
                let target = event.target
                let element = document.querySelector('.filter')
                target.parentNode.classList.add('oops')
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                    target.parentNode.classList.remove('toggled')
                    element.style.height = `0px`
                } else {
                    target.parentNode.classList.add('toggled')
                    setTimeout( () => {
                        element.classList.add('active')
                    }, 250)
                    element.style.height = `${element.scrollHeight + 10}px`
                }
                setTimeout( () => {
                    target.parentNode.classList.remove('oops')
                }, 500)
            },
            /**
             * Remove current filter */
            resetFilter (type) {
                const me = this
                let elements = document.querySelectorAll('.studio_filter .group')
                switch (type) {
                    case 'studio':
                        me.studioID = 0
                        me.hasStudioFilter = false
                        me.studioFilter = 'all studios'
                        elements.forEach((element, index) => {
                            if (element.querySelector('.radio').classList.contains('all')) {
                                element.querySelector('.radio').checked = true
                            } else {
                                element.querySelector('.radio').checked = false
                            }
                        })
                        break
                    case 'instructor':
                        me.instructorID = 0
                        me.hasSearchedInstructor = false
                        me.searchedInstructor = ''
                        break
                }
                me.getAllSchedules(me.currentYear, me.currentMonth, me.currentDay, true)
            },
            /**
             * Select instructor from filter */
            selectIntructor (data) {
                const me = this
                me.instructorID = data.id
                me.searchedInstructor = `${data.first_name} ${data.last_name}`
                me.toggledAutocomplete = false
                me.getAllSchedules(me.currentYear, me.currentMonth, me.currentDay, true)
            },
            /**
             * Select studio from filter */
            toggleStudio (data, type) {
                const me = this
                if (data != null) {
                    me.studioID = data.id
                } else {
                    me.studioID = 0
                }
                switch (type) {
                    case 'static':
                        me.studioFilter = 'all studios'
                        break
                    case 'dynamic':
                        me.studioFilter = data.name
                        me.hasStudioFilter = true
                        break
                }
                let id = (me.studioID == 0) ? '' : me.studioID
                /**
                 * Fetch all instructors */
                me.$axios.get(`api/instructors?enabled=1&studio_id=${id}`).then(res => {
                    if (res.data) {
                        me.instructors = res.data.instructors.data
                    }
                }).catch(err => {
                    me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                })
                me.getAllSchedules(me.currentYear, me.currentMonth, me.currentDay, true)
            },
            /**
             * On/Off of custom autocomplete */
            toggleAutoComplete () {
                const me = this
                me.toggledAutocomplete ^= true
            },
            /**
             * Click outside of autocomplete */
            toggleAutoCompleteOutside () {
                const me = this
                me.toggledAutocomplete = false
            },
            /**
             * Toggle class of calendar element */
            removeActive () {
                const me = this
                let elements = document.querySelectorAll('.date_navigator .date')
                elements.forEach((element, index) => {
                    element.classList.remove('active')
                })
            },
            /**
             * Get Schedule of specific date */
            toggleDate (year, month, day, unique) {
                const me = this
                me.loader(true)
                me.currentDay = day
                let elements = document.querySelectorAll('.date_navigator .date')
                document.getElementById(`date_${unique}`).classList.add('active')
                elements.forEach((element, index) => {
                    if (unique != index) {
                        element.classList.remove('active')
                    }
                })
                me.currentMonth = month
                me.currentDay = day
                me.getAllSchedules(year, month, day, true)
            },
            /**
             * Fetch All Schedules */
            getAllSchedules (year, month, day, searched) {
                const me = this
                let token = me.$route.query.token
                me.loader(true)
                if (searched) {
                    me.$axios.get(`api/schedules?year=${year}&day=${day}&month=${month}&studio_id=${me.studioID}&instructor_id=${me.instructorID}&forWeb=1`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data) {
                            me.populateResSchedules(res.data)
                            if (!me.loaded) {
                                me.loaded = true
                            }
                        }
                    }).catch(err => {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                        me.loader(false)
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                } else {
                    me.$axios.get(`api/schedules?year=${year}&day=${day}&month=${month}&forWeb=1`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data) {
                            me.populateResSchedules(res.data)
                            if (!me.loaded) {
                                me.loaded = true
                            }
                        }
                    }).catch(err => {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                        me.loader(false)
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                }
            },
            populateResSchedules (data) {
                const me = this
                me.res.schedules = []
                data.schedules.forEach((element, index) => {
                    element.toggled = false
                    me.res.schedules.push(element)
                })
            },
            /**
             * Generate Next Week of Calendar */
            generateNextClasses () {
                const me = this
                if (me.isPrev) {
                    me.isPrev = false
                    me.current = me.current + (!me.$store.state.isMobile ? 8 : 6)
                }
                me.results = []
                for (let i = 0; i < (!me.$store.state.isMobile ? 7 : 5); i++) {
                    if (me.current > me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        me.current = me.current - me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                        me.currentMonth = parseInt(me.currentMonth) + 1
                        if (me.currentMonth == 13) {
                            me.currentMonth = 1
                            me.currentYear = parseInt(me.currentYear) + 1
                        }
                    }
                    me.populateResults(me.current, 'next')
                    if (i == 0) {
                        me.last = me.current - 1
                    }
                    me.current++
                }
            },
            /**
             * Generate Prev Week of Calendar */
            generatePrevClasses () {
                const me = this
                if (!me.isPrev) {
                    me.isPrev = true
                    me.current = me.current - (!me.$store.state.isMobile ? 8 : 6)
                }
                me.results = []
                for (let i = 0; i < (!me.$store.state.isMobile ? 7 : 5); i++) {
                    if (me.current <= 0) {
                        me.currentMonth = parseInt(me.currentMonth) - 1
                        if (me.currentMonth == 0) {
                            me.currentMonth = 12
                            me.currentYear = parseInt(me.currentYear) - 1
                            if (me.current <= 0) {
                                if (me.last <= 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()
                                } else {
                                    if (me.currentMonth == 12) {
                                        me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-1`, 'YYYY-MM').daysInMonth()
                                    } else {
                                        me.current = me.last
                                    }
                                }
                            } else {
                                me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                            }
                        } else {
                            if (me.current == 0) {
                                if (me.last == 0) {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${1}`, 'YYYY-MM-D').daysInMonth()
                                } else {
                                    me.current = me.$moment(`${me.currentYear}-${me.currentMonth}-${me.last}`, 'YYYY-MM-D').daysInMonth()
                                }
                            } else {
                                me.current = me.last
                            }
                        }
                    }
                    me.populateResults(me.current, 'prev')
                    me.current--
                    if (i == (!me.$store.state.isMobile ? 6 : 4)) {
                        me.last = me.current
                    }
                }
            },
            /**
             * Populate Calendar with specific values */
            populateResults (data, type) {
                const me = this
                switch (type) {
                    case 'next':
                        me.results.push({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            month: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMM'),
                            day: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('D'),
                            year: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('YYYY'),
                            value: data
                        })
                        break
                    case 'prev':
                        me.results.unshift({
                            abbr: (me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('ddd'),
                            month: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('MMM'),
                            day: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('D'),
                            year: me.$moment(`${me.currentYear}-${me.currentMonth}-${data}`, 'YYYY-MM-D').format('YYYY'),
                            value: data
                        })
                        break
                }
                me.removeActive()
            },
            /**
             * Populate Calendar */
            populateClasses (check) {
                const me = this
                me.results = []
                me.loader(true)
                let currentDate = parseInt(me.$moment().format('D'))
                me.current = currentDate
                me.last = currentDate
                me.currentMonth = parseInt(me.$moment().format('M'))
                let temp_year = parseInt(me.$moment().format('YYYY'))

                for (let i = 0; i < (!me.$store.state.isMobile ? 7 : 5); i++) {
                    if (currentDate > me.$moment(`${temp_year}-${me.currentMonth}`, 'YYYY-MM').daysInMonth()) {
                        currentDate = 1
                        me.currentMonth = me.currentMonth + 1
                        if (me.currentMonth > 12) {
                            me.currentMonth = 1
                            temp_year = temp_year + 1
                        }
                    }
                    me.results.push({
                        abbr: (me.$moment(`${temp_year}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('M-D') == me.$moment().format('M-D')) ? 'Today' : me.$moment(`${temp_year}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('ddd'),
                        month: me.$moment(`${temp_year}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('MMM'),
                        day: me.$moment(`${temp_year}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('D'),
                        year: me.$moment(`${temp_year}-${me.currentMonth}-${currentDate}`, 'YYYY-MM-D').format('YYYY'),
                        value: currentDate
                    })
                    currentDate++
                    me.current = currentDate
                    me.isPrev = false
                }
                if (check) {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                }
                me.currentYear = temp_year
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let elements_first = document.querySelectorAll('.schedule_list .schedule .ride img')
                me.res.schedules.forEach((data, index) => {
                    if (target !== elements_first[index] && target.parentNode.previousElementSibling !== elements_first[index]) {
                        data.toggled = false
                    }
                })
            }
        },
        mounted () {
            const me = this
            let id = (me.studioID == 0) ? '' : me.studioID
            me.loader(true)
            /**
             * Fetch all studios */
            me.$axios.get('api/studios?enabled=1').then(res => {
                if (res.data) {
                    me.studios = res.data.studios
                }
            }).catch(err => {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            })
            /**
             * Fetch all instructors */
            me.$axios.get(`api/instructors?enabled=1&studio_id=${id}`).then(res => {
                if (res.data) {
                    me.instructors = res.data.instructors.data
                }
            }).catch(err => {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            })
            me.currentDay = me.$moment().format('D')
            me.getAllSchedules(me.$moment().format('YYYY'), me.$moment().format('M'), me.$moment().format('D'), false)
            setTimeout( () => {
                me.populateClasses(false)
            }, 10)
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
