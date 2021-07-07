<template>
    <transition name="fade">
        <div class="book_a_bike landing" v-if="loaded">
            <banner :res="res.pageSetting" :hasH2="true" />
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
                                <input type="radio" class="radio all" name="studios" id="studio_0" value="0" checked @change="toggleStudio(null, 'static')">
                                <label for="studio_0">All Studios</label>
                            </div>
                            <div class="group" v-for="(studio, key) in studios" :key="key">
                                <input type="radio" class="radio" name="studios" :id="`studio_${key + 1}`" @change="toggleStudio(studio, 'dynamic')">
                                <label :for="`studio_${key + 1}`">{{ studio.name }}</label>
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
                        <div class="wrapper view_filter">
                            <h3>Show</h3>
                            <div class="group">
                                <input type="checkbox" class="radio" name="view" id="class_over" value="hide_past" @change="toggleViewing()">
                                <label for="class_over">Class Over</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="schedules">
                        <template v-if="viewing == 'weekly'">
                            <div class="weekly">
                                <div class="prev" @click="fetchData('prev')"></div>
                                <div class="dates">
                                    {{ $moment(first_date).format('DD MMM') }} - {{ $moment(last_date).format('DD MMM') }}
                                </div>
                                <div class="next" @click="fetchData('next')"></div>
                            </div>
                        </template>
                        <template v-if="res.dates.length > 0">
                            <div class="schedule_item" v-for="(parent, key) in res.dates" :key="key">
                                <div class="items">
                                    <div class="day">{{ parent.dayName }}</div>
                                    <div class="month">{{ parent.monthName }}</div>
                                    <div class="date">{{ parent.dayNumber }}</div>
                                </div>
                                <div :class="[ 'items', (child.past || child.ongoing) ? ' pst' : '' ]" v-for="(child, key) in parent.schedules" :key="key">
                                    <transition name="fade">
                                        <div class="info_overlay" v-if="child.schedule.toggle">
                                            <div class="pointer"></div>
                                            Details: <span v-html="(child.schedule.private_class == 1) ? child.schedule.occassion : (child.schedule.description != null) ? child.schedule.description : child.schedule.class_type.description"></span><br />
                                            Credits to Deduct: {{ child.schedule.class_credits }}
                                        </div>
                                    </transition>
                                    <div class="items_top">
                                        <img class="info" src="/icons/info-booker-icon.svg" :id="`img_${child.schedule.id}`" @click="toggleScheduleInfo(child.schedule)" />
                                        <div class="image_wrapper" v-html="getInstructorsImageInSchedule(child)"></div>

                                    </div>
                                    <div class="items_middle">
                                        <div class="time">{{ child.schedule.start_time }}</div>
                                        <div class="name">{{ getInstructorsInSchedule(child) }}</div>
                                        <template v-if="child.schedule.custom_name != null">
                                            <div class="class" v-html="child.schedule.custom_name" v-line-clamp="1"></div>
                                        </template>
                                        <template v-else>
                                            <div class="class" v-html="child.schedule.class_type.name" v-line-clamp="1"></div>
                                        </template>
                                        <div class="studio">{{ child.schedule.studio.name }}</div>
                                    </div>
                                    <div class="items_bottom">
                                        <template v-if="child.schedule.private_class == 1">
                                            <div class="btn default_btn_out disabled">
                                                <span>Private Class</span>
                                            </div>
                                        </template>
                                        <template v-else-if="child.schedule.private_class == 1">
                                            <div class="btn default_btn_out disabled">
                                                <span>Private Class</span>
                                            </div>
                                        </template>
                                        <template v-else-if="!child.past && !child.ongoing">
                                            <template v-if="child.hasUser && !child.isWaitlisted && !child.isFull && !child.originalHere && !child.guestHere">
                                                <nuxt-link :to="`/book-a-bike/${child.id}`" :event="''" @click.native="checkIfNew(child, 'book', $event)" class="btn default_btn_out">
                                                    <span>Book Now</span>
                                                </nuxt-link>
                                            </template>
                                            <template v-else-if="child.hasUser && !child.isWaitlisted && child.isFull && !child.originalHere && !child.guestHere && !child.schedule.studio.online_class">
                                                <div @click="checkIfNew(child, 'waitlist', $event)" class="btn default_btn_out">
                                                    <span>Waitlist</span>
                                                </div>
                                            </template>
                                            <template v-else-if="child.hasUser && child.isWaitlisted && !child.schedule.studio.online_class">
                                                <div class="btn default_btn_out disabled">
                                                    <span>Waitlisted</span>
                                                </div>
                                            </template>
                                            <template v-else-if="child.hasUser && (child.originalHere || child.guestHere)">
                                                <nuxt-link :to="`/my-profile/manage-class/${child.id}`" class="btn default_btn_out">
                                                    <span>Manage Class</span>
                                                </nuxt-link>
                                            </template>
                                            <template v-else-if="!child.hasUser && !$store.state.isAuth">
                                                <div class="btn default_btn_out" @click="checkIfLoggedIn($event)">
                                                    <span>Book Now</span>
                                                </div>
                                            </template>
                                        </template>
                                        <template v-else-if="child.past && !child.ongoing">
                                            <div class="btn default_btn_out disabled">
                                                <span>Class is Over</span>
                                            </div>
                                        </template>
                                        <template v-else-if="!child.past && child.ongoing">
                                            <div class="btn default_btn_out disabled">
                                                <span>Ongoing</span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
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
            <transition name="fade">
                <booker-prompt :message="message" v-if="$store.state.bookerPromptStatus" :status="status" />
            </transition>
        </div>
        <skeleton :page="'default_box'" :col="{ class: 'one', count: 4 }" :layout="'one'" v-else />
    </transition>
