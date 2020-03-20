<template>
    <section id="promos" @mouseenter="showAllPromos = true" @mouseleave="showAllPromos = false">
        <no-ssr>
            <div @mouseenter="swiperEvent('stop')" @mouseleave="swiperEvent('start')">
                <swiper :options="promoOptions" ref="swiper" class="default">
                    <swiper-slide class="promo_slide" v-for="(data, key) in res" :key="key">
                        <img :src="data.path" alt="" />
                        <div class="overlay">
                            <h2 class="header_title" v-line-clamp="3">Ride Rev Promo</h2>
                            <h3 class="title">{{ data.title }}</h3>
                            <div class="description" v-line-clamp="lineClamp" v-html="data.description"></div>
                            <div class="copy_wrapper" v-if="data.hasCode">
                                <input class="code" :id="`code_${key}`" :value="data.code" />
                                <button type="button" class="default_btn" @click="codeClipboard(data, key)">Copy Code</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev" v-if="!$parent.$parent.$parent.isMobile"></div>
                    <div class="swiper-button-next" slot="button-next" v-if="!$parent.$parent.$parent.isMobile"></div>
                </swiper>
                <transition name="slideX">
                    <nuxt-link rel="canonical" to="/promos" class="overlay_btn default_btn" v-if="!$parent.$parent.$parent.isMobile">See All Promos</nuxt-link>
                </transition>
                <div class="action_mobile" v-if="$parent.$parent.$parent.isMobile">
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
                res: [
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Complete all 20 milestone badges to get an exclusive prize from us!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. tempor incididunt ut labore et dolore incididunt ut labore et',
                        hasCode: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'ASD1231'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'HGJ23A'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Complete all 20 milestone badges to get an exclusive prize from us!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. tempor incididunt ut labore et dolore incididunt ut labore et',
                        hasCode: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'JHSHAI23'
                    }
                ]
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
        mounted () {
            const me = this
            if (me.$parent.$parent.$parent.isMobile) {
                me.lineClamp = 3
            } else {
                me.lineClamp = 4
            }
        }
    }
</script>
