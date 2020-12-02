<template lang="html">
    <div>
        <section id="reviews" v-if="testimonials.length > 0">
            <div class="header">
                <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">reviews</h2>
                <div class="description">
                    <p><strong>Here’s what our riders have to say...</strong></p>
                </div>
            </div>
            <div class="content">
                <client-only>
                    <swiper :options="testimonialsOptions" class="default alt" v-if="!$store.state.isMobile">
                        <swiper-slide class="review_slide" v-for="(data, key) in testimonials" :key="key">
                            <div class="description" v-html="data.body"></div>
                            <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                            <h2 class="title">{{ data.name }}</h2>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                    <swiper :options="mobileTestimonialsOptions" class="default" v-else>
                        <swiper-slide class="review_slide mobile" v-for="(data, key) in testimonials" :key="key">
                            <div class="description" v-html="data.body"></div>
                            <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                            <h2 class="title">{{ data.name }}</h2>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </client-only>
            </div>
        </section>
        <section id="reviews" v-else><div class="header"></div></section>
    </div>
</template>

<script>
    export default {
        props: {
            testimonials: {
                type: Object/Array,
                default: null
            }
        },
        data () {
            return {
                mobileTestimonialsOptions: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                    loop: true,
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
        computed: {
            testimonialsOptions () {
                const me = this

                let loop = false

                if (me.testimonials.length > 3) {
                    loop = true
                }

                return {
                    slidesPerView: 3,
                    spaceBetween: 60,
                    centeredSlides: true,
                    loop: loop,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        }
    }
</script>
