<template>
    <div class="news inner">
        <section id="banner" class="mt alt_4">
            <img class="full" src="/default/news/news-inner-banner.jpg" />
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
            <section id="more_things" class="desktop" v-if="!$parent.$parent.isMobile">
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
        <section id="banner" class="mt alt">
            <img class="full" src="/default/news/book-a-bike.jpg" />
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
                res: [],
                related_news: []
            }
        },
        methods: {
            shareViaEmail () {
                const me = this
                me.$store.state.shareEmailStatus = true
                document.body.classList.add('no_scroll')
            }
        },
        async mounted () {
            const me = this
            me.loader(true)
            await me.$axios.get(`api/web/news-slug/${me.$route.params.slug}`).then(res => {
                if (res.data) {
                    setTimeout( () => {
                        me.res = res.data.news
                        me.related_news = res.data.related_news
                    }, 500)
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
