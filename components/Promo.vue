<template>
    <section id="promos" @mouseenter="showAllPromos = true" @mouseleave="showAllPromos = false">
        <no-ssr>
            <div @mouseenter="swiperEvent('stop')" @mouseleave="swiperEvent('start')">
                <swiper :options="promoOptions" ref="swiper" class="default" v-if="res.length > 0">
                    <swiper-slide class="promo_slide" v-for="(data, key) in res" :key="key">
                        <img :src="data.banners[0].path" :alt="data.banners[0].alt" />
                        <div class="overlay">
                            <h2 class="header_title">Ride Rev Promo</h2>
                            <h3 class="title" v-line-clamp="3">{{ data.name }}</h3>
                            <div class="description" v-html="data.description"></div>
                            <div class="copy_wrapper" v-if="data.hasCode">
                                <input class="code" :id="`code_${key}`" :value="data.promo_code" />
                                <button type="button" class="default_btn" @click="codeClipboard(data, key)">Copy Code</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev" v-if="!$store.state.isMobile"></div>
                    <div class="swiper-button-next" slot="button-next" v-if="!$store.state.isMobile"></div>
                </swiper>
                <transition name="slideX">
                    <nuxt-link rel="canonical" to="/promos" class="overlay_btn default_btn" v-if="!$store.state.isMobile">See All Promos</nuxt-link>
                </transition>
                <div class="action_mobile" v-if="$store.state.isMobile">
                    <nuxt-link rel="canonical" to="/promos" class="default_btn">See All Promos</nuxt-link>
                </div>
            </div>
        </no-ssr>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                lineClamp: 0,
                showAllPromos: false,
                promoOptions: {
                    slidesPerView: 1,
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
                            slidesPerView: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                res: []
            }
        },
        methods: {
            swiperEvent (type) {
                const me = this
                switch (type) {
                    case 'stop':
                        setTimeout( () =>  {
                            me.$refs.swiper.swiper.autoplay.stop()
                        }, 10)
                        break
                    case 'start':
                        setTimeout( () => {
                            me.$refs.swiper.swiper.autoplay.start()
                        }, 10)
                        break
                }
            },
            codeClipboard (data, key) {
                const me = this
                if (data.hasCode) {
                    let element = document.getElementById(`code_${key}`)
                    element.select()
                    element.setSelectionRange(0, 99999)
                    document.execCommand("copy")
                    element.nextElementSibling.innerHTML = 'Copied!'
                    setTimeout( () => {
                        element.nextElementSibling.innerHTML = 'Copy Code'
                    }, 1000)
                }
            }
        },
        async mounted () {
            const me = this
            await me.$axios.get('api/web/promos?home=1').then(res => {
                if (res.data) {
                    setTimeout( () => {
                        if (me.$store.state.isMobile) {
                            me.lineClamp = 3
                        } else {
                            me.lineClamp = 4
                        }
                        res.data.promos.forEach((promo, index) => {
                            if (promo.promo_code) {
                                promo.hasCode = true
                            } else {
                                promo.hasCode = false
                            }
                            me.res.push(promo)
                        })
                        res.data.promoAnnouncements.forEach((promo, index) => {
                            promo.hasCode = false
                            me.res.push(promo)
                        })
                    }, 500)
                }
            }).catch(err => {
                me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
            })
        }
    }
</script>
