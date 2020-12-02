<template lang="html">
    <section id="lets_ride">
        <div class="header">
            <h2 :class="`image_bg ${($store.state.isMobile) ? 'mobile' : ''}`">studios</h2>
            <div class="description">
                <p>
                    <a href="https://www.instagram.com/riderevolution" target="_blank">
                        <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
                    </a>
                </p>
                <a href="https://www.instagram.com/riderevolution" target="_blank" class="default_btn">Follow Now</a>
            </div>
        </div>
        <div class="content">
            <instagram :feeds="feeds" />
        </div>
    </section>
</template>

<script>
    import Instagram from '~/components/Instagram'

    export default {
        props: {
            feeds: {
                type: Object/Array,
                default: null
            }
        },
        components: {
            Instagram
        }
    }
</script>
