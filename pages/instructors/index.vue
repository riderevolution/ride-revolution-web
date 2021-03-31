<template>
    <transition name="fade">
        <div :class="`instructors ${($store.state.articleAlertStatus) ? 'adjust' : ''}`" v-if="loaded">
            <section id="instructors_nav">
                <!-- <div :class="`left ${(toggled) ? 'active' : ''}`" @click="toggleSpecialization()" v-click-outside="outsideSpecialization">
                    <div class="select">
                        <label class="label">
                            Specialization
                            <div class="count">
                                <span>{{ count }}</span>
                            </div>
                        </label>
                        <div class="custom_select">
                            <div :class="`check ${(checkSpecialization) ? 'active' : ''}`">
                                <label for="specialization_all">All Specializations</label>
                                <input type="checkbox" id="specialization_all" name="select_all" value="0" :checked="checkSpecialization" @change="toggleAllSpecialization($event)">
                            </div>
                            <div :class="`check ${(data.checked) ? 'active' : ''}`" v-for="(data, key) in specializations" :key="key">
                                <label class="label" :for="`specialization_${key}`"><img :src="data.path" /><span>{{ data.name }}</span></label>
                                <input type="checkbox" :id="`specialization_${key}`" name="specialization[]" v-model="data.checked" @change="getSpecialization($event, key)">
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="right full">
                    <div class="input">
                        <input type="text" autocomplete="off" name="q" v-model="form.q" placeholder="Search for an instructor" @keyup="searchInstructor()">
                    </div>
                </div>
            </section>
            <breadcrumb :hasPadding="true" />
            <section id="instructors_content">
                <div class="header">
                    <h1>{{ res.title }}</h1>
                    <div v-if="res.subtitle" v-html="res.subtitle"></div>
                    <div class="subheader">
                        <h2>Show instructors by</h2>
                        <div class="select">
                            <select name="sort" v-model="form.sort_by" @change="searchInstructor()">
                                <option :value="data.value" v-for="(data, key) in sorts" :key="key" :selected="(key == 2) ? true : false">{{ data.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="content" v-if="instructors.length > 0">
                    <div :id="`item_${key}`" class="wrapper" v-for="(data, key) in populateInstructors" :key="key" @click="toggleActionHover(key)"
                    @mouseenter="toggleActionHover(key)" @mouseleave="toggleActionLeave(key)">
                        <a class="follow" :href="data.instructor_details.instagram" target="_blank"><img src="/icons/ig-white-icon.svg" /><span>Follow</span></a>
                        <img class="main" :data-src="data.instructor_details.gallery[0].path" :alt="data.instructor_details.images[0].alt" v-if="data.instructor_details.gallery.length > 0" v-lazy-load />
                        <img class="main" data-src="/logo.svg" :alt="data.instructor_details.slug" v-lazy-load v-else />
                        <svg id="stripe" xmlns="http://www.w3.org/2000/svg" width="97.432" height="115.914" viewBox="0 0 97.432 115.914"> <g transform="translate(0.53 0.53)"> <g transform="translate(0 0)"> <line class="border" x1="33.924" y2="34.37" transform="translate(16.619 21.021)" /> <line class="border" x1="58.028" y2="58.028" transform="translate(30.755 13.488)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(70.036 2.329)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(12.008 54.554)" /> <line class="border" x1="59.707" y2="59.684" /> </g> <path class="border" d="M-95.6,47.944-48.945,0" transform="translate(99.627 66.91)" /> <line class="border" x1="11.606" y2="11.606" transform="translate(84.766 22.416)" /> <line class="border" x1="25.059" y2="25.197" transform="translate(2.125 2.775)" /> <line class="border" x1="25.889" y2="25.889" transform="translate(18.703 0.097)" /> <line class="border" x1="29.46" y2="29.46" transform="translate(39.683 11.256)" /> </g> </svg>
                        <div class="overlay">
                            <div class="title">{{ data.instructor_details.nickname }}</div>
                            <div class="action">
                                <nuxt-link rel="canonical" :to="`/instructors/${data.instructor_details.slug}`" class="default_btn_wht mb">See Profile</nuxt-link>
                                <nuxt-link rel="canonical" :to="`/book-a-bike?i=${data.id}`" class="default_btn">Book A Ride</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="action load"></div>
                </div>
                <div class="no_results" v-else>
                    <p class="text">NO RESULTS, PLEASE TRY AGAIN </p>
                </div>
            </section>
        </div>
        <skeleton :page="'default_centered'" :col="{ class: 'four', count: 12 }" :has_banner="false" v-else />
    </transition>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import Skeleton from '../../components/Skeleton'
    export default {
        components: {
            Breadcrumb,
            Skeleton
        },
        data () {
            return {
                res: [],
                loadMore: false,
                loaded: false,
                showLoadedInstructors: false,
                toShow: 8,
                count: 0,
                toggled: false,
                specializations: [
                    {
                        path: '/default/specialization/drill-sergeant.svg',
                        name: 'Drill Sergeant',
                        checked: false
                    },
                    {
                        path: '/default/specialization/speed-freak.svg',
                        name: 'Speed Freak',
                        checked: false
                    },
                    {
                        path: '/default/specialization/uphill-battle.svg',
                        name: 'Uphill Battle',
                        checked: false
                    },
                    {
                        path: '/default/specialization/ohm-licious.svg',
                        name: 'Ohm-Licious',
                        checked: false
                    },
                    {
                        path: '/default/specialization/party-animal.svg',
                        name: 'Party Animal',
                        checked: false
                    },
                    {
                        path: '/default/specialization/coachella-afterparty.svg',
                        name: 'Coachella Afterparty',
                        checked: false
                    },
                ],
                sorts: [
                    {
                        name: 'A-Z',
                        value: 'a-z'
                    },
                    {
                        name: 'Z-A',
                        value: 'z-a'
                    },
                    {
                        name: 'Ride Rev Recommendation',
                        value: 'recommended'
                    },
                    {
                        name: 'New Instructors',
                        value: 'new'
                    },
                ],
                form: {
                    q: '',
                    sort_by: 'recommended'
                },
                instructors: []
            }
        },
        computed: {
            checkSpecialization () {
                const me = this
                let count = 0
                let result = false
                me.specializations.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.specializations.length) {
                    result = true
                } else {
                    result = false
                }
                me.count = count
                return result
            },
            populateInstructors () {
                const me = this
                let result = []
                let count = 0
                for (let i = 0; i < me.toShow; i++) {
                    if (me.instructors[i]) {
                        count++
                        me.instructors[i].checked = true
                        result.push(me.instructors[i])
                    }
                }
                if (count == me.instructors.length) {
                    me.showLoadedInstructors = true
                } else {
                    me.showLoadedInstructors = false
                }
                return result
            }
        },
        methods: {
            loadMoreInstructors () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    if (!me.showLoadedInstructors) {
                        me.toShow += 8
                        me.loadMore = false
                        document.body.classList.remove('no_scroll')
                    }
                    me.loader(false)
                }, 500)
            },
            toggleActionHover (key) {
                const me = this
                let element = document.getElementById(`item_${key}`)
                element.querySelector('.action').style.height = `${element.querySelector('.action').scrollHeight}px`
            },
            toggleActionLeave (key) {
                const me = this
                let element = document.getElementById(`item_${key}`)
                element.querySelector('.action').style.height = `0px`
            },
            toggleAllSpecialization (event) {
                const me = this
                if (me.checkSpecialization) {
                    me.specializations.forEach((data, index) => {
                        data.checked = false
                    })
                } else {
                    me.specializations.forEach((data, index) => {
                        data.checked = true
                    })
                }
            },
            getSpecialization (event, key) {
                const me = this
                if (event.target.checked) {
                    me.count++
                } else {
                    if (me.count != 0) {
                        me.count--
                    }
                }
            },
            outsideSpecialization () {
                const me = this
                me.toggled = false
            },
            toggleSpecialization () {
                const me = this
                me.toggled ^= true
            },
            searchInstructor () {
                const me = this
                let formData = new FormData()
                formData.append('q', me.form.q)
                formData.append('sort_by', me.form.sort_by)
                me.loader(true)
                me.$axios.post(`api/web/instructors/search`, formData).then(res => {
                    if (res.data) {
                        let tempInstructors = []
                        setTimeout( () => {
                            res.data.instructors.forEach((instructor, index) => {
                                instructor.checked = false
                                tempInstructors.push(instructor)
                            })
                            me.instructors = tempInstructors
                        }, 500)
                    }
                }).catch(err => {
                    me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            async initial () {
                const me = this
                let tempInstructors = []
                me.loader(true)
                setTimeout( () => {
                    me.instructors.forEach((instructor, index) => {
                        instructor.checked = false
                        tempInstructors.push(instructor)
                    })
                    me.instructors = tempInstructors
                    me.loaded = true
                    me.loader(false)
                }, 500)
            },
            windowScroll() {
                const me = this
                if (me.loaded) {
                    let elements = [
                        '.action.load'
                    ]

                    /**
                    * Scroll Effect */
                    elements.forEach((element, index) => {
                        let selector = document.querySelector(`${element}`)
                        if (selector) {
                            let bounding = selector.getBoundingClientRect()
                            if (bounding.bottom > 0 &&
                                bounding.right > 0 &&
                                bounding.left < (window.innerWidth || document.documentElement.clientWidth) &&
                                bounding.top < (window.innerHeight || document.documentElement.clientHeight)) {
                                    if (!me.loadMore && !me.showLoadedInstructors) {
                                        document.body.classList.add('no_scroll')
                                        me.loadMoreInstructors()
                                        me.loadMore = true
                                    }
                                }
                            }
                        })
                }
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        beforeMount () {
            window.addEventListener('scroll', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.windowScroll)
        },
        asyncData ({ $axios, params, error, store }) {
            return $axios.get(`api/web/instructors?sort_by=recommended`)
            .then(res => {
                return {
                    res: res.data.pageSetting,
                    instructors: res.data.instructors
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.res.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${host}/logo.svg` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `instructors` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
