<template>
    <div class="studio_inner">
        <breadcrumb />
        <section id="teaser">
            <div class="main_left">
                <div class="header">
                    <h1>{{ replacer($route.params.slug) }}, Makati</h1>
                    <h2>Unit GD107 North Wing, EDSA cor. Shaw Blvd. Mandaluyong City, Metro Manila, Philippines</h2>
                </div>
                <div class="info">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna<br> aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                </div>
                <div class="opening">
                    <div class="left">
                        <h3>Opening Hours</h3>
                        <p>Monday to Friday: 7AM - 9:30PM</p>
                        <p>Weekends &amp; Holidays: 8AM - 5PM</p>
                    </div>
                    <div class="right">
                        <h3>Contact Details</h3>
                        <div class="link">
                            <img src="/icons/email-icon.svg" />
                            <a href="javascript:void(0)" class="email">shang@riderevolution.com</a>
                        </div>
                        <div class="link">
                            <img class="phone" src="/icons/phone-icon.svg" />
                            <a href="javascript:void(0)">0977 827 7433</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main_right">
                <no-ssr>
                    <GmapMap
                        :center="{lat:14.5529068, lng:121.0206284}"
                        :zoom="15"
                        :options="{
                            zoomControl: true,
                            scaleControl: false,
                            streetViewControl: false,
                            rotateControl: false,
                            fullscreenControl: false,
                            scrollwheel: false
                        }"
                        style="width: 100%; height: 400px"
                    >
                        <GmapMarker
                            :position="{lat:14.5529068, lng:121.0206284}"
                            :clickable="true"
                        >
                        </GmapMarker>
                    </GmapMap>
                </no-ssr>
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
                studioImages: [
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner6.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner5.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner4.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner3.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner2.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner1.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner9.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner8.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner7.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner8.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner7.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner6.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner1.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner2.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner3.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner7.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner6.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner5.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner5.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner4.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner3.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner4.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner3.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner2.jpg',
                                title: 'Sample'
                            },
                        ]
                    },
                    {
                        name: 'Spinning Studio',
                        images: [
                            {
                                path: '/default/studio/inner/studio-inner2.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner3.jpg',
                                title: 'Sample'
                            },
                            {
                                path: '/default/studio/inner/studio-inner4.jpg',
                                title: 'Sample'
                            },
                        ]
                    }
                ]
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
        }
    }
</script>
