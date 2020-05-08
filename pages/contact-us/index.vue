<template>
    <transition name="fade">
        <div class="contact_us" v-if="loaded">
            <section id="banner" class="mt">
                <img class="full" src="/default/contact-us/contact-us-banner.jpg" />
                <breadcrumb :overlay="true" />
                <div class="overlay_mid">
                    <h1>Contact Us</h1>
                    <h2 class="alt">We’re revolutionizing Manila’s fitness industry.</h2>
                </div>
            </section>
            <section id="content">
                <div class="top">
                    <form id="default_form" @submit.prevent="submissionSuccess()">
                        <div class="form_flex">
                            <div class="form_group">
                                <label for="first_name">First Name <span>*</span></label>
                                <input type="text" name="first_name" autocomplete="off" v-model="form.first_name" class="input_text" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ errors.first('first_name') | properFormat }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="last_name">Last Name <span>*</span></label>
                                <input type="text" name="last_name" autocomplete="off" v-model="form.last_name" class="input_text" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ errors.first('last_name') | properFormat }}</span></transition>
                            </div>
                        </div>
                        <div class="form_group">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" name="email" class="input_text" v-model="form.email" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="message">Message <span>*</span></label>
                            <textarea name="message" class="input_text" rows="5" maxlength="1000" v-model="form.message" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$', max: 1000}"></textarea>
                            <div class="limit_wrapper">
                                <div class="limit"><span class="count">{{ count }}</span> characters left</div>
                                <svg class="progress" width="30" height="30"> <circle class="inner_ring" :r="normalizedRadius" cx="15" cy="15"/> <circle class="outer_ring" :stroke-dasharray="`${circumference} ${circumference}`" :stroke-dashoffset="dashOffset" :r="normalizedRadius" cx="15" cy="15"/> </svg>
                            </div>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('message')">{{ errors.first('message') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <div class="form_check">
                                <input type="checkbox" id="i_agree" name="i_agree" class="input_check" :checked="form.i_agree == 1" v-validate="'required'">
                                <label for="i_agree" class="alt">I acknowledge and fully understand the terms and conditions stated above and that all information stated above are true.</label>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('i_agree')">{{ errors.first('i_agree') | properFormat }}</span></transition>
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
                                    <a href="javascript:void(0)" class="email">{{ data.mail }}</a>
                                </div>
                                <div class="link">
                                    <img src="/icons/phone-icon.svg" />
                                    <a href="javascript:void(0)">{{ data.contact }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="connect">
                            <p class="connect_title">Connect With Us</p>
                            <div class="connect_links">
                                <a href="javascript:void(0)" class="fb">fb</a>
                                <a href="javascript:void(0)" class="ig">ig</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="gmap" style="width: 100%; height: 600px" v-html="studio.google_embed"></div>
                    </div>
                    <div class="right">
                        <div :id="`item_${key}`" :class="`studio_item ${(data.toggled) ? 'toggled' : ''}`" v-for="(data, key) in studios" :key="key" @click="toggleStudio(data, key)">
                            <div class="title">{{ data.name }}</div>
                            <div class="info">
                                <div class="description">
                                    {{ studio.address_line_1 }}, {{ studio.city }}, {{ studio.state }}, {{ studio.country }}
                                </div>
                                <div class="link">
                                    <img src="/icons/email-icon-alt.svg" />
                                    <a :href="`mailto:${studio.contact_email_address}`" class="email">{{ studio.contact_email_address }}</a>
                                </div>
                                <div class="link">
                                    <img src="/icons/phone-icon-alt.svg" v-if="studio.contact_number" />
                                    <a :href="`tel:${studio.contact_number}`">{{ studio.contact_number }}</a>
                                </div>
                                <div class="link">
                                    <img src="/icons/phone-icon-alt.svg" v-if="studio.phone" />
                                    <a :href="`tel:${studio.phone}`">{{ studio.phone }}</a>
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
    import Breadcrumb from '../../components/Breadcrumb'
    import BookABikeBanner from '../../components/BookABikeBanner'
    import ContactUsPrompt from '../../components/modals/ContactUsPrompt'
    import VueRecaptcha from 'vue-recaptcha'
    export default {
        components: {
            Breadcrumb,
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
        filters: {
            properFormat: function (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                }else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
                    return `The ${newValue}`
                }
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
                    let elements = document.getElementById(`item_${index}`)
                    if (key == index) {
                        if (element.toggled) {
                            element.toggled = false
                            target.querySelector('.info').style.height = `${0}px`
                        } else {
                            element.toggled = true
                            target.querySelector('.info').style.height = `${target.querySelector('.info').scrollHeight}px`
                        }
                    } else {
                        element.toggled = false
                        elements.querySelector('.info').style.height = `${0}px`
                    }
                })
                me.$scrollTo('.gmap', {
                    offset: 0
                })
            }
        },
        async mounted () {
            const me = this
            document.body.classList.add('no_click')
            if (me.$store.state.isLoading) {
                setTimeout( () => {
                    document.body.classList.remove('no_click')
                    me.$store.state.isLoading = false
                    me.normalizedRadius = 15 - 3 * 2
                    me.circumference = me.normalizedRadius * 2 * Math.PI
                    me.dashOffset = me.circumference
                }, 500)
            }
        },
        async asyncData ({ $axios, params, error, store }) {
            let tempStudios = []
            store.state.isLoading = true
            const { data } = await $axios.get(`api/inquiries`)
            data.studios.forEach((studio, index) => {
                studio.toggled = false
                tempStudios.push(studio)
            })
            console.log({ data });
            return {
                res: data.pageSetting,
                studios: tempStudios,
                studio: tempStudios[0],
                loaded: true
            }
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
