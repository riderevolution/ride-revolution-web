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
        props: {
            id: {
                type: Number,
                default: null
            }
        },
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
            me.$axios.$get(`https://stamped.io/api/widget/reviews?type=instagram-feed&apiKey=pubkey-b1f9lj3ib12svBob12UI0Z3a7lwNra&storeUrl=www.riderevolution.ph&isdataonly=true&productIds=${me.id}&take=100`).then(({ data }) => {
                data.sort((a, b) => parseFloat(b.countLikes) - parseFloat(a.countLikes))
                me.feeds = data 
            }).catch(err => {
                console.log(err);
            }).then(() => {
                me.loader(false)
            })
        }
    }
</script>
