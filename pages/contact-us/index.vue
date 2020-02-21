<template>
    <div class="contact_us">
        <section id="banner">
            <img src="/default/contact-us/contact-us-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Contact Us</h1>
                <h2>We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">
            <div class="top">
                <h3 class="header_title">Booking a ride is easy</h3>
                <div class="icons">
                    <div class="wrapper" v-for="(data, key) in numbers" :key="key">
                        <div v-html="data.path"></div>
                        <div class="title">{{ data.description }}</div>
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
        <section id="banner" class="alt">
            <img src="/default/studio/book-a-ride.jpg" />
            <div class="overlay_mid">
                <h2>Begin your fitness journey with us.</h2>
                <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
                mapLat: 14.5529068,
                mapLng: 121.0206284,
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
                        description: 'Choose your class time and reserve your bike. You can also book for up to 3 friends.'
                    }
                ],
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
                ]
            }
        },
        methods: {
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
            }
        }
    }
</script>
