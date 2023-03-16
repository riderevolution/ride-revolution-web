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
            :key="!$store.state.isMobile ? 1 : 0"
            :class="['default', !$store.state.isMobile && 'alt']"
          >
            <swiper-slide
              :class="['review_slide', $store.state.isMobile && 'mobile']"
              v-for="(data, key) in testimonials"
              :key="key"
            >
              <div class="description" v-html="data.body"></div>
              <div>
                <img
                  :src="data.images[0].path_resized"
                  :alt="data.images[0].alt"
                />
                <h2 class="title">{{ data.name }}</h2>
              </div>
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
    computed: {
      testimonialsOptions() {
        const me = this

        let loop = false

        if (me.testimonials.length > 3) {
          loop = true
        }

        return {
          slidesPerView: 3,
          spaceBetween: 30,
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
              spaceBetween: 15,
              centeredSlides: true
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            375: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            280: {
              slidesPerView: 1,
              spaceBetween: 0
            }
          }
        }
      }
    }
  }
</script>
