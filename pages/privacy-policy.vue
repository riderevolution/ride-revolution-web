<template>
    <transition name="fade">
        <div class="basic_page" v-if="loaded">
            <breadcrumb :overlay="false" />
            <section id="banner"></section>
            <section id="content">
                <div class="top">
                    <h1>{{ res.title }}</h1>
                </div>
                <div class="bottom" v-html="res.subtitle"></div>
            </section>
        </div>
        <skeleton :page="'default_inner'" :has_col="false" v-else />
    </transition>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import Skeleton from '../components/Skeleton'
    export default {
        components: {
            Breadcrumb,
            Skeleton
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
            return $axios.get(`api/web/basic-page?type=privacy-policy`)
                .then(res => {
                    return {
                        res: res.data.pageSetting
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
                    { hid: 'og:image', property: 'og:image', content: `${host}/logo.svg` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `privacy-policy` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
