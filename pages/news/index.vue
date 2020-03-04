<template>
    <div class="news">
        <section id="banner" class="mt">
            <img src="/default/news/news-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>News</h1>
                <h2>We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">
            <nuxt-link :to="`/news/${convertToSlug(data.title)}`" class="news_list" v-if="data.checked" v-for="(data, key) in populateNews" :key="key">
                <div class="top">
                    <img :src="data.path" alt="asdasdasd" />
                </div>
                <div class="bottom">
                    <h3 class="title">{{ data.title }}</h3>
                    <div class="date">{{ $moment().format('MMM DD, YYYY') }}</div>
                    <div class="description" v-line-clamp="3" v-html="data.description"></div>
                    <div class="link">Read More</div>
                </div>
            </nuxt-link>
            <div class="action">
                <div v-if="!showLoadedNews" class="default_btn load" @click="loadMoreNews()">Load More</div>
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
        <section id="banner" class="mt alt">
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
                toShow: 6,
                showLoadedNews: false,
                news: [
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    },
                    {
                        path: '/default/news/news-inner-banner.jpg',
                        title: 'Ride Revolution awarded best indoor cycling studio',
                        description: 'We offer a pay-as-you train model – no contracts, no commitments. Buy your classes and book a bike online.',
                        checked: false
                    }
                ]
            }
        },
        computed: {
            populateNews () {
                const me = this
                let result = []
                let count = 0
                for (let i = 0; i < me.toShow; i++) {
                    if (me.news[i]) {
                        count++
                        me.news[i].checked = true
                        result.push(me.news[i])
                    }
                }
                if (count == me.news.length) {
                    me.showLoadedNews = true
                } else {
                    me.showLoadedNews = false
                }
                return result
            }
        },
        methods: {
            loadMoreNews () {
                const me = this
                if (!me.showLoadedNews) {
                    me.toShow += 3
                    me.$scrollTo('.load', {
                        offset: -250
                    })
                }
            }
        }
    }
</script>
