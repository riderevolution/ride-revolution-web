<template>
    <div :class="`gallery_modal ${(opened) ? 'opened' : ''} ${(toggled) ? 'toggled' : ''}`">
        <div :class="`main ${($parent.$parent.$parent.isMobile) ? 'mobile' : ''}`">
            <div class="overlay" v-if="!$parent.$parent.$parent.isMobile">
                <button type="button" class="left_arrow" @click="prev()"></button>
                <div class="main_image" v-for="(data, key) in images" :key="key" v-if="key == activeThumb">
                    <img id="main_image" class="image_responsive" :src="data.path" />
                    <h2 id="main_title" class="image_title">{{ data.title }}</h2>
                </div>
                <button type="button" class="right_arrow" @click="next()"></button>
            </div>
            <div class="overlay mobile" v-else>
                <no-ssr v-if="$parent.$parent.$parent.isMobile">
                    <swiper :options="newsOptions">
                        <div class="swiper-pagination" slot="pagination"></div>
                        <swiper-slide class="slide" v-for="(data, key) in images" :key="key" >
                            <div class="main_image">
                                <img id="main_image" class="image_responsive" :src="data.path" />
                                <h2 id="main_title" class="image_title">{{ data.title }}</h2>
                            </div>
                        </swiper-slide>
                    </swiper>
                </no-ssr>
            </div>
            <div class="controls">
                <button type="button" class="control_toggle" @click="toggler()" v-if="!$parent.$parent.$parent.isMobile"></button>
                <button type="button" class="control_close" @click="close()"></button>
            </div>
        </div>
        <div class="thumb" v-if="!$parent.$parent.$parent.isMobile">
            <div class="wrapper">
                <div :class="`thumb_image ${(key == 0) ? 'active' : ''}`" v-for="(data, key) in images" :key="key">
                    <img :src="data.path" @click="getThumb(key)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            images: {
                type: Array,
                default: function () {
                    return [
                        {
                            path: '/default/studio/inner/studio-inner6.jpg',
                            title: 'Sample'
                        },
                        {
                            path: '/default/studio/inner/studio-inner6.jpg',
                            title: 'Sample'
                        }
                    ]
                }
            }
        },
        data () {
            return {
                activeThumb: 0,
                opened: false,
                toggled: false,
                newsOptions: {
                    autoHeight: true,
                    slidesPerView: 2,
                    spaceBetween: 40,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true
                    },
                    breakpoints: {
                        1024: {
                          slidesPerView: 1,
                          spaceBetween: 20
                        },
                        768: {
                          slidesPerView: 1,
                          spaceBetween: 20
                        },
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 20
                        },
                        320: {
                          slidesPerView: 1,
                          spaceBetween: 0
                        }
                    }
                },
            }
        },
        methods: {
            toggler () {
                this.toggled ^= true
            },
            close () {
                this.opened = false
                this.toggled = false
                document.body.classList.remove('no_scroll')
                setTimeout( () => {
                    this.$parent.showGallery = false
                }, 200)
            },
            removeSlideAnim () {
                setTimeout( () => {
                    let mainParent = document.querySelector('.main .main_image')
                    mainParent.classList.remove('slide_out')
                }, 300)
            },
            next () {
                let me = this
                let thumbs = document.querySelectorAll('.thumb .thumb_image')
                let thumbKey = me.activeThumb + 1
                let length = me.images.length
                if (thumbKey != length) {
                    me.images.forEach((image, key) => {
                        if (thumbKey == key) {
                            me.activeThumb = key
                            thumbs[key].classList.add('active')
                        } else {
                            thumbs[key].classList.remove('active')
                        }
                    })
                } else {
                    me.activeThumb = 0
                    thumbs.forEach((thumb, index) => {
                        if (me.activeThumb == index) {
                            thumb.classList.add('active')
                        } else {
                            thumb.classList.remove('active')
                        }
                    })
                }
            },
            prev () {
                let me = this
                let thumbs = document.querySelectorAll('.thumb .thumb_image')
                let thumbKey = me.activeThumb - 1
                let length = me.images.length
                if (thumbKey < 0) {
                    me.activeThumb = length - 1
                    thumbs.forEach((thumb, index) => {
                        if (me.activeThumb == index) {
                            thumb.classList.add('active')
                        } else {
                            thumb.classList.remove('active')
                        }
                    })
                } else {
                    me.images.forEach((image, key) => {
                        if (thumbKey == key) {
                            me.activeThumb = key
                            thumbs[key].classList.add('active')
                        } else {
                            thumbs[key].classList.remove('active')
                        }
                    })
                }
            },
            getThumb (key) {
                let me = this
                let thumbs = document.querySelectorAll('.thumb .thumb_image')
                let mainParent = document.querySelector('.main .main_image')
                document.querySelector('.main #main_title').innerHTML = me.images[key].title
                document.querySelector('.main #main_image').src = me.images[key].path
                thumbs.forEach((thumb, index) => {
                    if (key == index) {
                        thumb.classList.add('active')
                    } else {
                        thumb.classList.remove('active')
                    }
                })
                this.removeSlideAnim()
            }
        }
    }
</script>
