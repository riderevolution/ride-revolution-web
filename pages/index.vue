<template>
    <div class="home">
        <section id="banner">
            <img class="main_image" src="/home-banner.jpg" alt="ride-revolution" />
            <div class="overlay_top">
                <img class="overlay_image" src="/stronger-together.svg" alt="ride-revolution" />
                <div class="overlay_child">
                    <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93">
                        <g transform="translate(-864 -325)">
                            <g transform="translate(868 329)">
                                <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" />
                                <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" />
                                <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" />
                                <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" />
                            </g>
                            <rect class="rect" width="94" height="93" transform="translate(864 325)" />
                        </g>
                    </svg>
                    <div class="label">Play Video</div>
                </div>
            </div>
            <div class="overlay_bottom">
                <p>The revolution begins with you. Joir our high intensity, low impact, full body workout on a bike, led by passionate and charismatic instructors.</p>
                <a href="javascript:void(0)" class="default_btn">Let's Begin</a>
            </div>
        </section>
        <section id="promos">
            <no-ssr>
                <div @mouseenter="$refs.swiper.swiper.autoplay.stop()" @mouseleave="$refs.swiper.swiper.autoplay.start()">
                    <swiper :options="promoOptions" ref="swiper">
                        <swiper-slide class="promo_slide" v-for="(data, key) in res" :key="key">
                            <img :src="data.path" alt="" />
                            <div class="overlay">
                                <h2 class="header_title">Ride Rev Sale</h2>
                                <h3 class="title">{{ data.title }}</h3>
                                <div class="description" v-line-clamp="4" v-html="data.description"></div>
                                <input :id="`code_${key}`" class="code" :value="data.code" disabled />
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
        <section id="packages">
            <div class="header">
                <img src="/packages.svg" alt="ride-revolution-packages" />
                <div class="description">
                    <p>Start your revolution! Purchase a class before you book a bike. You have <span class="red">30 days</span> to activate your class package.</p>
                    <a class="link" href="javscript:void(0)"><span>See All Class Packages</span> <div></div><div></div><div></div></a>
                </div>
            </div>
            <div class="content">
                <a href="javascript:void(0)" :class="`package_wrapper ${(data.has_promo) ? 'promo' : ''}`" v-for="(data, key) in packages" :key="key">
                    <div class="ribbon" v-if="data.has_promo">Promo</div>
                    <div class="package_header">
                        <h2 class="title">{{ data.title }}</h2>
                        <div class="description" v-line-clamp="3" v-html="data.description"></div>
                    </div>
                    <div class="discounted_price" v-if="data.has_promo">Php {{ totalItems(data.discounted_price) }}</div>
                    <div class="price">Php {{ totalItems(data.price) }}</div>
                    <div class="expires">{{ data.expire }}</div>
                    <div class="default_btn_wht"><span>Buy Now</span></div>
                </a>
            </div>
        </section>
        <section id="reviews">
            <div class="header">
                <img src="/reviews.svg" alt="ride-revolution-reviews" />
                <div class="description">
                    <p><strong>We’ve heard things like…</strong></p>
                </div>
            </div>
            <div class="content">
                <no-ssr>
                    <swiper :options="reviewOptions">
                        <swiper-slide class="review_slide" v-for="(data, key) in reviews" :key="key">
                            <div class="description" v-html="data.description"></div>
                            <img :src="data.path" alt="" />
                            <h2 class="title">{{ data.title }}</h2>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </no-ssr>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
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
                reviewOptions: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                res: [
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
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: 'First Timer Package',
                        description: '<p>UNLIMITED RIDES VALID<br /> FOR ONLY 2 WEEKS</p>',
                        price: '1800',
                        has_promo: false,
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: 'Single Class',
                        description: '<p>1 CLASS INCLUDED</p>',
                        price: '5000',
                        has_promo: false,
                        expire: 'Expires in 45 Days'
                    },
                    {
                        title: '10 Class Package',
                        description: '<p>10 CLASSES INCLUDED<br /> + 1 BARE MANILA CLASS</p>',
                        price: '500',
                        has_promo: false,
                        expire: 'Expires in 30 Days'
                    },
                    {
                        title: '20 Class Package',
                        description: '<p>20 CLASSES INCLUDED<br /> + 2 BARE MANILA CLASS</p>',
                        discounted_price: '17000',
                        price: '15000',
                        has_promo: true,
                        expire: 'Expires in 6 Months'
                    },
                    {
                        title: 'Monthly Unlimited Class Package',
                        description: '<p>UNLIMITED CLASS RIDES<br /> + 3 BARE MANILA CLASSES AND<br /> FREE FOOD AND DRINKS</p>',
                        discounted_price: '22500',
                        price: '20000',
                        has_promo: true,
                        expire: 'Expires in 1 Year'
                    },
                ],
                reviews: [
                    {
                        description: '<p>My instructors know my capabilities and push me to my limit every single class.</p>',
                        title: 'Barney Stinson',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I love taking classes with my friends. Being able to track my progress is amazing!”</p>',
                        title: 'Edi Huang',
                        path: '/default/review/sample-review.png'
                    },
                    {
                        description: '<p>I’ve posted the same thing 3 times since starting Ride Rev, but I hit a new PR tonight!</p>',
                        title: 'Phil Dunphy',
                        path: '/default/review/sample-review.png'
                    }
                ]
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
