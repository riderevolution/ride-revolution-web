<template>
    <div class="contact_us">
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
                            <input type="text" name="first_name" autocomplete="off" class="input_text" placeholder="Enter your first name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ errors.first('first_name') | properFormat }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" name="last_name" autocomplete="off" class="input_text" placeholder="Enter your last name" v-validate="{required: true, regex: '^[a-zA-Z0-9-._ |\u00f1]*$', max: 100}">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ errors.first('last_name') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" class="input_text" autocomplete="off" placeholder="Enter your email address" v-validate="{required: true, email: true, regex: '^[a-zA-Z0-9_ |\u00f1|\@|\.]*$'}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="message">Message <span>*</span></label>
                        <textarea name="message" class="input_text" rows="5" maxlength="1000" @input="getCount($event)" placeholder="Please type here" v-validate="{required: true, regex: '^[a-zA-Z0-9-,-._ |\u00f1|\']*$', max: 1000}"></textarea>
                        <div class="limit_wrapper">
                            <div class="limit"><span class="count">{{ count }}</span> characters left</div>
                            <svg class="progress" width="30" height="30"> <circle class="inner_ring" :r="normalizedRadius" cx="15" cy="15"/> <circle class="outer_ring" :stroke-dasharray="`${circumference} ${circumference}`" :stroke-dashoffset="dashOffset" :r="normalizedRadius" cx="15" cy="15"/> </svg>
                        </div>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('message')">{{ errors.first('message') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <div class="form_check">
                            <input type="checkbox" id="i_agree" name="i_agree" class="input_check" v-validate="'required'">
                            <label for="i_agree" class="alt">I acknowledge and fully understand the terms and conditions stated above and that all information stated above are true.</label>
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('i_agree')">{{ errors.first('i_agree') | properFormat }}</span></transition>
                        </div>
                    </div>
                    <div class="form_flex captcha">
                        <vue-recaptcha class="captcha" sitekey="6Le_s3wUAAAAAMuN4YveR4ZNq2qaj-rkw7n1477N"></vue-recaptcha>
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
                    <no-ssr>
                        <GmapMap
                            :center="{lat:mapLat, lng:mapLng}"
                            :zoom="15"
                            :options="{
                                zoomControl: true,
                                scaleControl: false,
                                streetViewControl: false,
                                rotateControl: false,
                                fullscreenControl: false,
                                scrollwheel: false
                            }"
                            class="gmap"
                            style="width: 100%; height: 600px"
                        >
                            <GmapMarker
                                :position="{lat:mapLat, lng:mapLng}"
                                :clickable="true"
                            >
                            </GmapMarker>
                        </GmapMap>
                    </no-ssr>
                </div>
                <div class="right">
                    <div :id="`item_${key}`" :class="`studio_item ${(data.toggled) ? 'toggled' : ''}`" v-for="(data, key) in studios" :key="key" @click="toggleStudio(key)">
                        <div class="title">{{ data.name }}</div>
                        <div class="info">
                            <div class="description" v-html="data.description"></div>
                            <div class="link">
                                <img src="/icons/email-icon-alt.svg" />
                                <a href="javascript:void(0)" class="email">{{ data.mail }}</a>
                            </div>
                            <div class="link">
                                <img src="/icons/phone-icon-alt.svg" />
                                <a href="javascript:void(0)">{{ data.contact }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="banner" class="mt alt">
            <img class="full" src="/default/contact-us/book-a-bike.jpg" />
            <div class="overlay_mid">
                <h2>Begin your fitness journey with us.</h2>
                <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import VueRecaptcha from 'vue-recaptcha'
    export default {
        components: {
            Breadcrumb,
            VueRecaptcha
        },
        data () {
            return {
                count: 1000,
                dashOffset: 0,
                normalizedRadius: 0,
                circumference: 0,
                mapLat: 14.5529068,
                mapLng: 121.0206284,
                studios: [
                    {
                        id: 1,
                        name: 'Greenbelt',
                        description: 'Unit GD107 North Wing, EDSA cor. Shaw Blvd. Mandaluyong City, Metro Manila, Philippines',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        lat: 14.5567487,
                        lng: 121.0247024,
                        toggled: false
                    },
                    {
                        id: 2,
                        name: 'Shangri-la Plaza',
                        description: 'Unit GD107 North Wing, EDSA cor. Shaw Blvd. Mandaluyong City, Metro Manila, Philippines',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        lat: 14.5715771,
                        lng: 121.017278,
                        toggled: false
                    },
                    {
                        id: 3,
                        name: 'Kenny Sports BGC',
                        description: 'Unit GD107 North Wing, EDSA cor. Shaw Blvd. Mandaluyong City, Metro Manila, Philippines',
                        mail: 'shang@riderevolution.com',
                        contact: '0977 827 7433',
                        lat: 14.5567487,
                        lng: 121.0247024,
                        toggled: false
                    }
                ],
                inquiries: [
                    {
                        title: 'Service Inquiries',
                        mail: 'hello@riderev.com',
                        contact: '(02) 798-7447'
                    },
                    {
                        title: 'Business Inquiries',
                        mail: 'hello@riderev.com',
                        contact: '(02) 798-7447'
                    },
                    {
                        title: 'Job Inquiries',
                        mail: 'hello@riderev.com',
                        contact: '(02) 798-7447'
                    },
                    {
                        title: 'Other Inquiries',
                        mail: 'hello@riderev.com',
                        contact: '(02) 798-7447'
                    }
                ]
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
                    if (valid) {
                        // me.$router.push('/my-profile')
                        // me.$store.state.loginSignUpStatus = false
                        // document.body.classList.remove('no_scroll')
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            toggleStudio (key) {
                const me = this
                let target = document.getElementById(`item_${key}`)
                me.studios.forEach((element, index) => {
                    let elements = document.getElementById(`item_${index}`)
                    if (key == index) {
                        me.mapLat = element.lat
                        me.mapLng = element.lng
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
        mounted () {
            const me = this
            me.normalizedRadius = 15 - 3 * 2
            me.circumference = me.normalizedRadius * 2 * Math.PI
            me.dashOffset = me.circumference
        }
    }
</script>
