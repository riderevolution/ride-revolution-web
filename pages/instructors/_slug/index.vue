<template>
    <transition name="fade">
        <div class="instructor_inner" v-if="loaded">
            <breadcrumb />
            <section id="info">
                <div class="left">
                    <h1>
                        {{ res.first_name }} {{ res.last_name }}
                        <p v-if="res.instructor_details.position">{{ res.instructor_details.position }}</p>
                    </h1>
                    <div class="specializations"></div>
                    <!-- <div class="specializations"> <div class="wrapper"> <img src="/default/specialization/drill-sergeant.svg" /> <h3>Drill Sergeant</h3> </div> <div class="wrapper"> <img src="/default/specialization/speed-freak.svg" /> <h3>Speed Freak</h3> </div> <div class="wrapper"> <img src="/default/specialization/coachella-afterparty.svg" /> <h3>Coachella Afterparty</h3> </div> </div> -->
                    <div class="description" v-html="res.instructor_details.description"></div>
                    <!-- <div class="talents"> <p>Specialization: ACE Certified, Calisthenics, Yoga</p> </div> -->
                    <!-- <div class="quote"> <p>Use your mental strength to beat the person<br> you were yesterday! <span class="green">#RideRevWithBilly</span></p> </div> -->
                </div>
                <div class="right" :style="`background-image: url('${mainImage}');`">
                    <div class="view_gallery" @click="openGallery()" v-if="!$store.state.isMobile">
                        <svg class="view_image" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <g transform="translate(-1164.5 -208.5)">
                                <rect width="7" height="7" transform="translate(1165 209)" class="square" />
                                <rect width="7" height="7" transform="translate(1165 219)" class="square" />
                                <rect width="7" height="7" transform="translate(1175 209)" class="square" />
                                <rect width="7" height="7" transform="translate(1175 219)" class="square_alt" />
                            </g>
                        </svg>
                        <span>View Photos</span>
                    </div>
                </div>
                <div class="view_gallery" @click="openGallery()" v-if="$store.state.isMobile">
                    <svg class="view_image" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <g transform="translate(-1164.5 -208.5)">
                            <rect width="7" height="7" transform="translate(1165 209)" class="square" />
                            <rect width="7" height="7" transform="translate(1165 219)" class="square" />
                            <rect width="7" height="7" transform="translate(1175 209)" class="square" />
                            <rect width="7" height="7" transform="translate(1175 219)" class="square_alt" />
                        </g>
                    </svg>
                    <span>View Photos</span>
                </div>
            </section>
            <section id="classes" v-if="scheduledDates.length > 0">
                <div class="header">
                    <h2>#RideRev <span>With {{ res.first_name }}</span></h2>
                    <h3>This week’s upcoming classes</h3>
                </div>
                <div class="content" v-if="!$store.state.isMobile">
                    <div class="wrapper" v-for="(data, key) in scheduledDates" :key="key">
                        <div class="start">
                            <div class="date">{{ parseDate('date', data.date) }}</div>
                            <div class="time">{{ data.schedule.start_time }}</div>
                        </div>
                        <div class="info">
                            <img class="main" :src="res.instructor_details.images[0].path" :alt="res.instructor_details.images[0].alt" />
                            <div class="description">
                                <h2>{{ res.first_name }} {{ res.last_name }}</h2>
                                <div class="limit">
                                    <span>{{ data.schedule.class_type.name }}</span>
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
                                <p>{{ data.schedule.studio.name }}</p>
                            </div>
                        </div>
                        <nuxt-link :to="`/book-a-bike/${data.id}`" :event="''" @click.native="checkIfNew(data, 'book', $event)" class="btn default_btn_out" v-if="data.hasUser && !data.isWaitlisted && !data.isFull && !data.originalHere && !data.guestHere">
                            <span>Book Now</span>
                        </nuxt-link>
                        <div @click="checkIfNew(data, 'waitlist', $event)" class="btn default_btn_out" v-else-if="data.hasUser && !data.isWaitlisted && data.isFull && !data.originalHere && !data.guestHere && !data.schedule.studio.online_class">
                            <span>Waitlist</span>
                        </div>
                        <div class="btn default_btn_out disabled" v-else-if="data.hasUser && data.isWaitlisted && !data.schedule.studio.online_class">
                            <span>Waitlisted</span>
                        </div>
                        <nuxt-link :to="`/my-profile/manage-class/${data.id}`" class="btn default_btn_out" v-else-if="data.hasUser && (data.originalHere || data.guestHere)">
                            <span>Manage Class</span>
                        </nuxt-link>
                        <div class="btn default_btn_out" @click="checkIfLoggedIn($event)" v-else-if="!data.hasUser && !$store.state.isAuth">
                            <span>Book Now</span>
                        </div>
                    </div>
                </div>
                <div class="content mobile" v-else>
                    <div class="wrapper" v-for="(data, key) in scheduledDates" :key="key">
                        <img class="main" :src="res.instructor_details.images[0].path" :alt="res.instructor_details.images[0].alt" />
                        <div class="info">
                            <div class="start">
                                <div class="date">{{ parseDate('date', data.date) }}</div>
                                <div class="time">{{ data.schedule.start_time }}</div>
                            </div>
                            <div class="description">
                                <h2>{{ res.first_name }} {{ res.last_name }}</h2>
                                <div class="limit">
                                    <span>{{ data.schedule.class_type.name }}</span>
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
                                <p>{{ data.schedule.studio.name }}</p>
                            </div>
                        </div>
                        <nuxt-link :to="`/book-a-bike/${data.id}`" :event="''" @click.native="checkIfNew(data, 'book', $event)" class="btn default_btn_out" v-if="data.hasUser && !data.isWaitlisted && !data.isFull && !data.originalHere && !data.guestHere">
                            <span>Book Now</span>
                        </nuxt-link>
                        <div @click="checkIfNew(data, 'waitlist', $event)" class="btn default_btn_out" v-else-if="data.hasUser && !data.isWaitlisted && data.isFull && !data.originalHere && !data.guestHere && !data.schedule.studio.online_class">
                            <span>Waitlist</span>
                        </div>
                        <div class="btn default_btn_out disabled" v-else-if="data.hasUser && data.isWaitlisted && !data.schedule.studio.online_class">
                            <span>Waitlisted</span>
                        </div>
                        <nuxt-link :to="`/my-profile/manage-class/${data.id}`" class="btn default_btn_out" v-else-if="data.hasUser && (data.originalHere || data.guestHere)">
                            <span>Manage Class</span>
                        </nuxt-link>
                        <div class="btn default_btn_out" @click="checkIfLoggedIn($event)" v-else-if="!data.hasUser && !$store.state.isAuth">
                            <span>Book Now</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="preview">
                    <img src="/default/instructor/class_preview.jpg" />
                    <div class="overlay">
                        <h2>Class Preview</h2>
                        <svg id="play_button" xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104">
                            <g transform="translate(-588 -3201)">
                                <circle class="btn_1" cx="52" cy="52" r="52" transform="translate(588 3201)" />
                                <path class="btn_2" d="M4631-11488.4v39.225l28.446-19.473Z" transform="translate(-4001 14722.354)" />
                                <g class="btn_3" transform="translate(588 3201)">
                                    <circle class="btn_4" cx="52" cy="52" r="52" />
                                    <circle class="btn_5" cx="52" cy="52" r="51.5" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div> -->
            </section>
            <section id="classes" v-else>
                <div class="header">
                    <h2>Ride With {{ res.first_name }}</h2>
                    <h3>UPCOMING CLASSES</h3>
                </div>
                <div class="no_results alt">
                    <p>NO CLASSES FOR THIS WEEK</p>
                </div>
            </section>
            <section id="comments">
                <div class="header">
                    <h2>Here’s what other riders loved about {{ res.first_name }}'s class</h2>
                    <div class="btn">
                        <nuxt-link :to="`/instructors/${res.instructor_details.slug}/comment`" class="default_btn">Write a Review</nuxt-link>
                    </div>
                </div>
                <div class="overall" v-if="comments.length > 0">
                    <div class="overall_left">
                        <p class="count">{{ overallRating }}</p>
                        <p class="label">out of 5</p>
                    </div>
                    <div class="overall_right" v-if="loaded">
                        <div class="star" v-for="n in 5">
                            <div :id="`star_${n}`" class="star_overlay">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.94" height="31.328" viewBox="0 0 32.94 31.328"><defs><style>.a1{fill:#26a48b;}</style></defs><path class="a1" d="M1163.074,284.065l5.09,10.313,11.38,1.654-8.235,8.027,1.944,11.335-10.18-5.352-10.178,5.352,1.944-11.335-8.235-8.027,11.381-1.654Z" transform="translate(-1146.604 -284.065)"/></svg>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32.94" height="31.328" viewBox="0 0 32.94 31.328"><defs><style>.a{fill:#c7c7c7;}</style></defs><path class="a" d="M1163.074,284.065l5.09,10.313,11.38,1.654-8.235,8.027,1.944,11.335-10.18-5.352-10.178,5.352,1.944-11.335-8.235-8.027,11.381-1.654Z" transform="translate(-1146.604 -284.065)"/></svg>
                        </div>
                    </div>
                </div>
                <div class="content" v-if="!$store.state.isMobile">
                    <div class="comment" v-for="(data, key) in populateComment" :key="key" v-if="comments.length > 0">
                        <div class="comment_img_initials">
                            <div class="background"></div>
                            <div class="initials">{{ data.author.charAt(0) }}{{ data.author.charAt(1) }}</div>
                        </div>
                        <div class="comment_info">
                            <div class="comment_header">
                                <div class="stats">
                                    <h3>{{ data.author }}</h3>
                                    <div class="stars">
                                        <img src="/icons/star-green.svg" v-if="data.rating != 0" v-for="n in data.rating" />
                                        <img src="/icons/star-gray.svg" v-if="data.rating != 5" v-for="n in 5 - data.rating" />
                                    </div>
                                </div>
                                <div class="date">{{ $moment(data.review_date).format('MMMM D, YYYY') }}</div>
                            </div>
                            <div class="title">{{ data.title }}</div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                    </div>
                    <div class="no_results alt" v-if="comments.length == 0">
                        <p>Write a review about {{ res.first_name }}’s class</p>
                    </div>
                </div>
                <div class="content mobile" v-else>
                    <div class="comment" v-for="(data, key) in populateComment" :key="key" v-if="comments.length > 0">
                        <div class="comment_header_mobile">
                            <div class="comment_img_initials">
                                <div class="background"></div>
                                <div class="initials">{{ data.author.charAt(0) }}{{ data.author.charAt(1) }}</div>
                            </div>
                            <div class="stats">
                                <h3>{{ data.author }}</h3>
                                <div class="stars">
                                    <img src="/icons/star-green.svg" v-if="data.rating != 0" v-for="n in data.rating" />
                                    <img src="/icons/star-gray.svg" v-if="data.rating != 5" v-for="n in 5 - data.rating" />
                                </div>
                                <div class="date">{{ $moment(data.review_date).format('MMMM D, YYYY') }}</div>
                            </div>
                        </div>
                        <div class="comment_info_mobile">
                            <div class="title">{{ data.title }}</div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                    </div>
                    <div class="no_results alt" v-if="comments.length == 0">
                        <p>Write a review about {{ res.first_name }}’s class</p>
                    </div>
                </div>
                <div class="load_more">
                    <div v-if="!checkComments" class="default_btn load" @click="loadMoreComments()">Load More</div>
                </div>
            </section>
            <section id="ride_with">
                <div class="header">
                    <h2>{{ res.instructor_details.instagram_hashtag }}</h2>
                    <a :href="res.instructor_details.instagram" target="_blank" class="description">
                        <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@{{ res.instructor_details.instagram_name }}</span>
                    </a>
                </div>
                <div class="content">
                    <instagram :feeds="feeds" :lessOne="true" />
                </div>
            </section>
            <section id="spotify">
                <div class="left">
                    <img src="/icons/spotify-logo.svg" />
                    <div v-html="res.instructor_details.spotify_description"></div>
                </div>
                <div class="right" v-html="res.instructor_details.spotify_embed"></div>
            </section>
            <transition name="fade">
                <gallery ref="gallery" :images="imagesToSend" v-if="showGallery" />
            </transition>
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
    import Breadcrumb from '../../../components/Breadcrumb'
    import Instagram from '../../../components/Instagram'
    import Gallery from '../../../components/modals/Gallery'
    import BookerChoosePackage from '../../../components/modals/BookerChoosePackage'
    import CompleteProfilePrompt from '../../../components/modals/CompleteProfilePrompt'
    import BuyPackageFirst from '../../../components/modals/BuyPackageFirst'
    export default {
        components: {
            Breadcrumb,
            Instagram,
            Gallery,
            BookerChoosePackage,
            CompleteProfilePrompt,
            BuyPackageFirst
        },
        data () {
            return {
                type: 0,
                res: {
                    first_name: '-',
                    last_name: '-',
                    instructor_details: {
                        meta_title: 'sample',
                        meta_keywords: 'sample',
                        meta_description: 'sample',
                        gallery: [
                            {
                                path: '',
                                alt: ''
                            }
                        ]
                    }
                },
                mainImage: [],
                scheduledDates: [],
                schedule: [],
                loaded: false,
                showGallery: false,
                imagesToSend: [],
                toShow: 4,
                count: 0,
                rating: 0,
                overallRating: 0,
                overallRatingComputed: false,
                comments: [],
                feeds: []
            }
        },
        computed: {
            populateComment () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShow; i++) {
                    if (me.comments[i] != null) {
                        me.comments[i].checked = true
                        result.push(me.comments[i])
                    }
                }
                return result
            },
            checkComments () {
                const me = this
                let count = 0
                let result = false
                me.comments.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.comments.length) {
                    result = true
                } else {
                    result = false
                }
                me.count = count
                return result
            }
        },
        methods: {
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
                if (me.$store.state.user.new_user == 0) {
                    if (token != null && token != undefined) {
                        switch (type) {
                            case 'book':
                                me.$axios.get('api/check-token', {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }).then(res => {
                                    if (res.data) {
                                        let user = res.data
                                        let formData = new FormData()
                                        formData.append('scheduled_date_id', data.id)
                                        formData.append('type', 'booking')
                                        me.$axios.post('api/schedules/validate', formData).then(res => {
                                            if (res.data) {
                                                setTimeout( () => {
                                                    if (user.userPackagesCount > 0) {
                                                        me.$router.push(`/book-a-bike/${data.id}`)
                                                    } else {
                                                        me.$store.state.buyPackageFirstStatus = true
                                                        document.body.classList.remove('no_scroll')
                                                    }
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
                                    console.log(err)
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
            },
            openGallery() {
                const me = this
                me.showGallery = true
                setTimeout( () => {
                    me.$refs.gallery.opened = true
                }, 200)
                document.body.classList.add('no_scroll')
            },
            loadMoreComments () {
                const me = this
                if (!me.checkComments) {
                    me.toShow += 4
                    me.$scrollTo('.load', {
                        offset: 0
                    })
                }
            },
            parseDate (type, data) {
                const me = this
                switch (type) {
                    case 'time':
                        return me.$moment(data).format('hh:mmA')
                        break
                    case 'date':
                        return me.$moment(data).format('MMMM D')
                        break
                }
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                let elements_first = document.querySelectorAll('#classes .description .limit .info_icon img')
                me.scheduledDates.forEach((data, index) => {
                    if (target !== elements_first[index] && target.parentNode.previousElementSibling !== elements_first[index]) {
                        data.toggled = false
                    }
                })
            },
            async initial () {
                const me = this
                setTimeout( () => {
                    if (me.comments.length > 0) {
                        for (let i = 1; i <= 5; i++) {
                            let target = document.getElementById(`star_${i}`)
                            if (me.rating != 0) {
                                if (!me.overallRatingComputed) {
                                    if (me.overallRating < i) {
                                        target.style.width = `${100 * `0.${parseInt(me.overallRating.split('.')[1])}`}%`
                                        me.overallRatingComputed = true
                                    }
                                } else {
                                    if (me.overallRating >= i) {
                                        target.style.width = '100%'
                                    } else {
                                        target.style.width = '0%'
                                    }
                                }
                            } else {
                                target.style.width = '0%'
                            }
                        }
                    }
                    me.$axios.get(`https://stamped.io/api/widget/reviews?type=instagram-feed&apiKey=pubkey-b1f9lj3ib12svBob12UI0Z3a7lwNra&storeUrl=www.riderevolution.ph&isdataonly=true&productIds=${me.res.id}`).then(res => {
                        me.feeds = res.data.data
                        me.loader(false)
                    })
                }, 500)
            }
        },
        async mounted () {
            const me = this
            me.loader(true)
            await setTimeout( () => {
                me.initial()
            }, 500)
        },
        asyncData ({ $axios, params, error, store }) {
            let token = store.state.token
            if (token != null || token != undefined || token != '') {
                return $axios.get(`api/web/instructors/${params.slug}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data) {
                        let tempRating = 0
                        let tempOverall = 0
                        let tempImages = []
                        let tempSchedules = []
                        res.data.instructor.instructor_details.gallery.forEach((data, index) => {
                            if (index != 0) {
                                tempImages.push(data)
                            }
                        })
                        res.data.instructor.reviews.forEach((comment, index) => {
                            tempRating += comment.rating
                        })
                        if (tempRating != 0) {
                            tempOverall = tempRating / res.data.instructor.reviews.length
                            tempOverall = tempOverall.toFixed(1)
                        }
                        res.data.scheduledDates.forEach((schedule, index) => {
                            schedule.toggled = false
                            tempSchedules.push(schedule)
                        })
                        return {
                            res: res.data.instructor,
                            mainImage: res.data.instructor.instructor_details.gallery[0].path,
                            imagesToSend: tempImages,
                            comments: res.data.instructor.reviews,
                            scheduledDates: tempSchedules,
                            overallRating: tempOverall,
                            rating: tempRating,
                            loaded: true
                        }
                    }
                }).catch(err => {
                    me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                })
            } else {
                return $axios.get(`api/web/instructors/${params.slug}`).then(res => {
                    if (res.data) {
                        let tempRating = 0
                        let tempOverall = 0
                        let tempImages = []
                        let tempSchedules = []
                        res.data.instructor.instructor_details.gallery.forEach((data, index) => {
                            if (index != 0) {
                                tempImages.push(data)
                            }
                        })
                        res.data.instructor.reviews.forEach((comment, index) => {
                            tempRating += comment.rating
                        })
                        if (tempRating != 0) {
                            tempOverall = tempRating / res.data.instructor.reviews.length
                            tempOverall = tempOverall.toFixed(1)
                        }
                        res.data.scheduledDates.forEach((schedule, index) => {
                            schedule.toggled = false
                            tempSchedules.push(schedule)
                        })
                        return {
                            res: res.data.instructor,
                            mainImage: res.data.instructor.instructor_details.gallery[0].path,
                            imagesToSend: tempImages,
                            comments: res.data.instructor.reviews,
                            scheduledDates: tempSchedules,
                            overallRating: tempOverall,
                            rating: tempRating,
                            loaded: true
                        }
                    }
                }).catch(err => {
                    me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
                })
            }
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
                title: `${me.res.first_name} ${me.res.last_name} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.instructor_details.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.instructor_details.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.res.instructor_details.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.res.instructor_details.gallery[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.instructor_details.gallery[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
