<template>
    <transition name="fade">
        <div class="studios" v-if="loaded">
            <banner :res="res" />
            <section id="teaser" v-html="res.subtitle" v-if="res.subtitle"></section>
            <section id="visit">
                <h2>Check out our Studios</h2>
                <div class="content desktop" v-if="!$store.state.isMobile">
                    <nuxt-link rel="canonical" :to="`/studios/${data.slug}`" class="wrapper" v-for="(data, key) in studios" :key="key">
                        <div class="image">
                            <img :src="data.images[0].path" />
                            <svg id="stripe" xmlns="http://www.w3.org/2000/svg" width="97.432" height="115.914" viewBox="0 0 97.432 115.914"> <g transform="translate(0.53 0.53)"> <g transform="translate(0 0)"> <line class="border" x1="33.924" y2="34.37" transform="translate(16.619 21.021)" /> <line class="border" x1="58.028" y2="58.028" transform="translate(30.755 13.488)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(70.036 2.329)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(12.008 54.554)" /> <line class="border" x1="59.707" y2="59.684" /> </g> <path class="border" d="M-95.6,47.944-48.945,0" transform="translate(99.627 66.91)" /> <line class="border" x1="11.606" y2="11.606" transform="translate(84.766 22.416)" /> <line class="border" x1="25.059" y2="25.197" transform="translate(2.125 2.775)" /> <line class="border" x1="25.889" y2="25.889" transform="translate(18.703 0.097)" /> <line class="border" x1="29.46" y2="29.46" transform="translate(39.683 11.256)" /> </g> </svg>
                            <div class="overlay">
                                <div class="default_btn">Explore</div>
                            </div>
                        </div>
                        <h2>{{ data.name }}, {{ data.city }}</h2>
                    </nuxt-link>
                </div>
                <div class="content" v-else>
                    <no-ssr>
                        <swiper :options="mobileOptions" class="default">
                            <swiper-slide class="wrapper" v-for="(data, key) in studios" :key="key">
                                <nuxt-link rel="canonical" :to="`/studios/${data.slug}`">
                                    <div class="image">
                                        <img :src="data.images[0].path" />
                                        <svg id="stripe" xmlns="http://www.w3.org/2000/svg" width="97.432" height="115.914" viewBox="0 0 97.432 115.914"> <g transform="translate(0.53 0.53)"> <g transform="translate(0 0)"> <line class="border" x1="33.924" y2="34.37" transform="translate(16.619 21.021)" /> <line class="border" x1="58.028" y2="58.028" transform="translate(30.755 13.488)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(70.036 2.329)" /> <line class="border" x1="18.747" y2="18.747" transform="translate(12.008 54.554)" /> <line class="border" x1="59.707" y2="59.684" /> </g> <path class="border" d="M-95.6,47.944-48.945,0" transform="translate(99.627 66.91)" /> <line class="border" x1="11.606" y2="11.606" transform="translate(84.766 22.416)" /> <line class="border" x1="25.059" y2="25.197" transform="translate(2.125 2.775)" /> <line class="border" x1="25.889" y2="25.889" transform="translate(18.703 0.097)" /> <line class="border" x1="29.46" y2="29.46" transform="translate(39.683 11.256)" /> </g> </svg>
                                        <div class="overlay">
                                            <div class="default_btn">Explore</div>
                                        </div>
                                    </div>
                                    <h2>{{ data.name }}, {{ data.city }}</h2>
                                </nuxt-link>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <!-- <div class="action_mobile" v-if="$store.state.isMobile">
                            <nuxt-link rel="canonical" to="/buy-rides" class="default_btn">See All Class Packages</nuxt-link>
                        </div> -->
                    </no-ssr>
                </div>
            </section>
            <instagram-alternate />
            <book-a-bike-banner />
        </div>
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    import InstagramAlternate from '../../components/InstagramAlternate'
    import BookABikeBanner from '../../components/BookABikeBanner'
    export default {
        components: {
            Banner,
            InstagramAlternate,
            BookABikeBanner
        },
        data () {
            return {
                mobileOptions: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        450: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        }
                    }
                },
                loaded: false,
                studios: [],
                res: []
            }
        },
        methods: {
            async initial () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.loaded = true
                    me.loader(false)
                }, 500)
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        asyncData ({ $axios, params, error, store }) {
            return $axios.get(`api/web/studios`)
                .then(res => {
                    store.state.isLoading = true
                    return {
                        res: res.data.pageSetting,
                        studios: res.data.studios
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
                    { hid: 'og:image', property: 'og:image', content: `${me.res.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
