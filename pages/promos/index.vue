<template>
    <div class="promo_landing">
        <section id="banner" class="mt">
            <img class="full" src="/default/promo/promo-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Ride Rev Promos</h1>
                <h2 class="alt">We're revolutionizing Manila's fitness industry.</h2>
            </div>
        </section>
        <section id="promos" class="alt">
            <div class="promo_list" v-for="(data, key) in populatePromos" :key="key">
                <h2 class="header_title">Ride Rev Promo</h2>
                <h3 class="title">{{ data.name }}</h3>
                <div class="description" v-html="data.description"></div>
                <div class="copy_wrapper" v-if="data.hasCode">
                    <input class="code" :id="`code_${key}`" :value="data.promo_code" />
                    <button type="button" class="default_btn" @click="codeClipboard(data, key)">Copy Code</button>
                </div>
            </div>
            <div class="action">
                <div v-if="!checkPromos" class="default_btn load" @click="loadMorePromos()">Load More</div>
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
                toShow: 6,
                res: []
            }
        },
        computed: {
            populatePromos () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShow; i++) {
                    if (me.res[i]) {
                        me.res[i].checked = true
                        result.push(me.res[i])
                    }
                }
                return result
            },
            checkPromos () {
                const me = this
                let count = 0
                let result = false
                me.res.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.res.length) {
                    result = true
                } else {
                    result = false
                }
                return result
            }
        },
        methods: {
            loadMorePromos () {
                const me = this
                if (!me.checkPromos) {
                    me.toShow += 3
                    me.$scrollTo('.load', {
                        offset: -250
                    })
                }
            },
            codeClipboard (data, key) {
                const me = this
                if (data.hasCode) {
                    let element = document.getElementById(`code_${key}`)
                    element.select()
                    element.setSelectionRange(0, 99999)
                    document.execCommand("copy")
                    element.nextElementSibling.innerHTML = 'Copied!'
                    setTimeout( () => {
                        element.nextElementSibling.innerHTML = 'Copy Code'
                    }, 1000)
                }
            }
        },
        async mounted () {
            const me = this
            me.loader(true)
            await me.$axios.get('api/web/promos').then(res => {
                if (res.data) {
                    setTimeout( () => {
                        res.data.promos.forEach((promo, index) => {
                            if (promo.promo_code) {
                                promo.hasCode = true
                            } else {
                                promo.hasCode = false
                            }
                            promo.checked = false
                            me.res.push(promo)
                        })
                    }, 500)
                }
            }).catch(err => {
                error({ statusCode: 403, message: 'Page not found' })
            }).then(() => {
                setTimeout( () => {
                    me.loader(false)
                }, 500)
            })
        }
    }
</script>
