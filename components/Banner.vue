<template>
    <section id="banner" :class="`mt ${($store.state.articleAlertStatus) ? 'adjust' : ''}`">
        <img class="full" :src="res.banners[0].path" :alt="res.banners[0].alt" />
        <breadcrumb :overlay="true" />
        <div class="overlay_mid">
            <h1>{{ res.title }}</h1>
            <h2 :class="`${(hasH2Class) ? 'alt' : ''}`" v-html="res.subtitle" v-if="res.subtitle && hasH2"></h2>
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
            }
        }
    }
</script>
