<template>
    <div class="default_modal_page">
        <section id="banner" class="alt_2">
            <img class="full" src="/default/buy-rides/buy-rides-success-banner.jpg" />
            <div class="overlay_mid">
                <h1>{{ title }}</h1>
                <nuxt-link :to="`${($route.query.token) ? `/fish-in-the-glass/book-a-bike?token=${$route.query.token}` : '/book-a-bike'}`" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
        <referral :summary="summary" />
    </div>
</template>

<script>
    import Referral from '../Referral'
    export default {
        props: {
            summary: {
                default: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                }
            },
            title: {
                default: 'Yay, you’re all set. Let’s ride!'
            }
        },
        components: {
            Referral
        }
    }
</script>
