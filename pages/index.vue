<template>
    <transition name="fade">
        <div class="home" v-if="loaded">

            <!-- Above The Fold -->
            <above-the-fold :above_the_fold="above_the_fold" />

            <!-- Promo Section -->
            <promo />

            <!-- Packages -->
            <packages :packages="packages" />

            <!-- Reviews -->
            <reviews :testimonials="testimonials" />

            <!-- Instructors -->
            <instructors />

            <!-- Studios -->
            <studios :studios="studios" :studio="studio" />

            <!-- Lets Ride -->
            <lets-ride :feeds="feeds" />

            <transition name="fade">
                <video-prompt v-if="$store.state.videoPrompt" :data="above_the_fold" />
            </transition>
        </div>
        <skeleton :page="'default'" v-else />
    </transition>
</template>

<script>
    import AboveTheFold from '~/components/home/AboveTheFold'
    import Packages from '~/components/home/Packages'
    import Reviews from '~/components/home/Reviews'
    import Instructors from '~/components/home/Instructors'
    import Studios from '~/components/home/Studios'
    import LetsRide from '~/components/home/LetsRide'
    import VideoPrompt from '~/components/modals/VideoPrompt'
    import Promo from '~/components/Promo'
    import Skeleton from '~/components/Skeleton'

    export default {
        components: {
            AboveTheFold,
            Packages,
            Reviews,
            Instructors,
            Studios,
            LetsRide,
            VideoPrompt,
            Skeleton,
            Promo
        },
        data () {
            return {
                loaded: false,
                above_the_fold: [],
                packages: [],
                feeds: [],
                testimonials: [],
                studios: []
            }
        },
        methods: {
            async initial () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.$axios.get(`https://stamped.io/api/widget/reviews?type=instagram-feed&apiKey=pubkey-b1f9lj3ib12svBob12UI0Z3a7lwNra&storeUrl=www.riderevolution.ph&isdataonly=true&productIds=1001&take=100`).then(res => {
                        me.feeds = res.data.data
                        me.loaded = true
                        me.loader(false)
                    })
                }, 500)
            }
        },
        async mounted () {
            const me = this
            await setTimeout( () => {
                me.initial()
            }, 10)
        },
        asyncData ({ $axios, params, error }) {
            return $axios.get('api/web/home')
                .then(res => {
                    return {
                        above_the_fold: res.data.home,
                        studio: res.data.studios[0],
                        studios: res.data.studios,
                        packages: res.data.classPackages,
                        testimonials: res.data.testimonials
                    }
                })
        },
        head () {
            const me = this
            let host = process.env.baseUrl
            return {
                title: `${me.above_the_fold.title} | Ride Revolution`,
                link: [
                    {
                        rel: 'canonical',
                        href: `${host}${me.$route.fullPath}`
                    }
                ],
                meta: [
                    { hid: 'og:title', property: 'og:title', content: `${me.above_the_fold.meta_title}` },
                    { hid: 'og:description', property: 'og:description', content: `${me.above_the_fold.meta_description}` },
                    { hid: 'og:keywords', property: 'og:keywords', content: `${me.above_the_fold.meta_keywords}` },
                    { hid: 'og:url', property: 'og:url', content: `${host}/${me.$route.fullPath}` },
                    { hid: 'og:image', property: 'og:image', content: `${me.above_the_fold.banners[0].path}` },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${me.above_the_fold.banners[0].alt}` },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:site_name', property: 'og:site_name', content: 'Ride Revolution' },
                ]
            }
        }
    }
</script>
