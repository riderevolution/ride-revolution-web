<template>
    <div id="instagram">
        <no-ssr v-if="feeds.length > 0">
            <swiper :options="sliderOptions" class="default green">
                <swiper-slide class="slider image_wrapper" v-for="(feed, key) in feeds" :key="key">
                    <a :href="`${feed.mediaLink}`" target="_blank" class="image">
                        <img :src="feed.imageUrl" />
                    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev" v-if="!isMobile"></div>
                <div class="swiper-button-next" slot="button-next" v-if="!isMobile"></div>
            </swiper>
        </no-ssr>
        <div class="no_results alt" v-else>
            <p>No Instagram Feed to Load</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lessOne: {
                type: Boolean,
                default: false
            },
            feeds: {
                default: []
            }
        },
        data () {
            return {
                isMobile: false
            }
        },
        computed: {
            sliderOptions () {
                const me = this

                let loop = false
                let count = 5

                if (!me.isMobile) {
                    if (!me.lessOne) {
                        count = 5
                        if (me.feeds.length > 5) {
                            loop = true
                        } else {
                            loop = false
                        }
                    } else {
                        count = 4
                        if (me.feeds.length > 4) {
                            loop = true
                        } else {
                            loop = false
                        }
                    }
                } else {
                    count = 3
                    if (me.feeds.length > 3) {
                        loop = true
                    } else {
                        loop = false
                    }
                }

                return {
                    slidesPerView: count,
                    spaceBetween: 0,
                    slidesPerGroup: count,
                    loop: loop,
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
                        1280: {
                            slidesPerView: 3,
                            slidesPerGroup: 3
                        },
                        768: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        },
                        450: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            autoHeight: true
                        }
                    }
                }
            },
            shuffle () {
                const me = this
                for (var i = 0; i < me.feeds.length - 1; i++) {
                    var j = i + Math.floor(Math.random() * (me.feeds.length - i))

                    var temp = me.feeds[j]
                    me.feeds[j] = me.feeds[i]
                    me.feeds[i] = temp
                }
                return me.feeds
            }
        },
        methods: {
            onResize() {
                const me = this
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth <= 1280) {
                        me.isMobile = true
                    } else {
                        me.isMobile = false
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.onResize()
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        }
    }
</script>
