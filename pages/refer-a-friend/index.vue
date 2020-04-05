<template>
    <div class="refer_a_friend">
        <section id="banner" class="mt">
            <img class="full" src="/default/buy-rides/buy-rides-banner-success.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Refer a Friend</h1>
            </div>
        </section>
        <referral />
    </div>
</template>

<script>
    import Referral from '../../components/Referral'
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        components: {
            Referral,
            Breadcrumb
        }
    }
</script>
