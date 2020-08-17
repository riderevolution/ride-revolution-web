<template>
    <transition name="fade">
        <div class="contact_us" v-if="loaded">
            <banner :res="res" :hasH2="true" />
            <section id="content">
                <div class="top">
                    <form id="default_form" @submit.prevent="submissionSuccess()">
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="first_name">First Name <span>*</span></label>
                                <input type="text" name="first_name" autocomplete="off" v-model="form.first_name" class="input_text" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ properFormat(errors.first('first_name')) }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="last_name">Last Name <span>*</span></label>
                                <input type="text" name="last_name" autocomplete="off" v-model="form.last_name" class="input_text" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ properFormat(errors.first('last_name')) }}</span></transition>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" name="email" class="input_text" v-model="form.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ properFormat(errors.first('email')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="message">Message <span>*</span></label>
                            <textarea name="message" class="input_text" rows="5" maxlength="1000" v-model="form.message" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$', max: 1000}"></textarea>
                            <div class="limit_wrapper">
                                <div class="limit"><span class="count">{{ count }}</span> characters left</div>
                                <svg class="progress" width="30" height="30"> <circle class="inner_ring" :r="normalizedRadius" cx="15" cy="15"/> <circle class="outer_ring" :stroke-dasharray="`${circumference} ${circumference}`" :stroke-dashoffset="dashOffset" :r="normalizedRadius" cx="15" cy="15"/> </svg>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('message')">{{ properFormat(errors.first('message')) }}</span></transition>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="i_agree" name="i_agree" class="input_check" :checked="form.i_agree == 1" v-validate="'required'">
                                <label for="i_agree" class="alt">I acknowledge and fully understand the terms and conditions stated above and that all information stated above are true.</label>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('i_agree')">{{ properFormat(errors.first('i_agree')) }}</span></transition>
                            </div>
                        </div>
                        <div class="form_flex captcha">
                            <vue-recaptcha class="captcha" sitekey="6Ld4_doUAAAAACiRAQf1JQlro_fxvTSZxgxi5jxk"></vue-recaptcha>
                            <div class="form_button">
                                <button type="submit" class="default_btn">Send</button>
                            </div>
                        </div>
                    </form>
                    <div class="right">
                        <div class="inquiry_list">
                            <div class="wrapper" v-for="(data, key) in inquiries" :key="key">
                                <div class="title">{{ data.title }}</div>
                                <div class="link">
                                    <img src="/icons/email-icon.svg" />
                                    <a :href="`mailto:${data.email}`" class="email">{{ data.mail }}</a>
                                </div>
                                <div class="link">
                                    <img src="/icons/phone-icon.svg" />
                                    <a :href="`tel:${data.contact}`">{{ data.contact }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="connect">
                            <p class="connect_title">Connect With Us</p>
                            <div class="connect_links">
                                <a href="https://www.facebook.com/riderevolutionph" target="_blank" class="fb">fb</a>
                                <a href="https://www.instagram.com/riderevolution" target="_blank" class="ig">ig</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="gmap" v-html="studio.google_embed"></div>
                    </div>
                    <div class="right">
                        <div :id="`item_${key}`" class="studio_item" v-for="(data, key) in studios" v-if="!data.online_class" :key="key" @click="toggleStudio(data, key)">
                            <div class="title">{{ data.name }}</div>
                            <div class="info">
                                <div class="description">
                                    {{ data.address }}, {{ data.city }}, {{ data.state }}, {{ data.country }}
                                </div>
                                <div class="link">
                                    <img src="/icons/email-icon-alt.svg" />
                                    <a :href="`mailto:${data.contact_email_address}`" class="email">{{ data.contact_email_address }}</a>
                                </div>
                                <div class="link" v-if="data.contact_number">
                                    <img src="/icons/phone-icon-alt.svg" />
                                    <a :href="`tel:${data.contact_number}`">{{ data.contact_number }}</a>
                                </div>
                                <div class="link" v-if="data.phone">
                                    <img src="/icons/phone-icon-alt.svg" />
                                    <a :href="`tel:02-${data.phone}`">(02) {{ data.phone }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <book-a-bike-banner />
            <transition name="fade">
                <contact-us-prompt v-if="$store.state.contactUsPromptStatus" />
            </transition>
        </div>
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    import BookABikeBanner from '../../components/BookABikeBanner'
    import ContactUsPrompt from '../../components/modals/ContactUsPrompt'
    import VueRecaptcha from 'vue-recaptcha'
    export default {
        components: {
            Banner,
            BookABikeBanner,
            ContactUsPrompt,
            VueRecaptcha
        },
        data () {
            return {
                count: 1000,
                dashOffset: 0,
                normalizedRadius: 0,
                circumference: 0,
                inquiries: [
                    {
                        title: 'Job Inquiries',
                        mail: 'careers@riderevolution.ph',
                        contact: '(02) 798-7447'
                    },
                    {
                        title: 'Business / Service Inquiries',
                        mail: 'hello@riderevolution.ph',
                        contact: '(02) 798-7447'
                    },
                    {
                        title: 'Partnership / Other Inquiries',
                        mail: 'marketing@riderevolution.ph',
                        contact: '(02) 798-7447'
                    }
                ],
                form: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    message: '',
                    i_agree: 0
                },
                loaded: false,
                studios: [],
                studio: [],
                res: []
            }
        },
        methods: {
            getCount (event) {
                const me = this
                let target = event.target
                let total = 1000
                if (target.value.length <= 1000) {
                    me.dashOffset = me.circumference - (target.value.length / 1000) * me.circumference
                    me.count = total - target.value.length
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid && grecaptcha.getResponse().length) {
                        let captcha = grecaptcha.getResponse()
                        me.loader(true)
                        me.$axios.post('api/verify-captcha', { captcha: captcha }).then(verify => {
                            let formData = new FormData(document.getElementById('default_form'))
                            if (verify) {
                                me.$axios.post(`api/inquiries`, formData).then(res => {
        							if (res.data) {
                                    	setTimeout(() => {
        									me.$store.state.contactUsPromptStatus = true
        					                document.body.classList.add('no_scroll')
                                    	}, 500)
        							}
                                }).catch(err => {
                                    me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                                }).then(() => {
                                    setTimeout( () => {
        								me.form.first_name = ''
        								me.form.last_name = ''
        								me.form.email = ''
        								me.form.message = ''
                                        me.form.i_agree = 0
                                        me.count = 1000
        								me.errors.clear()
        								me.$nextTick(() => {
        									me.$validator.reset()
        								})
                                    }, 500)
                                })
                            }
                        }).catch(err => {
                            me.$nuxt.error({ statusCode: 403, message: 'Page not found' })
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 1000)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            toggleStudio (data, key) {
                const me = this
                me.studio = data
                let target = document.getElementById(`item_${key}`)
                me.studios.forEach((element, index) => {
                    if (!element.online_class) {
                        let elements = document.getElementById(`item_${index}`)
                        if (key == index) {
                            if (element.toggled) {
                                element.toggled = false
                                elements.classList.remove('toggled')
                                target.querySelector('.info').style.height = `${0}px`
                            } else {
                                element.toggled = true
                                elements.classList.add('toggled')
                                target.querySelector('.info').style.height = `${target.querySelector('.info').scrollHeight}px`
                                setTimeout( () => {
                                    document.querySelector('#content .bottom .left .gmap iframe').style.height = `${document.querySelector('#content .bottom .right').scrollHeight}px`
                                }, 100)
                            }
                        } else {
                            element.toggled = false
                            elements.classList.remove('toggled')
                            elements.querySelector('.info').style.height = `${0}px`
                        }
                    }
                })
                me.$scrollTo('.gmap', {
                    offset: -100
                })
            },
            async initial () {
                const me= this
                let tempStudios = []
                me.loader(true)
                await setTimeout( () => {
                    me.studios.forEach((studio, index) => {
                        if (index == 0) {
                            studio.toggled = true
                        } else {
                            studio.toggled = false
                        }
                        tempStudios.push(studio)
                    })
                    me.studios = tempStudios
                    me.studio = tempStudios[0]
                    me.loaded = true
                    setTimeout( () => {
                        let elements = document.getElementById(`item_0`)
                        elements.classList.add('toggled')
                        elements.querySelector('.info').style.height = `${elements.querySelector('.info').scrollHeight}px`
                        setTimeout( () => {
                            document.querySelector('#content .bottom .left .gmap iframe').style.height = `${document.querySelector('#content .bottom .right').scrollHeight}px`
                        }, 500)
                        me.loader(false)
                    }, 500)
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
            return $axios.get(`api/inquiries`)
            .then(res => {
                return {
                    res: res.data.pageSetting,
                    studios: res.data.studios,
                    studio: res.data.studios[0]
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
