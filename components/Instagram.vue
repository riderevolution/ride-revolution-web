<template>
    <div id="instagram">
        <div :class="`image_wrapper ${(lessOne) ? (isMobile ? 'mobile less_one' : 'less_one') : (isMobile ? 'mobile' : '')}`">
            <a href="javascript:void(0)" class="image" v-for="(n, key) in 5" :key="key" v-if="!lessOne && !isMobile">
                <img :data-src="`/default/lets-ride/sample-ig${key}.jpg`" v-lazy-load />
            </a>
            <a href="javascript:void(0)" class="image" v-for="(n, key) in 4" :key="key" v-if="lessOne && !isMobile">
                <img :data-src="`/default/lets-ride/sample-ig${key}.jpg`" v-lazy-load />
            </a>
            <a href="javascript:void(0)" class="image" v-for="(n, key) in 3" :key="key" v-if="isMobile">
                <img :data-src="`/default/lets-ride/sample-ig${key}.jpg`" v-lazy-load />
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lessOne: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isMobile: false
            }
        },
        methods: {
            onResize() {
                const me = this
                if (document.documentElement && document.documentElement.clientWidth) {
                    if (document.documentElement.clientWidth <= 1280) {
                        me.isMobile = true
                    } else {
                        me.isMobile = false
                    }
                }
            }
        },
        mounted () {
            const me = this
            me.onResize()
        },
        beforeMount () {
            window.addEventListener('load', this.onResize)
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResize)
            window.removeEventListener('load', this.onResize)
        }
    }
</script>
