<template>
  <transition name="fade">
    <div class="news" v-if="loaded">
      <banner :res="res" :hasH2="true" />
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
      <!-- <instagram-alternate :id="1100" /> -->
      <book-a-bike-banner />
    </div>
    <skeleton :page="'default_centered'" :col="{ class: 'three', count: 9 }" :has_header="false" v-else />
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
      toShow: 6,
      showLoadedNews: false,
      res: [],
      news: []
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
    },
    async initial () {
      const me = this
      let tempNews = []
      me.loader(true)
      setTimeout( () => {
        me.news.forEach((news, index) => {
          news.checked = false
          tempNews.push(news)
        })
        me.news = tempNews
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
    return $axios.get(`api/web/news?forWeb=1`)
    .then(res => {
      return {
        res: res.data.pageSetting,
        news: res.data.news
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
