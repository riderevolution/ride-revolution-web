<template>
    <transition name="fade">
        <div class="faqs" v-if="loaded">
            <banner :res="res" :hasH2="true" />
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
                        <div :id="`faq_item_${key}`" class="wrapper" v-for="(data, key) in faqs" :key="key">
                            <div class="title" @click="toggleFAQ(key)">{{ data.name }} <span class="toggler"></span></div>
                            <div class="description" v-html="data.description"></div>
                        </div>
                     </div>
                </div>
            </section>
            <book-a-bike-banner />
        </div>
        <skeleton :page="'default_centered'" v-else />
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    import BookABikeBanner from '../../components/BookABikeBanner'
    import Skeleton from '../../components/Skeleton'
    export default {
        components: {
            Banner,
            BookABikeBanner,
            Skeleton
        },
        data () {
            return {
                numbers: [
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="161.52" height="85" viewBox="0 0 161.52 85"> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <g id="Group_6164" data-name="Group 6164"> <g id="Path_8268" data-name="Path 8268"> <rect class="stroke_1 stroke" x="21.67" y="45.99" width="80.66" height="1.4" /> </g> <g id="Path_8270" data-name="Path 8270"> <rect class="stroke_1 stroke" x="18.67" y="57.99" width="92.1" height="1.4" /> </g> <g id="Path_8269" data-name="Path 8269"> <rect class="stroke_1 stroke" x="107.67" y="45.99" width="16" height="1.4" /> </g> <g id="Path_8271" data-name="Path 8271"> <rect class="stroke_1 stroke" x="123.49" y="57.99" width="11.18" height="1.4" /> </g> <g id="Path_8272" data-name="Path 8272"> <rect class="stroke_2 stroke" x="18.5" y="70.99" width="107.84" height="1.4" /> </g> <g id="Path_8273" data-name="Path 8273"> <rect class="stroke_2 stroke" x="131.67" y="70.99" width="29.85" height="1.4" /> </g> <g id="Path_8264" data-name="Path 8264"> <rect class="stroke_3 stroke" x="23.67" y="24.99" width="96.66" height="1.4" /> </g> <g id="Path_8266" data-name="Path 8266"> <rect class="stroke_3 stroke" x="21.67" y="34.99" width="96.66" height="1.4" /> </g> <g id="Path_8265" data-name="Path 8265"> <rect class="stroke_3 stroke" x="125.67" y="24.99" width="22.21" height="1.4" /> </g> <g id="Path_8267" data-name="Path 8267"> <rect class="stroke_3 stroke" x="123.67" y="34.99" width="19.59" height="1.4" /> </g> <g id="_1" data-name=" 1" class="stroke_4"> <g class="stroke_4"> <path class="stroke_3" d="M12.45,25.32H1.53A1.65,1.65,0,0,1,.09,23l1.32-8a3.69,3.69,0,0,1,1.2-1.8L20.37,0h11.4c1.08,0,1.68,1.08,1.56,2.28l-10.8,77a2.55,2.55,0,0,1-2.28,2.28H6.57a1.78,1.78,0,0,1-1.68-2.28Z" /> </g> </g> </g> </g> </g> </svg>',
                        description: 'Enter your details and create your account.'
                    },
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="161.52" height="85" viewBox="0 0 161.52 85"> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <g id="Group_6165" data-name="Group 6165"> <g id="Path_8268-2" data-name="Path 8268-2"> <rect class="stroke stroke_1" x="41.27" y="47.19" width="80.66" height="1.4" /> </g> <g id="Path_8270-2" data-name="Path 8270-2"> <rect class="stroke stroke_1" x="29.27" y="59.19" width="98" height="1.4" /> </g> <g id="Path_8269-2" data-name="Path 8269-2"> <rect class="stroke stroke_1" x="127.27" y="47.19" width="16" height="1.4" /> </g> <g id="Path_8271-2" data-name="Path 8271-2"> <rect class="stroke stroke_1" x="142.09" y="59.19" width="11.18" height="1.4" /> </g> <g id="Path_8272-2" data-name="Path 8272-2"> <rect class="stroke stroke_2" x="38.1" y="72.19" width="107.84" height="1.4" /> </g> <g id="Path_8273-2" data-name="Path 8273-2"> <rect class="stroke stroke_2" x="151.27" y="72.19" width="29.85" height="1.4" /> </g> <g id="Path_8264-2" data-name="Path 8264-2"> <rect class="stroke stroke_3" x="43.27" y="26.19" width="96.66" height="1.4" /> </g> <g id="Path_8266-2" data-name="Path 8266-2"> <rect class="stroke stroke_3" x="41.27" y="36.19" width="96.66" height="1.4" /> </g> <g id="Path_8265-2" data-name="Path 8265-2"> <rect class="stroke stroke_3" x="145.27" y="26.19" width="22.21" height="1.4" /> </g> <g id="Path_8267-2" data-name="Path 8267-2"> <rect class="stroke stroke_3" x="143.27" y="36.19" width="19.59" height="1.4" /> </g> <g id="_2" data-name=" 2" class="stroke_4"> <g class="stroke_4"> <path class="stroke_3" d="M0,80.52l.24-2.4L32.17,37.44c5.16-6.6,6.72-10.2,6.72-13.68,0-4.8-3.72-7.2-7.44-7.2-4.8,0-8.64,3.48-10.8,6a1.92,1.92,0,0,1-3,0l-7-7.92a2.31,2.31,0,0,1,.36-3.12S19.57,0,34.33,0C48.49,0,56.89,9,56.89,22.08c0,7-4.44,15.6-10,22.92L30.37,67.44H47.53a1.9,1.9,0,0,1,1.68,2.28l-1.44,10.8a2.67,2.67,0,0,1-2.4,2.28H1.7C.5,82.8-.11,81.72,0,80.52Z" /> </g> </g> </g> </g> </g> </svg>',
                        description: 'One credit equals one class. You can buy credits one at a time or in packages.'
                    },
                    {
                        path: '<svg id="numbering" xmlns="http://www.w3.org/2000/svg" width="161.52" height="85" viewBox="0 0 161.52 85"> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <g id="Group_6166" data-name="Group 6166"> <g id="Path_8268-3" data-name="Path 8268-3"> <rect class="stroke_1 stroke" x="39" y="48.19" width="80.66" height="1.4" /> </g> <g id="Path_8270-3" data-name="Path 8270-3"> <rect class="stroke_1 stroke" x="36" y="60.19" width="92.1" height="1.4" /> </g> <g id="Path_8269-3" data-name="Path 8269-3"> <rect class="stroke_1 stroke" x="125" y="48.19" width="16" height="1.4" /> </g> <g id="Path_8271-3" data-name="Path 8271-3"> <rect class="stroke_1 stroke" x="140.82" y="60.19" width="11.18" height="1.4" /> </g> <g id="Path_8272-3" data-name="Path 8272-3"> <rect class="stroke_2 stroke" x="35.82" y="73.19" width="107.84" height="1.4" /> </g> <g id="Path_8273-3" data-name="Path 8273-3"> <rect class="stroke_2 stroke" x="149" y="73.19" width="29.85" height="1.4" /> </g> <g id="Path_8264-3" data-name="Path 8264-3"> <rect class="stroke_3 stroke" x="41" y="27.19" width="96.66" height="1.4" /> </g> <g id="Path_8266-3" data-name="Path 8266-3"> <rect class="stroke_3 stroke" x="39" y="37.19" width="96.66" height="1.4" /> </g> <g id="Path_8265-3" data-name="Path 8265-3"> <rect class="stroke_3 stroke" x="143" y="27.19" width="22.21" height="1.4" /> </g> <g id="Path_8267-3" data-name="Path 8267-3"> <rect class="stroke_3 stroke" x="140.99" y="37.19" width="19.59" height="1.4" /> </g> <g class="stroke_4"> <g class="stroke_4"> <path class="stroke_3" d="M.9,70.32l7.44-7.08a2,2,0,0,1,2.88,0c.6.6,4.92,4.8,10.08,4.8C28,68,31.86,63.12,31.86,57.36c0-4.68-4-8.64-10.2-8.64h-6A1.9,1.9,0,0,1,14,46.44l1.32-10a2.36,2.36,0,0,1,2.28-2.28H23.7c7.44,0,11.88-4.68,11.88-10.56,0-4.32-2.64-7.68-6.48-7.68-4.68,0-7.44,3-9.12,4.8a1.88,1.88,0,0,1-2.88.12l-6.72-8a2.31,2.31,0,0,1,.48-3.12C13.38,7.32,20.7,0,33.06,0c11.4,0,21.12,8,21.12,19.2s-8.16,19.2-14,22v.36A19.84,19.84,0,0,1,50.58,58.8c0,14-10.2,25.2-28.8,25.2C9.3,84,2.34,76.44.3,73.32A2.41,2.41,0,0,1,.9,70.32Z" /> </g> </g> </g> </g> </g> </svg>',
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
            return $axios.get(`api/web/faqs?forWeb=1`)
            .then(res => {
                return {
                    res: res.data.pageSetting,
                    faqs: res.data.faqs
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
