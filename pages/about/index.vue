<template>
    <transition name="fade">
        <div class="about" v-if="loaded">
            <banner :res="res" :hasH2="true" />
            <section id="content">
                <div class="content_wrapper">
                    <div class="left">
                        <img src="/default/about/stronger-together.svg" />
                        <div class="info">
                            <div class="header_title" v-html="res.teaser_title"></div>
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
            <section id="additional">
                <div class="info" v-html="res.teaser_description"></div>
                <div class="experiences">
                    <div class="wrapper" v-for="(data, key) in experiences" :key="key">
                        <div class="exp_top">
                            <div class="icon" v-html="data.path"></div>
                            <div class="title">{{ data.title }}</div>
                        </div>
                        <div class="description" v-html="data.description"></div>
                    </div>
                </div>
            </section>
            <instagram-alternate :id="1150" />
            <book-a-bike-banner />
        </div>
        <skeleton :page="'default_centered_circle'" :has-col="false" v-else />
    </transition>
</template>

<script>
    import Banner from '../../components/Banner'
    import InstagramAlternate from '../../components/InstagramAlternate'
    import BookABikeBanner from '../../components/BookABikeBanner'
    import Skeleton from '../../components/Skeleton'
    export default {
        components: {
            Banner,
            InstagramAlternate,
            BookABikeBanner,
            Skeleton
        },
        data () {
            return {
                loaded: false,
                res: [],
                icons: [
                    {
                        title: '45 mins',
                        description: 'Ride Revolution is a 45-minute high-intensity workout that promotes wellness for both your mind and body. Our goal is for you to get stronger, and get you feeling better at the same time.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="49.679" height="43.969" viewBox="0 0 49.679 43.969"> <g transform="translate(-49 -58.3)"> <path class="stroke stroke_1" d="M139.885,119.422a15.93,15.93,0,1,1,.486-9.416" transform="translate(-43.522 -28.289)" /> <path class="stroke stroke_1" d="M224.319,153.336q.017.364.016.732a16.017,16.017,0,0,1-.252,2.835" transform="translate(-127 -68.428)" /> <path class="stroke stroke_2" d="M167,108a13.189,13.189,0,0,1,12.058,18.519" transform="translate(-85.593 -35.543)" /> <path class="stroke stroke_1" d="M110.9,101.622l-1.942-1.942,4.466-4.466,1.942,1.942" transform="translate(-43.489 -26.269)" /> <path class="stroke stroke_1" d="M207.42,102.622l1.942-1.942L204.9,96.214l-1.942,1.942" transform="translate(-111.673 -26.994)" /> <path class="stroke stroke_2" d="M167,116v10.985l4.669,4.943" transform="translate(-85.593 -41.346)" /> <rect class="stroke stroke_1" width="3.57" height="4.669" transform="translate(79.759 63.943)" /> <line class="stroke stroke_1" y2="3.021" transform="translate(81.407 97.174)" /> <line class="stroke stroke_1" x1="3.021" transform="translate(67.126 85.914)" /> <line class="stroke stroke_1" x1="2.136" y1="2.136" transform="translate(71.309 75.816)" /> <line class="stroke stroke_1" x1="2.136" y1="2.136" transform="translate(89.369 93.876)" /> <line class="stroke stroke_1" y1="2.136" x2="2.136" transform="translate(71.309 93.876)" /> <path class="stroke stroke_1" d="M181.5,76.041a4.213,4.213,0,0,1-.7,1.929" transform="translate(-95.602 -12.361)" /> <path class="stroke stroke_1" d="M183.1,71.222a4.265,4.265,0,0,1,.092.882,4.34,4.34,0,0,1-.023.441" transform="translate(-97.271 -8.865)" /> <path class="stroke stroke_1" d="M179.8,64.49a4.261,4.261,0,0,1,.273.361" transform="translate(-94.881 -3.982)" /> <path class="stroke stroke_1" d="M153.29,65.609a4.239,4.239,0,0,1,6.757-5.1" transform="translate(-75.123)" /> <line class="stroke stroke_1" x1="2.54" transform="translate(49 80.696)" /> <line class="stroke stroke_1" x1="12.839" transform="translate(53.463 80.696)" /> <line class="stroke stroke_1" x1="2.334" transform="translate(53.943 85.914)" /> <line class="stroke stroke_1" x1="7.415" transform="translate(57.788 85.914)" /> <line class="stroke stroke_1" x1="7.141" transform="translate(59.162 91.132)" /> </g> </svg>'
                    },
                    {
                        title: '700 Calories',
                        description: 'Your biggest muscles (i.e. the quads and glutes) are constantly activated in indoor cycling, and when you work on bigger muscles you burn more calories. So expect to burn up to 700 calories per ride.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="31.232" height="46.913" viewBox="0 0 31.232 46.913"> <g transform="translate(-160.69 -21.639)"> <path class="stroke stroke_1" d="M162.271,86.692q.111.427.249.843" transform="translate(-0.418 -29.512)" /> <path class="stroke stroke_1" d="M182.784,30.268a68.3,68.3,0,0,0-4.242-5.773s6.194,22.869-4.288,22.869c-8.1,0-3.335-13.817-3.335-13.817-9.529,7.146-9.529,18.5-9.529,18.5v1.516" transform="translate(0 0)" /> <path class="stroke stroke_1" d="M203.688,37.974c-.539-.885-1.073-1.719-1.586-2.493" transform="translate(-19.318 -5.213)" /> <path class="stroke stroke_1" d="M209.677,48.438c-.446-.931-.913-1.839-1.389-2.715" transform="translate(-22.253 -10.073)" /> <path class="stroke stroke_1" d="M173.125,79.154a14.305,14.305,0,0,0,15.19.67l.749-.462c10.142-6.1,8.544-16.772,4.6-25.707" transform="translate(-5.568 -13.837)" /> <path class="stroke stroke_1" d="M169.066,98.738a14.317,14.317,0,0,0,2.133,1.808" transform="translate(-3.642 -35.228)" /> <path class="stroke stroke_1" d="M162.744,88.3a14.205,14.205,0,0,0,1.375,2.975" transform="translate(-0.642 -30.274)" /> <circle class="stroke stroke_2" cx="5.717" cy="5.717" r="5.717" transform="translate(170.547 54.035)" /> </g> </svg>'
                    },
                    {
                        title: 'Full Body',
                        description: 'Indoor cycling isn’t just for the legs. It’s a full-body workout that uses resistance, hand weights, and targeted body movements. So with regular rides you can expect to see toned abs, leaner arms and legs, and better cardiovascular endurance.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38.027" height="64.281" viewBox="0 0 38.027 64.281"> <g transform="translate(-275.92 -144.95)"> <g class="d" transform="matrix(1, 0, 0, 1, 275.92, 144.95)"> <path class="stroke stroke_1" d="M304.517,187.078a9.64,9.64,0,0,1-1.9-1.348" transform="translate(-286.27 -157.63)" /> </g> <line class="stroke stroke_1" x2="2.317" y2="5.544" transform="translate(307.557 203.417)" /> <path class="stroke stroke_1" d="M327.2,202.078l3.109,4.814a5.289,5.289,0,0,1-1.279,7.422l-1.831,7.12" transform="translate(-20.137 -19.192)" /> <path class="stroke stroke_1" d="M298.171,212.328l3.294,13.69h0" transform="translate(-8.574 -23.274)" /> <path class="stroke stroke_1" d="M303.645,216.833s1.617,2.808,4.225,2.909" transform="translate(-10.754 -25.069)" /> <path class="stroke stroke_1" d="M301.257,189.887" transform="translate(-9.803 -14.337)" /> <path class="stroke stroke_1" d="M336.143,232.458A52.675,52.675,0,0,1,335,237.8" transform="translate(-23.242 -31.292)" /> <path class="stroke stroke_1" d="M336.253,206.591c-.306,2.191-.767,6.7.2,9.072a10.874,10.874,0,0,1,.276,4.674" transform="translate(-23.589 -20.99)" /> <path class="stroke stroke_1" d="M329.688,199.471a8.009,8.009,0,0,0-.333-3.779c-2.175-6.152-9.5-3.5-9.5-3.5l-.469-3.482" transform="translate(-17.024 -13.87)" /> <path class="stroke stroke_1" d="M287.833,220.5s4.487,7.516,9.515,8.772c0,0,3.674,1.808.564,5.62" transform="translate(-4.457 -26.529)" /> <line class="stroke stroke_1" x1="1.459" y2="1.153" transform="translate(284.708 191.764)" /> <line class="stroke stroke_1" x1="5.754" y2="4.549" transform="translate(287.136 186.449)" /> <path class="stroke stroke_1" d="M291.454,197.458s-5.47-2.189-9.582,5.379l-5.215,6.665s-1.1,10.477,15.5,13.641" transform="translate(0 -17.235)" /> <line class="stroke stroke_1" y1="2.083" x2="1.607" transform="translate(287.989 205.326)" /> <path class="stroke stroke_2" d="M291.338,154.121c-2.5-.67-5.394-.088-7.53,4.348-3.911,8.123,8.179,10.287,3.438,16.376,0,0,5.2.286,5.544-4.384.113-1.53-1.134-2.9-1.134-4.538a9.617,9.617,0,1,1,6.637,9.154" transform="translate(-2.539 0)" /> <g class="c" transform="matrix(1, 0, 0, 1, 275.92, 144.95)"> <path class="stroke stroke_1" d="M301.183,156.308a12.715,12.715,0,0,0-2.163-1.255" transform="translate(-284.83 -145.41)" /> </g> </g> </svg>'
                    }
                ],
                experiences: [
                    {
                        title: 'Exercise',
                        description: 'A high-intensity, low impact, full body workout on a bike, led by passionate and charismatic instructors. Our classes are efficient, effective, and fun!',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="77.746" height="36.982" viewBox="0 0 77.746 36.982"> <g transform="translate(0 0.506)"> <path class="stroke stroke_1" d="M981.924,612.356l.384.367a5.542,5.542,0,0,0,3.826,1.532h3.115l5.968,23.241" transform="translate(-929.249 -612.356)" /> <line class="stroke stroke_1" x1="32.059" y2="16.367" transform="translate(29.706 8.772)" /> <line class="stroke stroke_1" x2="2.692" y2="2.8" transform="translate(43.244 13.442)" /> <line class="stroke stroke_1" x2="5.787" y2="6.02" transform="translate(35.403 5.285)" /> <path class="stroke stroke_1" d="M1004.764,635.014A11.077,11.077,0,1,1,993.1,631.1" transform="translate(-930.037 -617.278)" /> <path class="stroke stroke_1" d="M1002.046,630.728a11.014,11.014,0,0,1,4.482,1.675" transform="translate(-934.531 -617.179)" /> <path class="stroke stroke_1" d="M953.695,650.6a11.078,11.078,0,1,1,1.068-16.439" transform="translate(-917.13 -617.203)" /> <line class="stroke stroke_1" x2="10.154" transform="translate(29.028 5.07)" /> <line class="stroke stroke_1" x2="11.801" transform="translate(14.107 5.07)" /> <path class="stroke stroke_2" d="M969.453,641.977a4.58,4.58,0,1,1,5.82,6.663" transform="translate(-925.975 -619.599)" /> <path class="stroke stroke_2" d="M974.4,641.466l-7.094,8.02a3.3,3.3,0,0,1-2.52,1.167h-2.406" transform="translate(-924.118 -619.997)" /> <line class="stroke stroke_1" x1="5.968" transform="translate(0 14.543)" /> <line class="stroke stroke_1" x1="11.394" transform="translate(0 22.84)" /> <line class="stroke stroke_1" x1="11.394" transform="translate(9.224 30.765)" /> <line class="stroke stroke_1" x1="3.863" transform="translate(14.921 22.84)" /> <line class="stroke stroke_1" x1="14.692" transform="translate(10.58 14.543)" /> </g> </svg>'
                    },
                    {
                        title: 'Music',
                        description: 'Music is the heartbeat of our class. Each class has a unique soundtrack to emotionally engage you and get you moving!',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="46.847" height="47.777" viewBox="0 0 46.847 47.777"> <g transform="translate(0.7 0.7)"> <line class="stroke stroke_1" y2="11.177" transform="translate(45.439 31.38)" /> <path class="stroke stroke_1" d="M1099.915,599.282l13.615-2.6v3.187" transform="translate(-1068.09 -570.451)" /> <path class="stroke stroke_2" d="M1092.779,575.967a22.62,22.62,0,1,0-26.593,22.436" transform="translate(-1047.54 -553.512)" /> <path class="stroke stroke_1" d="M1088.3,610.17c-1.151.7-1.8,1.75-1.537,2.7.351,1.263,2.2,1.853,4.124,1.317a5.149,5.149,0,0,0,1.615-.759,2.264,2.264,0,0,0,.932-1.844V593.467l14.715-3" transform="translate(-1062.905 -568.012)" /> <path class="stroke stroke_1" d="M1093.632,621.72a4.943,4.943,0,0,0-2.237.122l-.143.042" transform="translate(-1064.692 -580.244)" /> <path class="stroke stroke_1" d="M1114.845,625.132c-1.926.536-3.772-.054-4.124-1.317s.925-2.722,2.851-3.258a5.06,5.06,0,0,1,2-.161" transform="translate(-1072.308 -579.741)" /> <path class="stroke stroke_1" d="M1121.082,623.548a3.071,3.071,0,0,1-1.938,2.463" transform="translate(-1075.635 -580.992)" /> <path class="stroke stroke_2" d="M1084.383,592.057a9.46,9.46,0,1,1,3.715-8.117" transform="translate(-1056.038 -561.97)" /> <path class="stroke stroke_2" d="M1111.361,588.981" transform="translate(-1072.581 -567.429)" /> <path class="stroke stroke_2" d="M1096.155,566.546a16.257,16.257,0,0,1,6.885,6.175" transform="translate(-1066.615 -558.626)" /> <path class="stroke stroke_2" d="M1074.178,565.332a16.128,16.128,0,0,1,6.44-1.332" transform="translate(-1057.992 -557.627)" /> <path class="stroke stroke_2" d="M1053.9,591.392a19.315,19.315,0,0,1,.579-12.258" transform="translate(-1049.748 -563.565)" /> <path class="stroke stroke_2" d="M1067.393,616.088a19.271,19.271,0,0,1-6.976-5.305" transform="translate(-1052.593 -575.983)" /> <ellipse class="stroke stroke_2" cx="3.336" cy="3.336" rx="3.336" ry="3.336" transform="translate(19.108 19.038)" /> </g> </svg>'
                    },
                    {
                        title: 'Convenience',
                        description: 'We have multiple classes throughout the day that can be easily booked online from your computer or smartphone.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="53.009" height="54.282" viewBox="0 0 53.009 54.282"> <g transform="translate(0.7 0.058)"> <g transform="translate(0 12.748)"> <g transform="translate(4.904)"> <path class="stroke stroke_1" d="M1209.913,576.659a54.233,54.233,0,0,0,1.278-10.566,2.928,2.928,0,0,0-5.795-.584c-1.606,8.519-4.265,9.228-9.007,12.8" transform="translate(-1189.234 -563.178)" /> <path class="stroke stroke_1" d="M1202.132,629.219a13.62,13.62,0,0,0,4.361.712h13.432a3.194,3.194,0,1,0,0-6.388h2.583a3.194,3.194,0,0,0,0-6.389h1.174a3.194,3.194,0,1,0,0-6.388h.7a3.194,3.194,0,0,0,0-6.389h-11.259" transform="translate(-1192.855 -589.154)" /> <path class="stroke stroke_1" d="M1177.435,627.579a13.663,13.663,0,0,0,5.489,14.575" transform="translate(-1177.023 -603.784)" /> <path class="stroke stroke_1" d="M1188.6,604.142a13.7,13.7,0,0,0-4.566,4" transform="translate(-1181.443 -589.006)" /> <line class="stroke stroke_1" x1="4.514" transform="translate(21.958 21.611)" /> <line class="stroke stroke_1" x1="5.06" transform="translate(26.472 21.611)" /> <line class="stroke stroke_1" x1="9.574" transform="translate(20.816 28.003)" /> <line class="stroke stroke_1" x1="7.245" transform="translate(20.581 34.379)" /> </g> <path class="stroke stroke_1" d="M1169.2,614.3h-5.45V631.79h8.62" transform="translate(-1163.75 -595.411)" /> </g> <g transform="translate(28.155 0)"> <path class="stroke stroke_2" d="M1189.989,479s-.525,6.256-4.981,7.846c0,0,4.981,2.372,4.981,9.138" transform="translate(-1185.008 -479)" /> <path class="stroke stroke_2" d="M1200.687,479s.525,6.256,4.981,7.846c0,0-4.981,2.372-4.981,9.138" transform="translate(-1195.7 -479)" /> </g> <g transform="translate(43.689 19.966)"> <path class="stroke stroke_2" d="M1188.4,479s-.358,4.266-3.4,5.35a6.8,6.8,0,0,1,3.4,6.231" transform="translate(-1185.008 -479)" /> <path class="stroke stroke_2" d="M1200.687,479s.358,4.266,3.4,5.35a6.8,6.8,0,0,0-3.4,6.231" transform="translate(-1197.286 -479)" /> </g> </g> </svg>'
                    },
                    {
                        title: 'Community',
                        description: 'We are a fitness community that helps each other to achieve our goals.',
                        path: '<svg id="gym_icons" xmlns="http://www.w3.org/2000/svg" width="43.099" height="52.188" viewBox="0 0 43.099 52.188"> <g transform="translate(0.757 0.562)"> <path class="stroke stroke_1" d="M1258.163,573.627a12.842,12.842,0,0,0-1.974-5.407,13.858,13.858,0,0,0-4.171-4.091" transform="translate(-1216.698 -549.104)" /> <path class="stroke stroke_1" d="M1188.333,608.613c3.005,4.933,6.893,7.844,10.187,5.668.468-.309.919-.581,1.355-.818a9.164,9.164,0,0,1,8.782,0c.435.237.887.508,1.355.818,6.185,4.086,14.465-9.764,15.059-21.262" transform="translate(-1183.427 -564.196)" /> <path class="stroke stroke_1" d="M1181.457,610.411c.378,1.176.813,2.325,1.293,3.428" transform="translate(-1179.835 -573.282)" /> <path class="stroke stroke_1" d="M1208.907,560.631a15.112,15.112,0,0,0-5.724.358,17.889,17.889,0,0,1-8.57,0c-4.013-.991-10.02-1.028-14.368,5.336-2.578,3.773-2.666,9.589-1.342,15.213" transform="translate(-1178.06 -547.207)" /> <path class="stroke stroke_1" d="M1228.844,532.667c-6.209,4.616-7.151,14.3-7.151,14.3" transform="translate(-1200.854 -532.667)" /> <path class="stroke stroke_2" d="M1207.936,551.089s-11.462-.319-12.576-10.507c0,0,7.987-.736,11.238,5.222" transform="translate(-1187.098 -536.787)" /> <path class="stroke stroke_1" d="M1195.815,569.333a9.343,9.343,0,0,0-7.482,7.012" transform="translate(-1183.427 -551.822)" /> </g> </svg>'
                    },
                ]
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
            return $axios.get(`api/page-settings/about`)
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
