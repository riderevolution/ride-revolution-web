<template>
    <transition name="fade">
        <div class="faqs" v-if="loaded">
            <section id="banner" class="mt">
                <img class="full" src="/default/faqs/faq-banner.jpg" />
                <breadcrumb :overlay="true" />
                <div class="overlay_mid">
                    <h1>Faqs</h1>
                    <h2 class="alt">We’re revolutionizing Manila’s fitness industry.</h2>
                </div>
            </section>
            <section id="content">
                <div class="top">
                    <h3 class="header_title">How do I book a ride?</h3>
                    <div class="icons">
                        <div class="wrapper" v-for="(data, key) in numbers" :key="key">
                            <div v-html="data.path"></div>
                            <div class="title">{{ data.description }}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="faqs_list">
                        <div :id="`faq_item_${key}`" class="wrapper" v-for="(data, key) in faqs" :key="key" @click="toggleFAQ(key)">
                            <div class="title">{{ data.name }} <span class="toggler"></span></div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                     </div>
                </div>
            </section>
            <book-a-bike-banner />
        </div>
    </transition>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import BookABikeBanner from '../../components/BookABikeBanner'
    export default {
        components: {
            Breadcrumb,
            BookABikeBanner
        },
        data () {
            return {
                numbers: [
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="168.025" height="172" viewBox="0 0 168.025 172"> <g transform="translate(-173 -503)"> <path class="stroke_1 stroke" d="M20245.178-18893.389h80.66" transform="translate(-20044 19487.48)" /> <path class="stroke_1 stroke" d="M20245.178-18893.389h92.1" transform="translate(-20047 19499.48)" /> <path class="stroke_1 stroke" d="M20245.178-18893.389h16" transform="translate(-19958 19487.48)" /> <path class="stroke_1 stroke" d="M20255.176-18893.389h11.18" transform="translate(-19952.178 19499.48)" /> <path class="stroke_2 stroke" d="M20245.18-18893.908h107.838" transform="translate(-20047.178 19513)" /> <path class="stroke_2 stroke" d="M20245.178-18893.908h29.848" transform="translate(-19934 19513)" /> <path class="stroke_3 stroke" d="M20245.178-18893.908h96.66" transform="translate(-20042 19467)" /> <path class="stroke_3 stroke" d="M20245.178-18893.908h96.66" transform="translate(-20044 19477)" /> <path class="stroke_3 stroke" d="M20245.178-18893.908h22.211" transform="translate(-19940 19467)" /> <path class="stroke_3 stroke" d="M20245.176-18893.908h19.586" transform="translate(-19942 19477)" /> <text class="stroke_4" transform="translate(173 629)"> <tspan x="0" y="0">1</tspan> </text> </g> </svg>',
                        description: 'Enter your details and create your account.'
                    },
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="181.025" height="172" viewBox="0 0 181.025 172"> <g transform="translate(-160 -503)"> <path class="stroke stroke_1" d="M20245.178-18893.389h80.66" transform="translate(-20044 19487.48)" /> <path class="stroke stroke_1" d="M20245.176-18893.389h98" transform="translate(-20056 19499.48)" /> <path class="stroke stroke_1" d="M20245.178-18893.389h16" transform="translate(-19958 19487.48)" /> <path class="stroke stroke_1" d="M20255.176-18893.389h11.18" transform="translate(-19953.178 19499.48)" /> <path class="stroke stroke_2" d="M20245.18-18893.908h107.838" transform="translate(-20047.178 19513)" /> <path class="stroke stroke_2" d="M20245.178-18893.908h29.848" transform="translate(-19934 19513)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h96.66" transform="translate(-20042 19467)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h96.66" transform="translate(-20044 19477)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h22.211" transform="translate(-19940 19467)" /> <path class="stroke stroke_3" d="M20245.176-18893.908h19.586" transform="translate(-19942 19477)" /> <text class="stroke_4" transform="translate(161 629)"> <tspan x="0" y="0">2</tspan> </text> </g> </svg>',
                        description: 'One credit equals one class. You can buy credits one at a time or in packages.'
                    },
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="179.025" height="172" viewBox="0 0 179.025 172"> <g transform="translate(-162 -502)"> <path class="stroke stroke_1" d="M20245.178-18893.389h80.66" transform="translate(-20044 19487.48)" /> <path class="stroke stroke_1" d="M20245.178-18893.389h92.1" transform="translate(-20047 19499.48)" /> <path class="stroke stroke_1" d="M20245.178-18893.389h16" transform="translate(-19958 19487.48)" /> <path class="stroke stroke_1" d="M20255.176-18893.389h11.18" transform="translate(-19952.178 19499.48)" /> <path class="stroke stroke_2" d="M20245.18-18893.908h107.838" transform="translate(-20047.178 19513)" /> <path class="stroke stroke_2" d="M20245.178-18893.908h29.848" transform="translate(-19934 19513)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h96.66" transform="translate(-20042 19467)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h96.66" transform="translate(-20044 19477)" /> <path class="stroke stroke_3" d="M20245.178-18893.908h22.211" transform="translate(-19940 19467)" /> <path class="stroke stroke_3" d="M20245.176-18893.908h19.586" transform="translate(-19942 19477)" /> <text class="stroke_4" transform="translate(162 628)"> <tspan x="0" y="0">3</tspan> <tspan x="0" y="36"></tspan> </text> </g> </svg>',
                        description: 'Choose your class time and reserve your bike. You can also book bikes for up to 4 friends.'
                    }
                ],
                loaded: false,
                res: [],
                faqs: []
            }
        },
        methods: {
            toggleFAQ (key) {
                const me = this
                let target = document.getElementById(`faq_item_${key}`)
                me.faqs.forEach((element, index) => {
                    let elements = document.getElementById(`faq_item_${index}`)
                    if (key == index) {
                        if (element.toggled) {
                            element.toggled = false
                            elements.classList.remove('toggled')
                            target.querySelector('.description').style.height = `${0}px`
                        } else {
                            element.toggled = true
                            elements.classList.add('toggled')
                            target.querySelector('.description').style.height = `${target.querySelector('.description').scrollHeight}px`
                        }
                    } else {
                        element.toggled = false
                        elements.classList.remove('toggled')
                        elements.querySelector('.description').style.height = `${0}px`
                    }
                })
            },
            async initial () {
                const me = this
                let tempFAQS = []
                me.loader(true)
                setTimeout( () => {
                    me.faqs.forEach((faq, index) => {
                        faq.toggled = false
                        tempFAQS.push(faq)
                    })
                    me.faqs = tempFAQS
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
            return $axios.get(`api/web/faqs`)
            .then(res => {
                return {
                    res: res.data.pageSetting,
                    faqs: res.data.faqs
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
