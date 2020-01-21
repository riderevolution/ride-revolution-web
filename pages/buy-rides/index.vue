<template>
    <div class="buy_rides">
        <section id="banner">
            <img src="/default/buy-rides/buy-rides.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Class Packages and Credits</h1>
            </div>
        </section>
        <section id="packages" class="alt">
            <div class="header">
                <h2>Choose Your Class Packages</h2>
                <div class="description">
                    <p>You have 30 days to activate your package. Class package expiry will start on the date of activation.</p>
                </div>
            </div>
            <div class="content">
                <nuxt-link :to="data.link" :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" v-for="(data, key) in packages" :key="key">
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
        </section>
        <section id="promos">
            <no-ssr>
                <div @mouseenter="$refs.swiper.swiper.autoplay.stop()" @mouseleave="$refs.swiper.swiper.autoplay.start()">
                    <swiper :options="promoOptions" ref="swiper" class="default">
                        <swiper-slide class="promo_slide" v-for="(data, key) in promos" :key="key">
                            <img :src="data.path" alt="" />
                            <div class="overlay">
                                <h2 class="header_title">Ride Rev Sale</h2>
                                <h3 class="title">{{ data.title }}</h3>
                                <div class="description" v-line-clamp="4" v-html="data.description"></div>
                                <input :id="`code_${key}`" class="code" :value="data.code" />
                                <button type="button" class="default_btn" @click="codeClipboard(key)">Copy Code</button>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
            </no-ssr>
        </section>
        <section id="packages" class="alt">
            <div class="header">
                <h2>Buy Store Credits</h2>
                <div class="description">
                    <p>Use your store credits to purchase class packages and products.</p>
                </div>
            </div>
            <div class="content">
                <a href="javascript:void(0)" :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" v-for="(data, key) in credits" :key="key">
                    <div class="ribbon" v-if="data.has_promo">Promo</div>
                    <div class="package_header alt">
                        <h2 class="title">{{ data.title }}</h2>
                    </div>
                    <div class="discounted_price" v-if="data.has_promo">Php {{ totalItems(data.discounted_price) }}</div>
                    <div class="price">Php {{ totalItems(data.price) }}</div>
                    <div class="expires">{{ data.expire }}</div>
                    <div class="default_btn_out"><span>Buy Now</span></div>
                </a>
            </div>
        </section>
        <section id="digital">
            <img src="/default/buy-rides/send-digital-bg.jpg" />
            <div class="overlay">
                <h2>Share this experience with your loved ones!</h2>
                <h3>For anyone who wants to be their best.</h3>
                <a href="javascript:void(0)" class="default_btn">Send a Digital Gift Card</a>
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
                promoOptions: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    effect: 'fade',
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
                    }
                },
                promos: [
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        code: 'JHSHAI23'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        code: 'ASD1231'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        code: 'HGJ23A'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        code: 'JHSHAI23'
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        code: 'JHSHAI23'
                    }
                ],
                packages: [
                    {
                        title: 'Trial Class',
                        description: '<p>1 class included<br /> First Timers Only</p>',
                        price: '500',
                        has_promo: false,
                        expire: 'Expires in 30 Days',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                    {
                        title: 'First Timer Package',
                        description: '<p>UNLIMITED RIDES VALID<br /> FOR ONLY 2 WEEKS</p>',
                        price: '1800',
                        has_promo: false,
                        expire: 'Expires in 30 Days',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                    {
                        title: 'Single Class',
                        description: '<p>1 CLASS INCLUDED</p>',
                        price: '5000',
                        has_promo: false,
                        expire: 'Expires in 45 Days',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                    {
                        title: '10 Class Package',
                        description: '<p>10 CLASSES INCLUDED<br /> + 1 BARE MANILA CLASS</p>',
                        price: '500',
                        has_promo: false,
                        expire: 'Expires in 30 Days',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                    {
                        title: '20 Class Package',
                        description: '<p>20 CLASSES INCLUDED<br /> + 2 BARE MANILA CLASS</p>',
                        discounted_price: '17000',
                        price: '15000',
                        has_promo: true,
                        expire: 'Expires in 6 Months',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                    {
                        title: 'Monthly Unlimited Class Package',
                        description: '<p>UNLIMITED CLASS RIDES<br /> + 3 BARE MANILA CLASSES AND<br /> FREE FOOD AND DRINKS</p>',
                        discounted_price: '22500',
                        price: '20000',
                        has_promo: true,
                        expire: 'Expires in 1 Year',
                        type: 'package',
                        link: '/buy-rides/sample'
                    },
                ],
                credits: [
                    {
                        title: '500 Store Credits',
                        discounted_price: '500',
                        price: '400',
                        has_promo: true,
                        expire: 'No Expiry',
                        type: 'store-credit'
                    },
                    {
                        title: '1k Store Credits',
                        price: '1000',
                        has_promo: false,
                        expire: 'No Expiry',
                        type: 'store-credit'
                    },
                    {
                        title: '5k Store Credits',
                        price: '5000',
                        has_promo: false,
                        expire: 'No Expiry',
                        type: 'store-credit'
                    }
                ],
            }
        },
        methods: {
            codeClipboard (key) {
                const me = this
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
    }
</script>
