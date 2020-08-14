<template>
    <section id="banner" :class="`${(alt != null) ? `alt_${alt}` : ''}`">
        <img class="full" :src="res.banners[0].path" :alt="res.banners[0].alt" />
        <breadcrumb :overlay="true" />
        <div class="overlay_mid">
            <h1>{{ (res.title) ? res.title : res.name }}</h1>
            <h2 :class="`${(hasH2Class) ? 'alt' : ''}`" v-html="res.subtitle" v-if="res.subtitle && hasH2"></h2>
            <h2 :class="`${(hasH2Class) ? 'alt' : ''}`" v-html="$moment(res.date_published).format('DD MMM YYYY')" v-if="res.date_published && hasH2"></h2>
        </div>
    </section>
</template>

<script>
    import Breadcrumb from './Breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        props: {
            res: {
                default: null
            },
            hasH2: {
                type: Boolean,
                default: false
            },
            hasH2Class: {
                type: Boolean,
                default: true
            },
            alt: {
                default: null
            }
        },
        methods: {
            windowScroll () {
                const me = this
                if (me.$store.state.articleAlertStatus) {
                    if (document.getElementById('article_alert')) {
                        document.getElementById('banner').style.marginTop = `${document.getElementById('article_alert').scrollHeight + document.getElementById('header').scrollHeight}px`
                    }
                } else {
                    document.getElementById('banner').style.marginTop = `${document.getElementById('header').scrollHeight}px`
                }
            }
        },
        mounted () {
            const me = this
            me.windowScroll()
        },
        beforeMount () {
            window.addEventListener('load', this.windowScroll)
            window.addEventListener('scroll', this.windowScroll)
            window.addEventListener('resize', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.windowScroll)
            window.removeEventListener('scroll', this.windowScroll)
            window.removeEventListener('resize', this.windowScroll)
        }
    }
</script>
