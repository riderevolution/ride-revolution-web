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
                    <div class="default_btn" @click="openGallery(res.instructor_details)">View All Photos</div>
                </div>
                <div class="right" :style="`background-image: url('${res.instructor_details.gallery[0].path}');`"></div>
            </section>
            <section id="classes" v-if="scheduledDates.length > 0">
                <div class="header">
                    <h2>#RideRev <span>With {{ res.first_name }}</span></h2>
                    <h3>This week’s upcoming classes</h3>
                </div>
                <div class="content" v-if="!$parent.$parent.isMobile">
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
                                    <img src="/icons/info-icon.svg" />
                                </div>
                                <p>{{ data.schedule.studio.name }}</p>
                            </div>
                        </div>
                        <nuxt-link :to="`/book-a-bike/${data.id}`" :event="''" @click.native="checkIfNew(data, 'book', $event)" class="btn default_btn_out" v-if="data.availableSeatsCount > 0 && $store.state.isAuth && !data.isWaitlisted && !data.bookedHere && !data.guestHere">
                            <span>Book Now</span>
                        </nuxt-link>
                        <div @click="checkIfNew(data, 'waitlist', $event)" class="btn default_btn_out" v-else-if="data.availableSeatsCount <= 0 && $store.state.isAuth && !data.isWaitlisted && !data.bookedHere && !data.guestHere">
                            <span>Waitlist</span>
                        </div>
                        <div class="btn default_btn_out disabled" v-else-if="$store.state.isAuth && data.isWaitlisted">
                            <span>Waitlisted</span>
                        </div>
                        <nuxt-link :to="`/my-profile/manage-class/${data.id}`" class="btn default_btn_out" v-else-if="$store.state.isAuth && data.bookedHere || data.guestHere">
                            <span>Manage Class</span>
                        </nuxt-link>
                        <div class="btn default_btn_out" @click="checkIfLoggedIn($event)" v-else-if="!$store.state.isAuth">
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
                                    <img src="/icons/info-icon.svg" />
                                </div>
                                <p>{{ data.schedule.studio.name }}</p>
                            </div>
                        </div>
                        <nuxt-link :to="`/book-a-bike/${data.id}`" :event="''" @click.native="checkIfNew(data, 'book', $event)" class="btn default_btn_out" v-if="data.availableSeatsCount > 0 && $store.state.isAuth && !data.isWaitlisted && !data.bookedHere && !data.guestHere">
                            <span>Book Now</span>
                        </nuxt-link>
                        <div @click="checkIfNew(data, 'waitlist', $event)" class="btn default_btn_out" v-else-if="data.availableSeatsCount <= 0 && $store.state.isAuth && !data.isWaitlisted && !data.bookedHere && !data.guestHere">
                            <span>Waitlist</span>
                        </div>
                        <div class="btn default_btn_out disabled" v-else-if="$store.state.isAuth && data.isWaitlisted">
                            <span>Waitlisted</span>
                        </div>
                        <nuxt-link :to="`/my-profile/manage-class/${data.id}`" class="btn default_btn_out" v-else-if="$store.state.isAuth && data.bookedHere || data.guestHere">
                            <span>Manage Class</span>
                        </nuxt-link>
                        <div class="btn default_btn_out" @click="checkIfLoggedIn($event)" v-else-if="!$store.state.isAuth">
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
                    <h2>#RideRev <span>With {{ res.first_name }}</span></h2>
                    <h3>This week’s upcoming classes</h3>
                </div>
                <div class="no_results">
                    <p>NO CLASSES FOR THIS WEEK</p>
                </div>
            </section>
            <section id="comments">
                <div class="header">
                    <h2>Here are what other riders are raving about {{ res.first_name }}</h2>
                    <nuxt-link to="/instructors/asdasdadas/comment" class="default_btn">Write a Review</nuxt-link>
                </div>
                <div class="content" v-if="!$parent.$parent.isMobile">
                    <div class="comment" v-for="(data, key) in populateComment" :key="key">
                        <img class="comment_img" :src="data.path" v-if="data.hasImage" />
                        <div class="comment_img_initials" v-else>
                            <div class="background"></div>
                            <div class="initials">CL</div>
                        </div>
                        <div class="comment_info">
                            <div class="comment_header">
                                <div class="stats">
                                    <h3>{{ data.name }}</h3>
                                    <div class="stars">
                                        <img src="/icons/star-green.svg" v-if="data.stars != 0" v-for="n in data.stars" />
                                        <img src="/icons/star-gray.svg" v-if="data.stars != 5" v-for="n in 5 - data.stars" />
                                    </div>
                                </div>
                                <div class="date">{{ $moment('May 15, 2019').format('MMMM D, YYYY') }}</div>
                            </div>
                            <div class="title">{{ data.title }}</div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                    </div>
                </div>
                <div class="content mobile" v-else>
                    <div class="comment" v-for="(data, key) in populateComment" :key="key">
                        <div class="comment_header_mobile">
                            <img class="comment_img" :src="data.path" v-if="data.hasImage" />
                            <div class="comment_img_initials" v-else>
                                <div class="background"></div>
                                <div class="initials">CL</div>
                            </div>
                            <div class="stats">
                                <h3>{{ data.name }}</h3>
                                <div class="stars">
                                    <img src="/icons/star-green.svg" v-if="data.stars != 0" v-for="n in data.stars" />
                                    <img src="/icons/star-gray.svg" v-if="data.stars != 5" v-for="n in 5 - data.stars" />
                                </div>
                                <div class="date">{{ $moment('May 15, 2019').format('MMMM D, YYYY') }}</div>
                            </div>
                        </div>
                        <div class="comment_info_mobile">
                            <div class="title">{{ data.title }}</div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                    </div>
                </div>
                <div class="load_more">
                    <div v-if="!checkComments" class="default_btn load" @click="loadMoreComments()">Load More</div>
                </div>
            </section>
            <section id="ride_with">
                <div class="header">
                    <h2>#RideWith{{ res.first_name }}</h2>
                    <div class="description">
                        <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>{{ res.instructor_details.instagram_name }}</span>
                    </div>
                </div>
                <div class="content">
                    <instagram :lessOne="true" />
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
                scheduledDates: [],
                schedule: [],
                loaded: false,
                showGallery: false,
                imagesToSend: null,
                toShow: 4,
                count: 0,
                comments: [
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'In vitae turpis massa sed elementum tempus. Praesent tristique magna sit amet purus gravida quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.',
                        stars: 4,
                        checked: true
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 3,
                        checked: true
                    },
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 0,
                        checked: true
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 2,
                        checked: true
                    },
                    {
                        path: '/default/lets-ride/sample-ig0.jpg',
                        hasImage: true,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 5,
                        checked: false
                    },
                    {
                        hasImage: false,
                        name: 'Charlie Tayah',
                        title: 'I absolutely love her class!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..',
                        stars: 1,
                        checked: false
                    },
                ]
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
                let token = me.$cookies.get('token')
                event.preventDefault()
                me.loader(true)
                console.log(data);
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
                                        setTimeout( () => {
                                            me.loader(false)
                                            if (res.data.userPackagesCount > 0) {
                                                me.$router.push(`/book-a-bike/${data.id}`)
                                            } else {
                                                me.$store.state.buyPackageFirstStatus = true
                                                document.body.classList.remove('no_scroll')
                                            }
                                        }, 500)
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
                    me.$store.state.completeProfilePromptStatus = true
                }
            },
            openGallery(data) {
                const me = this
                // me.imagesToSend = me.parser(me.studioImages[key].images)
                me.imagesToSend = data.gallery
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
            initial () {
                const me = this
                let token = me.$cookies.get('token')
                me.loader(true)
                if (token != null || token != undefined) {
                    me.$axios.get(`api/web/instructors/${me.$route.params.slug}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data) {
                            setTimeout( () => {
                                me.res = res.data.instructor,
                                me.scheduledDates = res.data.scheduledDates
                                me.loaded = true
                            }, 500)
                        }
                    }).catch(err => {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                } else {
                    me.$axios.get(`api/web/instructors/${me.$route.params.slug}`).then(res => {
                        if (res.data) {
                            setTimeout( () => {
                                me.res = res.data.instructor,
                                me.scheduledDates = res.data.scheduledDates
                                me.loaded = true
                            }, 500)
                        }
                    }).catch(err => {
                        me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                        }, 500)
                    })
                }
            }
        },
        mounted () {
            const me = this
            me.initial()
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
