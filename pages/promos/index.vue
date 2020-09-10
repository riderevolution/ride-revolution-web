<template>
    <transition name="fade">
        <div class="promo_landing" v-if="loaded">
            <banner :res="res" :hasH2="true" />
            <section id="promos" class="alt">
                <div class="promo_list" v-for="(data, key) in populatePromos" :key="key">
                    <h2 class="header_title">Ride Rev Promo</h2>
                    <h3 class="title">{{ data.name }}</h3>
                    <div class="description" v-html="data.description"></div>
                    <div class="copy_wrapper" v-if="data.hasCode">
                        <input class="code" :id="`code_${key}`" :value="data.promo_code" />
                        <button type="button" class="default_btn" @click="codeClipboard(data, key)">Copy Code</button>
                    </div>
                    <a :href="data.link" class="default_btn link" target="_blank" v-if="data.has_link">{{ data.link_label }}</a>
                </div>
                <div class="action">
                    <div v-if="!checkPromos" class="default_btn load" @click="loadMorePromos()">Load More</div>
                </div>
            </section>
        </div>
        <skeleton :page="'default_centered'" :has_col="true" :col="{ class: 'three', count: 3 }" :has_header="false" v-else />
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    import Skeleton from '../../components/Skeleton'
    export default {
        components: {
            Banner,
            Skeleton
        },
        data () {
            return {
                loaded: false,
                toShow: 6,
                res: [],
                promos: [],
                promoAnnouncements: []
            }
        },
        computed: {
            populatePromos () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShow; i++) {
                    if (me.promos[i]) {
                        me.promos[i].checked = true
                        result.push(me.promos[i])
                    }
                }
                return result
            },
            checkPromos () {
                const me = this
                let count = 0
                let result = false
                me.promos.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.promos.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            }
        },
        methods: {
            loadMorePromos () {
                const me = this
                if (!me.checkPromos) {
                    me.toShow += 3
                    me.$scrollTo('.load', {
                        offset: -250
                    })
                }
            },
            codeClipboard (data, key) {
                const me = this
                if (data.hasCode) {
                    let element = document.getElementById(`code_${key}`)
                    element.select()
                    element.setSelectionRange(0, 99999)
                    document.execCommand("copy")
                    element.nextElementSibling.innerHTML = 'Copied!'
                    setTimeout( () => {
                        element.nextElementSibling.innerHTML = 'Copy Code'
                    }, 1000)
                }
            },
            async initial () {
                const me = this
                let tempPromos = []
                me.loader(true)
                setTimeout( () => {
                    me.promos.forEach((promo, index) => {
                        if (promo.promo_code) {
                            promo.hasCode = true
                        } else {
                            promo.hasCode = false
                        }
                        promo.checked = false
                        tempPromos.push(promo)
                    })
                    me.promoAnnouncements.forEach((promo, index) => {
                        promo.hasCode = false
                        promo.checked = false
                        tempPromos.push(promo)
                    })
                    me.promos = tempPromos
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
            return $axios.get(`api/web/promos?enabled=1`)
            .then(res => {
                return {
                    res: res.data.promoPageSetting,
                    promos: res.data.promos,
                    promoAnnouncements: res.data.promoAnnouncements
                }
            }).catch(err => {
                error({ statusCode: 404, message: 'Page not found' })
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
