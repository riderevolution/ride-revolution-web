<template lang="html">
  <div>
    <section id="reviews" v-if="testimonials.length > 0">
      <div class="header">
        <h2 :class="`image_bg ${$store.state.isMobile ? 'mobile' : ''}`">
          reviews
        </h2>
        <div class="description">
          <p><strong>Here’s what our riders have to say...</strong></p>
        </div>
      </div>
      <div class="content">
        <client-only>
          <swiper
            :options="testimonialsOptions"
            :class="['default', !$store.state.isMobile && 'alt']"
          >
            <swiper-slide
              v-for="(data, key) in testimonials"
              :key="key"
              :class="['review_slide', $store.state.isMobile && 'mobile']"
            >
              <div class="description" v-html="data.body"></div>
              <img
                :src="data.images[0].path_resized"
                :alt="data.images[0].alt"
              />
              <h2 class="title">{{ data.name }}</h2>
            </swiper-slide>
            <template v-if="!$store.state.isMobile">
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </template>
            <template v-else>
              <div class="swiper-pagination" slot="pagination"></div>
            </template>
          </swiper>
        </client-only>
      </div>
    </section>
    <section id="reviews" v-else><div class="header"></div></section>
  </div>
</template>

<script>
  export default {
    props: {
      testimonials: {
        type: Object / Array,
        default: null
      }
    },
    data() {
      return {
        mobileTestimonialsOptions: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
          autoHeight: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            1280: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              autoHeight: true
            }
          }
        }
      }
    },
    computed: {
      testimonialsOptions() {
        const me = this

        let loop = false

        if (me.testimonials.length > 3) {
          loop = true
        }

        let centeredSlides = this.$store.state.isMobile ? false : true

        return {
          slidesPerView: 3,
          spaceBetween: 60,
          slidesPerGroup: 3,
          centeredSlides: centeredSlides,
          loop: loop,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            1280: {
              slidesPerView: 2,
              spaceBetween: 30,
              slidesPerGroup: 2,
              autoHeight: true
            },
            768: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              autoHeight: true
            },
            425: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              autoHeight: true
            },
            375: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              autoHeight: true
            },
            280: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              autoHeight: true
            }
          }
        }
      }
    }
  }
</script>
