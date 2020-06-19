<template>
    <div class="default_modal alt">
        <div class="background" @click.once="toggleClose(false)"></div>
        <div class="confirmation_wrapper">
            <div class="form_close" @click="toggleClose(false)"></div>
            <h2 class="confirmation_title alt">Congratulations! You won a badge.</h2>
            <div class="confirmation_text alt">
                Keep going! You're in for a treat.
            </div>
            <div class="confirmation_image">
                <no-ssr>
                    <swiper :options="badgeOptions" class="default">
                        <swiper-slide v-for="(badge, key) in badges" :key="key">
                            <img class="badge" :src="badge.badge_image" />
                            <div class="badge_title">{{ badge.description }}</div>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </no-ssr>
            </div>
            <div class="button_group alt">
                <div class="flex default_btn_wht" @click="toggleClose(true)">See my profile</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            badges: {
                default: null
            }
        },
        data () {
            return {
                badgeOptions: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                let formData = new FormData()
                me.badges.forEach((data, index) => {
                    formData.append('badges[]', data.id)
                })
                me.$axios.post('api/read-badges', formData).then(res => {
                    if (res.data) {
                        console.log(res.data);
                    }
                })
                
                me.$store.state.badgePromptStatus = false
                document.body.classList.remove('no_scroll')
                if (status) {
                    me.$router.push('/my-profile')
                }
            }
        }
    }
</script>
