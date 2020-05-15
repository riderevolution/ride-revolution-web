<template>
    <transition name="fade">
        <div class="studio_inner" v-if="loaded">
            <breadcrumb />
            <section id="teaser">
                <div class="main_left">
                    <div class="header">
                        <h1>{{ res.name }}, {{ res.city }}</h1>
                        <h2>{{ res.address }}, {{ res.city }}, {{ res.state }}, {{ res.country }}</h2>
                    </div>
                    <div class="info" v-html="res.description"></div>
                    <div class="opening">
                        <div class="left">
                            <h3>Opening Hours</h3>
                            <div v-html="res.opening_hours"></div>
                        </div>
                        <div class="right">
                            <h3>Contact Details</h3>
                            <div class="link">
                                <img src="/icons/email-icon.svg" />
                                <a :href="`mailto:${res.contact_email_address}`" class="email">{{ res.contact_email_address }}</a>
                            </div>
                            <div class="link" v-if="res.contact_number">
                                <img src="/icons/phone-icon-alt.svg" />
                                <a :href="`tel:${res.contact_number}`">{{ res.contact_number }}</a>
                            </div>
                            <div class="link" v-if="res.phone">
                                <img src="/icons/phone-icon-alt.svg" />
                                <a :href="`tel:02-${res.phone}`">(02) {{ res.phone }}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_right">
                    <div class="map" v-html="res.google_embed"></div>
                </div>
            </section>
            <section id="images" class="desktop" v-if="!$parent.$parent.isMobile">
                <div :id="`studio_${key}`" class="wrapper" v-for="(data, key) in studioImages" :key="key" @click="openGallery(key)">
                    <div class="field_image">
                        <img class="image_responsive" :src="data.images[0].path" />
                        <h2 class="overlay">
                            {{ data.name }}
                        </h2>
                    </div>
                </div>
            </section>
            <section id="images" v-else>
                <no-ssr>
                    <swiper :options="mobileOptions" class="default">
                        <swiper-slide :id="`studio_${key}`" class="wrapper" v-for="(data, key) in studioImages" :key="key" @click.native="openGallery(key)">
                            <div class="field_image">
                                <img class="image_responsive" :src="data.images[0].path" />
                                <h2 class="overlay">
                                    {{ data.name }}
                                </h2>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </no-ssr>
            </section>
            <section id="banner" class="alt">
                <img class="full" src="/default/studio/inner/book-a-ride.jpg" />
                <div class="overlay_mid">
                    <h2>See all this up close!</h2>
                    <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
                </div>
            </section>
            <transition name="fade">
                <gallery ref="gallery" :images="imagesToSend" v-if="showGallery" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import Gallery from '../../../components/modals/Gallery'
    export default {
        components: {
            Breadcrumb,
            Gallery
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
                showGallery: false,
                imagesToSend: null,
                loaded: false,
                res: [],
                studioImages: []
            }
        },
        methods: {
            openGallery(key) {
                const me = this
                // me.imagesToSend = me.parser(me.studioImages[key].images)
                me.imagesToSend = me.studioImages[key].images
                me.showGallery = true
                setTimeout( () => {
                    me.$refs.gallery.opened = true
                }, 200)
                document.body.classList.add('no_scroll')
            }
        },
        async mounted () {
            const me = this
            document.body.classList.add('no_click')
            if (me.$store.state.isLoading) {
                setTimeout( () => {
                    document.body.classList.remove('no_click')
                    me.$store.state.isLoading = false
                    document.querySelector('#teaser .main_right .map iframe').style.height = `${document.querySelector('#teaser .main_left').scrollHeight}px`
                }, 500)
            }
        },
        asyncData ({ $axios, params, error, store }) {
            return $axios.get(`api/web/studio-slug/${params.slug}`)
                .then(res => {
                    store.state.isLoading = true
                    return {
                        res: res.data.studio,
                        studioImages: res.data.studio.albums,
                        loaded: true
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
                    { hid: 'og:image', property: 'og:image', content: `${me.res.images[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.images[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
