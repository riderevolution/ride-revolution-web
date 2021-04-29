<template lang="html">
    <section id="banner" :class="[ (above_the_fold.show_overlay) ? 'no_overlay' : '' ]">
        <h1>Ride Revolution</h1>
        <img class="main_image" :data-src="above_the_fold.banners[0].path" :alt="above_the_fold.banners[0].alt" v-lazy-load />
        <div class="overlay_mobile" v-if="$store.state.isMobile">
            <!-- <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" /> -->
            <template v-if="above_the_fold.show_play_video">
                <div class="overlay_child" v-if="!$store.state.isMobile" @click="toggleVideo()"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>
            </template>
            <p class="nmr" v-html="above_the_fold.subtitle"></p>
            <div class="overlay_flex">
                <nuxt-link :to="above_the_fold.button_link" rel="canonical" class="default_btn">{{ above_the_fold.button_text }}</nuxt-link>
                <template v-if="above_the_fold.show_play_video">
                    <div class="default_btn_wht" @click="toggleVideo()">Play Video</div>
                </template>
            </div>
        </div>
        <div class="overlay_top" v-if="!$store.state.isMobile">
            <!-- <img class="overlay_image" src="default/home/home-banner-mobile.svg" alt="ride-revolution" /> -->
            <template v-if="above_the_fold.show_play_video">
                <div class="overlay_child" v-if="!$store.state.isMobile" @click="toggleVideo()"> <svg id="play_icon" xmlns="http://www.w3.org/2000/svg" width="94" height="93" viewBox="0 0 94 93"> <g transform="translate(-864 -325)"> <g transform="translate(868 329)"> <path class="play" d="M806.695,422.713,787.279,411.3v22.829Z" transform="translate(-752.454 -380.462)" /> <path class="border" d="M819.75,455.351a42.252,42.252,0,1,1-51.864-66.715" transform="translate(-751.456 -379.831)" /> <path class="border" d="M834.187,441.3a42.306,42.306,0,0,1-6.325,9.807" transform="translate(-753.584 -381.298)" /> <path class="border" d="M778.942,382.525a42.283,42.283,0,0,1,56.253,50.6" transform="translate(-752.222 -379.579)" /> </g> <rect class="rect" width="94" height="93" transform="translate(864 325)" /> </g> </svg> <div class="label">Play Video</div> </div>
            </template>
        </div>
        <div class="overlay_bottom" v-if="!$store.state.isMobile">
            <p class="nmr" v-html="above_the_fold.subtitle"></p>
            <nuxt-link :to="above_the_fold.button_link" rel="canonical" class="default_btn" v-if="!$store.state.isMobile">{{ above_the_fold.button_text }}</nuxt-link>
        </div>
        <div class="scroll_mobile" v-if="$store.state.isMobile">
            <img src="/icons/scroll-down.svg" @click="scrollDown()" />
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            above_the_fold: {
                type: Object/Array,
                default: null
            }
        },
        methods: {
            toggleVideo () {
                const me = this
                me.$store.state.videoPrompt = true
                document.body.classList.add('no_scroll')
            },
            scrollDown () {
                const me = this
                me.$scrollTo('#promos', {
                    offset: -65
                })
            }
        }
    }
</script>
