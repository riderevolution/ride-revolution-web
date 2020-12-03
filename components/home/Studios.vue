<template lang="html">
    <section id="studios" v-if="selected_studio">
        <div class="header">
            <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">studios</h2>
            <div class="description">
                <p><strong>Explore our studio locations.</strong></p>
                <nuxt-link rel="canonical" to="/studios" class="default_btn">See All</nuxt-link>
            </div>
        </div>
        <div class="content">
            <div class="studio_content">
                <div class="wrapper">
                    <div class="right">
                        <div class="overlay">
                            <div class="content_select">
                                <div class="input">
                                    <label>Branch: </label>
                                    <div class="select">
                                        <select name="studio_id" @change="getStudio($event)">
                                            <option :value="data.id" v-for="(data, key) in studios" :key="key" v-if="!data.online_class">{{ data.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="content_flex" v-if="!$store.state.isMobile">
                                <h2 class="title">{{ selected_studio.name }}</h2>
                                <div class="description">
                                    <label>Opening Hours</label>
                                    <div class="opening" v-html="selected_studio.opening_hours"></div>
                                </div>
                            </div>
                            <div class="content_flex" v-if="!$store.state.isMobile">
                                <div class="description">
                                    <label>Contact Details</label>
                                    <div class="link">
                                        <img src="/icons/email-icon.svg" />
                                        <a :href="`mailto:${selected_studio.contact_email_address}`" class="email">{{ selected_studio.contact_email_address }}</a>
                                    </div>
                                    <div class="link" v-if="selected_studio.contact_number">
                                        <img src="/icons/phone-icon.svg"/>
                                        <a :href="`tel:${selected_studio.contact_number}`">{{ selected_studio.contact_number }}</a>
                                    </div>
                                    <div class="link" v-if="selected_studio.phone">
                                        <img src="/icons/phone-icon.svg"/>
                                        <a :href="`tel:02-${selected_studio.phone}`">(02) {{ selected_studio.phone }}</a>
                                    </div>
                                </div>
                                <nuxt-link :to="`/studios/${selected_studio.slug}`" class="default_btn">Explore</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="left">
                        <client-only v-if="!$store.state.isMobile">
                            <swiper :options="studioOptions" class="default">
                                <swiper-slide class="studio_slide" v-for="(studio_image, key) in selected_studio.albums[0].images" :key="key">
                                    <img :src="studio_image.path" :alt="studio_image.alt" />
                                    <!-- <div class="overlay">
                                        <h2 class="title">{{ studio_image.title }}</h2>
                                    </div> -->
                                </swiper-slide>
                                <div class="swiper-pagination" slot="pagination"></div>
                                <div class="swiper-button-prev" slot="button-prev" v-if="!$store.state.isMobile"></div>
                                <div class="swiper-button-next" slot="button-next" v-if="!$store.state.isMobile"></div>
                            </swiper>
                        </client-only>
                        <client-only v-else>
                            <swiper :options="mobileStudioOptions" class="default alt3">
                                <swiper-slide class="studio_slide mob" v-for="(studio_image, key) in selected_studio.albums[0].images" :key="key">
                                    <img :src="studio_image.path" :alt="studio_image.alt" />
                                    <!-- <div class="overlay">
                                        <h2 class="title">{{ studio_image.title }}</h2>
                                    </div> -->
                                </swiper-slide>
                                <div class="swiper-pagination" slot="pagination"></div>
                                <div class="swiper-button-prev" slot="button-prev" v-if="!$store.state.isMobile"></div>
                                <div class="swiper-button-next" slot="button-next" v-if="!$store.state.isMobile"></div>
                            </swiper>
                        </client-only>
                        <div class="content_flex" v-if="$store.state.isMobile">
                            <h2 class="title">{{ selected_studio.name }}</h2>
                            <div class="description">
                                <label>Opening Hours</label>
                                <div class="opening" v-html="selected_studio.opening_hours"></div>
                            </div>
                        </div>
                        <div class="content_flex" v-if="$store.state.isMobile">
                            <div class="description">
                                <label>Contact Details</label>
                                <div class="link">
                                    <img src="/icons/email-icon.svg" />
                                    <a :href="`mailto:${selected_studio.contact_email_address}`" class="email">{{ selected_studio.contact_email_address }}</a>
                                </div>
                                <div class="link" v-if="selected_studio.contact_number">
                                    <img src="/icons/phone-icon.svg"/>
                                    <a :href="`tel:${selected_studio.contact_number}`">{{ selected_studio.contact_number }}</a>
                                </div>
                                <div class="link" v-if="selected_studio.phone">
                                    <img src="/icons/phone-icon.svg"/>
                                    <a :href="`tel:02-${selected_studio.phone}`">(02) {{ selected_studio.phone }}</a>
                                </div>
                            </div>
                            <nuxt-link :to="`/studios/${selected_studio.slug}`" class="default_btn">Explore</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            studios: {
                type: Object/Array,
                default: null
            },
            studio: {
                type: Object/Array,
                default: null
            }
        },
        data () {
            return {
                selected_studio: null,
                mobileStudioOptions: {
                    slidesPerView: 2,
                    spaceBetween: 0,
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
                        767: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            spaceBetween: 0,
                            autoHeight: true
                        }
                    }
                },
                studioOptions: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    effect: 'fade',
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        methods: {
            getStudio (event) {
                const me = this
                me.loader(true)
                me.studios.forEach((data, index) => {
                    if (data.id == event.target.value) {
                        setTimeout( () => {
                            me.loader(false)
                            me.selected_studio = data
                        }, 500)
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.selected_studio = me.studio
        }
    }
</script>
