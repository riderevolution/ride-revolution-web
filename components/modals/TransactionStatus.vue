<template>
    <div class="default_modal_page">
        <section id="banner" class="alt_2 grd">
            <div class="full gradient"></div>
            <div class="overlay_mid">
                <h1>{{ title }}</h1>
                <nuxt-link :to="`${($route.query.token) ? `/fish-in-the-glass/buy-rides?token=${$route.query.token}` : '/buy-rides'}`" class="default_btn">Buy Credits</nuxt-link>
            </div>
        </section>
        <referral :summary="summary" v-if="$route.params.slug != 'failed'" />
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
        data () {
            return {
                summary: {
                    res: '',
                    total: 0,
                    discount: 0,
                    quantity: 0,
                    type: ''
                }
            }
        },
        components: {
            Referral
        }
    }
</script>
