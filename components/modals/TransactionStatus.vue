<template>
    <div class="default_modal_page">
        <section id="banner" class="alt_2 grd">
            <div class="full gradient"></div>
            <div class="overlay_mid">
                <h1>{{ title }}</h1>
                <nuxt-link :to="`${($route.query.token) ? `/fish-in-the-glass/buy-rides?token=${$route.query.token}` : '/buy-rides'}`" class="default_btn">Buy Rides</nuxt-link>
            </div>
        </section>
        <referral />
    </div>
</template>

<script>
    import Referral from '../Referral'
    export default {
        props: {
            title: {
                default: 'Transaction Failed, Try Again.'
            }
        },
        components: {
            Referral
        }
    }
</script>
