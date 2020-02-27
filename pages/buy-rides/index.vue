<template>
    <div class="buy_rides">
        <section id="banner" class="mt">
            <img src="/default/buy-rides/buy-rides-banner.jpg" v-if="!$parent.$parent.isMobile" />
            <img src="/default/buy-rides/buy-rides-banner-mobile.jpg" v-else />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Buy Rides and Credits</h1>
            </div>
        </section>
        <section id="packages" class="alt">
            <div class="header">
                <h2>
                    Choose Your Class Packages
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'packages')" v-if="$parent.$parent.isMobile" />
                </h2>
                <div class="description" v-if="!$parent.$parent.isMobile">
                    <p>You have 30 days to activate your package. Class package expiry will start on the date of activation.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$parent.$parent.isMobile && showInfoPackages">
                        <div class="pointer"></div>
                        <p>You have 30 days to activate your package. Class package expiry will start on the date of activation.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="package">
                <nuxt-link :event="''" @click.native="checkIfLoggedIn($event)" rel="canonical" :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`" v-for="(data, key) in populatePackages" :key="key">
                    <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                    <div class="package_header">
                        <h2 class="title">{{ data.name }}</h2>
                        <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                    </div>
                    <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                    <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                    <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                    <div class="default_btn_out" v-if="!$parent.$parent.isMobile"><span>Buy Now</span></div>
                    <div class="default_btn_wht_alt green" v-else>
                        <div class="text">
                            <div class="border_top left"></div>
                            <div class="border_top left alt"></div>
                            <div class="border_top right"></div>
                            <span>Buy Now</span>
                            <div class="border_bottom left"></div>
                            <div class="border_bottom right"></div>
                        </div>
                    </div>
                </nuxt-link>
                <div class="action">
                    <div v-if="!checkPackages" class="default_btn load" @click="loadMoreContent('packages')">Load More</div>
                </div>
            </div>
        </section>
        <section id="promos" @mouseenter="showAllPromos = true" @mouseleave="showAllPromos = false">
            <no-ssr>
                <div @mouseenter="swiperEvent('stop')" @mouseleave="swiperEvent('start')">
                    <swiper :options="promoOptions" ref="swiper" class="default">
                        <swiper-slide class="promo_slide" v-for="(data, key) in promos" :key="key">
                            <img :src="data.path" alt="" />
                            <div class="overlay">
                                <h2 class="header_title" v-line-clamp="3">Ride Rev Promo</h2>
                                <h3 class="title">{{ data.title }}</h3>
                                <div class="description" v-line-clamp="4" v-html="data.description"></div>
                                <div class="copy_wrapper" v-if="data.hasCode">
                                    <input class="code" :id="`code_${key}`" :value="data.code" />
                                    <button type="button" class="default_btn" @click="codeClipboard(data, key)">Copy Code</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev" v-if="!$parent.$parent.isMobile"></div>
                        <div class="swiper-button-next" slot="button-next" v-if="!$parent.$parent.isMobile"></div>
                    </swiper>
                    <transition name="slideX">
                        <nuxt-link rel="canonical" to="/whats-new" class="overlay_btn default_btn" v-if="showAllPromos && !$parent.$parent.isMobile">See All Promos</nuxt-link>
                    </transition>
                    <div class="action_mobile" v-if="$parent.$parent.isMobile">
                        <nuxt-link rel="canonical" to="/whats-new" class="default_btn">See All Promos</nuxt-link>
                    </div>
                </div>
            </no-ssr>
        </section>
        <section id="packages" class="alt">
            <div class="header">
                <h2>
                    Buy Store Credits
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'store-credits')" v-if="$parent.$parent.isMobile" />
                </h2>
                <div class="description" v-if="!$parent.$parent.isMobile">
                    <p>Use your store credits to purchase class packages and products.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$parent.$parent.isMobile && showInfoStoreCredits">
                        <div class="pointer"></div>
                        <p>Use your store credits to purchase class packages and products.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="store_credits">
                <nuxt-link rel="canonical" :to="`/buy-rides/store-credit/${convertToSlug(data.title)}`" :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" v-for="(data, key) in populateStoreCredits" :key="key">
                    <div class="ribbon" v-if="data.has_promo">Promo</div>
                    <div class="package_header alt">
                        <h2 class="title">{{ data.title }}</h2>
                    </div>
                    <div class="discounted_price" v-if="data.has_promo">Php {{ totalItems(data.discounted_price) }}</div>
                    <div class="price">Php {{ totalItems(data.price) }}</div>
                    <div class="expires">{{ data.expire }}</div>
                    <div class="default_btn_out" v-if="!$parent.$parent.isMobile"><span>Buy Now</span></div>
                    <div class="default_btn_wht_alt green" v-else>
                        <div class="text">
                            <div class="border_top left"></div>
                            <div class="border_top left alt"></div>
                            <div class="border_top right"></div>
                            <span>Buy Now</span>
                            <div class="border_bottom left"></div>
                            <div class="border_bottom right"></div>
                        </div>
                    </div>
                </nuxt-link>
                <div v-if="!checkStoreCredits" class="default_btn load" @click="loadMoreContent('store-credits')">Load More</div>
            </div>
        </section>
        <section id="digital">
            <img src="/default/buy-rides/send-digital-bg.jpg" v-if="!$parent.$parent.isMobile" />
            <img src="/default/buy-rides/buy-rides-banner-mobile.jpg" v-else />
            <div class="overlay">
                <h2>Share this experience with your loved ones!</h2>
                <h3>For anyone who wants to be their best.</h3>
                <nuxt-link rel="canonical" to="/buy-rides/digital-gift-card" class="default_btn">Send a Digital Gift Card</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
                res: [],
                toShowPackages: 3,
                toShowStoreCredits: 3,
                showInfoPackages: false,
                showInfoStoreCredits: false,
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
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        1024: {
                            slidesPerView: 1,
                            autoHeight: true,
                            spaceBetween: 30
                        }
                    }
                },
                promos: [
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
                ],
                packages: [],
                credits: [
                    {
                        title: '500 Store Credits',
                        discounted_price: '500',
                        price: '400',
                        has_promo: true,
                        expire: 'No Expiry',
                        type: 'store-credit',
                        checked: false
                    },
                    {
                        title: '1k Store Credits',
                        price: '1000',
                        has_promo: false,
                        expire: 'No Expiry',
                        type: 'store-credit',
                        checked: false
                    },
                    {
                        title: '5k Store Credits',
                        price: '5000',
                        has_promo: false,
                        expire: 'No Expiry',
                        type: 'store-credit',
                        checked: false
                    }
                ]
            }
        },
        computed: {
            populatePackages () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShowPackages; i++) {
                    if (me.packages[i]) {
                        me.packages[i].checked = true
                        result.push(me.packages[i])
                    }
                }
                return result
            },
            checkPackages () {
                const me = this
                let count = 0
                let result = false
                me.packages.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.packages.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            },
            populateStoreCredits() {
                const me = this
                let result = []
                for (let i = 0; i < me.toShowStoreCredits; i++) {
                    if (me.credits[i]) {
                        me.credits[i].checked = true
                        result.push(me.credits[i])
                    }
                }
                return result
            },
            checkStoreCredits () {
                const me = this
                let count = 0
                let result = false
                me.credits.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.credits.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            }
        },
        methods: {
            checkIfLoggedIn (event) {
                const me = this
                event.preventDefault()
                if (!me.$store.state.isAuth) {
                    me.$store.state.loginCheckerStatus = true
                    document.body.classList.add('no_scroll')
                }
            },
            loadMoreContent (type) {
                const me = this
                switch (type) {
                    case 'packages':
                        if (!me.checkPackages) {
                            me.toShowPackages += 3
                            me.$scrollTo('.load', {
                                container: '#package',
                                offset: -250
                            })
                        }
                        break
                    case 'store-credits':
                        if (!me.checkStoreCredits) {
                            me.toShowStoreCredits += 3
                            me.$scrollTo('.load', {
                                container: '#store_credits',
                                offset: -250
                            })
                        }
                        break
                }
            },
            togglePopUp (event, type) {
                const me = this
                let target = event.target
                let parentWidth = target.parentNode.scrollWidth
                switch (type) {
                    case 'packages':
                        if (target.parentNode.classList.contains('toggled')) {
                            target.parentNode.classList.remove('toggled')
                        } else {
                            target.parentNode.classList.add('toggled')
                            setTimeout( () => {
                                let popUpWidth = target.parentNode.parentNode.querySelector('.description_overlay').scrollWidth
                                target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc((${popUpWidth}px / 2) - (${parentWidth}px / 2))`
                            }, 200)
                        }
                        me.showInfoPackages ^= true
                        break
                    case 'store-credits':
                        if (target.parentNode.classList.contains('toggled')) {
                            target.parentNode.classList.remove('toggled')
                        } else {
                            target.parentNode.classList.add('toggled')
                            setTimeout( () => {
                                let popUpWidth = target.parentNode.parentNode.querySelector('.description_overlay').scrollWidth
                                target.parentNode.parentNode.querySelector('.description_overlay .pointer').style.right = `calc((${popUpWidth}px / 2) - (${parentWidth}px / 2))`
                            }, 200)
                        }
                        me.showInfoStoreCredits ^= true
                        break
                }
            },
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
            },
            fetchData () {
                const me = this
                me.loader(true)
                me.res.classPackages.forEach((element, index) => {
                    element.checked = false
                    me.packages.push(element)
                })
                me.toShowPackages = (me.$parent.$parent.isMobile) ? 3 : (me.packages.length >= 6 ? 6 : me.packages.length)
                me.toShowStoreCredits = (me.$parent.$parent.isMobile) ? 3 : (me.credits.length >= 6 ? 6 : me.credits.length)
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            }
        },
        mounted() {
            const me = this
            setTimeout( () => {
                me.fetchData()
            }, 10)
            if (me.$route.hash != '') {
                me.$scrollTo(`${me.$route.hash}`, {
                    offset: 300
                })
            }
        },
        async asyncData ({ $axios, params, store, error }) {
            return await $axios.get('api/packages/for-buy-rides').then(res => {
                if (res.data) {
                    return { res: res.data }
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            })
        }
    }
</script>
