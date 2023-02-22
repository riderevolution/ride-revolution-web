<template>
  <div id="breadcrumb" :class="`${hasPadding ? '' : overlay ? 'overlay' : ''}`">
    <ul itemtype="http://schema.org/BreadcrumbList">
      <li
        v-for="(crumb, key) in crumbs"
        itemprop="itemListElement"
        itemscope
        itemtype="http://schema.org/ListItem"
      >
        <nuxt-link itemprop="item" :to="crumb.url">
          <p itemprop="name" v-if="crumb.url == '/'" class="front">
            Homepage
          </p>
          <p v-else itemprop="name" class="crumb">
            {{ checkSlug(crumb.NAME) }}
          </p>
          <meta itemprop="position" :content="key + 1" />
        </nuxt-link>
        <template v-if="crumbs.length != key + 1">
          <p class="slash">
            /
          </p>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
  import breadcrumb from 'url-breadcrumb'
  export default {
    props: {
      hasPadding: {
        type: Boolean,
        default: false
      },
      overlay: {
        type: Boolean,
        default: false
      },
      booker: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        crumbs: [],
        loaded: false
      }
    },
    methods: {
      checkSlug(slug) {
        const me = this
        let result = ''
        if (slug == 'faqs') {
          result = 'FAQS'
        } else {
          if (slug.match(/^[0-9]+$/) && me.booker) {
            result = 'Reservation'
          } else {
            result = slug
          }
        }
        return result
      }
    },
    mounted() {
      const me = this
      me.crumbs = breadcrumb($nuxt.$route.path)
    }
  }
</script>
