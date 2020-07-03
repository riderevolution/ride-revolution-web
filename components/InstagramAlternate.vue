<template>
    <section id="instagram_alternate">
        <div class="header">
            <div class="description">
                <img src="/icons/lets-ride-ig-icon.svg" alt="lets-ride" /><span>@riderevolution</span>
            </div>
        </div>
        <div class="content">
            <instagram :feeds="feeds" />
        </div>
    </section>
</template>

<script>
    import Instagram from './Instagram'
    export default {
        components: {
            Instagram
        },
        data () {
            return {
                feeds: []
            }
        },
        mounted () {
            const me = this
            me.$axios.get('https://www.instagram.com/riderevolution/?__a=1').then(res => {
                me.feeds = res.data.graphql.user.edge_owner_to_timeline_media.edges
            })
        }
    }
</script>
