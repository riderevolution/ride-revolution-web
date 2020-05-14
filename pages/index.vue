<template>
    <transition name="fade">
        <div class="home" v-if="loaded">
            <section id="banner">
                <h1>Ride Revolution</h1>
                <img class="main_image" :src="res.banners[0].path" :alt="res.banners[0].alt" />
                <div class="overlay_top">
                    <img class="overlay_image" src="default/home/stronger-together.svg" alt="ride-revolution" v-if="!$parent.$parent.isMobile" />
                    <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" v-else />
                    <div class="overlay_child" v-if="!$parent.$parent.isMobile"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>
                </div>
                <div class="overlay_bottom">
                    <p>{{ res.subtitle }}</p>
                    <nuxt-link to="/about" rel="canonical" class="default_btn">About Us</nuxt-link>
                    <div class="scroll_mobile" v-if="$parent.$parent.isMobile">
                        <img src="/icons/scroll-down.svg" @click="scrollDown()" />
                    </div>
                </div>
            </section>
            <promo />
            <section id="packages">
                <div class="header">
                    <h2 :class="`image_bg ${($parent.$parent.isMobile) ? 'mobile' : ''}`">packages</h2>
                    <div class="description">
                        <p>Start your revolution here! Purchase a class package so you can get credits to book a class.</p>
                        <nuxt-link class="link" to="/buy-rides" v-if="!$parent.$parent.isMobile"><span>See All Class Packages</span> <div></div><div></div><div></div></nuxt-link>
                    </div>
                </div>
                <div class="content" v-if="!$parent.$parent.isMobile">
                    <nuxt-link :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`" v-for="(data, key) in packages" :key="key">
                        <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                        <div class="package_header">
                            <h2 class="title">{{ data.name }}</h2>
                            <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                        </div>
                        <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                        <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                        <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                        <div class="default_btn_out"><span>Buy Now</span></div>
                    </nuxt-link>
                </div>
                <div class="content" v-else>
                    <no-ssr>
                        <swiper :options="mobileOptions" class="default">
                            <swiper-slide class="slider" v-for="(data, key) in packages" :key="key">
                                <nuxt-link :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`">
                                    <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                                    <div class="package_header">
                                        <h2 class="title">{{ data.name }}</h2>
                                        <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                                    </div>
                                    <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                                    <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                                    <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                                    <div class="default_btn_out"><span>Buy Now</span></div>
                                </nuxt-link>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <div class="action_mobile" v-if="$parent.$parent.isMobile">
                            <nuxt-link rel="canonical" to="/buy-rides" class="default_btn">See All Class Packages</nuxt-link>
                        </div>
                    </no-ssr>
                </div>
            </section>
            <section id="reviews">
                <div class="header">
                    <h2 :class="`image_bg ${($parent.$parent.isMobile) ? 'mobile' : ''}`">reviews</h2>
                    <div class="description">
                        <p><strong>Here’s what our Riders had to say...</strong></p>
                    </div>
                </div>
                <div class="content">
                    <no-ssr>
                        <swiper :options="reviewOptions" class="default alt" v-if="!$parent.$parent.isMobile">
                            <swiper-slide class="review_slide" v-for="(data, key) in reviews" :key="key">
                                <div class="description" v-html="data.description"></div>
                                <img :src="data.path" alt="" />
                                <h2 class="title">{{ data.title }}</h2>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                        <swiper :options="mobileOptions" class="default" v-else>
                            <swiper-slide class="review_slide mobile" v-for="(data, key) in reviews" :key="key">
                                <div class="description" v-html="data.description"></div>
                                <img :src="data.path" alt="" />
                                <h2 class="title">{{ data.title }}</h2>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </no-ssr>
                </div>
            </section>
            <section id="instructors">
                <div class="overlay">
                    <div class="image">
                        <img src="/default/home/instructors-cover.png" alt="ride-revolution-instructor" />
                    </div>
                    <div class="info" v-if="!$parent.$parent.isMobile">
                        <h2 class="title">Ride with the Best.</h2>
                        <div class="description">Our awesome instructors will keep you engaged with their positive energy, choreography, and catchy tunes to push you towards your best self.</div>
                        <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                    </div>
                    <div class="info mobile" v-else>
                        <img src="/default/home/instructor-mobile.svg" />
                        <h2 class="title">Ride with the Best.</h2>
                        <div class="description">Our awesome instructors will keep you engaged with their positive energy, choreography, and catchy tunes to push you towards your best self.</div>
                        <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                    </div>
                </div>
            </section>
            <section id="studios">
                <div class="header">
                    <h2 :class="`image_bg ${($parent.$parent.isMobile) ? 'mobile' : ''}`">studios</h2>
                    <div class="description">
                        <p><strong>Explore our studio locations.</strong></p>
                        <nuxt-link rel="canonical" to="/studios" class="default_btn">See All</nuxt-link>
                    </div>
                </div>
                <div class="content">
                    <div class="studio_content">
                        <div class="wrapper">
                            <div class="right">
                                <div class="overlay">
                                    <div class="content_select">
                                        <div class="input">
                                            <label>Branch: </label>
                                            <div class="select">
                                                <select name="studio_id" @change="getStudio($event)">
                                                    <option :value="data.id" v-for="(data, key) in studios" :key="key">{{ data.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content_flex" v-if="!$parent.$parent.isMobile">
                                        <h2 class="title">{{ studio.name }}</h2>
                                        <div class="description">
                                            <label>Opening Hours</label>
                                            <div class="opening" v-html="studio.opening_hours"></div>
                                        </div>
                                    </div>
                                    <div class="content_flex" v-if="!$parent.$parent.isMobile">
                                        <div class="description">
                                            <label>Contact Details</label>
                                            <div class="link">
                                                <img src="/icons/email-icon.svg" />
                                                <a :href="`mailto:${studio.contact_email_address}`" class="email">{{ studio.contact_email_address }}</a>
                                            </div>
                                            <div class="link" v-if="studio.contact_number">
                                                <img src="/icons/phone-icon.svg"/>
                                                <a :href="`tel:${studio.contact_number}`">{{ studio.contact_number }}</a>
                                            </div>
                                            <div class="link" v-if="studio.phone">
                                                <img src="/icons/phone-icon.svg"/>
                                                <a :href="`tel:02-${studio.phone}`">(02) {{ studio.phone }}</a>
                                            </div>
                                        </div>
                                        <nuxt-link :to="`/studios/${studio.slug}`" class="default_btn">Explore</nuxt-link>
                                    </div>
                                </div>
                            </div>
                            <div class="left">
                                <no-ssr v-if="!$parent.$parent.isMobile">
                                    <swiper :options="studioOptions" class="default">
                                        <swiper-slide class="studio_slide" v-for="(studio_image, key) in studio.albums[0].images" :key="key">
                                            <img :src="studio_image.path" :alt="studio_image.alt" />
                                            <div class="overlay">
                                                <h2 class="title">{{ studio_image.title }}</h2>
                                            </div>
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev" v-if="!$parent.$parent.isMobile"></div>
                                        <div class="swiper-button-next" slot="button-next" v-if="!$parent.$parent.isMobile"></div>
                                    </swiper>
                                </no-ssr>
                                <no-ssr v-else>
                                    <swiper :options="mobileStudioOptions" class="default alt3">
                                        <swiper-slide class="studio_slide mob" v-for="(studio_image, key) in studio.albums[0].images" :key="key">
                                            <img :src="studio_image.path" :alt="studio_image.alt" />
                                            <div class="overlay">
                                                <h2 class="title">{{ studio_image.title }}</h2>
                                            </div>
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev" v-if="!$parent.$parent.isMobile"></div>
                                        <div class="swiper-button-next" slot="button-next" v-if="!$parent.$parent.isMobile"></div>
                                    </swiper>
                                </no-ssr>
                                <div class="content_flex" v-if="$parent.$parent.isMobile">
                                    <h2 class="title">{{ studio.name }}</h2>
                                    <div class="description">
                                        <label>Opening Hours</label>
                                        <div class="opening" v-html="studio.opening_hours"></div>
                                    </div>
                                </div>
                                <div class="content_flex" v-if="$parent.$parent.isMobile">
                                    <div class="description">
                                        <label>Contact Details</label>
                                        <div class="link">
                                            <img src="/icons/email-icon.svg" />
                                            <a :href="`mailto:${studio.contact_email_address}`" class="email">{{ studio.contact_email_address }}</a>
                                        </div>
                                        <div class="link" v-if="studio.contact_number">
                                            <img src="/icons/phone-icon.svg"/>
                                            <a :href="`tel:${studio.contact_number}`">{{ studio.contact_number }}</a>
                                        </div>
                                        <div class="link" v-if="studio.phone">
                                            <img src="/icons/phone-icon.svg"/>
                                            <a :href="`tel:02-${studio.phone}`">(02) {{ studio.phone }}</a>
                                        </div>
                                    </div>
                                    <nuxt-link to="/studios/greenbelt" class="default_btn">Explore</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="lets_ride">
                <div class="header">
                    <h2 :class="`image_bg ${($parent.$parent.isMobile) ? 'mobile' : ''}`">studios</h2>
                    <div class="description">
                        <p>
                            <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
                        </p>
                        <a href="https://www.instagram.com/" target="_blank" class="default_btn">Follow Now</a>
                    </div>
                </div>
                <div class="content">
                    <instagram />
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
    import Instagram from '../components/Instagram'
    import Promo from '../components/Promo'
    export default {
        components: {
            Instagram,
            Promo
        },
        data () {
            return {
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
                studio: [
                    {
                        albums: [
                            {
                                images: [
                                    {
                                        path: '',
                                        alt: ''
                                    }
                                ]
                            }
                        ]
                    }
                ],
                mobileOptions: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
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
                        767: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                mobileStudioOptions: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                    slidesPerGroup: 2,
                    loop: true,
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
                        767: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                studioOptions: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    effect: 'fade',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                reviewOptions: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                packages: [],
                reviews: [
                    {
                        description: '<p>My instructors know my capabilities and push me to my limit every single class.</p>',
                        title: 'Barney Stinson',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I love taking classes with my friends. Being able to track my progress is amazing!”</p>',
                        title: 'Edi Huang',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I’ve posted the same thing 3 times since starting Ride Rev, but I hit a new PR tonight!</p>',
                        title: 'Phil Dunphy',
                        path: '/default/review/sample-review.png'
                    }
                ],
                studios: []
            }
        },
        methods: {
            scrollDown () {
                const me = this
                me.$scrollTo('#promos', {
                    offset: -65
                })
            },
            getStudio (event) {
                const me = this
                me.studios.forEach((data, index) => {
                    if (data.id == event.target.value) {
                        me.studio = data
                    }
                })
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
        asyncData ({ $axios, params, error }) {
            return $axios.get('api/web/home')
                .then(res => {
                    return {
                        res: res.data.home,
                        studio: res.data.studios[0],
                        studios: res.data.studios,
                        packages: res.data.classPackages
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
