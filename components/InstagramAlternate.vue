<template>
    <section id="instagram_alternate">
        <div class="header">
            <div class="description">
                <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
            </div>
        </div>
        <div class="content">
            <instagram />
        </div>
    </section>
</template>

<script>
    import Instagram from './Instagram'
    export default {
        components: {
            Instagram
        }
    }
</script>
