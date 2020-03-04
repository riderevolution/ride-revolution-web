<template>
    <div class="promo_landing">
        <section id="banner" class="mt">
            <img src="/default/promo/promo-banner.jpg" />
            <breadcrumb :overlay="true" />
            <div class="overlay_mid">
                <h1>Ride Rev Promos</h1>
                <h2>We're revolutionizing Manila's fitness industry.</h2>
            </div>
        </section>
        <section id="promos" class="alt">
            <div class="promo_list" v-for="(data, key) in populatePromos" :key="key">
                <h2 class="header_title" v-line-clamp="3">Ride Rev Promo</h2>
                <h3 class="title">{{ data.title }}</h3>
                <div class="description" v-line-clamp="4" v-html="data.description"></div>
                <div class="copy_wrapper" v-if="data.hasCode">
                    <input class="code" :id="`code_${key}`" :value="data.code" />
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
                promos: [
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Complete all 20 milestone badges to get an exclusive prize from us!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. tempor incididunt ut labore et dolore incididunt ut labore et',
                        hasCode: false,
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'ASD1231',
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'HGJ23A',
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Complete all 20 milestone badges to get an exclusive prize from us!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. tempor incididunt ut labore et dolore incididunt ut labore et',
                        hasCode: false,
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'JHSHAI23',
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'HGJ23A',
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Complete all 20 milestone badges to get an exclusive prize from us!',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. tempor incididunt ut labore et dolore incididunt ut labore et',
                        hasCode: false,
                        checked: false
                    },
                    {
                        path: '/default/promo/sample-image.jpg',
                        title: 'Get 1,500 Pesos Discount on your Ride!*',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore. sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore.',
                        hasCode: true,
                        code: 'JHSHAI23',
                        checked: false
                    }
                ]
            }
        },
        computed: {
            populatePromos () {
                const me = this
                let result = []
                for (let i = 0; i < me.toShow; i++) {
                    if (me.promos[i]) {
                        me.promos[i].checked = true
                        result.push(me.promos[i])
                    }
                }
                return result
            },
            checkPromos () {
                const me = this
                let count = 0
                let result = false
                me.promos.forEach((data, index) => {
                    if (data.checked) {
                        count++
                    }
                })
                if (count == me.promos.length) {
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
        }
    }
</script>
