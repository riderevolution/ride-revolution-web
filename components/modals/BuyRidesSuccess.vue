<template>
    <div class="default_modal_page">
        <section id="banner" class="alt_2">
            <img src="/default/buy-rides/buy-rides-banner-success.jpg" />
            <div class="overlay_mid">
                <h1>Yay, you’re all set. Let’s ride!</h1>
                <nuxt-link :to="`${($route.query.token) ? `/fish-in-the-glass/book-a-bike?token=${$route.query.token}` : '/book-a-bike'}`" class="default_btn">Book a Bike</nuxt-link>
            </div>
        </section>
        <referral />
    </div>
</template>

<script>
    import Referral from '../Referral'
    export default {
        components: {
            Referral
        }
    }
</script>
