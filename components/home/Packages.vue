<template lang="html">
    <section id="packages">
        <div class="header">
            <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">packages</h2>
            <div class="description">
                <p>Browse through our class packages and find one that’s fit for you!</p>
                <nuxt-link class="link" to="/buy-rides" v-if="!$store.state.isMobile"><span>See All Class Packages</span> <div></div><div></div><div></div></nuxt-link>
            </div>
        </div>
        <div class="content" v-if="!$store.state.isMobile">
            <nuxt-link :event="''" @click.native="checkIfLoggedIn($event, `/buy-rides/package/${data.slug}`, data, 'package')" :to="`/buy-rides/package/${data.slug}`" :class="[ 'package_wrapper', checkClass(data) ]" v-for="(data, key) in packages" :key="key">
                <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                <div class="ribbon" v-else-if="data.is_promo == 0 && data.online">Online</div>
                <div class="ribbon" v-else-if="data.is_promo == 0 && !data.online">Studio</div>
                <div class="package_header">
                    <h2 class="title">{{ data.name }}</h2>
                    <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                </div>
                <div class="violator" v-if="data.recurring">
                    <span>Subscription</span>
                </div>
                <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                <div class="default_btn_out"><span>Buy Now</span></div>
            </nuxt-link>
        </div>
        <div class="content" v-else>
            <client-only>
                <swiper :options="mobileOptions" class="default">
                    <swiper-slide class="slider" v-for="(data, key) in packages" :key="key">
                        <nuxt-link :to="`/buy-rides/package/${data.slug}`" :class="[ 'package_wrapper', checkClass(data) ]">
                            <div class="ribbon" v-if="data.is_promo == 1">Promo</div>
                            <div class="ribbon" v-else-if="data.is_promo == 0 && data.online">Online</div>
                            <div class="ribbon" v-else-if="data.is_promo == 0 && !data.online">Studio</div>
                            <div class="package_header">
                                <h2 class="title">{{ data.name }}</h2>
                                <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                            </div>
                            <div class="violator" v-if="data.recurring">
                                <span>Subscription</span>
                            </div>
                            <div class="discounted_price" v-if="data.is_promo == 1">Php {{ totalItems(data.package_price) }}</div>
                            <div class="price">Php {{ totalItems((data.is_promo == 1) ? data.discounted_price : data.package_price) }}</div>
                            <div class="expires">Expires in {{ data.expires_in }} {{ data.expiry_type }}{{ (data.expires_in > 1) ? 's' : '' }}</div>
                            <div class="default_btn_out"><span>Buy Now</span></div>
                        </nuxt-link>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="action_mobile" v-if="$store.state.isMobile">
                    <nuxt-link rel="canonical" to="/buy-rides" class="default_btn">See All Class Packages</nuxt-link>
                </div>
            </client-only>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            packages: {
                type: Object/Array,
                default: null
            }
        },
        data () {
            return {
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
                        1280: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                }
            }
        },
        methods: {
            checkClass (data) {
                const me = this
                let result = ''
                if (data.is_promo == 1) {
                    result = 'promo'
                } else {
                    if (data.online) {
                        result = 'alt'
                    } else {
                        result = 'alt_2'
                    }
                }

                return result
            },
            checkIfLoggedIn (event, slug, data, type) {
                const me = this
                event.preventDefault()
                if (!me.$store.state.isAuth) {
                    me.$store.state.loginCheckerStatus = true
                } else {
                    if (type == 'package') {
                        me.loader(true)
                        let token = (me.$route.query.token) ? me.$route.query.token : me.$cookies.get('70hokc3hhhn5')
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
            }
        }
    }
</script>
