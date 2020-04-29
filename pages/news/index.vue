<template>
    <div class="news">
        <section id="banner" class="mt">
            <img class="full" src="/default/news/news-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>News</h1>
                <h2 class="alt">We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">
            <nuxt-link :to="`/news/${data.slug}`" class="news_list" v-if="data.checked" v-for="(data, key) in populateNews" :key="key">
                <div class="top">
                    <img :src="data.images[0].path_resized" :alt="data.images[0].alt" />
                </div>
                <div class="bottom">
                    <div class="title">{{ data.name }}</div>
                    <div class="date">{{ $moment(data.date_published).format('MMM DD, YYYY') }}</div>
                    <div class="description" v-line-clamp="3" v-html="data.summary"></div>
                    <div class="link">Read More</div>
                </div>
            </nuxt-link>
            <div class="action">
                <div v-if="!showLoadedNews" class="default_btn load" @click="loadMoreNews()">Load More</div>
            </div>
        </section>
        <instagram-alternate />
        <section id="banner" class="mt alt">
            <img class="full" src="/default/news/book-a-bike.jpg" />
            <div class="overlay_mid">
                <h2>Begin your fitness journey with us.</h2>
                <nuxt-link to="/book-a-bike" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import InstagramAlternate from '../../components/InstagramAlternate'
    export default {
        components: {
            Breadcrumb,
            InstagramAlternate
        },
        data () {
            return {
                toShow: 6,
                showLoadedNews: false,
                res: []
            }
        },
        computed: {
            populateNews () {
                const me = this
                let result = []
                let count = 0
                for (let i = 0; i < me.toShow; i++) {
                    if (me.res[i]) {
                        count++
                        me.res[i].checked = true
                        result.push(me.res[i])
                    }
                }
                if (count == me.res.length) {
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
        },
        async mounted () {
            const me = this
            me.loader(true)
            await me.$axios.get('api/web/news').then(res => {
                if (res.data) {
                    setTimeout( () => {
                        res.data.news.forEach((item, index) => {
                            item.checked = false
                            me.res.push(item)
                        })
                    }, 500)
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
