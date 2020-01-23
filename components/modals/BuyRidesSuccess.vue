<template>
    <div class="default_modal_page">
        <section id="banner" class="alt_2">
            <img src="/default/buy-rides/buy-rides-banner-success.jpg" />
            <div class="overlay_mid">
                <h1>Yay, you’re all set. Let’s ride!</h1>
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
