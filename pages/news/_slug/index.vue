<template>
    <div class="news inner">
        <section id="banner" class="mt alt_4">
            <img src="/default/news/news-inner-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>{{ replacer($route.params.slug) }}</h1>
                <h2>{{ $moment().format('DD MMM YYYY') }}</h2>
            </div>
        </section>
        <section id="content">
            <div class="left">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <br>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <br>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="right">
                <p class="share">Share this article</p>
                <div class="share_links">
                    <a href="javascript:void(0)" class="fb" @click="sharer('fb')">fb</a>
                    <a href="javascript:void(0)" class="email" @click="shareViaEmail()">email</a>
                </div>
            </div>
        </section>
        <section id="more_things" class="desktop" v-if="!$parent.$parent.isMobile">
            <h3>More Things to Read...</h3>
            <nuxt-link :to="`/news/${convertToSlug(data.title)}`" class="news_list" v-for="(data, key) in news" :key="key">
                <div class="top">
                    <img :src="data.path" alt="asdasdasd" />
                </div>
                <div class="bottom">
                    <h3 class="title">{{ data.title }}</h3>
                    <div class="date">{{ $moment().format('MMM DD, YYYY') }}</div>
                    <div class="description" v-line-clamp="3" v-html="data.description"></div>
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
                    <swiper-slide  v-for="(data, key) in news" :key="key">
                        <nuxt-link :to="`/news/${convertToSlug(data.title)}`" class="news_list">
                            <div class="top">
                                <img :src="data.path" alt="asdasdasd" />
                            </div>
                            <div class="bottom">
                                <div class="title">{{ data.title }}</div>
                                <div class="date">{{ $moment().format('MMM DD, YYYY') }}</div>
                                <div class="description" v-line-clamp="3" v-html="data.description"></div>
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
        <section id="banner" class="mt alt">
            <img class="full" src="/default/studio/book-a-ride.jpg" />
            <div class="overlay_mid">
                <h2>Begin your fitness journey with us.</h2>
                <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
        <transition name="fade">
            <share-via-email v-if="$store.state.shareEmailStatus" />
        </transition>
    </div>
</template>

<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    import ShareViaEmail from '../../../components/modals/ShareViaEmail'
    export default {
        components: {
            Breadcrumb,
            ShareViaEmail
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
                news: [
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.'
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.'
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.'
                    }
                ]
            }
        },
        methods: {
            shareViaEmail () {
                const me = this
                me.$store.state.shareEmailStatus = true
                document.body.classList.add('no_scroll')
            }
        }
    }
</script>
