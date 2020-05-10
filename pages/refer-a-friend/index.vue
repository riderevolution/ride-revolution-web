<template>
    <transition name="fade">
        <div class="refer_a_friend" v-if="loaded">
            <section id="banner" class="mt">
                <img class="full" :src="res.banners[0].path" :alt="res.banners[0].alt" />
                <breadcrumb :overlay="true" />
                <div class="overlay_mid">
                    <h1>{{ res.title }}</h1>
                </div>
            </section>
            <referral :subtitle="res.subtitle" />
        </div>
    </transition>
</template>

<script>
    import Referral from '../../components/Referral'
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        components: {
            Referral,
            Breadcrumb
        },
        data () {
            return {
                res: [],
                loaded: false
            }
        },
        methods: {
            async initial () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.loaded = true
                    me.loader(false)
                }, 500)
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        asyncData ({ $axios, params, error, store }) {
            return $axios.get(`api/page-settings/refer-a-friend`)
                .then(res => {
                    return {
                        res: res.data.pageSettings
                    }
                }).catch(err => {
                    error({ statusCode: 403, message: 'Page not found' })
                })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.res.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.res.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.res.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.res.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.res.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.res.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