</template>

<script>
    export default {
        components: {
            Banner: () => import('~/components/Banner'),
            Skeleton: () => import('~/components/Skeleton'),
            BookerChoosePackage: () => import('~/components/modals/BookerChoosePackage'),
            CompleteProfilePrompt: () => import('~/components/modals/CompleteProfilePrompt'),
            BuyPackageFirst: () => import('~/components/modals/BuyPackageFirst'),
            BuyRidesPrompt: () => import('~/components/modals/BuyRidesPrompt')
        },
        data () {
            return {
                setting: {
                    title: 'Book a Class',
                    subtitle: '',
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
                    banners: [
                        {
                            path: null,
                            alt: ''
                        }
                    ]
                },
                schedule: [],
                type: 0,
                message: '',
                status: false,
                loaded: false,
                toggledAutocomplete: false,
                results: [],
                res: [],
                studios: [],
                instructors: [],
                hide_past: 1,
                studioID: 0,
                instructorID: 0,
                viewing: 'weekly',
                studioFilter: 'all studios',
                hasStudioFilter: false,
                searchedInstructor: '',
                hasSearchedInstructor: false,
                first_date: '',
                last_date: ''
            }
        },
        computed: {
            /**
             * Toggle the filter is not selected a instructor or removed a instructor */
            checkSearchedInstructor () {
                const me = this
                let result = ''
                if (me.searchedInstructor != '') {
                    result = `${me.searchedInstructor}`
                    me.hasSearchedInstructor = true
                } else {
                    me.instructorID = (me.$route.query.i) ? me.$route.query.i : 0
                    me.searchedInstructor = ''
                    me.hasSearchedInstructor = false
                    result = 'all instructors '
                }
                return result
            }
        },
        methods: {
            getInstructorsImageInSchedule (data) {
                const me = this
                let result= '',
                    ctr = 0,
                    instructor = null,
                    sub_instructor = null,
                    additional = null

                if (data) {
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        ctr += 1
                        if (ins.substitute == 1) {
                            sub_instructor = ins
                        }
                        if (ins.substitute == 1 && ins.primary == 1) {
                            sub_instructor = ins
                        }
                        if (ins.primary == 1 && ins.substitute == 0) {
                            instructor = ins
                        }
                        if (index == 0) {
                            instructor = ins
                        } else {
                            if (!ins.substitute && !ins.primary) {
                                additional = ins
                            }
                        }
                    })

                    if (ctr == 2) {
                        if (sub_instructor) {
                            result = `
                                <img class="image" src="${instructor.user.instructor_details.images[0].path}" />
                                <img class="image add" src="${sub_instructor.user.instructor_details.images[0].path}" />
                            `
                        } else {
                            result = `
                                <img class="image" src="${instructor.user.instructor_details.images[0].path}" />
                                <img class="image add" src="${additional.user.instructor_details.images[0].path}" />
                            `
                        }
                    } else if (ctr == 3) {
                        result = `
                            <img class="image" src="${instructor.user.instructor_details.images[0].path}" />
                            <img class="image add" src="${sub_instructor.user.instructor_details.images[0].path}" />
                            <img class="image add" src="${additional.user.instructor_details.images[0].path}" />
                        `
                    } else {
                        result = `<img class="image" src="${instructor.user.instructor_details.images[0].path}" />`
                    }
                }

                return result
            },
            getInstructorsInSchedule (data) {
                const me = this
                let result= '',
                    ctr = 0,
                    instructor = null,
                    sub_instructor = null,
                    additional = null

                if (data) {
                    data.schedule.instructor_schedules.forEach((ins, index) => {
                        ctr += 1
                        if (ins.substitute == 1) {
                            sub_instructor = ins
                        }
                        if (ins.substitute == 1 && ins.primary == 1) {
                            sub_instructor = ins
                        }
                        if (ins.primary == 1 && ins.substitute == 0) {
                            instructor = ins
                        }
                        if (index == 0) {
                            instructor = ins
                        } else {
                            if (!ins.substitute && !ins.primary) {
                                additional = ins
                            }
                        }
                    })

                    if (ctr == 2) {
                        if (sub_instructor) {
                            result = `${instructor.user.instructor_details.nickname} + ${sub_instructor.user.instructor_details.nickname}`
                        } else {
                            result = `${instructor.user.instructor_details.nickname} + ${additional.user.instructor_details.nickname}`
                        }
                    } else if (ctr == 3) {
                        result = `${instructor.user.instructor_details.nickname} + ${sub_instructor.user.instructor_details.nickname} + ${additional.user.instructor_details.nickname}`
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
                data.toggle ^= true
            },
            /**
             * Check if user is logged in */
            checkIfLoggedIn (event) {
                const me = this
                event.preventDefault()
                if (!me.$store.state.isAuth) {
                    me.$store.state.loginCheckerStatus = true
                    document.body.classList.add('no_scroll')
                }
            },
            /**
             * Validation if the user doesn't completed their profile */
            checkIfNew (data, type, event) {
                const me = this
                let token = me.$cookies.get('70hokc3hhhn5')
                event.preventDefault()
                me.loader(true)
                me.$axios.get('api/check-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let user = res.data.user
                        if (user.new_user == 0) {
                            if (data.hasUser && token != null && token != undefined) {
                                switch (type) {
                                    case 'book':
                                        let formData = new FormData()
                                        let hasPackages = false
                                        formData.append('scheduled_date_id', data.id)
                                        formData.append('type', 'booking')
                                        me.$axios.post('api/schedules/validate', formData).then(res => {
                                            if (res.data) {
                                                me.$axios.get(`api/customers/${user.id}/packages?forWeb=1`).then(res => {
                                                    if (res.data) {
                                                        setTimeout( () => {
                                                            res.data.customer.user_package_counts.forEach((data, index) => {
                                                                if (parseInt(me.$moment((data.computed_expiration_date != null) ? data.computed_expiration_date : data.expiry_date_if_not_activated).diff(me.$moment())) > 0) {
                                                                    hasPackages = true
                                                                }
                                                            })
                                                            // if (hasPackages) {
                                                                me.$router.push(`/book-a-bike/${data.id}`)
                                                           /* } else {
                                                                me.$store.state.buyPackageFirstStatus = false
                                                                document.body.classList.remove('no_scroll')
                                                            }*/
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
                                            }
                                        }).catch(err => {
                                            me.$store.state.errorList = err.response.data.errors
                                            me.$store.state.errorPromptStatus = true
                                            me.loader(false)
                                        })
                                        break
                                    case 'waitlist':
                                        me.schedule = data
                                        setTimeout( () => {
                                            me.$store.state.bookerChoosePackageStatus = true
                                            document.body.classList.add('no_scroll')
                                            me.loader(false)
                                        }, 500)
                                        break
                                }
                            }
                        } else {
                            me.$store.state.lastRoute = `/book-a-bike/${data.id}`
                            me.$store.state.completeProfilePromptStatus = true
                        }
                    }
                }).catch(err => {
                    me.$store.state.needLogin = true
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorPromptStatus = true
                    me.loader(false)
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
             * Select instructor from filter */
            selectIntructor (data) {
                const me = this
                me.instructorID = data.id
                me.searchedInstructor = `${data.first_name} ${data.last_name}`
                me.toggledAutocomplete = false
                me.fetchData()
            },
            toggleViewing () {
                const me = this
                me.hide_past ^= true
                me.fetchData()
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
                /**
                 * Fetch all instructors */
                me.$axios.get(`api/web/instructors`).then(res => {
                    if (res.data) {
                        me.instructors = res.data.instructors
                    }
                })
                me.fetchData()
            },
            /**
             * On/Off of custom autocomplete */
            toggleAutoComplete () {
                const me = this
                me.toggledAutocomplete = true
            },
            /**
             * Click outside of autocomplete */
            toggleAutoCompleteOutside () {
                const me = this
                if (me.toggledAutocomplete && me.searchedInstructor == '') {
                    me.fetchData()
                }
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
            fetchData (data=null) {
                const me = this
                let form_data = new FormData(),
                    token = me.$cookies.get('70hokc3hhhn5')
                me.loader(true)

                if (me.instructorID != 0) {
                    form_data.append('instructor_id', me.instructorID)
                }
                if (me.studioID != 0) {
                    form_data.append('studio_id', me.studioID)
                }

                if (data) {
                    if (data == 'prev') {
                        form_data.append('first_date', me.first_date)
                    } else {
                        form_data.append('last_date', me.last_date)
                    }
                } else {
                    form_data.append('last_date', me.first_date)
                    form_data.append('hide_past', me.hide_past)
                }

                me.$axios.post('api/web/schedules', form_data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    me.res = res.data
                    if (me.res.dates.length > 0) {
                        me.first_date = me.res.dates[0].date
                        me.last_date = me.res.dates[me.res.dates.length - 1].date
                    }
                    me.loaded = true
                }).catch(err => {
                    me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                }).then(() => {
                    me.loader(false)
                })
            },
            toggleOverlays (e) {
                const me = this
                let ctr = 0
                let target = e.target
                let elements_first = document.querySelectorAll('.book_a_bike.landing #content .right .schedules .schedule_item .items .info')
                me.res.dates.forEach((data, index) => {
                    data.schedules.forEach((child, c_index) => {
                        if (target.id !== elements_first[ctr].id) {
                            child.schedule.toggle = false
                        }
                        ctr += 1
                    })
                })
            }
        },
        mounted () {
            const me = this
            me.instructorID = (me.$route.query.i) ? me.$route.query.i : 0
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
            me.$axios.get(`api/web/instructors`).then(res => {
                if (res.data) {
                    me.instructors = res.data.instructors
                }
            }).catch(err => {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            })
            me.fetchData()
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.setting.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.setting.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.setting.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.setting.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.setting.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.setting.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
