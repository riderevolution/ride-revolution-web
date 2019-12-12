<template>
    <div class="riders_guide">
        <section id="banner">
            <img src="/buy-rides.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Rider's Guide</h1>
                <h2>We don’t spin. We Ride.</h2>
            </div>
        </section>
        <section id="teaser">
            <h2>Welcome</h2>
            <p>We’re revolutionizing Manila’s fitness industry.<br> Banging playlists, amazing lighting and sick sound systems. Are you ready for the <span class="green">#RideRev?</span></p>
        </section>
        <section id="ready">
            <div class="header">

            </div>
            <div class="content">

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
    }
</script>
