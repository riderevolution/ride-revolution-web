<template>
    <div class="about">
        <section id="banner">
            <img src="/default/about/about-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>About Us</h1>
                <h2>We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">
            <div class="content_wrapper">
                <div class="left">
                    <img src="/default/about/stronger-together.svg" />
                    <div class="info">
                        <div class="header_title">We don’t build gyms. We build experiences.</div>
                        <div class="icons">
                            <div class="wrapper" v-for="(data, key) in icons" :key="key">
                                <div class="icon_left" v-html="data.path"></div>
                                <div class="icon_right">
                                    <div class="title">{{ data.title }}</div>
                                    <div class="description">{{ data.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img src="/default/about/about-us-stronger.png" />
                </div>
            </div>
        </section>
        <section id="ride_with">
            <div class="header">
                <div class="description">
                    <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
                </div>
            </div>
            <div class="content">
                <instagram />
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
    import Instagram from '../../components/Instagram'
    export default {
        components: {
            Breadcrumb,
            Instagram
        },
        data () {
            return {
                icons: [
                    {
                        title: '50 mins',
                        description: 'In vitae turpis massa sed elementum tempus. Praesent tristique magna sit amet purus gravida quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="49.679" height="43.969" viewBox="0 0 49.679 43.969"> <g transform="translate(-49 -58.3)"> <path class="stroke stroke_1" d="M139.885,119.422a15.93,15.93,0,1,1,.486-9.416" transform="translate(-43.522 -28.289)" /> <path class="stroke stroke_1" d="M224.319,153.336q.017.364.016.732a16.017,16.017,0,0,1-.252,2.835" transform="translate(-127 -68.428)" /> <path class="stroke stroke_2" d="M167,108a13.189,13.189,0,0,1,12.058,18.519" transform="translate(-85.593 -35.543)" /> <path class="stroke stroke_1" d="M110.9,101.622l-1.942-1.942,4.466-4.466,1.942,1.942" transform="translate(-43.489 -26.269)" /> <path class="stroke stroke_1" d="M207.42,102.622l1.942-1.942L204.9,96.214l-1.942,1.942" transform="translate(-111.673 -26.994)" /> <path class="stroke stroke_2" d="M167,116v10.985l4.669,4.943" transform="translate(-85.593 -41.346)" /> <rect class="stroke stroke_1" width="3.57" height="4.669" transform="translate(79.759 63.943)" /> <line class="stroke stroke_1" y2="3.021" transform="translate(81.407 97.174)" /> <line class="stroke stroke_1" x1="3.021" transform="translate(67.126 85.914)" /> <line class="stroke stroke_1" x1="2.136" y1="2.136" transform="translate(71.309 75.816)" /> <line class="stroke stroke_1" x1="2.136" y1="2.136" transform="translate(89.369 93.876)" /> <line class="stroke stroke_1" y1="2.136" x2="2.136" transform="translate(71.309 93.876)" /> <path class="stroke stroke_1" d="M181.5,76.041a4.213,4.213,0,0,1-.7,1.929" transform="translate(-95.602 -12.361)" /> <path class="stroke stroke_1" d="M183.1,71.222a4.265,4.265,0,0,1,.092.882,4.34,4.34,0,0,1-.023.441" transform="translate(-97.271 -8.865)" /> <path class="stroke stroke_1" d="M179.8,64.49a4.261,4.261,0,0,1,.273.361" transform="translate(-94.881 -3.982)" /> <path class="stroke stroke_1" d="M153.29,65.609a4.239,4.239,0,0,1,6.757-5.1" transform="translate(-75.123)" /> <line class="stroke stroke_1" x1="2.54" transform="translate(49 80.696)" /> <line class="stroke stroke_1" x1="12.839" transform="translate(53.463 80.696)" /> <line class="stroke stroke_1" x1="2.334" transform="translate(53.943 85.914)" /> <line class="stroke stroke_1" x1="7.415" transform="translate(57.788 85.914)" /> <line class="stroke stroke_1" x1="7.141" transform="translate(59.162 91.132)" /> </g> </svg>'
                    },
                    {
                        title: '800 cal',
                        description: 'In vitae turpis massa sed elementum tempus. Praesent tristique magna sit amet purus gravida quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="31.232" height="46.913" viewBox="0 0 31.232 46.913"> <g transform="translate(-160.69 -21.639)"> <path class="stroke stroke_1" d="M162.271,86.692q.111.427.249.843" transform="translate(-0.418 -29.512)" /> <path class="stroke stroke_1" d="M182.784,30.268a68.3,68.3,0,0,0-4.242-5.773s6.194,22.869-4.288,22.869c-8.1,0-3.335-13.817-3.335-13.817-9.529,7.146-9.529,18.5-9.529,18.5v1.516" transform="translate(0 0)" /> <path class="stroke stroke_1" d="M203.688,37.974c-.539-.885-1.073-1.719-1.586-2.493" transform="translate(-19.318 -5.213)" /> <path class="stroke stroke_1" d="M209.677,48.438c-.446-.931-.913-1.839-1.389-2.715" transform="translate(-22.253 -10.073)" /> <path class="stroke stroke_1" d="M173.125,79.154a14.305,14.305,0,0,0,15.19.67l.749-.462c10.142-6.1,8.544-16.772,4.6-25.707" transform="translate(-5.568 -13.837)" /> <path class="stroke stroke_1" d="M169.066,98.738a14.317,14.317,0,0,0,2.133,1.808" transform="translate(-3.642 -35.228)" /> <path class="stroke stroke_1" d="M162.744,88.3a14.205,14.205,0,0,0,1.375,2.975" transform="translate(-0.642 -30.274)" /> <circle class="stroke stroke_2" cx="5.717" cy="5.717" r="5.717" transform="translate(170.547 54.035)" /> </g> </svg>'
                    },
                    {
                        title: 'Full Body',
                        description: 'In vitae turpis massa sed elementum tempus. Praesent tristique magna sit amet purus gravida quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38.027" height="64.281" viewBox="0 0 38.027 64.281"> <g transform="translate(-275.92 -144.95)"> <g class="d" transform="matrix(1, 0, 0, 1, 275.92, 144.95)"> <path class="stroke stroke_1" d="M304.517,187.078a9.64,9.64,0,0,1-1.9-1.348" transform="translate(-286.27 -157.63)" /> </g> <line class="stroke stroke_1" x2="2.317" y2="5.544" transform="translate(307.557 203.417)" /> <path class="stroke stroke_1" d="M327.2,202.078l3.109,4.814a5.289,5.289,0,0,1-1.279,7.422l-1.831,7.12" transform="translate(-20.137 -19.192)" /> <path class="stroke stroke_1" d="M298.171,212.328l3.294,13.69h0" transform="translate(-8.574 -23.274)" /> <path class="stroke stroke_1" d="M303.645,216.833s1.617,2.808,4.225,2.909" transform="translate(-10.754 -25.069)" /> <path class="stroke stroke_1" d="M301.257,189.887" transform="translate(-9.803 -14.337)" /> <path class="stroke stroke_1" d="M336.143,232.458A52.675,52.675,0,0,1,335,237.8" transform="translate(-23.242 -31.292)" /> <path class="stroke stroke_1" d="M336.253,206.591c-.306,2.191-.767,6.7.2,9.072a10.874,10.874,0,0,1,.276,4.674" transform="translate(-23.589 -20.99)" /> <path class="stroke stroke_1" d="M329.688,199.471a8.009,8.009,0,0,0-.333-3.779c-2.175-6.152-9.5-3.5-9.5-3.5l-.469-3.482" transform="translate(-17.024 -13.87)" /> <path class="stroke stroke_1" d="M287.833,220.5s4.487,7.516,9.515,8.772c0,0,3.674,1.808.564,5.62" transform="translate(-4.457 -26.529)" /> <line class="stroke stroke_1" x1="1.459" y2="1.153" transform="translate(284.708 191.764)" /> <line class="stroke stroke_1" x1="5.754" y2="4.549" transform="translate(287.136 186.449)" /> <path class="stroke stroke_1" d="M291.454,197.458s-5.47-2.189-9.582,5.379l-5.215,6.665s-1.1,10.477,15.5,13.641" transform="translate(0 -17.235)" /> <line class="stroke stroke_1" y1="2.083" x2="1.607" transform="translate(287.989 205.326)" /> <path class="stroke stroke_2" d="M291.338,154.121c-2.5-.67-5.394-.088-7.53,4.348-3.911,8.123,8.179,10.287,3.438,16.376,0,0,5.2.286,5.544-4.384.113-1.53-1.134-2.9-1.134-4.538a9.617,9.617,0,1,1,6.637,9.154" transform="translate(-2.539 0)" /> <g class="c" transform="matrix(1, 0, 0, 1, 275.92, 144.95)"> <path class="stroke stroke_1" d="M301.183,156.308a12.715,12.715,0,0,0-2.163-1.255" transform="translate(-284.83 -145.41)" /> </g> </g> </svg>'
                    }
                ]
            }
        },
        methods: {

        },
        mounted () {
            const me = this

        }
    }
</script>
