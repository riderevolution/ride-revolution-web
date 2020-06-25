<template>
    <div :class="`buy_rides ${hasHash}`">
        <section id="packages" class="alt">
            <div class="header">
                <h2>
                    Select your class package.
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'packages')" v-if="$store.state.isMobile" />
                </h2>
                <div class="description" v-if="!$store.state.isMobile">
                    <p>For first timers we recommend our trial class and first-timer package. Upon purchase of any package, you will have 30 days to activate it. Expiry will be based on the date of activation and type of package.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$store.state.isMobile && showInfoPackages">
                        <div class="pointer"></div>
                        <p>For first timers we recommend our trial class and first-timer package. Upon purchase of any package, you will have 30 days to activate it. Expiry will be based on the date of activation and type of package.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="package">
                <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/fish-in-the-glass/buy-rides/package/${data.slug}?token=${$route.query.token}`, data, 'package')" rel="canonical" :to="`/fish-in-the-glass/buy-rides/package/${data.slug}?token=${$route.query.token}`" :class="`package_wrapper ov ${(data.is_promo == 1) ? 'promo' : ''}`" v-for="(data, key) in populatePackages" :key="key">
                    <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                    <div class="package_header">
                        <h2 class="title">{{ data.name }}</h2>
                        <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                    </div>
                    <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                    <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                    <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                    <div class="default_btn_out" v-if="!$store.state.isMobile"><span>Buy Now</span></div>
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
            </div>
        </section>
        <section id="packages" class="container alt">
            <div class="header">
                <h2>
                    Buy Store Credits
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'store-credits')" v-if="$store.state.isMobile" />
                </h2>
                <div class="description" v-if="!$store.state.isMobile">
                    <p>Store credits may be used to purchase class packages, in-studio food and beverages, and Ride Revolution merchandise.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$store.state.isMobile && showInfoStoreCredits">
                        <div class="pointer"></div>
                        <p>Store credits may be used to purchase class packages, in-studio food and beverages, and Ride Revolution merchandise.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="storecredits">
                <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/fish-in-the-glass/buy-rides/store-credit/${data.slug}?token=${$route.query.token}`, data, 'store-credits')" rel="canonical" :to="`/fish-in-the-glass/buy-rides/store-credit/${data.slug}?token=${$route.query.token}`" class="package_wrapper ov" v-for="(data, key) in populateStoreCredits" :key="key">
                    <div class="package_header alt">
                        <h2 class="title">{{ data.name }}</h2>
                    </div>
                    <div class="price">Php {{ totalItems(data.amount) }}</div>
                    <div class="expires">No Expiry</div>
                    <div class="default_btn_out" v-if="!$store.state.isMobile"><span>Buy Now</span></div>
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
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        layout: 'fish',
        data () {
            return {
                res: [],
                toShowPackages: 3,
                toShowStoreCredits: 3,
                showInfoPackages: false,
                showLoadedPackages: false,
                showInfoStoreCredits: false,
                showLoadedStoreCredits: false,
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
                packages: [],
                credits: []
            }
        },
        computed: {
            /**
             * Anchor in div */
            hasHash() {
                let hash = this.$route.hash
                if (hash.length > 0) {
                    setTimeout( () => {
                        this.$scrollTo(`${hash}`, {
                            duration: 1000,
                            offset: -250
                        })
                    }, 100)
                }
            },
            populatePackages () {
                const me = this
                let result = []
                for (let i = 0; i < me.packages.length; i++) {
                    if (me.packages[i]) {
                        result.push(me.packages[i])
                    }
                }
                return result
            },
            populateStoreCredits() {
                const me = this
                let result = []
                for (let i = 0; i < me.credits.length; i++) {
                    if (me.credits[i]) {
                        result.push(me.credits[i])
                    }
                }
                return result
            },
        },
        methods: {
            checkIfLoggedIn (event, slug, data, type) {
                event.preventDefault()
                const me = this
                let token = me.$route.query.token
                if (token == null || token == undefined) {
                    me.$nuxt.error({ statusCode: 403, message: 'Something went Wrong' })
                } else {
                    if (type == 'package') {
                        me.loader(true)
                        let formData = new FormData()
                        formData.append('class_package_id', data.id)
                        me.$axios.post('api/extras/check-package-validity', formData, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            if (res.data) {
                                me.$router.push(slug)
                            }
                        }).catch(err => {
                            document.body.classList.add('no_scroll')
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorPromptStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$router.push(slug)
                    }
                }
            },
            loadMoreContent (type) {
                const me = this
                switch (type) {
                    case 'packages':
                        if (!me.showLoadedPackages) {
                            me.toShowPackages += 3
                            me.$scrollTo('.load', {
                                container: '#package',
                                offset: -250
                            })
                        }
                        break
                    case 'store-credits':
                        if (!me.showLoadedStoreCredits) {
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
                me.packages = me.res.classPackages
                me.credits = me.res.storeCredits
                me.toShowPackages = (me.$store.state.isMobile) ? 3 : (me.packages.length >= 6 ? 6 : me.packages.length)
                me.toShowStoreCredits = (me.$store.state.isMobile) ? 3 : (me.credits.length >= 6 ? 6 : me.credits.length)
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
