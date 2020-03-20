<template>
    <div class="home">
        <section id="banner">
            <h1>Ride Revolution</h1>
            <img class="main_image" src="default/home/home-banner.jpg" alt="ride-revolution" />
            <div class="overlay_top">
                <img class="overlay_image" src="default/home/stronger-together.svg" alt="ride-revolution" v-if="!$parent.$parent.isMobile" />
                <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" v-else />
            </div>
            <div class="overlay_bottom">
                <p>The revolution begins with you. Joir our high intensity, low impact, full body workout on a bike, led by passionate and charismatic instructors.</p>
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
                    <p>Start your revolution! Purchase a class before you book a bike. You have <span class="red">30 days</span> to activate your class package.</p>
                    <nuxt-link class="link" to="/buy-rides" v-if="!$parent.$parent.isMobile"><span>See All Class Packages</span> <div></div><div></div><div></div></nuxt-link>
                </div>
            </div>
            <div class="content" v-if="!$parent.$parent.isMobile">
                <nuxt-link :to="`/buy-rides/package/${convertToSlug(data.title)}`" :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" v-for="(data, key) in packages" :key="key">
                    <div class="ribbon" v-if="data.has_promo">Promo</div>
                    <div class="package_header">
                        <h2 class="title">{{ data.title }}</h2>
                        <div class="description" v-line-clamp="3" v-html="data.description"></div>
                    </div>
                    <div class="discounted_price" v-if="data.has_promo">Php {{ totalItems(data.discounted_price) }}</div>
                    <div class="price">Php {{ totalItems(data.price) }}</div>
                    <div class="expires">{{ data.expire }}</div>
                    <div class="default_btn_out"><span>Buy Now</span></div>
                </nuxt-link>
            </div>
            <div class="content" v-else>
                <no-ssr>
                    <swiper :options="mobileOptions" class="default">
                        <swiper-slide class="slider" v-for="(data, key) in packages" :key="key">
                            <nuxt-link :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" :to="`/buy-rides/package/${convertToSlug(data.title)}`">
                                <div class="ribbon" v-if="data.has_promo">Promo</div>
                                <div class="package_header">
                                    <h2 class="title">{{ data.title }}</h2>
                                    <div class="description" v-line-clamp="3" v-html="data.description"></div>
                                </div>
                                <div class="discounted_price" v-if="data.has_promo">Php {{ totalItems(data.discounted_price) }}</div>
                                <div class="price">Php {{ totalItems(data.price) }}</div>
                                <div class="expires">{{ data.expire }}</div>
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
                    <p><strong>We’ve heard things like…</strong></p>
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
                    <h2 class="title">Train With The Best</h2>
                    <div class="description">We have the most exciting instructors to allow you to lose <br> yourself, let's go and have fun.</div>
                    <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                </div>
                <div class="info mobile" v-else>
                    <img src="/default/home/instructor-mobile.svg" />
                    <h2 class="title">Train With The Best</h2>
                    <div class="description">We have the most exciting instructors to allow you to lose yourself, let's go and have fun.</div>
                    <nuxt-link rel="canonical" to="/instructors" class="default_btn">Meet our Instructors</nuxt-link>
                </div>
            </div>
        </section>
        <section id="studios">
            <div class="header">
                <h2 :class="`image_bg ${($parent.$parent.isMobile) ? 'mobile' : ''}`">studios</h2>
                <div class="description">
                    <p><strong>Explore Our Studios</strong></p>
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
                                        <div class="opening" v-html="studio.opening"></div>
                                    </div>
                                </div>
                                <div class="content_flex" v-if="!$parent.$parent.isMobile">
                                    <div class="description">
                                        <label>Contact Details</label>
                                        <div class="link">
                                            <img src="/icons/email-icon.svg" />
                                            <a href="javascript:void(0)" class="email">{{ studio.mail }}</a>
                                        </div>
                                        <div class="link">
                                            <img src="/icons/phone-icon.svg" />
                                            <a href="javascript:void(0)">{{ studio.contact }}</a>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)" class="default_btn">Explore</a>
                                </div>
                            </div>
                        </div>
                        <div class="left">
                            <no-ssr v-if="!$parent.$parent.isMobile">
                                <swiper :options="studioOptions" class="default">
                                    <swiper-slide class="studio_slide" v-for="(studio, key) in studio.images" :key="key">
                                        <img :src="studio.path" alt="" />
                                        <div class="overlay">
                                            <h2 class="title">{{ studio.title }}</h2>
                                        </div>
                                    </swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                    <div class="swiper-button-prev" slot="button-prev" v-if="!$parent.$parent.isMobile"></div>
                                    <div class="swiper-button-next" slot="button-next" v-if="!$parent.$parent.isMobile"></div>
                                </swiper>
                            </no-ssr>
                            <no-ssr v-else>
                                <swiper :options="mobileStudioOptions" class="default alt3">
                                    <swiper-slide class="studio_slide mob" v-for="(studio, key) in studio.images" :key="key">
                                        <img :src="studio.path" alt="" />
                                        <div class="overlay">
                                            <h2 class="title">{{ studio.title }}</h2>
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
                                    <div class="opening" v-html="studio.opening"></div>
                                </div>
                            </div>
                            <div class="content_flex" v-if="$parent.$parent.isMobile">
                                <div class="description">
                                    <label>Contact Details</label>
                                    <div class="link">
                                        <img src="/icons/email-icon.svg" />
                                        <a href="javascript:void(0)" class="email">{{ studio.mail }}</a>
                                    </div>
                                    <div class="link">
                                        <img src="/icons/phone-icon.svg" />
                                        <a href="javascript:void(0)">{{ studio.contact }}</a>
                                    </div>
                                </div>
                                <a href="javascript:void(0)" class="default_btn">Explore</a>
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
                playVideoHTML: '<div class="overlay_child"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>',
                studio: [],
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
                packages: [
                    {
                        title: 'Trial Class',
                        description: '<p>1 class included<br /> First Timers Only</p>',
                        price: '500',
                        has_promo: false,
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: 'First Timer Package',
                        description: '<p>UNLIMITED RIDES VALID<br /> FOR ONLY 2 WEEKS</p>',
                        price: '1800',
                        has_promo: false,
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: 'Single Class',
                        description: '<p>1 CLASS INCLUDED</p>',
                        price: '5000',
                        has_promo: false,
                        expire: 'Expires in 45 Days'
                    },
                    {
                        title: '10 Class Package',
                        description: '<p>10 CLASSES INCLUDED<br /> + 1 BARE MANILA CLASS</p>',
                        price: '500',
                        has_promo: false,
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: '20 Class Package',
                        description: '<p>20 CLASSES INCLUDED<br /> + 2 BARE MANILA CLASS</p>',
                        discounted_price: '17000',
                        price: '15000',
                        has_promo: true,
                        expire: 'Expires in 6 Months'
                    },
                    {
                        title: 'Monthly Unlimited Class Package',
                        description: '<p>UNLIMITED CLASS RIDES<br /> + 3 BARE MANILA CLASSES AND<br /> FREE FOOD AND DRINKS</p>',
                        discounted_price: '22500',
                        price: '20000',
                        has_promo: true,
                        expire: 'Expires in 1 Year'
                    },
                ],
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
                studios: [
                    {
                        id: 1,
                        name: 'Greenbelt',
                        opening: '<p>Monday to Friday: 7AM - 9:30PM</p><p>Weekends & Holidays: 8AM - 5PM</p>',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        images: [
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio1'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio2'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio3'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio4'
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Shangri-la Plaza',
                        opening: '<p>Monday to Friday: 7AM - 9:30PM</p><p>Weekends & Holidays: 8AM - 5PM</p>',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        images: [
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio1'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio2'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio3'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio4'
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: 'Kenny Sports BGC',
                        opening: '<p>Monday to Friday: 7AM - 9:30PM</p><p>Weekends & Holidays: 8AM - 5PM</p>',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        images: [
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio1'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio2'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio3'
                            },
                            {
                                path: '/default/studio/sample-studio.jpg',
                                title: 'Cycling Studio4'
                            }
                        ]
                    }
                ]
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
            }
        },
        mounted () {
            const me = this
            me.loader(true)
            me.studio = me.studios[0]
            setTimeout( () => {
                me.loader(false)
            }, 500)
        },
        head () {
            return {
                title: 'Home | Ride Revolution',
            }
        }
    }
</script>
