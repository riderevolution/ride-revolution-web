<template>
    <transition name="fade">
        <div class="news inner" v-if="loaded">
            <section id="banner" class="mt alt_4">
                <img class="full" :src="res.banners[0].path" :alt="res.banners[0].alt" />
                <breadcrumb :overlay="true" />
                <div class="overlay_mid">
                    <h1>{{ res.name }}</h1>
                    <h2>{{ $moment(res.date_published).format('DD MMM YYYY') }}</h2>
                </div>
            </section>
            <section id="content">
                <div class="left" v-html="res.description"></div>
                <div class="right">
                    <p class="share">Share this article</p>
                    <div class="share_links">
                        <a href="javascript:void(0)" class="fb" @click="sharer('fb')">fb</a>
                        <a href="javascript:void(0)" class="email" @click="shareViaEmail()">email</a>
                    </div>
                </div>
            </section>
            <div v-if="related_news.length > 0">
                <section id="more_things" class="desktop" v-if="!$store.state.isMobile">
                    <h3>More Things to Read...</h3>
                    <nuxt-link :to="`/news/${data.slug}`" class="news_list" v-for="(data, key) in related_news" :key="key">
                        <div class="top">
                            <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                        </div>
                        <div class="bottom">
                            <div class="title">{{ data.name }}</div>
                            <div class="date">{{ $moment(data.date_published).format('MMM DD, YYYY') }}</div>
                            <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                            <div class="link">Read More</div>
                        </div>
                    </nuxt-link>
                    <div class="action">
                        <nuxt-link to="/news" rel="canonical" class="default_btn">See All Articles</nuxt-link>
                    </div>
                </section>
                <section id="more_things" v-else>
                    <h3>More Things to Read...</h3>
                    <no-ssr>
                        <swiper :options="mobileOptions" class="default">
                            <swiper-slide  v-for="(data, key) in related_news" :key="key">
                                <nuxt-link :to="`/news/${data.slug}`" class="news_list">
                                    <div class="top">
                                        <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                                    </div>
                                    <div class="bottom">
                                        <div class="title">{{ data.name }}</div>
                                        <div class="date">{{ $moment(data.date_published).format('MMM DD, YYYY') }}</div>
                                        <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                                        <div class="link">Read More</div>
                                    </div>
                                </nuxt-link>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </no-ssr>
                    <div class="action">
                        <nuxt-link to="/news" rel="canonical" class="default_btn">See All Articles</nuxt-link>
                    </div>
                </section>
            </div>
            <book-a-bike-banner />
            <transition name="fade">
                <share-via-email v-if="$store.state.shareEmailStatus" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import ShareViaEmail from '../../../components/modals/ShareViaEmail'
    import BookABikeBanner from '../../../components/BookABikeBanner'
    export default {
        components: {
            Breadcrumb,
            ShareViaEmail,
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
                res: [
                    {
                        banners: [
                            {
                                path: '',
                                alt: ''
                            }
                        ]
                    }
                ],
                related_news: []
            }
        },
        methods: {
            shareViaEmail () {
                const me = this
                me.$store.state.shareEmailStatus = true
                document.body.classList.add('no_scroll')
            },
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
            return $axios.get(`api/web/news-slug/${params.slug}`)
            .then(res => {
                return {
                    res: res.data.news,
                    related_news: res.data.related_news,
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.name} | Ride Revolution`,
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
