<template>
    <div :class="`buy_rides ${hasHash}`">
        <section id="banner" class="mt">
            <img class="full" src="/default/buy-rides/buy-rides-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Buy Rides and Credits</h1>
            </div>
        </section>
        <section id="packages" class="alt">
            <div class="header">
                <h2>
                    Select your class package.
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'packages')" v-if="$parent.$parent.isMobile" />
                </h2>
                <div class="description" v-if="!$parent.$parent.isMobile">
                    <p>For first timers we recommend our trial class and first-timer package. Upon purchase of any package, you will have 30 days to activate it. Expiry will be based on the date of activation and type of package.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$parent.$parent.isMobile && showInfoPackages">
                        <div class="pointer"></div>
                        <p>For first timers we recommend our trial class and first-timer package. Upon purchase of any package, you will have 30 days to activate it. Expiry will be based on the date of activation and type of package.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="package">
                <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/buy-rides/package/${data.slug}`)" rel="canonical" :to="`/buy-rides/package/${data.slug}`" :class="`package_wrapper ${(data.is_promo == 1) ? 'promo' : ''}`" v-for="(data, key) in populatePackages" :key="key">
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
            </div>
        </section>
        <promo />
        <section id="packages" class="container alt">
            <div class="header">
                <h2>
                    Buy Store Credits
                    <img src="/icons/info-booker-icon.svg" @click="togglePopUp($event, 'store-credits')" v-if="$parent.$parent.isMobile" />
                </h2>
                <div class="description" v-if="!$parent.$parent.isMobile">
                    <p>Store credits may be used to purchase class packages, in-studio food and beverages, and Ride Revolution merchandise.</p>
                </div>
                <transition name="slide">
                    <div class="description_overlay" v-if="$parent.$parent.isMobile && showInfoStoreCredits">
                        <div class="pointer"></div>
                        <p>Store credits may be used to purchase class packages, in-studio food and beverages, and Ride Revolution merchandise.</p>
                    </div>
                </transition>
            </div>
            <div class="content" id="storecredits">
                <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/buy-rides/store-credit/${data.slug}`)" rel="canonical" :to="`/buy-rides/store-credit/${data.slug}`" class="package_wrapper" v-for="(data, key) in populateStoreCredits" :key="key">
                    <div class="package_header alt">
                        <h2 class="title">{{ data.name }}</h2>
                    </div>
                    <div class="price">Php {{ totalItems(data.amount) }}</div>
                    <div class="expires">No Expiry</div>
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
            </div>
        </section>
        <section id="digital">
            <img class="full" src="/default/buy-rides/send-digital-bg.jpg" />
            <div class="overlay">
                <h2>Share a ride with your loved ones.</h2>
                <h3>Experience Ride Revolution together!</h3>
                <nuxt-link rel="canonical" to="/buy-rides/digital-gift-card" class="default_btn">Send a Gift Card</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import Promo from '../../components/Promo'
    export default {
        components: {
            Breadcrumb,
            Promo
        },
        data () {
            return {
                res: [],
                toShowPackages: 3,
                toShowStoreCredits: 3,
                showInfoPackages: false,
                showLoadedPackages: false,
                showInfoStoreCredits: false,
                showLoadedStoreCredits: false,
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
            checkIfLoggedIn (event, slug) {
                const me = this
                event.preventDefault()
                if (!me.$store.state.isAuth) {
                    me.$store.state.loginCheckerStatus = true
                    document.body.classList.add('no_scroll')
                } else {
                    me.$router.push(slug)
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
            fetchData () {
                const me = this
                me.loader(true)
                me.packages = me.res.classPackages
                me.credits = me.res.storeCredits
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
