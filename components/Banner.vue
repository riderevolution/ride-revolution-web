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
        mounted () {
            const me = this
        }
    }
</script>
