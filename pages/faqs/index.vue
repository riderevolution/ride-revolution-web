<template>
    <div class="faqs">
        <section id="banner">
            <img src="/default/faqs/faq-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Faqs</h1>
                <h2>We’re revolutionizing Manila’s fitness industry.</h2>
            </div>
        </section>
        <section id="content">

        </section>
        <section id="banner" class="alt">
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
    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
            }
        },
        methods: {

        }
    }
</script>
