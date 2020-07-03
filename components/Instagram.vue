<template>
    <div id="instagram">
        <div :class="`image_wrapper ${(lessOne) ? (isMobile ? 'mobile less_one' : 'less_one') : (isMobile ? 'mobile' : '')}`" v-if="feeds != null">
            <a :href="`https://www.instagram.com/p/${feed.node.shortcode}/`" target="_blank" class="image" v-for="(feed, key) in shuffle" :key="key" v-if="!lessOne && !isMobile && (key + 1) <= 5">
                <img :data-src="feed.node.display_url" v-lazy-load />
            </a>
            <a :href="`https://www.instagram.com/p/${feed.node.shortcode}/`" target="_blank" class="image" v-for="(feed, key) in shuffle" :key="key" v-if="lessOne && !isMobile && (key + 1) <= 4">
                <img :data-src="feed.node.display_url" v-lazy-load />
            </a>
            <a :href="`https://www.instagram.com/p/${feed.node.shortcode}/`" target="_blank" class="image" v-for="(feed, key) in shuffle" :key="key" v-if="isMobile && (key + 1) <= 3">
                <img :data-src="feed.node.display_url" v-lazy-load />
            </a>
        </div>
        <div class="no_results alt" v-else>
            <p>No Instagram Feed to Load</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lessOne: {
                type: Boolean,
                default: false
            },
            feeds: {
                default: null
            }
        },
        data () {
            return {
                isMobile: false
            }
        },
        computed: {
            shuffle () {
                const me = this
                for (var i = 0; i < me.feeds.length - 1; i++) {
                    var j = i + Math.floor(Math.random() * (me.feeds.length - i))

                    var temp = me.feeds[j]
                    me.feeds[j] = me.feeds[i]
                    me.feeds[i] = temp
                }
                return me.feeds
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
